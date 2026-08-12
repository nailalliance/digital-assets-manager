import { Controller } from '@hotwired/stimulus';
import * as tus from 'tus-js-client';
import { createTusUploadMetadata } from './upload_metadata';

export default class extends Controller {
    static targets = [
        'fileInput', 'dropzone', 'fileSummary', 'fileList', 'submitButton',
        'progressContainer', 'progressBar', 'progressText', 'errorMessage',
        'resultContainer', 'resultSummary', 'resultList',
    ];

    static values = {
        authToken: String,
    };

    selectedFiles = [];
    activeUploads = new Set();
    stopped = false;

    connect() {
        this.stopped = false;
        this.dropzoneTarget.addEventListener('click', this.openFilePicker);
    }

    disconnect() {
        this.stopped = true;
        this.dropzoneTarget.removeEventListener('click', this.openFilePicker);

        for (const upload of this.activeUploads) {
            upload.abort();
        }
        this.activeUploads.clear();
    }

    openFilePicker = () => {
        this.fileInputTarget.click();
    };

    dragover(event) {
        event.preventDefault();
        this.dropzoneTarget.classList.add('border-violet-500', 'bg-gray-50');
    }

    dragleave(event) {
        event.preventDefault();
        this.dropzoneTarget.classList.remove('border-violet-500', 'bg-gray-50');
    }

    drop(event) {
        event.preventDefault();
        this.fileInputTarget.files = event.dataTransfer.files;
        this.dragleave(event);
        this.filesSelected();
    }

    filesSelected() {
        this.selectedFiles = Array.from(this.fileInputTarget.files);
        this.hideError();

        if (this.selectedFiles.length === 0) {
            this.fileSummaryTarget.textContent = 'No files selected';
            this.fileListTarget.replaceChildren();
            this.submitButtonTarget.disabled = true;
            return;
        }

        const totalBytes = this.selectedFiles.reduce((sum, file) => sum + file.size, 0);
        const label = this.selectedFiles.length === 1 ? 'file' : 'files';

        this.fileSummaryTarget.textContent = `${this.selectedFiles.length} ${label} selected (${this.formatFileSize(totalBytes)})`;
        this.renderSelectedFiles();
        this.submitButtonTarget.disabled = false;
    }

    async upload(event) {
        event.preventDefault();

        if (this.selectedFiles.length === 0) {
            this.showError('Please select at least one file.');
            return;
        }

        const files = [...this.selectedFiles];
        const taxonomyMetadata = this.selectedTaxonomyMetadata();
        const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
        const uploadedFiles = [];
        const outcomes = [];
        let attemptedBytes = 0;

        this.hideError();
        this.resultContainerTarget.classList.remove('hidden');
        this.resultSummaryTarget.textContent = 'Uploading files...';
        this.resultListTarget.replaceChildren();
        this.submitButtonTarget.disabled = true;
        this.fileInputTarget.disabled = true;
        this.dropzoneTarget.style.pointerEvents = 'none';
        this.progressContainerTarget.classList.remove('hidden');
        this.progressBarTarget.style.width = '0%';
        this.progressTextTarget.textContent = 'Preparing uploads...';

        for (const [index, file] of files.entries()) {
            this.updateFileStatus(index, 'Uploading...', 'text-violet-600');

            try {
                const uploadKey = await this.uploadSingleFile(
                    file,
                    index,
                    attemptedBytes,
                    totalBytes,
                    files.length,
                    taxonomyMetadata,
                );

                uploadedFiles.push({ file, index, uploadKey });
                this.updateFileStatus(index, 'Processing...', 'text-amber-600');
            } catch (error) {
                outcomes.push('failed');
                this.updateFileStatus(index, 'Upload failed', 'text-red-600');
                this.addResult(file, 'failed', this.errorText(error));
            } finally {
                attemptedBytes += file.size;
            }
        }

        if (uploadedFiles.length > 0) {
            this.progressBarTarget.style.width = '100%';
            this.progressTextTarget.textContent = `Processing ${uploadedFiles.length} uploaded ${uploadedFiles.length === 1 ? 'file' : 'files'}...`;

            const processingOutcomes = await Promise.all(
                uploadedFiles.map(({ file, index, uploadKey }) => this.waitForAsset(file, index, uploadKey)),
            );
            outcomes.push(...processingOutcomes);
        }

        this.finish(files.length, outcomes);
    }

    uploadSingleFile(file, index, attemptedBytes, totalBytes, fileCount, taxonomyMetadata) {
        const { uploadKey, metadata } = createTusUploadMetadata(file);
        Object.assign(metadata, taxonomyMetadata);

        return new Promise((resolve, reject) => {
            const upload = new tus.Upload(file, {
                endpoint: '/admin/assets/upload/',
                chunkSize: 100 * 1024 * 1024,
                retryDelays: [0, 3000, 5000, 10000, 20000],
                headers: {
                    'Upload-Key': uploadKey,
                    'X-UPLOAD-AUTH': this.authTokenValue,
                },
                metadata,
                onProgress: (bytesUploaded) => {
                    const overallUploaded = attemptedBytes + bytesUploaded;
                    const percentage = totalBytes > 0 ? (overallUploaded / totalBytes * 100).toFixed(2) : '100.00';
                    const filePercentage = file.size > 0 ? (bytesUploaded / file.size * 100).toFixed(2) : '100.00';

                    this.progressBarTarget.style.width = `${percentage}%`;
                    this.progressTextTarget.textContent = `Uploading file ${index + 1} of ${fileCount} (${percentage}%)`;
                    this.updateFileStatus(index, `${filePercentage}%`, 'text-violet-600');
                },
                onSuccess: () => {
                    this.activeUploads.delete(upload);
                    resolve(uploadKey);
                },
                onError: (error) => {
                    this.activeUploads.delete(upload);
                    reject(error);
                },
            });

            this.activeUploads.add(upload);
            upload.start();
        });
    }

    async waitForAsset(file, index, uploadKey) {
        const maxPolls = 10 * 60 / 2;

        for (let pollCount = 0; pollCount < maxPolls && !this.stopped; pollCount += 1) {
            try {
                const response = await fetch(`/admin/upload/status/${encodeURIComponent(uploadKey)}`, {
                    headers: { Accept: 'application/json' },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    if (data.status === 'complete') {
                        this.updateFileStatusWithLink(index, data.editUrl);
                        this.addResult(file, 'complete', data.editUrl);
                        return 'complete';
                    }
                } else if (response.status !== 202) {
                    throw new Error(`Processing status returned HTTP ${response.status}.`);
                }
            } catch (error) {
                this.updateFileStatus(index, 'Status unavailable', 'text-red-600');
                this.addResult(file, 'failed', this.errorText(error));
                return 'failed';
            }

            await this.delay(2000);
        }

        this.updateFileStatus(index, 'Still processing', 'text-amber-600');
        this.addResult(file, 'processing');
        return 'processing';
    }

    selectedTaxonomyMetadata() {
        const metadata = {};

        for (const field of this.element.querySelectorAll('[data-upload-taxonomy]:checked')) {
            const key = field.dataset.uploadTaxonomy;
            metadata[key] ??= [];
            metadata[key].push(field.value);
        }

        return Object.fromEntries(
            Object.entries(metadata).map(([key, values]) => [key, values.join(',')]),
        );
    }

    finish(totalFiles, outcomes) {
        const completed = outcomes.filter((outcome) => outcome === 'complete').length;
        const failed = outcomes.filter((outcome) => outcome === 'failed').length;
        const processing = outcomes.filter((outcome) => outcome === 'processing').length;
        const summary = [`${completed} of ${totalFiles} ${totalFiles === 1 ? 'asset is' : 'assets are'} ready to edit.`];

        if (failed > 0) {
            summary.push(`${failed} ${failed === 1 ? 'file failed' : 'files failed'} without stopping the other uploads.`);
            this.showError(`${failed} ${failed === 1 ? 'file could not be completed' : 'files could not be completed'}. See the results below.`);
        }
        if (processing > 0) {
            summary.push(`${processing} ${processing === 1 ? 'file is' : 'files are'} still processing.`);
        }

        this.resultSummaryTarget.textContent = summary.join(' ');
        this.progressContainerTarget.classList.add('hidden');
        this.fileInputTarget.disabled = false;
        this.fileInputTarget.value = '';
        this.dropzoneTarget.style.pointerEvents = 'auto';
        this.selectedFiles = [];
        this.submitButtonTarget.disabled = true;
        this.fileSummaryTarget.textContent = 'Choose more files to start another upload.';
    }

    renderSelectedFiles() {
        this.fileListTarget.replaceChildren();

        this.selectedFiles.forEach((file, index) => {
            const item = document.createElement('li');
            item.className = 'flex items-center justify-between gap-4 rounded-md bg-gray-50 px-3 py-2';
            item.dataset.index = String(index);

            const name = document.createElement('span');
            name.className = 'truncate text-sm text-gray-700';
            name.textContent = `${file.name} (${this.formatFileSize(file.size)})`;

            const status = document.createElement('span');
            status.className = 'shrink-0 text-xs text-gray-500';
            status.dataset.role = 'status';
            status.textContent = 'Pending';

            item.append(name, status);
            this.fileListTarget.appendChild(item);
        });
    }

    updateFileStatus(index, text, className) {
        const status = this.fileListTarget.querySelector(`[data-index="${index}"] [data-role="status"]`);
        if (!status) {
            return;
        }

        status.className = `shrink-0 text-xs ${className}`;
        status.textContent = text;
    }

    updateFileStatusWithLink(index, editUrl) {
        const status = this.fileListTarget.querySelector(`[data-index="${index}"] [data-role="status"]`);
        if (!status) {
            return;
        }

        const link = document.createElement('a');
        link.href = editUrl;
        link.dataset.turbo = 'false';
        link.className = 'font-medium text-violet-600 hover:text-violet-800';
        link.textContent = 'Edit asset';
        status.className = 'shrink-0 text-sm';
        status.replaceChildren(link);
    }

    addResult(file, outcome, detail = '') {
        const item = document.createElement('li');
        item.className = 'flex flex-wrap items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-sm';

        const name = document.createElement('span');
        name.className = 'break-all text-gray-700';
        name.textContent = file.name;
        item.appendChild(name);

        if (outcome === 'complete') {
            const link = document.createElement('a');
            link.href = detail;
            link.dataset.turbo = 'false';
            link.className = 'font-medium text-violet-600 hover:text-violet-800';
            link.textContent = 'Edit asset';
            item.appendChild(link);
        } else {
            const status = document.createElement('span');
            status.className = outcome === 'failed' ? 'text-red-600' : 'text-amber-600';
            status.textContent = outcome === 'failed' ? `Failed: ${detail}` : 'Still processing; check the asset library shortly.';
            item.appendChild(status);
        }

        this.resultListTarget.appendChild(item);
    }

    showError(message) {
        this.errorMessageTarget.textContent = message;
        this.errorMessageTarget.classList.remove('hidden');
    }

    hideError() {
        this.errorMessageTarget.textContent = '';
        this.errorMessageTarget.classList.add('hidden');
    }

    errorText(error) {
        if (error instanceof Error) {
            return error.message;
        }

        return String(error);
    }

    delay(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    formatFileSize(bytes) {
        if (bytes === 0) {
            return '0 B';
        }

        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
        const size = bytes / (1024 ** exponent);

        return `${size.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
    }
}

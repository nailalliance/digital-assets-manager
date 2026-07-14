import { Controller } from '@hotwired/stimulus';
import * as tus from 'tus-js-client';
import { createTusUploadMetadata } from './upload_metadata';

export default class extends Controller {
    static targets = [
        "fileInput", "dropzone", "fileSummary", "fileList", "submitButton",
        "progressContainer", "progressBar", "progressText", "resultContainer", "urlInput"
    ];

    static values = {
        authToken: String,
    };

    pollingInterval = null;
    selectedFiles = [];

    connect() {
        this.dropzoneTarget.addEventListener('click', () => this.fileInputTarget.click());
    }

    disconnect() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
    }

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

        if (this.selectedFiles.length > 0) {
            const totalBytes = this.selectedFiles.reduce((sum, file) => sum + file.size, 0);
            const label = this.selectedFiles.length === 1 ? 'file' : 'files';

            this.fileSummaryTarget.textContent = `${this.selectedFiles.length} ${label} selected (${this.formatFileSize(totalBytes)})`;
            this.renderSelectedFiles();
            this.submitButtonTarget.disabled = false;
        } else {
            this.fileSummaryTarget.textContent = 'No files selected';
            this.fileListTarget.innerHTML = '';
            this.submitButtonTarget.disabled = true;
        }
    }

    async upload(event) {
        event.preventDefault();
        if (this.selectedFiles.length === 0) {
            return;
        }

        this.resultContainerTarget.classList.add('hidden');
        this.submitButtonTarget.disabled = true;
        this.fileInputTarget.disabled = true;
        this.dropzoneTarget.style.pointerEvents = 'none';
        this.progressContainerTarget.classList.remove('hidden');
        this.progressBarTarget.style.width = '0%';
        this.progressTextTarget.textContent = 'Preparing upload...';

        try {
            const { token: shareToken } = await this.createShareSession();
            const totalBytes = this.selectedFiles.reduce((sum, file) => sum + file.size, 0);
            let completedBytes = 0;

            for (const [index, file] of this.selectedFiles.entries()) {
                this.updateFileStatus(index, 'Uploading...', 'text-violet-600');

                await this.uploadSingleFile(file, index, shareToken, completedBytes, totalBytes);

                completedBytes += file.size;
                this.updateFileStatus(index, 'Uploaded', 'text-green-600');
            }

            this.progressBarTarget.style.width = '100%';
            this.progressTextTarget.textContent = 'Uploads finished. Finalizing share...';
            this.startPolling(shareToken, this.selectedFiles.length);
        } catch (error) {
            this.progressTextTarget.textContent = 'Upload failed.';
            alert(`Upload failed: ${error}`);
            this.submitButtonTarget.disabled = false;
            this.fileInputTarget.disabled = false;
            this.dropzoneTarget.style.pointerEvents = 'auto';
        }
    }

    async createShareSession() {
        const response = await fetch('/admin/direct-share/session', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Unable to create share session.');
        }

        return response.json();
    }

    uploadSingleFile(file, index, shareToken, completedBytes, totalBytes) {
        const { uploadKey, metadata } = createTusUploadMetadata(file, shareToken);

        return new Promise((resolve, reject) => {
            const upload = new tus.Upload(file, {
                endpoint: '/admin/direct-share/upload/',
                chunkSize: 100 * 1024 * 1024,
                retryDelays: [0, 3000, 5000, 10000, 20000],
                headers: {
                    'Upload-Key': uploadKey,
                    'X-UPLOAD-AUTH': this.authTokenValue,
                },
                metadata,
                onProgress: (bytesUploaded) => {
                    const overallUploaded = completedBytes + bytesUploaded;
                    const percentage = totalBytes > 0 ? (overallUploaded / totalBytes * 100).toFixed(2) : '0.00';
                    const filePercentage = file.size > 0 ? (bytesUploaded / file.size * 100).toFixed(2) : '0.00';

                    this.progressBarTarget.style.width = `${percentage}%`;
                    this.progressTextTarget.textContent = `Uploading file ${index + 1} of ${this.selectedFiles.length} (${percentage}%)`;
                    this.updateFileStatus(index, `${filePercentage}%`, 'text-violet-600');
                },
                onSuccess: () => resolve(),
                onError: (error) => {
                    this.updateFileStatus(index, 'Failed', 'text-red-600');
                    reject(error);
                }
            });

            upload.start();
        });
    }

    startPolling(token, expectedCount) {
        let pollCount = 0;
        const maxPolls = 300;

        this.pollingInterval = setInterval(async () => {
            if (pollCount >= maxPolls) {
                clearInterval(this.pollingInterval);
                alert("File processing is taking longer than expected. Please try again later.");
                return;
            }

            try {
                const response = await fetch(`/admin/direct-share/status/${encodeURIComponent(token)}?expected=${expectedCount}`);

                if (response.status === 202) {
                    const data = await response.json();
                    this.progressTextTarget.textContent = `Finalizing share... ${data.processedCount ?? 0} of ${expectedCount} files ready`;
                }

                if (response.status === 200) {
                    const data = await response.json();
                    if (data.status === 'complete') {
                        clearInterval(this.pollingInterval);
                        this.progressContainerTarget.classList.add('hidden');
                        this.urlInputTarget.value = data.url;
                        this.resultContainerTarget.classList.remove('hidden');
                        this.fileInputTarget.disabled = false;
                        this.dropzoneTarget.style.pointerEvents = 'auto';
                    }
                }
            } catch (error) {
                clearInterval(this.pollingInterval);
                alert("An error occurred while checking the file status.");
            }

            pollCount++;
        }, 2000); // Check every 2 seconds
    }

    copyToClipboard() {
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(this.urlInputTarget.value);
            return;
        }

        this.urlInputTarget.select();
        document.execCommand('copy');
    }

    renderSelectedFiles() {
        this.fileListTarget.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const item = document.createElement('li');
            item.className = 'flex items-center justify-between gap-4 rounded-md bg-gray-50 px-3 py-2';
            item.dataset.index = String(index);

            const name = document.createElement('span');
            name.className = 'truncate text-sm text-gray-700';
            name.textContent = `${file.name} (${this.formatFileSize(file.size)})`;

            const status = document.createElement('span');
            status.className = 'text-xs text-gray-500';
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

        status.className = `text-xs ${className}`;
        status.textContent = text;
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

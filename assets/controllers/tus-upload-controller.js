import { Controller } from '@hotwired/stimulus';
import * as tus from 'tus-js-client';

export default class extends Controller {
    // We'll use a specific container for the progress elements
    static targets = [
        "fileInput",
        "progressContainer", // The parent div for the progress bar
        "progressBar",       // The visual bar itself
        "progressText",      // The text element for the percentage
        "submitButton",
        "errorMessage",
        "dropzone",
        "fileNameDisplay"
    ];

    connect() {
        this.dropzoneTarget.addEventListener('click', () => this.fileInputTarget.click());
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
        this.fileInputTarget.dispatchEvent(new Event('change'));
    }

    fileSelected() {
        if (this.fileInputTarget.files.length > 0) {
            const file = this.fileInputTarget.files[0];
            this.fileNameDisplayTarget.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
            this.submitButtonTarget.disabled = false;
            this.hideError();
        } else {
            this.fileNameDisplayTarget.textContent = 'No file selected';
            this.submitButtonTarget.disabled = true;
        }
    }

    upload(event) {
        event.preventDefault();

        const file = this.fileInputTarget.files[0];
        if (!file) {
            this.showError("Please select a file first.");
            return;
        }

        this.hideError();
        this.submitButtonTarget.disabled = true;
        this.fileInputTarget.disabled = true;
        this.dropzoneTarget.style.pointerEvents = 'none';

        // Make the progress container visible BEFORE trying to access its children
        this.progressContainerTarget.classList.remove('hidden');
        this.progressBarTarget.style.width = '0%';
        this.progressTextTarget.textContent = '0%';

        let assetId = null;

        const upload = new tus.Upload(file, {
            endpoint: '/admin/assets/upload/',
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
                filename: file.name,
                filetype: file.type
            },
            onAfterResponse: (req, res) => {
                const id = res.getHeader('X-Asset-Id');
                if (id)
                {
                    assetId = id
                }
            },
            onError: (error) => {
                this.showError(`Upload failed: ${error}`);
                this.submitButtonTarget.disabled = false;
                this.fileInputTarget.disabled = false;
                this.dropzoneTarget.style.pointerEvents = 'auto';
            },
            onProgress: (bytesUploaded, bytesTotal) => {
                const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                this.progressBarTarget.style.width = `${percentage}%`;
                this.progressTextTarget.textContent = `${percentage}%`;
            },
            onSuccess: () => {
                this.progressTextTarget.textContent = "Upload complete! Redirecting...";
                if (assetId)
                {
                    setTimeout(() => window.location.href = `/assets/${assetId}`, 1500);
                } else {
                    setTimeout(() => window.location.href = '/', 1500);
                }

            }
        });

        upload.start();
    }

    showError(message) {
        this.errorMessageTarget.textContent = message;
        this.errorMessageTarget.classList.remove('hidden');
    }

    hideError() {
        this.errorMessageTarget.textContent = '';
        this.errorMessageTarget.classList.add('hidden');
    }
}

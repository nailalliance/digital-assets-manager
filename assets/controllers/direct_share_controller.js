import { Controller } from '@hotwired/stimulus';
import * as tus from 'tus-js-client';

export default class extends Controller {
    static targets = [
        "fileInput", "dropzone", "fileList", "submitButton",
        "progressContainer", "progressBar", "resultContainer", "urlInput"
    ];

    pollingInterval = null;

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
        this.filesSelected();
    }

    filesSelected() {
        if (this.fileInputTarget.files.length > 0) {
            this.fileListTarget.textContent = `${this.fileInputTarget.files.length} file(s) selected`;
            this.submitButtonTarget.disabled = false;
        } else {
            this.fileListTarget.textContent = 'No files selected';
            this.submitButtonTarget.disabled = true;
        }
    }

    upload(event) {
        event.preventDefault();
        const file = this.fileInputTarget.files[0]; // Simplified for single file
        if (!file) return;

        this.submitButtonTarget.disabled = true;
        this.progressContainerTarget.classList.remove('hidden');
        this.progressContainerTarget.querySelector('p').textContent = "Uploading...";


        const upload = new tus.Upload(file, {
            endpoint: '/admin/direct-share/upload/',
            chunkSize: 100*1024*1024, // 100 MB
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
                filename: file.name,
                filetype: file.type
            },
            onProgress: (bytesUploaded, bytesTotal) => {
                const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                this.progressBarTarget.style.width = `${percentage}%`;
            },
            onSuccess: () => {
                this.progressContainerTarget.querySelector('p').textContent = "Upload complete! Processing...";
                const uploadKey = upload.url.split('/').pop();
                this.startPolling(uploadKey);
            },
            onError: (error) => {
                alert(`Upload failed: ${error}`);
                this.submitButtonTarget.disabled = false;
            }
        });

        upload.start();
    }

    startPolling(uploadKey) {
        let pollCount = 0;
        const maxPolls = 60; // Stop after 2 minutes (60 * 2 seconds)

        this.pollingInterval = setInterval(async () => {
            if (pollCount >= maxPolls) {
                clearInterval(this.pollingInterval);
                alert("File processing is taking longer than expected. Please try again later.");
                return;
            }

            try {
                const response = await fetch(`/admin/direct-share/status/${uploadKey}`);
                if (response.status === 200) {
                    const data = await response.json();
                    if (data.status === 'complete') {
                        // SUCCESS: The link is ready
                        clearInterval(this.pollingInterval);
                        this.progressContainerTarget.classList.add('hidden');
                        this.urlInputTarget.value = data.url;
                        this.resultContainerTarget.classList.remove('hidden');
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
        this.urlInputTarget.select();
        document.execCommand('copy');
    }
}

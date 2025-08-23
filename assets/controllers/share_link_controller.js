import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["modal", "urlInput"];

    async generate(event) {
        event.preventDefault();
        const button = event.currentTarget;
        button.disabled = true;
        button.textContent = 'Generating...';

        try {
            const response = await fetch('/download-list/share', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const data = await response.json();

            if (response.ok) {
                this.urlInputTarget.value = data.url;
                this.modalTarget.classList.remove('hidden');
            } else {
                alert(data.error || 'An unknown error occurred.');
            }
        } catch (error) {
            alert('Could not connect to the server.');
        } finally {
            button.disabled = false;
            button.textContent = 'Generate Share Link';
        }
    }

    closeModal() {
        this.modalTarget.classList.add('hidden');
    }

    copyToClipboard() {
        this.urlInputTarget.select();
        document.execCommand('copy');
        // You can add a "Copied!" message here if you like
    }
}

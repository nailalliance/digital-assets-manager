import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["modal", "urlInput", "nameInput", "generateForm", "confirmation"];
    copyFeedbackTimeout = null;

    async generate(event) {
        event.preventDefault();
        // const button = event.currentTarget;
        // button.disabled = true;
        // button.textContent = 'Generating...';

        const form = event.currentTarget.closest('form')
        const formData = new FormData(form);

        formData.append('listName', this.nameInputTarget.value)

        try {
            const response = await fetch('/download-list/share', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            });

            const data = await response.json();

            if (response.status === 200) {
                this.urlInputTarget.value = data.url;
                this.generateFormTarget.classList.add('hidden');
                this.confirmationTarget.classList.remove('hidden')
            } else {
                alert(data.error || 'An unknown error occurred.');
            }
        } catch (error) {
            console.log(error)
            alert('Could not connect to the server.');
        } finally {
            // button.disabled = false;
            // button.textContent = 'Generate Share Link';
        }
    }

    openShareModal(event) {
        event.preventDefault();
        this.modalTarget.classList.remove('hidden')
    }

    closeModal() {
        this.nameInputTarget.value = ""
        this.modalTarget.classList.add('hidden');
        this.generateFormTarget.classList.remove('hidden');
        this.confirmationTarget.classList.add('hidden')
    }

    disconnect() {
        if (this.copyFeedbackTimeout) {
            clearTimeout(this.copyFeedbackTimeout);
        }
    }

    async copyToClipboard() {
        this.highlightUrlInput();

        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(this.urlInputTarget.value);
            return;
        }

        document.execCommand('copy');
    }

    highlightUrlInput() {
        this.urlInputTarget.focus({ preventScroll: true });
        this.urlInputTarget.select();
        this.urlInputTarget.setSelectionRange(0, this.urlInputTarget.value.length);
        this.urlInputTarget.classList.add('ring-2', 'ring-violet-300', 'bg-violet-50');

        if (this.copyFeedbackTimeout) {
            clearTimeout(this.copyFeedbackTimeout);
        }

        this.copyFeedbackTimeout = setTimeout(() => {
            this.urlInputTarget.classList.remove('ring-2', 'ring-violet-300', 'bg-violet-50');
        }, 1200);
    }
}

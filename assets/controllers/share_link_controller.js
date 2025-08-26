import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["modal", "urlInput", "nameInput", "generateForm", "confirmation"];

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

    copyToClipboard() {
        this.urlInputTarget.select();
        document.execCommand('copy');
        // You can add a "Copied!" message here if you like
    }
}

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["dialog", "content"];

    connect() {
        super.connect();
        this.dialogTarget.addEventListener('close', this.onDialogClose.bind(this));
    }

    disconnect() {
        super.disconnect();
    }

    async open(event) {
        event.preventDefault();

        const url = event.currentTarget.href;
        if (!url) {
            console.error('No URL provided');
            return;
        }

        const response = await fetch(url);
        const html = await response.text();
        this.contentTarget.innerHTML = html;

        this.dialogTarget.showModal();
    }

    close() {
        this.dialogTarget.close();
    }

    onDialogClose() {
        this.contentTarget.innerHTML = '';
    }
}

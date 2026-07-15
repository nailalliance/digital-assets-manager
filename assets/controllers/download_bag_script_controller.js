import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'modal',
        'textarea',
        'totalCount',
        'compatibleCount',
        'skippedCount',
        'warning',
        'submitButton',
    ];

    static values = {
        initialScript: String,
    };

    connect() {
        this.refreshSummary();

        if (this.hasInitialScriptValue && this.initialScriptValue.trim() !== '') {
            this.textareaTarget.value = this.initialScriptValue;
            this.openModal();
        }
    }

    async openModal() {
        this.refreshSummary();

        if (this.textareaTarget.value.trim() === '' && navigator.clipboard?.readText) {
            try {
                const clipboardText = await navigator.clipboard.readText();
                if (clipboardText.trim() !== '') {
                    this.textareaTarget.value = clipboardText;
                }
            } catch (error) {
                // Clipboard access is optional here, so a silent fallback keeps the flow smooth.
            }
        }

        this.modalTarget.classList.remove('hidden');
        this.modalTarget.classList.add('flex');
        this.textareaTarget.focus();
    }

    closeModal() {
        this.modalTarget.classList.add('hidden');
        this.modalTarget.classList.remove('flex');
    }

    closeOnBackdrop(event) {
        if (event.target === this.modalTarget) {
            this.closeModal();
        }
    }

    refreshSummary() {
        const totalCount = this.element.querySelectorAll('[data-download-bag-script-item="true"]').length;
        const compatibleCount = this.element.querySelectorAll('[data-bag-script-compatible="true"]').length;
        const skippedCount = Math.max(totalCount - compatibleCount, 0);

        this.totalCountTarget.textContent = String(totalCount);
        this.compatibleCountTarget.textContent = String(compatibleCount);
        this.skippedCountTarget.textContent = String(skippedCount);

        if (compatibleCount === 0) {
            this.warningTarget.textContent = 'This bag does not contain any supported raster assets yet. Add JPG, PNG, WEBP, or GIF files before running a scripted download.';
            this.warningTarget.classList.remove('hidden');
            this.submitButtonTarget.disabled = true;
            return;
        }

        this.warningTarget.classList.add('hidden');
        this.warningTarget.textContent = '';
        this.submitButtonTarget.disabled = false;
    }
}

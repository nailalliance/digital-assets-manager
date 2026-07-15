import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'modal',
        'form',
        'textarea',
        'totalCount',
        'compatibleCount',
        'skippedCount',
        'warning',
        'submitButton',
        'closeButton',
        'tokenInput',
        'progressPanel',
        'progressBar',
        'progressLabel',
        'progressMeta',
        'progressPercent',
        'iframe',
    ];

    static values = {
        initialScript: String,
        statusUrlTemplate: String,
        clearUrlTemplate: String,
    };

    connect() {
        this.activeToken = null;
        this.isSubmitting = false;
        this.pollTimer = null;
        this.submitButtonLabel = this.submitButtonTarget.textContent.trim();

        this.refreshSummary();
        this.resetProgressPanel();

        if (this.hasInitialScriptValue && this.initialScriptValue.trim() !== '') {
            this.textareaTarget.value = this.initialScriptValue;
            this.openModal();
        }
    }

    disconnect() {
        this.stopPolling();
    }

    async openModal() {
        this.refreshSummary();

        if (!this.isSubmitting && this.textareaTarget.value.trim() === '' && navigator.clipboard?.readText) {
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
        if (this.isSubmitting) {
            return;
        }

        this.modalTarget.classList.add('hidden');
        this.modalTarget.classList.remove('flex');
    }

    closeOnBackdrop(event) {
        if (event.target === this.modalTarget) {
            this.closeModal();
        }
    }

    submit(event) {
        event.preventDefault();
        this.refreshSummary();

        if (this.submitButtonTarget.disabled || this.isSubmitting) {
            return;
        }

        if (this.textareaTarget.value.trim() === '') {
            this.showWarning('Paste an editor script before downloading.');
            this.textareaTarget.focus();

            return;
        }

        this.beginSubmission();
        this.formTarget.submit();
    }

    refreshSummary() {
        const totalCount = this.element.querySelectorAll('[data-download-bag-script-item="true"]').length;
        const compatibleCount = this.element.querySelectorAll('[data-bag-script-compatible="true"]').length;
        const skippedCount = Math.max(totalCount - compatibleCount, 0);

        this.totalCountTarget.textContent = String(totalCount);
        this.compatibleCountTarget.textContent = String(compatibleCount);
        this.skippedCountTarget.textContent = String(skippedCount);

        if (compatibleCount === 0) {
            this.showWarning('This bag does not contain any supported raster assets yet. Add JPG, PNG, WEBP, or GIF files before running a scripted download.');
            this.submitButtonTarget.disabled = true;

            return;
        }

        if (!this.isSubmitting) {
            this.hideWarning();
            this.submitButtonTarget.disabled = false;
        }
    }

    beginSubmission() {
        this.isSubmitting = true;
        this.activeToken = this.buildToken();
        this.tokenInputTarget.value = this.activeToken;
        this.setCloseButtonsDisabled(true);
        this.hideWarning();
        this.submitButtonTarget.disabled = true;
        this.submitButtonTarget.textContent = 'Preparing...';
        this.progressPanelTarget.classList.remove('hidden');
        this.updateProgress({
            status: 'running',
            processed: 0,
            total: Number(this.compatibleCountTarget.textContent || 0),
            skipped: Number(this.skippedCountTarget.textContent || 0),
            message: 'Starting edited ZIP stream...',
        });
        this.startPolling();
    }

    async pollStatus() {
        if (!this.activeToken) {
            return;
        }

        try {
            const response = await fetch(this.statusUrlFor(this.activeToken), {
                headers: {
                    Accept: 'application/json',
                },
            });
            const payload = await response.json();

            if (!response.ok && payload.status !== 'failed') {
                throw new Error('Unable to fetch scripted download progress.');
            }

            this.updateProgress(payload);

            if (payload.status === 'completed') {
                await this.handleCompleted(payload);
                return;
            }

            if (payload.status === 'failed') {
                await this.handleFailed(payload.message || 'The edited ZIP could not be completed.');
            }
        } catch (error) {
            if (!this.isSubmitting) {
                return;
            }

            await this.handleFailed('The edited ZIP progress check was interrupted. Please try again.');
        }
    }

    updateProgress(payload) {
        const total = Math.max(Number(payload.total || 0), 0);
        const processed = Math.max(Number(payload.processed || 0), 0);
        const skipped = Math.max(Number(payload.skipped || 0), 0);
        const status = payload.status || 'pending';
        const percent = total > 0
            ? Math.max(0, Math.min(100, Math.round((processed / total) * 100)))
            : status === 'completed'
                ? 100
                : 0;

        this.progressBarTarget.style.width = `${percent}%`;
        this.progressPercentTarget.textContent = `${percent}%`;
        this.progressLabelTarget.textContent = payload.message || 'Preparing edited ZIP...';

        const parts = [];
        if (total > 0) {
            parts.push(`${Math.min(processed, total)} of ${total} rendered`);
        } else {
            parts.push('Preparing download');
        }

        if (skipped > 0) {
            parts.push(`${skipped} skipped`);
        }

        this.progressMetaTarget.textContent = parts.join(' · ');
    }

    async handleCompleted(payload) {
        const completedToken = this.activeToken;

        this.stopPolling();
        this.submitButtonTarget.textContent = 'Finishing...';
        this.updateProgress({
            status: 'completed',
            processed: Number(payload.processed || 0),
            total: Number(payload.total || 0),
            skipped: Number(payload.skipped || 0),
            message: 'Edited ZIP is ready.',
        });

        window.setTimeout(async () => {
            this.resetSubmissionState();
            this.resetProgressPanel();
            this.closeModal();
            await this.clearProgress(completedToken);
        }, 350);
    }

    async handleFailed(message) {
        const failedToken = this.activeToken;

        this.stopPolling();
        this.resetSubmissionState();
        this.showWarning(message);
        await this.clearProgress(failedToken);
    }

    resetSubmissionState() {
        this.isSubmitting = false;
        this.activeToken = null;
        this.tokenInputTarget.value = '';
        this.submitButtonTarget.disabled = false;
        this.submitButtonTarget.textContent = this.submitButtonLabel;
        this.setCloseButtonsDisabled(false);
    }

    resetProgressPanel() {
        this.progressPanelTarget.classList.add('hidden');
        this.progressBarTarget.style.width = '0%';
        this.progressPercentTarget.textContent = '0%';
        this.progressLabelTarget.textContent = 'Waiting to start…';
        this.progressMetaTarget.textContent = '0 of 0 rendered';
    }

    startPolling() {
        this.stopPolling();
        this.pollStatus();
        this.pollTimer = window.setInterval(() => {
            this.pollStatus();
        }, 700);
    }

    stopPolling() {
        if (this.pollTimer !== null) {
            window.clearInterval(this.pollTimer);
            this.pollTimer = null;
        }
    }

    setCloseButtonsDisabled(disabled) {
        this.closeButtonTargets.forEach((button) => {
            button.disabled = disabled;
        });
    }

    showWarning(message) {
        this.warningTarget.textContent = message;
        this.warningTarget.classList.remove('hidden');
    }

    hideWarning() {
        this.warningTarget.textContent = '';
        this.warningTarget.classList.add('hidden');
    }

    buildToken() {
        if (window.crypto?.randomUUID) {
            return window.crypto.randomUUID();
        }

        return `scripted-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    }

    statusUrlFor(token) {
        return this.statusUrlTemplateValue.replace('__TOKEN__', encodeURIComponent(token));
    }

    clearUrlFor(token) {
        return this.clearUrlTemplateValue.replace('__TOKEN__', encodeURIComponent(token));
    }

    async clearProgress(token) {
        if (!token) {
            return;
        }

        try {
            await fetch(this.clearUrlFor(token), {
                method: 'DELETE',
            });
        } catch (error) {
            // Cleanup can fail silently; it does not block the user flow.
        }
    }
}

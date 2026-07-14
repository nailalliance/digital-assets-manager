const DEFAULT_BUTTON_LABEL = 'Copy to clipboard';
const COPIED_BUTTON_LABEL = 'Copied to clipboard';
const FEEDBACK_DURATION_MS = 1200;

class CopyToClipboard extends HTMLElement {
    button = null;
    feedbackTimeout = null;

    connectedCallback() {
        this.ensureButton();
        this.button?.addEventListener('click', this.handleClick);
    }

    disconnectedCallback() {
        this.button?.removeEventListener('click', this.handleClick);

        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }
    }

    ensureButton() {
        this.button = this.querySelector('button');

        if (this.button) {
            return;
        }

        this.innerHTML = `
            <button
                type="button"
                class="inline-flex items-center justify-center text-gray-500 transition-colors duration-150 hover:text-gray-700 focus:outline-none"
                aria-label="${DEFAULT_BUTTON_LABEL}"
                title="${DEFAULT_BUTTON_LABEL}"
            >
                <svg class="h-5 w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
            </button>
        `;

        this.button = this.querySelector('button');
    }

    handleClick = async (event) => {
        event.preventDefault();

        const target = this.resolveTarget();
        if (!target) {
            return;
        }

        const text = this.resolveText(target);
        if (text === '') {
            return;
        }

        this.highlightTarget(target);

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                this.fallbackCopy(target, text);
            }

            this.showCopiedFeedback();
        } catch (error) {
            this.fallbackCopy(target, text);
            this.showCopiedFeedback();
        }
    };

    resolveTarget() {
        const targetId = this.getAttribute('for');
        if (targetId) {
            return document.getElementById(targetId);
        }

        const targetSelector = this.getAttribute('target');
        if (targetSelector) {
            return this.closest('[data-copy-scope]')?.querySelector(targetSelector) ?? document.querySelector(targetSelector);
        }

        const previousElement = this.previousElementSibling;
        if (previousElement instanceof HTMLInputElement || previousElement instanceof HTMLTextAreaElement) {
            return previousElement;
        }

        return this.parentElement?.querySelector('input, textarea, [data-copy-source]') ?? null;
    }

    resolveText(target) {
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            return target.value;
        }

        return target.getAttribute('data-copy-source') ?? target.textContent?.trim() ?? '';
    }

    highlightTarget(target) {
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            target.focus({ preventScroll: true });
            target.select();
            target.setSelectionRange(0, target.value.length);
        } else {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(target);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }

        target.classList.add('ring-2', 'ring-violet-300', 'bg-violet-50');

        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }

        this.feedbackTimeout = setTimeout(() => {
            target.classList.remove('ring-2', 'ring-violet-300', 'bg-violet-50');
            this.resetButtonFeedback();
        }, FEEDBACK_DURATION_MS);
    }

    showCopiedFeedback() {
        if (!this.button) {
            return;
        }

        this.button.setAttribute('aria-label', COPIED_BUTTON_LABEL);
        this.button.setAttribute('title', COPIED_BUTTON_LABEL);
        this.button.classList.add('text-violet-600');
    }

    resetButtonFeedback() {
        if (!this.button) {
            return;
        }

        this.button.setAttribute('aria-label', DEFAULT_BUTTON_LABEL);
        this.button.setAttribute('title', DEFAULT_BUTTON_LABEL);
        this.button.classList.remove('text-violet-600');
    }

    fallbackCopy(target, text) {
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            document.execCommand('copy');
            return;
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.className = 'sr-only';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

if (!customElements.get('copy-to-clipboard')) {
    customElements.define('copy-to-clipboard', CopyToClipboard);
}

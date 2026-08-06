import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'source',
        'interface',
        'available',
        'granted',
        'availableCount',
        'grantedCount',
        'grantButton',
        'revokeButton',
    ];

    connect() {
        this.populateLists();

        this.originalSourceTabIndex = this.sourceTarget.getAttribute('tabindex');
        this.sourceTarget.classList.add('hidden');
        this.sourceTarget.setAttribute('tabindex', '-1');
        this.sourceTarget.setAttribute('aria-hidden', 'true');
        this.interfaceTarget.hidden = false;

        this.form = this.sourceTarget.form;
        this.boundPrepareSubmit = this.prepareSubmit.bind(this);
        this.form?.addEventListener('submit', this.boundPrepareSubmit);
    }

    disconnect() {
        this.form?.removeEventListener('submit', this.boundPrepareSubmit);
        this.interfaceTarget.hidden = true;
        this.sourceTarget.classList.remove('hidden');
        this.sourceTarget.removeAttribute('aria-hidden');

        if (this.originalSourceTabIndex === null) {
            this.sourceTarget.removeAttribute('tabindex');
        } else {
            this.sourceTarget.setAttribute('tabindex', this.originalSourceTabIndex);
        }
    }

    grant(event) {
        event.preventDefault();
        this.moveSelected(this.availableTarget, this.grantedTarget);
    }

    revoke(event) {
        event.preventDefault();
        this.moveSelected(this.grantedTarget, this.availableTarget);
    }

    grantOnDoubleClick(event) {
        if (event.target instanceof HTMLOptionElement) {
            event.target.selected = true;
            this.moveSelected(this.availableTarget, this.grantedTarget);
        }
    }

    revokeOnDoubleClick(event) {
        if (event.target instanceof HTMLOptionElement) {
            event.target.selected = true;
            this.moveSelected(this.grantedTarget, this.availableTarget);
        }
    }

    refresh() {
        this.availableCountTarget.textContent = this.availableTarget.options.length;
        this.grantedCountTarget.textContent = this.grantedTarget.options.length;
        this.grantButtonTarget.disabled = this.availableTarget.selectedOptions.length === 0;
        this.revokeButtonTarget.disabled = this.grantedTarget.selectedOptions.length === 0;
    }

    prepareSubmit() {
        this.syncSource();
    }

    populateLists() {
        this.availableTarget.replaceChildren();
        this.grantedTarget.replaceChildren();

        Array.from(this.sourceTarget.options).forEach((sourceOption) => {
            const option = new Option(sourceOption.text, sourceOption.value, false, false);
            option.disabled = sourceOption.disabled;

            if (sourceOption.selected) {
                this.grantedTarget.add(option);
            } else {
                this.availableTarget.add(option);
            }
        });

        this.sortOptions(this.availableTarget);
        this.sortOptions(this.grantedTarget);
        this.syncSource();
        this.refresh();
    }

    moveSelected(source, destination) {
        Array.from(source.selectedOptions).forEach((option) => {
            option.selected = false;
            destination.add(option);
        });

        this.sortOptions(destination);
        this.syncSource();
        this.refresh();
    }

    sortOptions(select) {
        const options = Array.from(select.options).sort((left, right) => (
            left.text.localeCompare(right.text, undefined, { numeric: true, sensitivity: 'base' })
        ));

        select.replaceChildren(...options);
    }

    syncSource() {
        const grantedValues = new Set(
            Array.from(this.grantedTarget.options).map((option) => option.value)
        );

        Array.from(this.sourceTarget.options).forEach((option) => {
            option.selected = grantedValues.has(option.value);
        });
    }
}

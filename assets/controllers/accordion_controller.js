import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    toggle(event) {
        const button = event.currentTarget;
        const targetId = button.dataset.target;
        const targetElement = document.getElementById(targetId);
        const icon = button.querySelector('svg');

        if (targetElement) {
            const isOpening = targetElement.classList.contains('hidden');

            targetElement.classList.toggle('hidden');
            icon.classList.toggle('rotate-90');

            // If this is a brand accordion and it's being opened, scroll it into view.
            if (isOpening && targetId.startsWith('brand-children-')) {
                // Find the parent <section> that the controller is attached to
                const parentSection = this.element;
                parentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
}

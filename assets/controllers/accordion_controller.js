import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    toggle(event) {
        const button = event.currentTarget;
        const targetId = button.dataset.target;
        const targetElement = document.getElementById(targetId);
        const icon = button.querySelector('svg');

        if (targetElement) {
            targetElement.classList.toggle('hidden');
            icon.classList.toggle('rotate-90');
        }
    }
}

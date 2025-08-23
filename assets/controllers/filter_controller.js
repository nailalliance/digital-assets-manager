import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    toggle(event) {
        const parentElement = event.currentTarget;
        const childrenContainer = parentElement.nextElementSibling;
        const icon = parentElement.querySelector('svg');

        if (childrenContainer && childrenContainer.classList.contains('sub-brands')) {
            childrenContainer.classList.toggle('hidden');
            icon.classList.toggle('rotate-90');
        }
    }
}

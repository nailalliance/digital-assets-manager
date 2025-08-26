import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["nameDisplay", "nameForm", "expirationDisplay", "expirationForm"];

    toggleEdit(event) {
        event.preventDefault();
        this.nameDisplayTarget.classList.add('hidden');
        this.nameFormTarget.classList.remove('hidden');
        this.nameFormTarget.querySelector('input').focus();
    }

    toggleExpirationEdit(event) {
        event.preventDefault();
        this.expirationDisplayTarget.classList.add('hidden');
        this.expirationFormTarget.classList.remove('hidden');
        this.expirationFormTarget.querySelector('input').focus();
    }
}

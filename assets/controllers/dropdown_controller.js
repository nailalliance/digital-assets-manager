import { Controller } from '@hotwired/stimulus';

/**
 * A simple dropdown controller that toggles a menu's visibility.
 * It also closes the menu if the user clicks outside of it.
 */
export default class extends Controller {
    // The "menu" is the element that will be shown or hidden.
    static targets = ["menu"];

    // This method is called when the controller is connected to the DOM.
    connect() {
        // Bind the `this.close` method to the current instance of the controller.
        // This is necessary so that when `close` is called from the window event,
        // `this` correctly refers to the controller instance.
        this.close = this.close.bind(this);
    }

    /**
     * Toggles the visibility of the dropdown menu.
     */
    toggle() {
        this.menuTarget.classList.toggle('hidden');

        // If the menu is now visible, listen for clicks on the window to close it.
        // If it's hidden, stop listening.
        if (!this.menuTarget.classList.contains('hidden')) {
            window.addEventListener('click', this.close);
        } else {
            window.removeEventListener('click', this.close);
        }
    }

    /**
     * Closes the dropdown menu if the click is outside of the controller's element.
     * @param {MouseEvent} event
     */
    close(event) {
        // Check if the click happened inside the dropdown's parent element.
        // The `this.element` refers to the div with `data-controller="dropdown"`.
        if (!this.element.contains(event.target)) {
            this.menuTarget.classList.add('hidden');
            window.removeEventListener('click', this.close);
        }
    }
}

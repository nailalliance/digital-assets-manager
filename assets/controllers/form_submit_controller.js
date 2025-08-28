import { Controller } from '@hotwired/stimulus';

/**
 * Submits the form this controller is attached to.
 */
export default class extends Controller {
    submit() {
        this.element.requestSubmit();
    }
}

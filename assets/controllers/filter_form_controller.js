import { Controller } from '@hotwired/stimulus';

/**
 * This controller automatically submits the form it is attached to
 * whenever an element with a data-action triggers it.
 */
export default class extends Controller {
    submit() {
        this.element.requestSubmit();
    }
}

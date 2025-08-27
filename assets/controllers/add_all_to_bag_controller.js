import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["idsInput"];

    addAll(event) {
        // Find all asset cards within the main content area
        const assetElements = document.querySelectorAll('[data-asset-id]');

        // Extract the ID from each element's dataset
        const assetIds = Array.from(assetElements).map(el => el.dataset.assetId);

        if (assetIds.length > 0) {
            // Join the IDs into a comma-separated string and set the hidden input's value
            this.idsInputTarget.value = assetIds.join(',');
        } else {
            // If no assets are found, prevent the form from submitting
            event.preventDefault();
            alert('There are no assets on the page to add.');
        }
    }
}

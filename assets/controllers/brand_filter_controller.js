import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["brandList"];

    filter(event) {
        const parentId = event.currentTarget.value;
        const checkboxes = this.brandListTarget.querySelectorAll('div.form-check');

        checkboxes.forEach((checkboxDiv) => {
            const input = checkboxDiv.querySelector('input[type="checkbox"]');

            // Show the checkbox if "All" is selected or if its parent ID matches
            if (parentId === "" || input.dataset.parentId === parentId) {
                checkboxDiv.style.display = 'block';
            } else {
                checkboxDiv.style.display = 'none';
            }
        });
    }
}

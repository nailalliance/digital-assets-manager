import { Controller } from '@hotwired/stimulus';

/**
 * Creates a client-side preview of an image selected in a file input.
 */
export default class extends Controller {
    // Define the elements this controller will interact with
    static targets = ["input", "preview"];

    // This action is called when the file input changes
    updatePreview() {
        const file = this.inputTarget.files[0];

        if (file) {
            // Create a temporary URL for the selected file
            const reader = new FileReader();
            reader.onload = (event) => {
                // Set the 'src' of the <img> target to the temporary URL
                this.previewTarget.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
}

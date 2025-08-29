import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["modal", "widthInput", "heightInput", "paddingInput", "extensionInput"];

    openModal() {
        this.modalTarget.classList.remove('hidden');
    }

    closeModal() {
        this.modalTarget.classList.add('hidden');
    }

    generate(event) {
        event.preventDefault();

        const width = this.widthInputTarget.value;
        const height = this.heightInputTarget.value;
        const padding = this.paddingInputTarget.value || 0;
        const extension = this.extensionInputTarget.value;

        if (!width || !height) {
            alert('Please enter both width and height.');
            return;
        }

        // Find all list items that represent an image asset
        const imageAssets = this.element.querySelectorAll('[data-image-asset="true"]');

        imageAssets.forEach(assetElement => {
            const { token, assetId, filename } = assetElement.dataset;
            const permalinkContainer = assetElement.querySelector('.permalink-container');

            // Construct the URL parameters
            let routeParams = {
                token: token,
                assetId: assetId,
                width: width,
                height: height,
                filename: filename.substring(0, filename.lastIndexOf('.')), // Remove original extension
                extension: extension,
            };

            let routeName = 'public_image';
            if (padding > 0) {
                routeName = 'public_image_padded';
                routeParams.padding = padding;
            }

            // This is a simplified way to generate the URL on the client-side.
            // A more robust solution might involve a dedicated JS routing library if your URLs get more complex.
            let url = `/share/${token}/image/${assetId}/${width}x${height}/`;
            if (padding > 0) {
                url += `${padding}/`;
            }
            url += `${routeParams.filename}.${extension}`;


            // Create the permalink button
            const permalinkButton = `
                <a href="${url}" target="_blank" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 mt-2">
                    Permalink
                </a>
            `;

            // Add the button to the container
            permalinkContainer.innerHTML = permalinkButton;
        });

        this.closeModal();
    }
}

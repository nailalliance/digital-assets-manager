import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["modal", "widthInput", "heightInput", "paddingInput", "extensionInput", "csvButtonContainer"];
    static values = {
        baseUrl: String
    }

    // This will store the generated link data for the CSV export
    generatedLinks = [];

    openModal() {
        this.modalTarget.classList.remove('hidden');
    }

    closeModal() {
        this.modalTarget.classList.add('hidden');
    }

    generate(event) {
        event.preventDefault();

        this.generatedLinks = []; // Clear previous links
        const width = this.widthInputTarget.value;
        const height = this.heightInputTarget.value;
        const padding = this.paddingInputTarget.value || 0;
        const extension = this.extensionInputTarget.value;

        if (!width || !height) {
            alert('Please enter both width and height.');
            return;
        }

        const imageAssets = this.element.querySelectorAll('[data-image-asset="true"]');

        imageAssets.forEach(assetElement => {
            const { token, assetId, filename, sku, assetName } = assetElement.dataset;
            const permalinkContainer = assetElement.querySelector('.permalink-container');
            const cleanFilename = filename.substring(0, filename.lastIndexOf('.'));
            const inputId = `permalink-${assetId}-${width}x${height}-${padding}-${extension}`;

            let relativeUrl = `/share/${token}/image/${assetId}/${width}x${height}/`;
            if (padding > 0) {
                relativeUrl += `${padding}/`;
            }
            relativeUrl += `${cleanFilename}.${extension}`;

            const fullUrl = this.baseUrlValue + relativeUrl;

            // Store data for CSV export
            this.generatedLinks.push({
                sku: sku,
                name: assetName,
                webLinkUrl: fullUrl
            });

            const wrapper = document.createElement('div');
            wrapper.className = 'relative flex items-center mt-2';

            const input = document.createElement('input');
            input.type = 'text';
            input.id = inputId;
            input.readOnly = true;
            input.value = fullUrl;
            input.className = 'w-full bg-gray-100 border-gray-300 rounded-md p-2 pr-10 text-xs transition-colors duration-200';

            const copyButton = document.createElement('copy-to-clipboard');
            copyButton.setAttribute('for', inputId);
            copyButton.className = 'absolute inset-y-0 right-0 pr-3 flex items-center';

            const openLink = document.createElement('a');
            openLink.href = fullUrl;
            openLink.target = '_blank';
            openLink.className = 'inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 mt-2';
            openLink.textContent = 'Open Web Link';

            wrapper.append(input, copyButton);
            permalinkContainer.replaceChildren(wrapper, openLink);
        });

        // Show the "Download CSV" button if links were generated
        if (this.generatedLinks.length > 0) {
            this.csvButtonContainerTarget.classList.remove('hidden');
        }

        this.closeModal();
    }

    downloadCsv() {
        if (this.generatedLinks.length === 0) {
            alert('Please generate links first.');
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        // Add headers
        csvContent += "sku,name,webLinkUrl\r\n";

        // Add rows
        this.generatedLinks.forEach(row => {
            const sku = `"${row.sku.replace(/"/g, '""')}"`;
            const name = `"${row.name.replace(/"/g, '""')}"`;
            const url = `"${row.webLinkUrl.replace(/"/g, '""')}"`;
            csvContent += [sku, name, url].join(",") + "\r\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "weblinks.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }
}

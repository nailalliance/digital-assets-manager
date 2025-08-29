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

            const permalinkHtml = `
                <div class="relative flex items-center mt-2">
                    <input type="text" readonly value="${fullUrl}" class="w-full bg-gray-100 border-gray-300 rounded-md p-2 pr-10 text-xs">
                    <button data-action="click->permalink-generator#copyUrl" class="absolute inset-y-0 right-0 pr-3 flex items-center" title="Copy URL">
                        <svg class="h-5 w-5 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </button>
                </div>
                <a href="${fullUrl}" target="_blank" class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 mt-2">
                    Open Web Link
                </a>
            `;

            permalinkContainer.innerHTML = permalinkHtml;
        });

        // Show the "Download CSV" button if links were generated
        if (this.generatedLinks.length > 0) {
            this.csvButtonContainerTarget.classList.remove('hidden');
        }

        this.closeModal();
    }

    copyUrl(event) {
        // ... (copyUrl logic remains the same)
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


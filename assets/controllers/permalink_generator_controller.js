import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["modal", "widthInput", "heightInput", "paddingInput", "extensionInput", "csvButtonContainer", "expiryNotice", "expiryText"];
    static values = {
        baseUrl: String,
        shareEndpoint: String,
        expirationDate: String,
    }

    generatedLinks = [];
    generatedToken = null;
    generatedExpirationDate = null;

    openModal() {
        this.modalTarget.classList.remove('hidden');
    }

    closeModal() {
        this.modalTarget.classList.add('hidden');
    }

    async generate(event) {
        event.preventDefault();

        this.generatedLinks = [];
        const width = this.widthInputTarget.value;
        const height = this.heightInputTarget.value;
        const padding = Number(this.paddingInputTarget.value || 0);
        const extension = this.extensionInputTarget.value;

        if (!width || !height) {
            alert('Please enter both width and height.');
            return;
        }

        const imageAssets = Array.from(this.element.querySelectorAll('[data-image-asset="true"]'));

        if (imageAssets.length === 0) {
            alert('No compatible assets are available for web links.');
            return;
        }

        let shareDetails;

        try {
            shareDetails = await this.resolveShareDetails(imageAssets);
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : 'Could not generate web links.');
            return;
        }

        this.updateExpirationNotice(shareDetails.expirationDate);

        imageAssets.forEach(assetElement => {
            const { assetId, filename, sku, assetName } = assetElement.dataset;
            const token = assetElement.dataset.token || shareDetails.token;
            const permalinkContainer = assetElement.querySelector('.permalink-container');
            const extensionIndex = filename.lastIndexOf('.');
            const cleanFilename = extensionIndex > 0 ? filename.substring(0, extensionIndex) : filename;
            const inputId = `permalink-${assetId}-${width}x${height}-${padding}-${extension}`;

            if (!token || !permalinkContainer) {
                return;
            }

            assetElement.dataset.token = token;

            let relativeUrl = `/share/${token}/image/${assetId}/${width}x${height}/`;
            if (padding > 0) {
                relativeUrl += `${padding}/`;
            }
            relativeUrl += `${cleanFilename}.${extension}`;

            const fullUrl = this.baseUrlValue + relativeUrl;

            this.generatedLinks.push({
                sku: sku || '',
                name: assetName || '',
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
            openLink.rel = 'noopener noreferrer';
            openLink.className = 'inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 mt-2';
            openLink.textContent = 'Open Web Link';

            wrapper.append(input, copyButton);
            permalinkContainer.replaceChildren(wrapper, openLink);
        });

        if (this.generatedLinks.length > 0) {
            this.csvButtonContainerTarget.classList.remove('hidden');
            this.closeModal();
            return;
        }

        alert('No compatible assets are available for web links.');
    }

    downloadCsv() {
        if (this.generatedLinks.length === 0) {
            alert('Please generate links first.');
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        const expirationDate = this.resolveExpirationDate();

        if (expirationDate) {
            csvContent += `"Web links expire on ${expirationDate}"\r\n`;
        }

        csvContent += "sku,name,webLinkUrl\r\n";

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

    async resolveShareDetails(imageAssets) {
        const existingToken = imageAssets.find(assetElement => assetElement.dataset.token)?.dataset.token;
        const existingExpirationDate = this.resolveExpirationDate();

        if (existingToken) {
            return {
                token: existingToken,
                expirationDate: existingExpirationDate,
            };
        }

        if (this.generatedToken) {
            return {
                token: this.generatedToken,
                expirationDate: this.generatedExpirationDate,
            };
        }

        if (!this.hasShareEndpointValue) {
            throw new Error('Could not determine a share token for these assets.');
        }

        const response = await fetch(this.shareEndpointValue, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: new FormData(),
        });

        let data = {};

        try {
            data = await response.json();
        } catch (error) {
            console.error(error);
        }

        if (!response.ok || !data.token) {
            throw new Error(data.error || 'Could not create a share link for these assets.');
        }

        this.generatedToken = data.token;
        this.generatedExpirationDate = data.expirationDate || null;

        imageAssets.forEach(assetElement => {
            assetElement.dataset.token = this.generatedToken;
        });

        return {
            token: this.generatedToken,
            expirationDate: this.generatedExpirationDate,
        };
    }

    resolveExpirationDate() {
        if (this.generatedExpirationDate) {
            return this.generatedExpirationDate;
        }

        if (this.hasExpirationDateValue && this.expirationDateValue) {
            return this.expirationDateValue;
        }

        return null;
    }

    updateExpirationNotice(expirationDate) {
        if (!expirationDate || !this.hasExpiryNoticeTarget || !this.hasExpiryTextTarget) {
            return;
        }

        this.expiryTextTarget.textContent = `Web links expire on ${expirationDate}.`;
        this.expiryNoticeTarget.classList.remove('hidden');
    }
}

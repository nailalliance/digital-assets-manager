import { Controller } from '@hotwired/stimulus';
import debounce from 'debounce';

export default class extends Controller {
    // REMOVED "brandSelector" from targets
    static targets = ["hiddenInput", "resultsContainer", "searchInput"];
    // ADDED brandSelector as a value
    static values = {
        brandSelector: String
    }

    initialize() {
        this.search = debounce(this.search.bind(this), 300);
    }

    connect() {
        this.loadResults();
    }

    toggle(event) {
        const card = event.currentTarget;
        const assetId = card.dataset.assetId;
        card.classList.toggle('ring-2');
        card.classList.toggle('ring-violet-500');

        let selectedIds = this.hiddenInputTarget.value.split(',').filter(id => id !== '');
        if (selectedIds.includes(assetId)) {
            selectedIds = selectedIds.filter(id => id !== assetId);
        } else {
            selectedIds.push(assetId);
        }
        this.hiddenInputTarget.value = selectedIds.join(',');
    }

    async loadResults(url = null) {
        if (!url) {
            // Find the brand selector element using the ID passed as a value
            const brandSelectorElement = document.querySelector(this.brandSelectorValue);
            const brandId = brandSelectorElement ? brandSelectorElement.value : '';
            const query = this.searchInputTarget.value;
            url = `/admin/asset-selector/search?brand_id=${brandId}&q=${query}`;
        }

        const response = await fetch(url);
        this.resultsContainerTarget.innerHTML = await response.text();
    }

    async search() {
        await this.loadResults();
    }

    async changePage(event) {
        event.preventDefault();
        await this.loadResults(event.currentTarget.href);
    }
}

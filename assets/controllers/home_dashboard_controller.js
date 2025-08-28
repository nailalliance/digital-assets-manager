import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["brandButton", "brandsContainer", "recentAssetsContainer", "collectionsContainer", "categoriesContainer"];

    async selectBrand(event) {
        const clickedButton = event.currentTarget;
        const brandId = clickedButton.dataset.brandId;

        // Toggle active button styles
        this.brandButtonTargets.forEach(button => {
            button.classList.remove('bg-violet-600', 'text-white');
            button.classList.add('bg-white', 'text-gray-700');
        });
        clickedButton.classList.add('bg-violet-600', 'text-white');
        clickedButton.classList.remove('bg-white', 'text-gray-700');

        // Show loading state
        this.brandsContainerTarget.innerHTML = '';
        this.recentAssetsContainerTarget.innerHTML = '<p class="text-center">Loading...</p>';
        this.collectionsContainerTarget.innerHTML = '';
        this.categoriesContainerTarget.innerHTML = '';

        // Fetch and render the new content
        const response = await fetch(`/home/brand-content/${brandId}`);
        const data = await response.json();

        this.brandsContainerTarget.innerHTML = data.brands;
        this.recentAssetsContainerTarget.innerHTML = data.recentAssets;
        this.collectionsContainerTarget.innerHTML = data.collections;
        this.categoriesContainerTarget.innerHTML = data.categories;
    }
}

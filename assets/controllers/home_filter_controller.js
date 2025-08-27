import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["brandContainer", "categoryContainer", "collectionContainer"];

    async filter(event) {
        const clickedButton = event.currentTarget;
        const brandId = clickedButton.dataset.brandId;

        // Visually toggle the active state of the buttons
        this.brandContainerTarget.querySelectorAll('button').forEach(button => {
            if (button === clickedButton) {
                button.classList.add('bg-violet-50', 'text-violet-700');
            } else {
                button.classList.remove('bg-violet-50', 'text-violet-700');
            }
        });

        if (!brandId) {
            this.categoryContainerTarget.innerHTML = '';
            this.collectionContainerTarget.innerHTML = '';
            return;
        }

        // Fetch both categories and collections in parallel
        const [categoriesResponse, collectionsResponse] = await Promise.all([
            fetch(`/filters/categories-for-brand/${brandId}`),
            fetch(`/filters/collections-for-brand/${brandId}`)
        ]);

        const categoriesData = await categoriesResponse.json();
        const collectionsData = await collectionsResponse.json();

        this.categoryContainerTarget.innerHTML = categoriesData.content;
        this.collectionContainerTarget.innerHTML = collectionsData.content;
    }
}

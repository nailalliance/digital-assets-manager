import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["input", "item"];

    filter() {
        const query = this.inputTarget.value.toLowerCase();
        this.itemTargets.forEach(item => {
            const label = item.querySelector('label').textContent.toLowerCase();
            if (label.includes(query)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
}

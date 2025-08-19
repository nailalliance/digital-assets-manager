import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["input", "container"];

    connect() {
        this.containerTarget.addEventListener('click', () => {
            this.inputTarget.focus();
        });
        this.renderTags();
    }

    renderTags() {
        // Clear existing tags except for the input itself
        this.containerTarget.querySelectorAll('.tag-item').forEach(el => el.remove());

        const values = this.inputTarget.value
            .split(',')
            .map(v => v.trim())
            .filter(v => v !== '');

        values.forEach(value => {
            this.containerTarget.insertBefore(this.createTagElement(value), this.inputTarget);
        });
    }

    createTagElement(value) {
        const tag = document.createElement('span');
        tag.setAttribute('class', 'tag-item flex items-center bg-violet-100 text-violet-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full');
        tag.textContent = value;

        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'ml-2 text-violet-600 hover:text-violet-800');
        removeBtn.innerHTML = '&times;';
        removeBtn.type = 'button'; // Prevent form submission
        removeBtn.addEventListener('click', (e) => this.removeTag(e));

        tag.appendChild(removeBtn);
        return tag;
    }

    removeTag(event) {
        const tagText = event.currentTarget.parentElement.firstChild.textContent.trim();
        const currentValues = this.inputTarget.value.split(',').map(v => v.trim());
        const newValues = currentValues.filter(v => v !== tagText);

        this.inputTarget.value = newValues.join(', ');
        this.renderTags();
    }

    handleInput(event) {
        if (event.key === ',' || event.key === 'Enter') {
            event.preventDefault();
            this.renderTags();
        }
    }
}

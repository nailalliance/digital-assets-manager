import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["brand"];

    updateAssets() {
        const brandId = this.brandTarget.value;
        const targetFrame = document.getElementById('assets-field-frame');

        if (targetFrame) {
            // By setting the `src`, Turbo will automatically fetch the new content
            // and replace the frame's content, re-initializing any Stimulus components inside.
            targetFrame.src = `/admin/social-media/posts/assets-for-brand?brand=${brandId}`;
        }
    }
}

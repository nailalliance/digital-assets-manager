import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["addToBagForm"];

    async submitForm(event) {
        event.preventDefault();
        const addButton = event.currentTarget.querySelector("button");
        const headerDownloadBagLink = document.getElementById("header-download-bag-link");

        const formData = new FormData(event.currentTarget)

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: formData
        })

        if (response.status === 200)
        {
            const responseData = await response.json();
            let headerDownloadBagCounter = headerDownloadBagLink.querySelector('span')
            if (headerDownloadBagCounter !== null)
            {
                headerDownloadBagCounter = headerDownloadBagLink.querySelector('span');
                headerDownloadBagCounter.innerText = responseData.downloadCount;
            } else {
                headerDownloadBagCounter = document.createElement('span');
                headerDownloadBagCounter.classList.add('absolute', '-top-2', '-right-4', 'inline-flex', 'items-center', 'justify-center', 'px-2', 'py-1', 'text-xs', 'font-bold', 'leading-none', 'text-red-100', 'bg-red-600', 'rounded-full');
                headerDownloadBagCounter.innerText = responseData.downloadCount;
                headerDownloadBagLink.appendChild(headerDownloadBagCounter)
            }
            addButton.innerHTML = `<svg fill="#000000" class="h-6 w-6" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="M1827.701 303.065 698.835 1431.801 92.299 825.266 0 917.564 698.835 1616.4 1919.869 395.234z" fill-rule="evenodd"/>
            </svg>`
        }
    }
}

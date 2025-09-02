import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';

export default class extends Controller {
    static targets = ["canvas", "assetSearch", "assetList", "saveBtn"];

    connect() {
        this.boardItems = [];
        this.assetSearchTarget.addEventListener('input', this.searchAssets.bind(this));
        this.initDragAndDrop();
        this.loadBoardState();
    }

    searchAssets(event) {
        const query = event.target.value;

        if (query.length < 2) {
            this.assetListTarget.innerHTML = '';
            return;
        }

        fetch(`/boards/assets/search?q=${query}`)
            .then(response => response.json())
            .then(assets => {
                this.assetListTarget.innerHTML = '';
                assets.forEach(asset => {
                    const assetElement = this.createAssetElement(asset);
                    this.assetListTarget.appendChild(assetElement);
                });
            });
    }

    createAssetElement(asset) {
        const assetElement = document.createElement('div');
        assetElement.classList.add('p-2', 'border-b', 'cursor-move', 'asset-item', 'flex', 'items-center');
        assetElement.dataset.assetId = asset.id;
        assetElement.dataset.assetName = asset.name;
        assetElement.dataset.assetThumbnail = asset.thumbnail_path;
        assetElement.innerHTML = `
            <img src="${asset.thumbnail_path}" alt="${asset.name}" class="w-12 h-12 object-cover inline-block mr-3 pointer-events-none">
            <span class="text-sm pointer-events-none">${asset.name}</span>
        `;
        return assetElement;
    }

    initDragAndDrop() {
        // Make assets in the panel draggable
        interact('#asset-list .asset-item').draggable({
            inertia: true,
            listeners: {
                start: (event) => {
                    // Create a clone of the dragged element
                    const original = event.target;
                    const clone = original.cloneNode(true);
                    clone.classList.add('dragging-clone');
                    document.body.appendChild(clone);

                    // Store clone and position info in the event
                    event.interaction.clone = clone;
                    const rect = original.getBoundingClientRect();
                    clone.style.left = `${rect.left}px`;
                    clone.style.top = `${rect.top}px`;
                },
                move: (event) => {
                    const clone = event.interaction.clone;
                    const x = (parseFloat(clone.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(clone.getAttribute('data-y')) || 0) + event.dy;

                    clone.style.transform = `translate(${x}px, ${y}px)`;
                    clone.setAttribute('data-x', x);
                    clone.setAttribute('data-y', y);
                },
                end: (event) => {
                    event.interaction.clone.remove();
                }
            }
        });

        // Make the canvas a dropzone
        interact(this.canvasTarget).dropzone({
            accept: '.asset-item',
            ondrop: (event) => {
                const droppedElement = event.relatedTarget;
                const canvasRect = this.canvasTarget.getBoundingClientRect();

                // Calculate position relative to the canvas
                const dropX = event.client.x - canvasRect.left;
                const dropY = event.client.y - canvasRect.top;

                const assetId = droppedElement.dataset.assetId;
                const assetThumbnail = droppedElement.dataset.assetThumbnail;

                this.addAssetToBoard(assetId, assetThumbnail, dropX, dropY);
            }
        });
    }

    addAssetToBoard(assetId, thumbnailUrl, x, y) {
        const boardItem = document.createElement('div');
        boardItem.classList.add('board-item', 'absolute', 'p-1', 'bg-white', 'shadow-lg');
        boardItem.style.left = `${x}px`;
        boardItem.style.top = `${y}px`;

        boardItem.innerHTML = `<img src="${thumbnailUrl}" class="w-full h-full object-contain pointer-events-none">`;

        this.canvasTarget.appendChild(boardItem);

        // Add to our internal state
        this.boardItems.push({
            type: 'asset',
            assetId: assetId,
            x: x,
            y: y,
            width: 200, // Default size
            height: 200 // Default size
        });

        console.log('Board state updated:', this.boardItems);
    }

    loadBoardState() {
        // We will implement this later
    }

    saveBoardState() {
        // We will implement this later
        console.log("Saving board state...");
    }
}

import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';
import { v4 as uuidv4 } from "uuid";

export default class extends Controller {
    static targets = ["canvas", "assetSearch", "assetList", "saveBtn"];
    static values = { boardId: Number };

    connect() {
        this.boardItems = new Map();
        this.assetSearchTarget.addEventListener('input', this.searchAssets.bind(this));
        this.saveBtnTarget.addEventListener('click', this.saveBoardState.bind(this));
        this.initDragAndDrop();
        this.loadBoardState();

        this.autoSaveInterval = setInterval(() => this.saveBoardState(true), 30_000);
    }

    disconnect() {
        clearInterval(this.autoSaveInterval);
        super.disconnect();
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
                const dropX = event.dragEvent.client.x - canvasRect.left;
                const dropY = event.dragEvent.client.y - canvasRect.top;

                const assetId = droppedElement.dataset.assetId;
                const assetThumbnail = droppedElement.dataset.assetThumbnail;

                this.addAssetToBoard(assetId, assetThumbnail, dropX, dropY);
            }
        });

        interact('.board-item').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            listeners: {
                move: (event) => {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `transform(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end: (event) => {
                    const target = event.target;
                    const itemId = target.dataset.itemId;
                    const item = this.boardItems.get(itemId);
                    if (item) {
                        item.x = parseFloat(target.getAttribute('data-x'));
                        item.y = parseFloat(target.getAttribute('data-y'));
                    }
                }
            }
        }).resizable({
            edges: {
                left: true,
                right: true,
                bottom: true,
                top: true,
            },
            listeners: {
                move: (event) => {
                    const target = event.target;
                    let x = parseFloat(target.getAttribute('data-x')) || 0;
                    let y = parseFloat(target.getAttribute('data-y')) || 0;

                    target.style.width = `${event.rect.width}px`;
                    target.style.height = `${event.rect.height}px`;

                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.style.transform = `translate(${x}px, ${y})`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end: (event) => {
                    const target = event.target;
                    const itemId = target.dataset.itemId;
                    const item = this.boardItems.get(itemId);
                    if (item) {
                        item.width = event.rect.width;
                        item.height = event.rect.height;
                        item.x = parseFloat(target.getAttribute('data-x'));
                        item.y = parseFloat(target.getAttribute('data-y'));
                    }
                }
            }
        });
    }

    addAssetToBoard(assetId, thumbnailUrl, x, y, width = 200, height = 200, itemId = null) {
        if (!itemId) {
            itemId = `item-${uuidv4()}`;
        }

        const boardItemEl = document.createElement('div');
        boardItemEl.classList.add('board-item', 'absolute', 'p-1', 'bg-white', 'shadow-lg', 'box-border');
        boardItemEl.style.left = `0px`; // Use transform for positioning
        boardItemEl.style.top = `0px`;
        boardItemEl.style.width = `${width}px`;
        boardItemEl.style.height = `${height}px`;
        boardItemEl.style.transform = `translate(${x}px, ${y}px)`;

        boardItemEl.dataset.itemId = itemId;
        boardItemEl.setAttribute('data-x', x);
        boardItemEl.setAttribute('data-y', y);

        boardItemEl.innerHTML = `<img src="${thumbnailUrl}" class="w-full h-full object-contain pointer-events-none">`;

        this.canvasTarget.appendChild(boardItemEl);

        const newItem = {
            id: itemId,
            type: 'asset',
            content: { assetId: assetId, thumbnailUrl: thumbnailUrl },
            x: x,
            y: y,
            width: width,
            height: height
        };

        this.boardItems.set(itemId, newItem);
    }

    async loadBoardState() {
        const response = await fetch(`/boards/${this.boardIdValue}/items`);
        const items = await response.json();

        items.forEach(item => {
            if (item.type === 'asset') {
                this.addAssetToBoard(item.content.assetId, item.content.thumbnailUrl, item.pos_x, item.pos_y, item.width, item.height, item.id);
            }
        });

        // Re-initialize interactjs for the loaded items
        this.initDragAndDrop();
    }

    async saveBoardState(isAutoSave = false) {
        if (!isAutoSave) {
            this.saveBtnTarget.textContent = 'Saving...';
            this.saveBtnTarget.disabled = true;
        }

        const payload = Array.from(this.boardItems.values());

        try {
            const response = await fetch(`/boards/${this.boardIdValue}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ items: payload })
            });

            if (!response.ok) {
                throw new Error('Failed to save board');
            }

            if (!isAutoSave) {
                setTimeout(() => {
                    this.saveBtnTarget.textContent = 'Save';
                    this.saveBtnTarget.disabled = false;
                }, 1000);
            }
        } catch (error) {
            console.error('Save error:', error);
            if (!isAutoSave) {
                this.saveBtnTarget.textContent = 'Save Failed';
            }
        }
    }
}

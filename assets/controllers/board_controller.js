import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';
import { v4 as uuidv4 } from 'uuid';

export default class extends Controller {
    static targets = ["canvas", "assetSearch", "assetList", "saveBtn"];
    static values = { boardId: Number };

    connect() {
        this.boardItems = new Map();
        this.assetSearchTarget.addEventListener('input', this.searchAssets.bind(this));
        this.saveBtnTarget.addEventListener('click', () => this.saveBoardState(false));

        this.initAssetPanelAndDropzone();
        this.loadBoardState();

        this.autoSaveInterval = setInterval(() => this.saveBoardState(true), 30000);
    }

    disconnect() {
        clearInterval(this.autoSaveInterval);
    }

    // ... (searchAssets and createAssetElement methods are unchanged)
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


    initAssetPanelAndDropzone() {
        interact('#asset-list .asset-item').draggable({
            inertia: true,
            listeners: {
                start: (event) => {
                    const original = event.target;
                    const clone = original.cloneNode(true);
                    clone.classList.add('dragging-clone');
                    document.body.appendChild(clone);
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

        interact(this.canvasTarget).dropzone({
            accept: '.asset-item',
            ondrop: (event) => {
                const droppedElement = event.relatedTarget;
                const canvasRect = this.canvasTarget.getBoundingClientRect();
                const dropX = event.dragEvent.client.x - canvasRect.left;
                const dropY = event.dragEvent.client.y - canvasRect.top;
                const assetId = droppedElement.dataset.assetId;
                const assetThumbnail = droppedElement.dataset.assetThumbnail;
                this.addAssetToBoard(assetId, assetThumbnail, dropX, dropY);
            }
        });
    }

    makeItemInteractive(element) {
        const interactive = interact(element);
        interactive.draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({ restriction: 'parent', endOnly: true })
            ],
            listeners: { move: this.dragMoveListener }
        });
        interactive.resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: { move: this.resizeMoveListener }
        });
        interactive.on('dragend resizeend', (event) => {
            const target = event.target;
            const itemId = target.dataset.itemId;
            const item = this.boardItems.get(itemId);
            if (item) {
                item.x = parseFloat(target.getAttribute('data-x'));
                item.y = parseFloat(target.getAttribute('data-y'));
                item.width = parseFloat(target.style.width);
                item.height = parseFloat(target.style.height);
            }
        });
    }

    dragMoveListener(event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    resizeMoveListener(event) {
        const target = event.target;
        let x = parseFloat(target.getAttribute('data-x')) || 0;
        let y = parseFloat(target.getAttribute('data-y')) || 0;
        target.style.width = `${event.rect.width}px`;
        target.style.height = `${event.rect.height}px`;
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    addAssetToBoard(assetId, thumbnailUrl, x, y, width = 200, height = 200, itemId = null) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const boardItemEl = document.createElement('div');
        boardItemEl.classList.add('board-item', 'absolute', 'p-1', 'bg-white', 'shadow-lg', 'box-border');
        boardItemEl.style.left = '0px';
        boardItemEl.style.top = '0px';
        boardItemEl.style.width = `${width}px`;
        boardItemEl.style.height = `${height}px`;
        boardItemEl.style.transform = `translate(${x}px, ${y}px)`;
        boardItemEl.dataset.itemId = finalItemId;
        boardItemEl.setAttribute('data-x', x);
        boardItemEl.setAttribute('data-y', y);
        boardItemEl.innerHTML = `<img src="${thumbnailUrl}" class="w-full h-full object-contain pointer-events-none">`;
        this.canvasTarget.appendChild(boardItemEl);
        this.makeItemInteractive(boardItemEl);
        const newItem = {
            id: finalItemId,
            type: 'asset',
            content: { assetId: assetId, thumbnailUrl: thumbnailUrl },
            x: x, y: y, width: width, height: height
        };
        this.boardItems.set(finalItemId, newItem);
    }

    async loadBoardState() {
        const response = await fetch(`/boards/${this.boardIdValue}/items`);
        const items = await response.json();
        this._syncStateFromServer(items);
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
            if (!response.ok) throw new Error('Failed to save board');

            const serverState = await response.json();
            this._syncStateFromServer(serverState); // Always sync after any save.

            if (!isAutoSave) {
                this.saveBtnTarget.textContent = 'Saved!';
                setTimeout(() => {
                    this.saveBtnTarget.textContent = 'Save';
                    this.saveBtnTarget.disabled = false;
                }, 1500);
            }
        } catch (error) {
            console.error('Save error:', error);
            if (!isAutoSave) {
                this.saveBtnTarget.textContent = 'Save Failed';
                setTimeout(() => {
                    this.saveBtnTarget.textContent = 'Save';
                    this.saveBtnTarget.disabled = false;
                }, 2000);
            }
        }
    }

    _syncStateFromServer(serverItems) {
        const serverItemIds = new Set();

        // Update local state and DOM elements based on server response
        serverItems.forEach(serverItem => {
            const serverId = String(serverItem.id);
            serverItemIds.add(serverId);
            let localItem = null;
            let domElement = null;

            if (serverItem.tempId && this.boardItems.has(serverItem.tempId)) {
                // This is a new item that was just saved. Update its ID.
                localItem = this.boardItems.get(serverItem.tempId);
                domElement = this.canvasTarget.querySelector(`[data-item-id="${serverItem.tempId}"]`);

                this.boardItems.delete(serverItem.tempId);
                localItem.id = serverId;
                this.boardItems.set(serverId, localItem);

                if (domElement) domElement.dataset.itemId = serverId;

            } else {
                // This is an existing item.
                localItem = this.boardItems.get(serverId);
            }

            // If item doesn't exist locally, it's new from another session/user. Add it.
            if (!localItem) {
                if (serverItem.type === 'asset') {
                    this.addAssetToBoard(serverItem.content.assetId, serverItem.content.thumbnailUrl, serverItem.pos_x, serverItem.pos_y, serverItem.width, serverItem.height, serverItem.id);
                }
            }
        });

        // Remove local items that are no longer on the server
        for (const localId of this.boardItems.keys()) {
            if (!serverItemIds.has(localId)) {
                this.boardItems.delete(localId);
                const domElement = this.canvasTarget.querySelector(`[data-item-id="${localId}"]`);
                if (domElement) domElement.remove();
            }
        }
    }
}


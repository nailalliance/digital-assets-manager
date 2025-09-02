import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';
import { v4 as uuidv4 } from 'uuid';

export default class extends Controller {
    static targets = ["canvas", "svgCanvas", "viewport", "assetSearch", "assetList", "saveBtn"];
    static values = { boardId: Number };

    connect() {
        this.boardItems = new Map();
        this.activeTool = 'select'; // select, text, group, line
        this.pan = { x: 0, y: 0 };
        this.zoom = 1;

        // Panning state
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };

        this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.element.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.viewportTarget.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.viewportTarget.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.viewportTarget.addEventListener('mouseup', this.handleMouseUp.bind(this));

        this.assetSearchTarget.addEventListener('input', this.searchAssets.bind(this));
        this.saveBtnTarget.addEventListener('click', () => this.saveBoardState(false));

        this.initAssetPanelAndDropzone();
        this.loadBoardState();
        this.updateCanvasTransform();

        this.autoSaveInterval = setInterval(() => this.saveBoardState(true), 30000);
    }

    disconnect() {
        clearInterval(this.autoSaveInterval);
    }

    // --- Tool Selection & Canvas Interaction --- //

    activateTool(event) {
        this.activeTool = event.currentTarget.dataset.tool;
        document.querySelectorAll('.board-tool').forEach(el => el.classList.remove('active'));
        event.currentTarget.classList.add('active');
        this.canvasTarget.style.cursor = this.activeTool === 'select' ? 'default' : 'crosshair';
    }

    handleKeyDown(event) {
        if (event.code === 'Space' && !this.isPanning) {
            event.preventDefault();
            this.isPanning = true;
            this.viewportTarget.style.cursor = 'grabbing';
        }
    }

    handleKeyUp(event) {
        if (event.code === 'Space') {
            this.isPanning = false;
            this.viewportTarget.style.cursor = 'default';
        }
    }

    handleMouseDown(event) {
        if (this.isPanning) {
            this.panStart = { x: event.clientX, y: event.clientY };
        } else if (this.activeTool !== 'select' && event.target === this.viewportTarget) {
            const pos = this.getCanvasCoordinates(event.clientX, event.clientY);
            // Logic for drawing new shapes will go here
        }
    }

    handleMouseMove(event) {
        if (this.isPanning) {
            this.pan.x += event.clientX - this.panStart.x;
            this.pan.y += event.clientY - this.panStart.y;
            this.panStart = { x: event.clientX, y: event.clientY };
            this.updateCanvasTransform();
        }
    }

    handleMouseUp(event) {
        if (this.activeTool === 'text' && event.target === this.viewportTarget) {
            const pos = this.getCanvasCoordinates(event.clientX, event.clientY);
            this.addTextItemToBoard(pos.x, pos.y);
        } else if (this.activeTool === 'group' && event.target === this.viewportTarget) {
            const pos = this.getCanvasCoordinates(event.clientX, event.clientY);
            this.addGroupItemToBoard(pos.x, pos.y);
        }
    }

    getCanvasCoordinates(clientX, clientY) {
        const viewportRect = this.viewportTarget.getBoundingClientRect();
        const x = (clientX - viewportRect.left - this.pan.x) / this.zoom;
        const y = (clientY - viewportRect.top - this.pan.y) / this.zoom;
        return { x, y };
    }

    // --- Pan & Zoom --- //

    handleZoom(event) {
        event.preventDefault();
        const scaleAmount = event.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.max(0.1, Math.min(3, this.zoom + scaleAmount));

        // Adjust pan to keep the zoom centered on the cursor
        const viewportRect = this.viewportTarget.getBoundingClientRect();
        const cursorX = event.clientX - viewportRect.left;
        const cursorY = event.clientY - viewportRect.top;

        this.pan.x = cursorX - ((cursorX - this.pan.x) / this.zoom) * newZoom;
        this.pan.y = cursorY - ((cursorY - this.pan.y) / this.zoom) * newZoom;

        this.zoom = newZoom;
        this.updateCanvasTransform();
    }

    zoomIn() {
        this.zoom = Math.min(3, this.zoom + 0.2);
        this.updateCanvasTransform();
    }

    zoomOut() {
        this.zoom = Math.max(0.1, this.zoom - 0.2);
        this.updateCanvasTransform();
    }

    updateCanvasTransform() {
        const transform = `translate(${this.pan.x}px, ${this.pan.y}px) scale(${this.zoom})`;
        this.canvasTarget.style.transform = transform;
        this.svgCanvasTarget.style.transform = transform;
    }

    // --- Item Creation & Interaction --- //

    makeItemInteractive(element) {
        const interactive = interact(element);

        interactive.draggable({
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
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + (event.dx / this.zoom);
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + (event.dy / this.zoom);
                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            }
        });

        interactive.resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                move: (event) => {
                    const target = event.target;
                    let x = parseFloat(target.getAttribute('data-x')) || 0;
                    let y = parseFloat(target.getAttribute('data-y')) || 0;

                    const newWidth = event.rect.width / this.zoom;
                    const newHeight = event.rect.height / this.zoom;

                    target.style.width = `${newWidth}px`;
                    target.style.height = `${newHeight}px`;

                    x += event.deltaRect.left / this.zoom;
                    y += event.deltaRect.top / this.zoom;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            }
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

    addTextItemToBoard(x, y, width = 200, height = 50, itemId = null, content = { text: 'Type here...' }) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const textEl = document.createElement('div');
        textEl.classList.add('board-item', 'board-item-text', 'absolute');
        textEl.style.left = '0px';
        textEl.style.top = '0px';
        textEl.style.width = `${width}px`;
        textEl.style.height = `${height}px`;
        textEl.style.transform = `translate(${x}px, ${y}px)`;
        textEl.dataset.itemId = finalItemId;
        textEl.setAttribute('data-x', x);
        textEl.setAttribute('data-y', y);
        textEl.setAttribute('contenteditable', 'true');
        textEl.innerText = content.text;

        textEl.addEventListener('focusout', () => {
            const item = this.boardItems.get(finalItemId);
            if (item) item.content.text = textEl.innerText;
        });

        this.canvasTarget.appendChild(textEl);
        this.makeItemInteractive(textEl);

        const newItem = { id: finalItemId, type: 'text', content, x, y, width, height };
        this.boardItems.set(finalItemId, newItem);
    }

    addGroupItemToBoard(x, y, width = 300, height = 250, itemId = null, content = {}) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const groupEl = document.createElement('div');
        groupEl.classList.add('board-item', 'board-item-group', 'absolute');
        groupEl.style.left = '0px';
        groupEl.style.top = '0px';
        groupEl.style.width = `${width}px`;
        groupEl.style.height = `${height}px`;
        groupEl.style.transform = `translate(${x}px, ${y}px)`;
        groupEl.dataset.itemId = finalItemId;
        groupEl.setAttribute('data-x', x);
        groupEl.setAttribute('data-y', y);

        this.canvasTarget.appendChild(groupEl);
        this.makeItemInteractive(groupEl);

        const newItem = { id: finalItemId, type: 'group', content, x, y, width, height };
        this.boardItems.set(finalItemId, newItem);
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
            x: x,
            y: y,
            width: width,
            height: height
        };
        this.boardItems.set(finalItemId, newItem);
    }

    // --- State Management --- //

    async loadBoardState() {
        const response = await fetch(`/boards/${this.boardIdValue}/items`);
        const items = await response.json();

        this.canvasTarget.innerHTML = '';
        this.boardItems.clear();

        items.forEach(item => {
            if (item.type === 'asset') {
                this.addAssetToBoard(item.content.assetId, item.content.thumbnailUrl, item.pos_x, item.pos_y, item.width, item.height, item.id);
            } else if (item.type === 'text') {
                this.addTextItemToBoard(item.pos_x, item.pos_y, item.width, item.height, item.id, item.content);
            } else if (item.type === 'group') {
                this.addGroupItemToBoard(item.pos_x, item.pos_y, item.width, item.height, item.id, item.content);
            }
        });
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

            const serverItems = await response.json();
            this._syncStateFromServer(serverItems);

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
        serverItems.forEach(serverItem => {
            const serverId = String(serverItem.id);
            serverItemIds.add(serverId);
            let localItem = null;

            if (serverItem.tempId && this.boardItems.has(serverItem.tempId)) {
                localItem = this.boardItems.get(serverItem.tempId);
                const domElement = this.canvasTarget.querySelector(`[data-item-id="${serverItem.tempId}"]`);
                this.boardItems.delete(serverItem.tempId);
                localItem.id = serverId;
                this.boardItems.set(serverId, localItem);
                if (domElement) domElement.dataset.itemId = serverId;
            } else {
                localItem = this.boardItems.get(serverId);
            }

            if (!localItem) {
                if (serverItem.type === 'asset') {
                    this.addAssetToBoard(serverItem.content.assetId, serverItem.content.thumbnailUrl, serverItem.pos_x, serverItem.pos_y, serverItem.width, serverItem.height, serverItem.id);
                } else if (serverItem.type === 'text') {
                    this.addTextItemToBoard(serverItem.pos_x, serverItem.pos_y, serverItem.width, serverItem.height, serverItem.id, serverItem.content);
                } else if (serverItem.type === 'group') {
                    this.addGroupItemToBoard(serverItem.pos_x, serverItem.pos_y, serverItem.width, serverItem.height, serverItem.id, serverItem.content);
                }
            }
        });

        for (const localId of this.boardItems.keys()) {
            if (!serverItemIds.has(localId)) {
                this.boardItems.delete(localId);
                const domElement = this.canvasTarget.querySelector(`[data-item-id="${localId}"]`);
                if (domElement) domElement.remove();
            }
        }
    }

    async searchAssets(event) {
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

                // We need to calculate the drop position relative to the viewport first, then convert to canvas coordinates
                const dropX_viewport = event.dragEvent.client.x - canvasRect.left;
                const dropY_viewport = event.dragEvent.client.y - canvasRect.top;

                const dropX_canvas = (dropX_viewport - this.pan.x) / this.zoom;
                const dropY_canvas = (dropY_viewport - this.pan.y) / this.zoom;

                const assetId = droppedElement.dataset.assetId;
                const assetThumbnail = droppedElement.dataset.assetThumbnail;
                this.addAssetToBoard(assetId, assetThumbnail, dropX_canvas, dropY_canvas);
            }
        });
    }
}


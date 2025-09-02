import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';
import { v4 as uuidv4 } from 'uuid';

export default class extends Controller {
    static targets = ["canvas", "svgCanvas", "viewport", "assetSearch", "assetList", "saveBtn", "zoomValue"];
    static values = { boardId: Number };

    connect() {
        this.boardItems = new Map();
        this.activeTool = 'select';
        this.pan = { x: 0, y: 0 };
        this.zoom = 1;
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        this.isSaving = false; // Add save lock flag

        this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.element.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.viewportTarget.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.viewportTarget.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.viewportTarget.addEventListener('mouseup', this.handleMouseUp.bind(this));

        this.assetSearchTarget.addEventListener('input', this.searchAssets.bind(this));
        this.saveBtnTarget.addEventListener('click', () => this.saveBoardState(false));

        this.initAssetPanelAndDropzone();
        this.loadBoardState();

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
        if (this.isPanning || (event.button === 1)) { // Middle mouse button
            this.isPanning = true;
            this.viewportTarget.style.cursor = 'grabbing';
            this.panStart = { x: event.clientX, y: event.clientY };
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
        if (this.isPanning) {
            this.isPanning = false;
            this.viewportTarget.style.cursor = 'default';
        }
        else if (this.activeTool === 'text' && event.target === this.viewportTarget) {
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
        if (this.hasZoomValueTarget) {
            this.zoomValueTarget.textContent = `${Math.round(this.zoom * 100)}%`;
        }
    }

    frameContent() {
        if (this.boardItems.size === 0) {
            this.pan = { x: this.viewportTarget.clientWidth / 2, y: this.viewportTarget.clientHeight / 2 };
            this.zoom = 1;
            this.updateCanvasTransform();
            return;
        }

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        this.boardItems.forEach(item => {
            minX = Math.min(minX, item.x);
            minY = Math.min(minY, item.y);
            maxX = Math.max(maxX, item.x + item.width);
            maxY = Math.max(maxY, item.y + item.height);
        });

        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;
        const viewportWidth = this.viewportTarget.clientWidth;
        const viewportHeight = this.viewportTarget.clientHeight;

        const padding = 100; // 100px padding around the content

        const xZoom = viewportWidth / (contentWidth + padding * 2);
        const yZoom = viewportHeight / (contentHeight + padding * 2);

        this.zoom = Math.min(xZoom, yZoom, 1); // Cap initial zoom at 100%

        const contentCenterX = minX + contentWidth / 2;
        const contentCenterY = minY + contentHeight / 2;

        this.pan.x = (viewportWidth / 2) - (contentCenterX * this.zoom);
        this.pan.y = (viewportHeight / 2) - (contentCenterY * this.zoom);

        this.updateCanvasTransform();
    }

    // --- Item Creation & Interaction --- //

    makeItemInteractive(element) {
        interact(element).draggable({
            inertia: true,
            listeners: {
                start: (event) => {
                    const target = event.target;
                    event.interaction.startPos = {
                        x: parseFloat(target.getAttribute('data-x')) || 0,
                        y: parseFloat(target.getAttribute('data-y')) || 0,
                    };
                },
                move: (event) => {
                    const target = event.target;
                    const startPos = event.interaction.startPos;
                    const newX = startPos.x + (event.pageX - event.x0) / this.zoom;
                    const newY = startPos.y + (event.pageY - event.y0) / this.zoom;
                    target.style.transform = `translate(${newX}px, ${newY}px)`;
                    target.setAttribute('data-x', newX);
                    target.setAttribute('data-y', newY);
                },
            }
        }).resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                move: (event) => {
                    const target = event.target;
                    let x = parseFloat(target.getAttribute('data-x')) || 0;
                    let y = parseFloat(target.getAttribute('data-y')) || 0;
                    target.style.width = `${event.rect.width / this.zoom}px`;
                    target.style.height = `${event.rect.height / this.zoom}px`;
                    x += event.deltaRect.left / this.zoom;
                    y += event.deltaRect.top / this.zoom;
                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            }
        }).on('dragend resizeend', (event) => {
            const target = event.target;
            const itemId = target.dataset.itemId;
            const item = this.boardItems.get(itemId);
            if (item) {
                item.x = parseFloat(target.getAttribute('data-x'));
                item.y = parseFloat(target.getAttribute('data-y'));
                item.width = parseFloat(target.style.width);
                item.height = parseFloat(target.style.height);
            }
            if (event.interaction) event.interaction.startPos = null;
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
        try {
            const response = await fetch(`/boards/${this.boardIdValue}/items`);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const items = await response.json();

            this.canvasTarget.innerHTML = '';
            this.boardItems.clear();

            items.forEach(item => {
                try {
                    if (item.type === 'asset') {
                        this.addAssetToBoard(item.content.assetId, item.content.thumbnailUrl, item.pos_x, item.pos_y, item.width, item.height, item.id);
                    } else if (item.type === 'text') {
                        this.addTextItemToBoard(item.pos_x, item.pos_y, item.width, item.height, item.id, item.content);
                    } else if (item.type === 'group') {
                        this.addGroupItemToBoard(item.pos_x, item.pos_y, item.width, item.height, item.id, item.content);
                    }
                } catch(e) { console.error('Failed to render a board item:', { item, error: e }); }
            });

            this.frameContent(); // Automatically frame content after loading

        } catch (error) {
            console.error("Fatal error loading board state:", error);
            this.canvasTarget.innerHTML = `<div class="p-4 text-red-600 bg-red-100 border border-red-400 rounded">Could not load board. See developer console for details.</div>`;
        }
    }

    async saveBoardState(isAutoSave = false) {
        if (this.isSaving) {
            console.log("Save operation already in progress. Skipping.");
            return;
        }
        this.isSaving = true;

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
        } finally {
            this.isSaving = false;
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

        interact(this.viewportTarget).dropzone({
            accept: '.asset-item',
            ondrop: (event) => {
                const droppedElement = event.relatedTarget;
                const viewportRect = this.viewportTarget.getBoundingClientRect();

                const dropX_viewport = event.dragEvent.client.x - viewportRect.left;
                const dropY_viewport = event.dragEvent.client.y - viewportRect.top;

                const dropX_canvas = (dropX_viewport - this.pan.x) / this.zoom;
                const dropY_canvas = (dropY_viewport - this.pan.y) / this.zoom;

                const assetId = droppedElement.dataset.assetId;
                const assetThumbnail = droppedElement.dataset.assetThumbnail;
                this.addAssetToBoard(assetId, assetThumbnail, dropX_canvas, dropY_canvas);
            }
        });
    }
}


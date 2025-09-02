import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';
import { v4 as uuidv4 } from 'uuid';

export default class extends Controller {
    static targets = ["canvas", "svgCanvas", "viewport", "assetSearch", "assetList", "saveBtn", "zoomValue", "contextToolbar"];
    static values = { boardId: Number };

    connect() {
        this.boardItems = new Map();
        this.activeTool = 'select';
        this.pan = { x: 0, y: 0 };
        this.zoom = 1;
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        this.isSaving = false;
        this.selectedItemId = null;
        this.zCounter = 0; // Tracks the highest z-index

        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keydown', this.boundHandleKeyDown);
        document.addEventListener('keyup', this.boundHandleKeyUp);

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
        document.removeEventListener('keydown', this.boundHandleKeyDown);
        document.removeEventListener('keyup', this.boundHandleKeyUp);
    }

    // --- Selection & Deletion --- //

    selectItem(element) {
        if (!element) return;

        // Deselect previous item
        this.deselectAll();

        this.selectedItemId = element.dataset.itemId;
        element.classList.add('selected');
        this.contextToolbarTarget.classList.remove('hidden');
    }

    deselectAll() {
        if (this.selectedItemId) {
            const previouslySelected = this.canvasTarget.querySelector(`[data-item-id="${this.selectedItemId}"]`);
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
            }
        }
        this.selectedItemId = null;
        this.contextToolbarTarget.classList.add('hidden');
    }

    deleteSelectedItem() {
        if (!this.selectedItemId) return;

        const itemElement = this.canvasTarget.querySelector(`[data-item-id="${this.selectedItemId}"]`);
        if (itemElement) {
            itemElement.remove();
        }
        this.boardItems.delete(this.selectedItemId);
        this.deselectAll();
    }

    // --- Tool Selection & Canvas Interaction --- //

    activateTool(event) {
        this.activeTool = event.currentTarget.dataset.tool;
        document.querySelectorAll('.board-tool').forEach(el => el.classList.remove('active'));
        event.currentTarget.classList.add('active');
        this.canvasTarget.style.cursor = this.activeTool === 'select' ? 'default' : 'crosshair';
    }

    handleKeyDown(event) {
        // Delete item
        if ((event.key === 'Delete' || event.key === 'Backspace') && this.selectedItemId) {
            // Prevent deleting text if user is editing a text item
            if(document.activeElement.getAttribute('contenteditable') !== 'true') {
                event.preventDefault();
                this.deleteSelectedItem();
            }
        }

        // Zoom shortcuts
        if (event.metaKey || event.ctrlKey) {
            if (event.key === '=') { // Cmd/Ctrl +
                event.preventDefault();
                this.zoomIn();
            } else if (event.key === '-') { // Cmd/Ctrl -
                event.preventDefault();
                this.zoomOut();
            }
        }

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
        // Determine if a pan should start.
        const canPan = this.isPanning || event.button === 1 || (this.activeTool === 'select' && event.target === this.viewportTarget);

        if (canPan) {
            this.isPanning = true;
            this.viewportTarget.style.cursor = 'grabbing';
            this.panStart = { x: event.clientX, y: event.clientY };
            this.deselectAll();
        }
    }


    handleMouseUp(event) {
        // If we were panning, simply stop the pan.
        if (this.isPanning) {
            this.isPanning = false;
            this.viewportTarget.style.cursor = 'default';
        }
        // Otherwise, if it was a click on the background, perform the tool action.
        else if (event.target === this.viewportTarget) {
            if (this.activeTool === 'text') {
                const pos = this.getCanvasCoordinates(event.clientX, event.clientY);
                this.addTextItemToBoard(pos.x, pos.y);
            } else if (this.activeTool === 'group') {
                const pos = this.getCanvasCoordinates(event.clientX, event.clientY);
                this.addGroupItemToBoard(pos.x, pos.y);
            }
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

    // --- Layering --- //

    _getSortedItemsByZIndex() {
        return Array.from(this.boardItems.values()).sort((a, b) => a.zIndex - b.zIndex);
    }

    bringToFront() {
        if (!this.selectedItemId) return;
        const item = this.boardItems.get(this.selectedItemId);
        item.zIndex = ++this.zCounter;
        this.canvasTarget.querySelector(`[data-item-id="${this.selectedItemId}"]`).style.zIndex = item.zIndex;
    }

    sendToBack() {
        if (!this.selectedItemId) return;
        const sortedItems = this._getSortedItemsByZIndex();
        const minZ = sortedItems.length > 0 ? sortedItems[0].zIndex : 0;

        const item = this.boardItems.get(this.selectedItemId);
        item.zIndex = minZ - 1;
        this.canvasTarget.querySelector(`[data-item-id="${this.selectedItemId}"]`).style.zIndex = item.zIndex;
    }

    bringForward() {
        if (!this.selectedItemId) return;
        const sortedItems = this._getSortedItemsByZIndex();
        const currentIndex = sortedItems.findIndex(i => i.id === this.selectedItemId);

        if (currentIndex < sortedItems.length - 1) {
            const currentItem = sortedItems[currentIndex];
            const nextItem = sortedItems[currentIndex + 1];

            // Swap z-indices
            [currentItem.zIndex, nextItem.zIndex] = [nextItem.zIndex, currentItem.zIndex];

            this.canvasTarget.querySelector(`[data-item-id="${currentItem.id}"]`).style.zIndex = currentItem.zIndex;
            this.canvasTarget.querySelector(`[data-item-id="${nextItem.id}"]`).style.zIndex = nextItem.zIndex;
        }
    }

    sendBackward() {
        if (!this.selectedItemId) return;
        const sortedItems = this._getSortedItemsByZIndex();
        const currentIndex = sortedItems.findIndex(i => i.id === this.selectedItemId);

        if (currentIndex > 0) {
            const currentItem = sortedItems[currentIndex];
            const prevItem = sortedItems[currentIndex - 1];

            // Swap z-indices
            [currentItem.zIndex, prevItem.zIndex] = [prevItem.zIndex, currentItem.zIndex];

            this.canvasTarget.querySelector(`[data-item-id="${currentItem.id}"]`).style.zIndex = currentItem.zIndex;
            this.canvasTarget.querySelector(`[data-item-id="${prevItem.id}"]`).style.zIndex = prevItem.zIndex;
        }
    }

    // --- Item Creation (with z-index and selection) --- //

    _addItemToBoard(element, itemData) {
        if (typeof itemData.zIndex === 'undefined' || itemData.zIndex === null) {
            itemData.zIndex = ++this.zCounter;
        }
        element.style.zIndex = itemData.zIndex;

        this.canvasTarget.appendChild(element);
        this.makeItemInteractive(element);
        this.boardItems.set(itemData.id, itemData);

        // Add a mousedown listener to handle selection
        element.addEventListener('mousedown', (e) => {
            e.stopPropagation(); // Prevent canvas deselection
            this.selectItem(element);
        });

        this.selectItem(element); // Select the new item
    }

    addTextItemToBoard(x, y, width = 200, height = 50, itemId = null, content = { text: 'Type here...' }, zIndex) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const textEl = document.createElement('div');
        // ... (element setup is the same)
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

        const newItem = { id: finalItemId, type: 'text', content, x, y, width, height, zIndex };
        this._addItemToBoard(textEl, newItem);
        if(!itemId) textEl.focus(); // Auto-focus new text boxes
    }

    addGroupItemToBoard(x, y, width = 300, height = 250, itemId = null, content = {}, zIndex) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const groupEl = document.createElement('div');
        // ... (element setup is the same)
        groupEl.classList.add('board-item', 'board-item-group', 'absolute');
        groupEl.style.left = '0px';
        groupEl.style.top = '0px';
        groupEl.style.width = `${width}px`;
        groupEl.style.height = `${height}px`;
        groupEl.style.transform = `translate(${x}px, ${y}px)`;
        groupEl.dataset.itemId = finalItemId;
        groupEl.setAttribute('data-x', x);
        groupEl.setAttribute('data-y', y);

        const newItem = { id: finalItemId, type: 'group', content, x, y, width, height, zIndex };
        this._addItemToBoard(groupEl, newItem);
    }

    addAssetToBoard(assetId, thumbnailUrl, x, y, width = 200, height = 200, itemId = null, content = {}, zIndex) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const boardItemEl = document.createElement('div');
        // ... (element setup is the same)
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

        const newContent = { assetId, thumbnailUrl };
        const newItem = { id: finalItemId, type: 'asset', content: newContent, x, y, width, height, zIndex };
        this._addItemToBoard(boardItemEl, newItem);
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


    // --- State Management --- //

    async loadBoardState() {
        try {
            const response = await fetch(`/boards/${this.boardIdValue}/items`);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const items = await response.json();

            this.canvasTarget.innerHTML = '';
            this.boardItems.clear();
            this.zCounter = 0; // Reset z-index counter

            items.forEach(item => {
                try {
                    if (item.type === 'asset') {
                        this.addAssetToBoard(item.content.assetId, item.content.thumbnailUrl, item.pos_x, item.pos_y, item.width, item.height, item.id, item.content, item.zIndex);
                    } else if (item.type === 'text') {
                        this.addTextItemToBoard(item.pos_x, item.pos_y, item.width, item.height, item.id, item.content, item.zIndex);
                    } else if (item.type === 'group') {
                        this.addGroupItemToBoard(item.pos_x, item.pos_y, item.width, item.height, item.id, item.content, item.zIndex);
                    }
                    // Update the z-counter to the highest loaded z-index
                    if(item.zIndex > this.zCounter) {
                        this.zCounter = item.zIndex;
                    }
                } catch(e) { console.error('Failed to render a board item:', { item, error: e }); }
            });

            this.deselectAll();
            this.frameContent();

        } catch (error) {
            console.error("Fatal error loading board state:", error);
            //...
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
                    this.addAssetToBoard(serverItem.content.assetId, serverItem.content.thumbnailUrl, serverItem.pos_x, serverItem.pos_y, serverItem.width, serverItem.height, serverItem.id, serverItem.content, serverItem.zIndex);
                } else if (serverItem.type === 'text') {
                    this.addTextItemToBoard(serverItem.pos_x, serverItem.pos_y, serverItem.width, serverItem.height, serverItem.id, serverItem.content, serverItem.zIndex);
                } else if (serverItem.type === 'group') {
                    this.addGroupItemToBoard(serverItem.pos_x, serverItem.pos_y, serverItem.width, serverItem.height, serverItem.id, serverItem.content, serverItem.zIndex);
                }
            } else {
                // Also sync zIndex for existing items
                localItem.zIndex = serverItem.zIndex;
                const domElement = this.canvasTarget.querySelector(`[data-item-id="${serverItem.id}"]`);
                if(domElement) domElement.style.zIndex = serverItem.zIndex;
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


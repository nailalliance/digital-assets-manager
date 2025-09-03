import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';
import { v4 as uuidv4 } from 'uuid';

export default class extends Controller {
    static targets = [
        "canvas", "svgCanvas", "viewport", "assetSearch", "assetList", "saveBtn",
        "zoomValue", "contextToolbar", "textContextToolbar", "fontFamilySelect",
        "fontSizeInput", "boldButton", "italicButton", "colorInput",
        "backgroundColorInput", "borderColorInput"
    ];
    static values = { boardId: Number };

    // --- 1. LIFECYCLE & INITIALIZATION --- //

    connect() {
        this.boardItems = new Map();
        this.activeTool = 'select';
        this.pan = { x: 0, y: 0 };
        this.zoom = 1;
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        this.isSaving = false;
        this.selectedItemId = null;
        this.zCounter = 0;

        this.isDrawingLine = false;
        this.lineStartPoint = null;
        this.tempLine = null;

        // Bind global listeners
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keydown', this.boundHandleKeyDown);
        document.addEventListener('keyup', this.boundHandleKeyUp);

        // Bind viewport listeners
        this.viewportTarget.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.viewportTarget.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.viewportTarget.addEventListener('mouseup', this.handleMouseUp.bind(this));

        // Bind UI element listeners
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

    // --- 2. SELECTION & DELETION --- //

    selectItem(element) {
        if (!element) return;
        this.deselectAll();

        this.selectedItemId = element.dataset.itemId;
        element.classList.add('selected');

        this.contextToolbarTarget.classList.remove('hidden');

        if (element.classList.contains('board-item-text')) {
            this.textContextToolbarTarget.classList.remove('hidden');
            this.updateTextToolbarState();
        }
    }

    deselectAll() {
        if (this.selectedItemId) {
            const previouslySelected = this.element.querySelector(`[data-item-id="${this.selectedItemId}"]`);
            if (previouslySelected) previouslySelected.classList.remove('selected');
        }
        this.selectedItemId = null;
        this.contextToolbarTarget.classList.add('hidden');
        this.textContextToolbarTarget.classList.add('hidden');
    }

    deleteSelectedItem() {
        if (!this.selectedItemId) return;
        const itemElement = this.element.querySelector(`[data-item-id="${this.selectedItemId}"]`);
        if (itemElement) itemElement.remove();
        this.boardItems.delete(this.selectedItemId);
        this.deselectAll();
    }

    // --- 3. TOOLING & CANVAS INTERACTION --- //

    activateTool(event) {
        this.activeTool = event.currentTarget.dataset.tool;
        document.querySelectorAll('.board-tool').forEach(el => el.classList.remove('active'));
        event.currentTarget.classList.add('active');
        this.viewportTarget.style.cursor = this.activeTool === 'select' ? 'default' : 'crosshair';
    }

    handleKeyDown(event) {
        if ((event.key === 'Delete' || event.key === 'Backspace') && this.selectedItemId) {
            if (document.activeElement.getAttribute('contenteditable') !== 'true') {
                event.preventDefault();
                this.deleteSelectedItem();
            }
        }
        if (event.metaKey || event.ctrlKey) {
            if (event.key === '=') { event.preventDefault(); this.zoomIn(); }
            if (event.key === '-') { event.preventDefault(); this.zoomOut(); }
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
        const isLineTool = this.activeTool === 'line' || this.activeTool === 'arrow';
        if (isLineTool && event.target === this.viewportTarget) {
            this.isDrawingLine = true;
            this.lineStartPoint = this.getCanvasCoordinates(event.clientX, event.clientY);
            this.tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            this.tempLine.setAttribute('stroke', '#3b82f6');
            this.tempLine.setAttribute('stroke-width', '2');
            this.tempLine.setAttribute('stroke-dasharray', '5,5');
            this.svgCanvasTarget.appendChild(this.tempLine);
        } else {
            const canPan = this.isPanning || event.button === 1 || (this.activeTool === 'select' && event.target === this.viewportTarget);
            if (canPan) {
                this.isPanning = true;
                this.viewportTarget.style.cursor = 'grabbing';
                this.panStart = { x: event.clientX, y: event.clientY };
                this.deselectAll();
            }
        }
    }

    handleMouseMove(event) {
        if (this.isDrawingLine) {
            const currentPos = this.getCanvasCoordinates(event.clientX, event.clientY);
            this.tempLine.setAttribute('x1', this.lineStartPoint.x);
            this.tempLine.setAttribute('y1', this.lineStartPoint.y);
            this.tempLine.setAttribute('x2', currentPos.x);
            this.tempLine.setAttribute('y2', currentPos.y);
        } else if (this.isPanning) {
            this.pan.x += event.clientX - this.panStart.x;
            this.pan.y += event.clientY - this.panStart.y;
            this.panStart = { x: event.clientX, y: event.clientY };
            this.updateCanvasTransform();
        }
    }

    handleMouseUp(event) {
        if (this.isDrawingLine) {
            const endPoint = this.getCanvasCoordinates(event.clientX, event.clientY);
            const distance = Math.hypot(endPoint.x - this.lineStartPoint.x, endPoint.y - this.lineStartPoint.y);
            if (distance > 10) this.addLineItemToBoard(this.lineStartPoint, endPoint, this.activeTool);
            this.isDrawingLine = false;
            if (this.tempLine) this.tempLine.remove();
            this.tempLine = null;
        } else if (this.isPanning) {
            this.isPanning = false;
            this.viewportTarget.style.cursor = 'default';
        } else if (event.target === this.viewportTarget) {
            const pos = this.getCanvasCoordinates(event.clientX, event.clientY);
            if (this.activeTool === 'text') this.addTextItemToBoard(pos.x, pos.y);
            else if (this.activeTool === 'group') this.addGroupItemToBoard(pos.x, pos.y);
        }
    }

    // --- 4. PAN & ZOOM --- //

    getCanvasCoordinates(clientX, clientY) {
        const viewportRect = this.viewportTarget.getBoundingClientRect();
        const x = (clientX - viewportRect.left - this.pan.x) / this.zoom;
        const y = (clientY - viewportRect.top - this.pan.y) / this.zoom;
        return { x, y };
    }

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
        const padding = 100;
        const xZoom = this.viewportTarget.clientWidth / (contentWidth + padding * 2);
        const yZoom = this.viewportTarget.clientHeight / (contentHeight + padding * 2);
        this.zoom = Math.min(xZoom, yZoom, 1);
        const contentCenterX = minX + contentWidth / 2;
        const contentCenterY = minY + contentHeight / 2;
        this.pan.x = (this.viewportTarget.clientWidth / 2) - (contentCenterX * this.zoom);
        this.pan.y = (this.viewportTarget.clientHeight / 2) - (contentCenterY * this.zoom);
        this.updateCanvasTransform();
    }

    // --- 5. LAYERING --- //

    _getSortedItemsByZIndex() {
        return Array.from(this.boardItems.values()).sort((a, b) => a.zIndex - b.zIndex);
    }

    bringToFront() {
        if (!this.selectedItemId) return;
        const item = this.boardItems.get(this.selectedItemId);
        this.zCounter += 1;
        item.zIndex = this.zCounter;
        this.element.querySelector(`[data-item-id="${this.selectedItemId}"]`).style.zIndex = item.zIndex;
    }

    sendToBack() {
        if (!this.selectedItemId) return;
        const sortedItems = this._getSortedItemsByZIndex();
        const minZ = sortedItems.length > 0 ? sortedItems[0].zIndex : 0;
        const item = this.boardItems.get(this.selectedItemId);
        item.zIndex = minZ - 1;
        this.element.querySelector(`[data-item-id="${this.selectedItemId}"]`).style.zIndex = item.zIndex;
    }

    bringForward() {
        if (!this.selectedItemId) return;
        const sortedItems = this._getSortedItemsByZIndex();
        const currentIndex = sortedItems.findIndex(i => i.id == this.selectedItemId);
        if (currentIndex < sortedItems.length - 1) {
            const currentItem = sortedItems[currentIndex];
            const nextItem = sortedItems[currentIndex + 1];
            [currentItem.zIndex, nextItem.zIndex] = [nextItem.zIndex, currentItem.zIndex];
            this.element.querySelector(`[data-item-id="${currentItem.id}"]`).style.zIndex = currentItem.zIndex;
            this.element.querySelector(`[data-item-id="${nextItem.id}"]`).style.zIndex = nextItem.zIndex;
        }
    }

    sendBackward() {
        if (!this.selectedItemId) return;
        const sortedItems = this._getSortedItemsByZIndex();
        const currentIndex = sortedItems.findIndex(i => i.id == this.selectedItemId);
        if (currentIndex > 0) {
            const currentItem = sortedItems[currentIndex];
            const prevItem = sortedItems[currentIndex - 1];
            [currentItem.zIndex, prevItem.zIndex] = [prevItem.zIndex, currentItem.zIndex];
            this.element.querySelector(`[data-item-id="${currentItem.id}"]`).style.zIndex = currentItem.zIndex;
            this.element.querySelector(`[data-item-id="${prevItem.id}"]`).style.zIndex = prevItem.zIndex;
        }
    }

    // --- 6. TEXT STYLING --- //

    updateTextToolbarState() {
        if (!this.selectedItemId) return;
        const item = this.boardItems.get(this.selectedItemId);
        if (!item || item.type !== 'text') return;
        const styles = item.content;
        this.fontFamilySelectTarget.value = styles.fontFamily || 'Helvetica, sans-serif';
        this.fontSizeInputTarget.value = styles.fontSize || 16;
        this.colorInputTarget.value = styles.color || '#000000';
        this.backgroundColorInputTarget.value = styles.backgroundColor || '#ffffff';
        this.borderColorInputTarget.value = styles.borderColor || '#000000';
        this.boldButtonTarget.classList.toggle('bg-gray-300', styles.fontWeight === 'bold');
        this.italicButtonTarget.classList.toggle('bg-gray-300', styles.fontStyle === 'italic');
    }

    changeTextStyle(event) {
        if (!this.selectedItemId) return;
        const item = this.boardItems.get(this.selectedItemId);
        if (!item || item.type !== 'text') return;

        const target = event.currentTarget;
        const property = target.dataset.styleProperty;

        let value = target.dataset.styleValue || target.value;

        if (property === 'fontSize') {
            value = parseInt(value, 10);
        }

        item.content[property] = value;
        this.applyTextStyles(this.element.querySelector(`[data-item-id="${this.selectedItemId}"]`), item.content);
        this.updateTextToolbarState();
    }

    toggleTextStyle(event) {
        if (!this.selectedItemId) return;
        const item = this.boardItems.get(this.selectedItemId);
        if (!item || item.type !== 'text') return;
        const property = event.currentTarget.dataset.styleProperty;
        const activeValue = event.currentTarget.dataset.styleValue;
        const defaultValue = property === 'fontWeight' ? 'normal' : 'normal';
        item.content[property] = item.content[property] === activeValue ? defaultValue : activeValue;
        this.applyTextStyles(this.element.querySelector(`[data-item-id="${this.selectedItemId}"]`), item.content);
        this.updateTextToolbarState();
    }

    applyTextStyles(element, styles) {
        element.style.fontFamily = styles.fontFamily || 'Helvetica, sans-serif';
        element.style.fontSize = `${styles.fontSize || 16}px`;
        element.style.fontWeight = styles.fontWeight || 'normal';
        element.style.fontStyle = styles.fontStyle || 'normal';
        element.style.textAlign = styles.textAlign || 'left';
        element.style.color = styles.color || '#000000';
        element.style.backgroundColor = styles.backgroundColor || '#ffffff';
        element.style.borderColor = styles.borderColor || '#000000';
        element.style.borderWidth = styles.borderColor ? '1px' : '0';
    }

    // --- 7. ITEM CREATION & INTERACTION SETUP --- //

    _addItemToBoard(element, itemData) {
        if (typeof itemData.zIndex === 'undefined' || itemData.zIndex === null) {
            this.zCounter += 1;
            itemData.zIndex = this.zCounter;
        }
        element.style.zIndex = itemData.zIndex;
        this.canvasTarget.appendChild(element);
        if (itemData.type === 'line' || itemData.type === 'arrow') {
            this.makeLineInteractive(element);
        } else {
            this.makeItemInteractive(element);
        }
        this.boardItems.set(String(itemData.id), itemData);
        element.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.selectItem(element);
        });
        this.selectItem(element);
    }

    addAssetToBoard(assetId, thumbnailUrl, x, y, width = 200, height = 200, itemId = null, zIndex) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const boardItemEl = document.createElement('div');
        boardItemEl.classList.add('board-item', 'board-item-asset', 'absolute', 'p-1', 'bg-white', 'shadow-lg', 'box-border');
        boardItemEl.style.left = '0px';
        boardItemEl.style.top = '0px';
        boardItemEl.style.width = `${width}px`;
        boardItemEl.style.height = `${height}px`;
        boardItemEl.style.transform = `translate(${x}px, ${y}px)`;
        boardItemEl.dataset.itemId = finalItemId;
        boardItemEl.setAttribute('data-x', x);
        boardItemEl.setAttribute('data-y', y);
        boardItemEl.innerHTML = `
            <div class="asset-image-container w-full h-full">
                <img src="${thumbnailUrl}" class="w-full h-full object-contain pointer-events-none">
            </div>
            <div class="asset-button-ribbon">
                <button data-action="click->board#downloadAsset" data-asset-id="${assetId}" title="Download">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
                <button data-action="click->board#addToDownloadList" data-asset-id="${assetId}" title="Add to Download List">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </div>
        `;
        const newContent = { assetId, thumbnailUrl };
        const newItem = { id: finalItemId, type: 'asset', content: newContent, x, y, width, height, zIndex };
        this._addItemToBoard(boardItemEl, newItem);
    }

    addGroupItemToBoard(x, y, width = 300, height = 250, itemId = null, content = {}, zIndex) {
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
        const newItem = { id: finalItemId, type: 'group', content, x, y, width, height, zIndex };
        this._addItemToBoard(groupEl, newItem);
    }

    addTextItemToBoard(x, y, width = 200, height = 50, itemId = null, content = {}, zIndex) {
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
        const defaultStyles = { text: 'Type here...', fontFamily: 'Helvetica, sans-serif', fontSize: 16, fontWeight: 'normal', fontStyle: 'normal', textAlign: 'left', color: '#000000', backgroundColor: '#ffffff', borderColor: '#d1d5db' };
        const newContent = { ...defaultStyles, ...content };
        textEl.innerText = newContent.text;
        this.applyTextStyles(textEl, newContent);
        textEl.addEventListener('input', () => {
            const item = this.boardItems.get(finalItemId);
            if (item) item.content.text = textEl.innerText;
        });
        const newItem = { id: finalItemId, type: 'text', content: newContent, x, y, width, height, zIndex };
        this._addItemToBoard(textEl, newItem);
        if (!itemId) textEl.focus();
    }

    addLineItemToBoard(start, end, type, itemId = null, content = {}, zIndex) {
        const finalItemId = itemId ? String(itemId) : `item-${uuidv4()}`;
        const newContent = { x1: start.x, y1: start.y, x2: end.x, y2: end.y, ...content };
        const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgEl.classList.add('board-item', 'board-item-line');
        svgEl.dataset.itemId = finalItemId;
        const { x, y, width, height } = this.getLineBoundingBox(newContent);
        const newItem = { id: finalItemId, type, content: newContent, x, y, width, height, zIndex };
        this.buildLineElement(svgEl, newItem);
        this._addItemToBoard(svgEl, newItem);
    }

    makeItemInteractive(element) {
        const resizableOptions = {
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
        };

        if (element.classList.contains('board-item-asset')) {
            resizableOptions.modifiers = [
                interact.modifiers.restrictSize({
                    min: { width: 150, height: 150 }
                })
            ];
        }

        interact(element).draggable({ inertia: true, listeners: {
                start: (event) => {
                    const target = event.target;
                    event.interaction.startPos = { x: parseFloat(target.getAttribute('data-x')) || 0, y: parseFloat(target.getAttribute('data-y')) || 0 };
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
            }}).resizable({ edges: { left: true, right: true, bottom: true, top: true }, listeners: {
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
            }}).on('dragend resizeend', (event) => {
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

    makeLineInteractive(svgEl) {
        const itemId = svgEl.dataset.itemId;
        const startHandle = svgEl.querySelector('.start-handle');
        const endHandle = svgEl.querySelector('.end-handle');

        interact(svgEl).draggable({
            allowFrom: '.hitbox-line',
            listeners: {
                start: (event) => {
                    const item = this.boardItems.get(itemId);
                    if (!item) return;
                    event.interaction.startPos = { x: item.x, y: item.y };
                },
                move: (event) => {
                    const newX = event.interaction.startPos.x + (event.pageX - event.x0) / this.zoom;
                    const newY = event.interaction.startPos.y + (event.pageY - event.y0) / this.zoom;
                    event.target.style.transform = `translate(${newX}px, ${newY}px`;
                    event.target.setAttribute('data-x', newX);
                    event.target.setAttribute('data-y', newY);
                },
                end: (event) => {
                    const item = this.boardItems.get(itemId);
                    if (!item) return;

                    const oldX = item.x;
                    const oldY = item.y;
                    const newX = parseFloat(event.target.getAttribute('data-x'));
                    const newY = parseFloat(event.target.getAttribute('data-y'));

                    const dx = newX - oldX;
                    const dy = newY - oldY;

                    item.content.x1 += dx;
                    item.content.y1 += dy;
                    item.content.x2 += dx;
                    item.content.y2 += dy;

                    const {x, y, width, height} = this.getLineBoundingBox(item.content);
                    item.x = x;
                    item.y = y;
                    item.width = width;
                    item.height = height;

                    event.interaction.startPos = null;
                }
            }
        });

        interact(startHandle).draggable({
            listeners: {
                move: (event) => {
                    const item = this.boardItems.get(itemId);
                    if (!item) return;

                    item.content.x1 += event.dx / this.zoom;
                    item.content.y1 += event.dy / this.zoom;
                    this.updateLineElement(svgEl, item);
                }
            }
        });

        interact(endHandle).draggable({
            listeners: {
                move: (event) => {
                    const item = this.boardItems.get(itemId);
                    if (!item) return;

                    item.content.x2 += event.dx / this.zoom;
                    item.content.y2 += event.dy / this.zoom;
                    this.updateLineElement(svgEl, item);
                }
            }
        });
    }

    // --- 8. ASSET CARD ACTIONS (New) --- //

    downloadAsset(event) {
        event.stopPropagation();
        const assetId = event.currentTarget.dataset.assetId;
        window.open(`/asset/${assetId}/download`, '_blank');
    }

    addToDownloadList(event) {
        event.stopPropagation();
        const button = event.currentTarget;
        const assetId = button.dataset.assetId;

        button.disabled = true;

        fetch(`/download-list/add/${assetId}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    button.innerHTML = 'Added!';
                    setTimeout(() => {
                        // Revert back to plus icon after a delay
                        button.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>';
                        button.disabled = false;
                    }, 2000);
                } else {
                    button.innerHTML = 'Error';
                    button.disabled = false;
                }
            });
    }

    // --- 9. HELPER FUNCTIONS --- //

    getLineBoundingBox(content) {
        const x = Math.min(content.x1, content.x2);
        const y = Math.min(content.y1, content.y2);
        const width = Math.abs(content.x1 - content.x2);
        const height = Math.abs(content.y1 - content.y2);
        return { x, y, width, height };
    }

    buildLineElement(svgEl, item) {
        const { x, y } = this.getLineBoundingBox(item.content);
        svgEl.style.transform = `translate(${x}px, ${y}px)`;
        svgEl.setAttribute('data-x', x);
        svgEl.setAttribute('data-y', y);
        const relX1 = item.content.x1 - x;
        const relY1 = item.content.y1 - y;
        const relX2 = item.content.x2 - x;
        const relY2 = item.content.y2 - y;
        svgEl.innerHTML = `
            <line class="hitbox-line" x1="${relX1}" y1="${relY1}" x2="${relX2}" y2="${relY2}" stroke="transparent" stroke-width="15"></line>
            <line class="visual-line" x1="${relX1}" y1="${relY1}" x2="${relX2}" y2="${relY2}" stroke="black" stroke-width="2" ${item.type === 'arrow' ? 'marker-end="url(#arrowhead)"' : ''}></line>
            <circle class="line-handle start-handle" cx="${relX1}" cy="${relY1}" r="5"></circle>
            <circle class.body-handle end-handle" cx="${relX2}" cy="${relY2}" r="5"></circle>
        `;
    }

    updateLineElement(svgEl, item) {
        const { x, y } = this.getLineBoundingBox(item.content);
        item.x = x; item.y = y;
        svgEl.style.transform = `translate(${x}px, ${y}px)`;
        svgEl.setAttribute('data-x', x);
        svgEl.setAttribute('data-y', y);
        const relX1 = item.content.x1 - x;
        const relY1 = item.content.y1 - y;
        const relX2 = item.content.x2 - x;
        const relY2 = item.content.y2 - y;
        svgEl.querySelector('.hitbox-line').setAttribute('x1', relX1);
        svgEl.querySelector('.hitbox-line').setAttribute('y1', relY1);
        svgEl.querySelector('.hitbox-line').setAttribute('x2', relX2);
        svgEl.querySelector('.hitbox-line').setAttribute('y2', relY2);
        svgEl.querySelector('.visual-line').setAttribute('x1', relX1);
        svgEl.querySelector('.visual-line').setAttribute('y1', relY1);
        svgEl.querySelector('.visual-line').setAttribute('x2', relX2);
        svgEl.querySelector('.visual-line').setAttribute('y2', relY2);
        svgEl.querySelector('.start-handle').setAttribute('cx', relX1);
        svgEl.querySelector('.start-handle').setAttribute('cy', relY1);
        svgEl.querySelector('.end-handle').setAttribute('cx', relX2);
        svgEl.querySelector('.end-handle').setAttribute('cy', relY2);
    }

    // --- 10. STATE MANAGEMENT & API --- //

    async loadBoardState() {
        try {
            const response = await fetch(`/boards/${this.boardIdValue}/items`);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const items = await response.json();
            this.canvasTarget.innerHTML = '';
            this.boardItems.clear();
            this.zCounter = 0;
            items.forEach(item => {
                try {
                    this.createItemFromData(item);
                    if (item.zIndex > this.zCounter) this.zCounter = item.zIndex;
                } catch (e) { console.error('Failed to render a board item:', { item, error: e }); }
            });
            this.deselectAll();
            this.frameContent();
        } catch (error) {
            console.error("Fatal error loading board state:", error);
            this.canvasTarget.innerHTML = `<div class="p-4 text-red-600 bg-red-100 border border-red-400 rounded">Could not load board.</div>`;
        }
    }

    async saveBoardState(isAutoSave = false) {
        if (this.isSaving) return;
        this.isSaving = true;
        if (!isAutoSave) {
            this.saveBtnTarget.textContent = 'Saving...';
            this.saveBtnTarget.disabled = true;
        }
        const payload = Array.from(this.boardItems.values());
        try {
            const response = await fetch(`/boards/${this.boardIdValue}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
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
        const newBoardItems = new Map();
        serverItems.forEach(serverItem => {
            const serverId = String(serverItem.id);
            let localItem;
            if (serverItem.tempId && this.boardItems.has(serverItem.tempId)) {
                localItem = this.boardItems.get(serverItem.tempId);
                localItem.id = serverId;
            } else {
                localItem = this.boardItems.get(serverId);
            }
            if (localItem) {
                localItem.zIndex = serverItem.zIndex;
                newBoardItems.set(serverId, localItem);
            } else {
                const newItemData = { ...serverItem, id: serverId, x: serverItem.pos_x, y: serverItem.pos_y };
                newBoardItems.set(serverId, newItemData);
            }
        });
        this.boardItems = newBoardItems;
        this.canvasTarget.querySelectorAll('.board-item').forEach(element => {
            if (!this.boardItems.has(element.dataset.itemId)) element.remove();
        });
        this.boardItems.forEach(item => {
            let element = this.canvasTarget.querySelector(`[data-item-id="${item.id}"]`);
            if (!element) {
                this.createItemFromData(item);
            } else {
                element.style.zIndex = item.zIndex;
                const domItem = this.boardItems.get(element.dataset.itemId);
                if (domItem) {
                    element.style.transform = `translate(${domItem.x}px, ${domItem.y}px)`;
                }
            }
        });
    }

    createItemFromData(itemData) {
        const x = itemData.pos_x ?? itemData.x;
        const y = itemData.pos_y ?? itemData.y;

        if (itemData.type === 'line' || itemData.type === 'arrow') {
            this.addLineItemToBoard({x: itemData.content.x1, y: itemData.content.y1}, {x: itemData.content.x2, y: itemData.content.y2}, itemData.type, itemData.id, itemData.content, itemData.zIndex);
        } else if (itemData.type === 'asset') {
            this.addAssetToBoard(itemData.content.assetId, itemData.content.thumbnailUrl, x, y, itemData.width, itemData.height, itemData.id, itemData.zIndex);
        } else if (itemData.type === 'text') {
            this.addTextItemToBoard(x, y, itemData.width, itemData.height, itemData.id, itemData.content, itemData.zIndex);
        } else if (itemData.type === 'group') {
            this.addGroupItemToBoard(x, y, itemData.width, itemData.height, itemData.id, itemData.content, itemData.zIndex);
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
        interact('#asset-list .asset-item').draggable({ inertia: true, listeners: {
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
            }});
        interact(this.viewportTarget).dropzone({ accept: '.asset-item', ondrop: (event) => {
                const droppedElement = event.relatedTarget;
                const viewportRect = this.viewportTarget.getBoundingClientRect();
                const dropX_viewport = event.dragEvent.client.x - viewportRect.left;
                const dropY_viewport = event.dragEvent.client.y - viewportRect.top;
                const dropX_canvas = (dropX_viewport - this.pan.x) / this.zoom;
                const dropY_canvas = (dropY_viewport - this.pan.y) / this.zoom;
                const assetId = droppedElement.dataset.assetId;
                const assetThumbnail = droppedElement.dataset.assetThumbnail;
                this.addAssetToBoard(assetId, assetThumbnail, dropX_canvas, dropY_canvas);
            }});
    }
}


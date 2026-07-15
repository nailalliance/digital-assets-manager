import { Controller } from '@hotwired/stimulus';
import interact from 'interactjs';

const SUPPORTED_FONTS = [
    'Arial',
    'Helvetica',
    'Georgia',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Tahoma',
    'Courier New',
    'Impact',
];

const HISTORY_LIMIT = 50;
const MIN_IMAGE_SCALE = 0.2;
const MAX_IMAGE_SCALE = 4;
const IMAGE_SCALE_STEP = 0.12;
const DEFAULT_TEXT = 'Edit text';
const HANDLE_EDGE_SELECTORS = {
    left: '.image-editor-handle-tl, .image-editor-handle-bl',
    right: '.image-editor-handle-tr, .image-editor-handle-br',
    top: '.image-editor-handle-tl, .image-editor-handle-tr',
    bottom: '.image-editor-handle-bl, .image-editor-handle-br',
};

export default class extends Controller {
    static targets = [
        'workspace',
        'surface',
        'canvas',
        'overlay',
        'imageBox',
        'cropBox',
        'textLayer',
        'loadingState',
        'undoButton',
        'redoButton',
        'status',
        'imageScaleLabel',
        'selectionSummary',
        'cropSummary',
        'propertiesEmptyState',
        'propertiesEmptyTitle',
        'propertiesEmptyMessage',
        'textInspector',
        'fontFamilySelect',
        'fontSizeInput',
        'colorInput',
        'boldButton',
        'italicButton',
        'alignButton',
        'layersList',
        'layerCount',
        'scriptModal',
        'scriptModalTitle',
        'scriptModalHint',
        'scriptTextarea',
        'scriptConfirmButton',
    ];

    static values = {
        imageUrl: String,
        assetName: String,
        mimeType: String,
    };

    connect() {
        this.activeTool = 'select';
        this.selectedTextId = null;
        this.editingTextId = null;
        this.history = [];
        this.future = [];
        this.transactionState = null;
        this.textEditSnapshot = null;
        this.scriptModalMode = 'paste';
        this.surfaceMetrics = null;
        this.image = null;
        this.state = null;
        this.initialState = null;
        this.isPanningImage = false;
        this.imagePanStart = null;
        this.suppressNextWorkspaceClick = false;
        this.wheelCommitTimer = null;
        this.toolButtons = Array.from(this.element.querySelectorAll('[data-tool]'));

        this.boundHandleResize = this.handleResize.bind(this);
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleImagePanMove = this.handleImagePanMove.bind(this);
        this.boundHandleImagePanEnd = this.handleImagePanEnd.bind(this);
        this.boundHandleWorkspaceMouseDown = this.handleWorkspaceMouseDown.bind(this);
        this.boundHandleWorkspaceClick = this.handleWorkspaceClick.bind(this);
        this.boundHandleWheel = this.handleWheel.bind(this);

        window.addEventListener('resize', this.boundHandleResize);
        document.addEventListener('keydown', this.boundHandleKeyDown);
        this.workspaceTarget.addEventListener('mousedown', this.boundHandleWorkspaceMouseDown);
        this.workspaceTarget.addEventListener('click', this.boundHandleWorkspaceClick);
        this.workspaceTarget.addEventListener('wheel', this.boundHandleWheel, { passive: false });

        this.initializeImageInteraction();
        this.initializeCropInteraction();
        this.loadImage();
    }

    disconnect() {
        window.removeEventListener('resize', this.boundHandleResize);
        document.removeEventListener('keydown', this.boundHandleKeyDown);
        this.workspaceTarget.removeEventListener('mousedown', this.boundHandleWorkspaceMouseDown);
        this.workspaceTarget.removeEventListener('click', this.boundHandleWorkspaceClick);
        this.workspaceTarget.removeEventListener('wheel', this.boundHandleWheel);
        this.stopImagePan();
        this.clearWheelCommitTimer();
        interact(this.imageBoxTarget).unset();
        interact(this.cropBoxTarget).unset();
        this.textLayerTarget.querySelectorAll('.image-editor-text').forEach((element) => interact(element).unset());
    }

    async loadImage() {
        this.setStatus('Loading image…');

        const image = new Image();
        image.decoding = 'async';
        image.onload = () => {
            this.image = image;
            this.state = this.buildInitialState();
            this.initialState = this.cloneState(this.state);
            this.loadingStateTarget.classList.add('hidden');
            this.renderAll(true);
            this.setStatus('Select mode lets you drag the image and resize it from the corner handles or with Image +/-.', 'success');
        };
        image.onerror = () => {
            this.loadingStateTarget.textContent = 'The image could not be loaded.';
            this.setStatus('The image could not be loaded into the editor.', 'error');
        };
        image.src = this.imageUrlValue;
    }

    buildInitialState() {
        return {
            version: 1,
            sourceBounds: {
                width: this.image.naturalWidth,
                height: this.image.naturalHeight,
            },
            crop: {
                x: 0,
                y: 0,
                width: 1,
                height: 1,
            },
            baseImage: {
                scale: 1,
                offsetX: 0,
                offsetY: 0,
            },
            texts: [],
        };
    }

    setTool(event) {
        this.setActiveTool(event.currentTarget.dataset.tool);
    }

    setActiveTool(tool, { render = true, updateStatus = true } = {}) {
        this.activeTool = tool;

        if (this.editingTextId) {
            this.exitTextEditing();
        }

        if (tool !== 'select' && this.selectedTextId) {
            this.selectedTextId = null;
        }

        if (updateStatus) {
            if (this.activeTool === 'crop') {
                this.setStatus('Drag or resize the crop frame to change the export area.');
            } else if (this.activeTool === 'text') {
                this.setStatus('Click anywhere on the image to add a new text layer.');
            } else {
                this.setStatus('Drag the image to reposition it, or resize it from the corner handles.');
            }
        }

        if (render) {
            this.renderAll();
        }
    }

    undo() {
        if (this.history.length === 0) {
            return;
        }

        this.clearWheelCommitTimer();
        this.future.push(this.cloneState(this.state));
        this.state = this.history.pop();
        this.selectedTextId = null;
        this.editingTextId = null;
        this.renderAll(true);
        this.setStatus('Undid the last change.');
    }

    redo() {
        if (this.future.length === 0) {
            return;
        }

        this.clearWheelCommitTimer();
        this.history.push(this.cloneState(this.state));
        this.state = this.future.pop();
        this.selectedTextId = null;
        this.editingTextId = null;
        this.renderAll(true);
        this.setStatus('Redid the last change.');
    }

    resetEditor() {
        if (!this.initialState) {
            return;
        }

        const previousState = this.cloneState(this.state);
        this.state = this.cloneState(this.initialState);
        this.selectedTextId = null;
        this.editingTextId = null;
        this.commitState(previousState);
        this.renderAll(true);
        this.setStatus('The editor was reset to its original state.');
    }

    decreaseImageScale() {
        this.adjustImageScale(-IMAGE_SCALE_STEP);
    }

    increaseImageScale() {
        this.adjustImageScale(IMAGE_SCALE_STEP);
    }

    adjustImageScale(delta) {
        if (!this.image) {
            return;
        }

        const previousState = this.cloneState(this.state);
        const anchorPoint = this.getCropCenterPoint();
        const nextScale = clamp(this.state.baseImage.scale + delta, MIN_IMAGE_SCALE, MAX_IMAGE_SCALE);
        this.applyImageScale(nextScale, anchorPoint);
        this.commitState(previousState);
        this.renderAll();
    }

    copyScript() {
        const serializedState = JSON.stringify(this.buildSerializableState(), null, 2);

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(serializedState)
                .then(() => {
                    this.setStatus('Script copied to your clipboard.', 'success');
                })
                .catch(() => {
                    this.openScriptModal({
                        mode: 'copy',
                        title: 'Copy Script',
                        hint: 'Clipboard access is unavailable here. Copy the script from this text box.',
                        content: serializedState,
                        confirmLabel: 'Close',
                        readOnly: true,
                    });
                });

            return;
        }

        this.openScriptModal({
            mode: 'copy',
            title: 'Copy Script',
            hint: 'Copy the script from this text box.',
            content: serializedState,
            confirmLabel: 'Close',
            readOnly: true,
        });
    }

    async openPasteModal() {
        let clipboardText = '';

        if (navigator.clipboard?.readText) {
            try {
                clipboardText = await navigator.clipboard.readText();
            } catch (error) {
                clipboardText = '';
            }
        }

        this.openScriptModal({
            mode: 'paste',
            title: 'Paste Script',
            hint: 'Paste an editor script to replace the current canvas state.',
            content: clipboardText,
            confirmLabel: 'Apply Script',
            readOnly: false,
        });
    }

    openScriptModal({ mode, title, hint, content, confirmLabel, readOnly }) {
        this.scriptModalMode = mode;
        this.scriptModalTitleTarget.textContent = title;
        this.scriptModalHintTarget.textContent = hint;
        this.scriptTextareaTarget.value = content;
        this.scriptTextareaTarget.readOnly = readOnly;
        this.scriptConfirmButtonTarget.textContent = confirmLabel;
        this.scriptModalTarget.classList.remove('hidden');
        this.scriptModalTarget.classList.add('flex');
        this.scriptTextareaTarget.focus();
        this.scriptTextareaTarget.select();
    }

    confirmScriptModal() {
        if (this.scriptModalMode === 'copy') {
            this.closeScriptModal();
            return;
        }

        try {
            const parsedScript = JSON.parse(this.scriptTextareaTarget.value);
            const previousState = this.cloneState(this.state);
            this.state = this.buildStateFromScript(parsedScript);
            this.selectedTextId = null;
            this.editingTextId = null;
            this.commitState(previousState);
            this.renderAll(true);
            this.closeScriptModal();
            this.setStatus('Script applied successfully.', 'success');
        } catch (error) {
            this.setStatus(error instanceof Error ? error.message : 'The script could not be applied.', 'error');
        }
    }

    closeScriptModal() {
        this.scriptModalTarget.classList.add('hidden');
        this.scriptModalTarget.classList.remove('flex');
    }

    closeScriptModalOnBackdrop(event) {
        if (event.target === this.scriptModalTarget) {
            this.closeScriptModal();
        }
    }

    downloadImage() {
        if (!this.image || !this.state) {
            return;
        }

        const output = this.renderExportCanvas();

        output.canvas.toBlob((blob) => {
            if (!blob) {
                this.setStatus('The edited image could not be prepared for download.', 'error');
                return;
            }

            const safeName = makeSafeFilename(this.assetNameValue || 'asset');
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${safeName}-edited.${output.extension}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(downloadUrl);
            this.setStatus('Edited image downloaded.', 'success');
        }, output.mimeType, output.mimeType === 'image/jpeg' ? 0.92 : undefined);
    }

    changeSelectedTextStyle(event) {
        const selectedText = this.getSelectedText();
        if (!selectedText) {
            return;
        }

        const property = event.currentTarget.dataset.styleProperty;
        const nextValue = property === 'fontSize'
            ? clamp(parseFloat(event.currentTarget.value || 0), 8, this.state.sourceBounds.height)
            : event.currentTarget.value;
        const previousState = this.cloneState(this.state);

        if (property === 'fontFamily') {
            selectedText[property] = normalizeFont(nextValue);
        } else if (property === 'color') {
            selectedText[property] = normalizeColor(nextValue);
        } else {
            selectedText[property] = nextValue;
        }

        this.commitState(previousState);
        this.renderAll();
    }

    toggleSelectedTextStyle(event) {
        const selectedText = this.getSelectedText();
        if (!selectedText) {
            return;
        }

        const property = event.currentTarget.dataset.styleProperty;
        const activeValue = event.currentTarget.dataset.styleValue;
        const defaultValue = event.currentTarget.dataset.defaultValue;
        const previousState = this.cloneState(this.state);

        selectedText[property] = selectedText[property] === activeValue ? defaultValue : activeValue;
        this.commitState(previousState);
        this.renderAll();
    }

    setSelectedTextAlign(event) {
        const selectedText = this.getSelectedText();
        if (!selectedText) {
            return;
        }

        const previousState = this.cloneState(this.state);
        selectedText.textAlign = event.currentTarget.dataset.styleValue;
        this.commitState(previousState);
        this.renderAll();
    }

    deleteSelectedText() {
        const selectedText = this.getSelectedText();
        if (!selectedText) {
            return;
        }

        this.deleteTextLayerById(selectedText.id);
    }

    handleWorkspaceMouseDown(event) {
        if (!this.state || event.button !== 0) {
            return;
        }

        if (
            event.target.closest('.image-editor-text')
            || event.target.closest('[data-image-editor-target="cropBox"]')
            || event.target.closest('[data-image-editor-target="imageBox"]')
        ) {
            return;
        }

        if (this.activeTool !== 'select') {
            this.selectText(null);
            return;
        }

        this.selectText(null);
        this.beginTransaction();
        this.isPanningImage = true;
        this.imagePanStart = {
            clientX: event.clientX,
            clientY: event.clientY,
            moved: false,
        };
        document.addEventListener('mousemove', this.boundHandleImagePanMove);
        document.addEventListener('mouseup', this.boundHandleImagePanEnd);
    }

    handleWorkspaceClick(event) {
        if (!this.state) {
            return;
        }

        if (this.suppressNextWorkspaceClick) {
            this.suppressNextWorkspaceClick = false;
            return;
        }

        if (event.target.closest('.image-editor-text') || event.target.closest('[data-image-editor-target="cropBox"]')) {
            return;
        }

        if (this.activeTool === 'text') {
            const sourcePoint = this.eventToSourcePoint(event);

            if (!sourcePoint) {
                return;
            }

            this.addTextLayer(sourcePoint);
            return;
        }

        this.selectText(null);
    }

    handleImagePanMove(event) {
        if (!this.isPanningImage || !this.imagePanStart) {
            return;
        }

        const metrics = this.getSurfaceMetrics();
        const deltaX = (event.clientX - this.imagePanStart.clientX) / metrics.scale / this.state.sourceBounds.width;
        const deltaY = (event.clientY - this.imagePanStart.clientY) / metrics.scale / this.state.sourceBounds.height;

        this.imagePanStart.clientX = event.clientX;
        this.imagePanStart.clientY = event.clientY;
        this.imagePanStart.moved = this.imagePanStart.moved || Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0;
        this.state.baseImage.offsetX += deltaX;
        this.state.baseImage.offsetY += deltaY;
        this.renderPreview();
        this.renderImageBox();
        this.updateImageScaleLabel();
    }

    handleImagePanEnd() {
        if (!this.isPanningImage) {
            return;
        }

        const moved = Boolean(this.imagePanStart?.moved);
        this.stopImagePan();
        this.finishTransaction();

        if (moved) {
            this.suppressNextWorkspaceClick = true;
            this.setStatus('Image repositioned.');
        }
    }

    stopImagePan() {
        this.isPanningImage = false;
        this.imagePanStart = null;
        document.removeEventListener('mousemove', this.boundHandleImagePanMove);
        document.removeEventListener('mouseup', this.boundHandleImagePanEnd);
    }

    handleWheel(event) {
        if (!this.state || !this.image) {
            return;
        }
    }

    initializeImageInteraction() {
        interact(this.imageBoxTarget)
            .draggable({
                ignoreFrom: '.image-editor-handle',
                listeners: {
                    start: (event) => {
                        if (this.activeTool !== 'select') {
                            event.interaction.stop();
                            return;
                        }

                        this.selectBaseImage();
                        this.beginTransaction();
                    },
                    move: (event) => {
                        if (this.activeTool !== 'select') {
                            return;
                        }

                        const metrics = this.getSurfaceMetrics();
                        this.state.baseImage.offsetX += event.dx / metrics.scale / this.state.sourceBounds.width;
                        this.state.baseImage.offsetY += event.dy / metrics.scale / this.state.sourceBounds.height;
                        this.renderPreview();
                        this.renderImageBox();
                    },
                    end: () => {
                        this.finishTransaction();
                        this.setStatus('Image repositioned.');
                    },
                },
            })
            .resizable({
                edges: HANDLE_EDGE_SELECTORS,
                listeners: {
                    start: (event) => {
                        if (this.activeTool !== 'select') {
                            event.interaction.stop();
                            return;
                        }

                        this.selectBaseImage();
                        this.beginTransaction();
                    },
                    move: (event) => {
                        if (this.activeTool !== 'select') {
                            return;
                        }

                        const metrics = this.getSurfaceMetrics();
                        const currentRect = this.getBaseImagePixelRect(metrics);
                        const nextRect = {
                            left: currentRect.left + event.deltaRect.left,
                            top: currentRect.top + event.deltaRect.top,
                            width: currentRect.width + event.deltaRect.width,
                            height: currentRect.height + event.deltaRect.height,
                        };

                        this.applyBaseImageResize(nextRect, event.edges, currentRect, metrics);
                        this.renderPreview();
                        this.renderImageBox();
                        this.updateImageScaleLabel();
                    },
                    end: () => {
                        this.finishTransaction();
                        this.setStatus('Image resized.');
                    },
                },
            });
    }

    handleResize() {
        if (!this.state) {
            return;
        }

        this.renderAll(true);
    }

    handleKeyDown(event) {
        const activeElement = document.activeElement;
        const isFormField = activeElement instanceof HTMLElement && (
            activeElement.isContentEditable ||
            ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName)
        );

        if (event.key === 'Escape' && !this.scriptModalTarget.classList.contains('hidden')) {
            this.closeScriptModal();
            return;
        }

        if (isFormField) {
            return;
        }

        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
            event.preventDefault();
            if (event.shiftKey) {
                this.redo();
            } else {
                this.undo();
            }
            return;
        }

        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'y') {
            event.preventDefault();
            this.redo();
            return;
        }

        if ((event.key === 'Delete' || event.key === 'Backspace') && this.selectedTextId) {
            event.preventDefault();
            this.deleteSelectedText();
        }
    }

    initializeCropInteraction() {
        interact(this.cropBoxTarget)
            .draggable({
                ignoreFrom: '.image-editor-handle',
                listeners: {
                    start: (event) => {
                        if (this.activeTool !== 'crop') {
                            event.interaction.stop();
                            return;
                        }

                        this.beginTransaction();
                    },
                    move: (event) => {
                        if (this.activeTool !== 'crop') {
                            return;
                        }

                        const metrics = this.getSurfaceMetrics();
                        const deltaX = event.dx / metrics.scale / this.state.sourceBounds.width;
                        const deltaY = event.dy / metrics.scale / this.state.sourceBounds.height;
                        this.state.crop.x += deltaX;
                        this.state.crop.y += deltaY;
                        this.clampCrop();
                        this.renderCropBox();
                        this.updateCropSummary();
                    },
                    end: () => {
                        this.finishTransaction();
                    },
                },
            })
            .resizable({
                edges: HANDLE_EDGE_SELECTORS,
                listeners: {
                    start: (event) => {
                        if (this.activeTool !== 'crop') {
                            event.interaction.stop();
                            return;
                        }

                        this.beginTransaction();
                    },
                    move: (event) => {
                        if (this.activeTool !== 'crop') {
                            return;
                        }

                        const metrics = this.getSurfaceMetrics();
                        const sourceWidth = this.state.sourceBounds.width;
                        const sourceHeight = this.state.sourceBounds.height;
                        const currentRect = this.getCropPixelRect(metrics);
                        const nextRect = {
                            left: currentRect.left + event.deltaRect.left,
                            top: currentRect.top + event.deltaRect.top,
                            width: currentRect.width + event.deltaRect.width,
                            height: currentRect.height + event.deltaRect.height,
                        };

                        this.state.crop = {
                            x: nextRect.left / metrics.scale / sourceWidth,
                            y: nextRect.top / metrics.scale / sourceHeight,
                            width: nextRect.width / metrics.scale / sourceWidth,
                            height: nextRect.height / metrics.scale / sourceHeight,
                        };

                        this.clampCrop();
                        this.renderCropBox();
                        this.updateCropSummary();
                    },
                    end: () => {
                        this.finishTransaction();
                    },
                },
            });
    }

    addTextLayer(sourcePoint) {
        const previousState = this.cloneState(this.state);
        const sourceWidth = this.state.sourceBounds.width;
        const sourceHeight = this.state.sourceBounds.height;
        const width = clamp(280 / sourceWidth, 0.12, 0.45);
        const height = clamp(120 / sourceHeight, 0.08, 0.3);
        const textLayer = {
            id: createTextId(),
            text: DEFAULT_TEXT,
            x: clamp((sourcePoint.x / sourceWidth) - (width / 2), 0, 1 - width),
            y: clamp((sourcePoint.y / sourceHeight) - (height / 2), 0, 1 - height),
            width,
            height,
            fontFamily: SUPPORTED_FONTS[0],
            fontSize: clamp(sourceHeight * 0.06, 24, 96),
            color: '#111827',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
        };

        this.state.texts.push(textLayer);
        this.selectedTextId = textLayer.id;
        this.editingTextId = null;
        this.commitState(previousState);
        this.renderAll(true);
        this.enterTextEditing(textLayer.id);
        this.setStatus('Text layer added.');
    }

    buildTextElement(textLayer) {
        const element = document.createElement('div');
        element.className = 'image-editor-text';
        element.dataset.textId = textLayer.id;
        element.spellcheck = false;

        const handles = ['tl', 'tr', 'bl', 'br'];
        handles.forEach((handle) => {
            const handleElement = document.createElement('span');
            handleElement.className = `image-editor-handle image-editor-handle-${handle}`;
            element.appendChild(handleElement);
        });

        element.addEventListener('mousedown', (event) => {
            event.stopPropagation();
            this.selectText(textLayer.id);
        });

        element.addEventListener('click', (event) => {
            event.stopPropagation();
            this.selectText(textLayer.id);
        });

        element.addEventListener('dblclick', (event) => {
            event.stopPropagation();
            this.enterTextEditing(textLayer.id);
        });

        element.addEventListener('input', (event) => {
            const targetText = this.findTextById(textLayer.id);
            if (targetText) {
                targetText.text = event.currentTarget.innerText;
            }
        });

        element.addEventListener('blur', () => {
            if (this.editingTextId === textLayer.id) {
                this.exitTextEditing();
            }
        });

        interact(element)
            .draggable({
                ignoreFrom: '.image-editor-handle, [contenteditable="true"]',
                listeners: {
                    start: (event) => {
                        if (this.activeTool !== 'select') {
                            event.interaction.stop();
                            return;
                        }

                        this.selectText(textLayer.id);
                        this.beginTransaction();
                    },
                    move: (event) => {
                        const text = this.findTextById(textLayer.id);
                        if (!text) {
                            return;
                        }

                        const metrics = this.getSurfaceMetrics();
                        text.x += event.dx / metrics.scale / this.state.sourceBounds.width;
                        text.y += event.dy / metrics.scale / this.state.sourceBounds.height;
                        this.clampText(text);
                        this.syncTextElements();
                    },
                    end: () => {
                        this.finishTransaction();
                    },
                },
            })
            .resizable({
                ignoreFrom: '.image-editor-handle, [contenteditable="true"]',
                edges: HANDLE_EDGE_SELECTORS,
                listeners: {
                    start: (event) => {
                        if (this.activeTool !== 'select') {
                            event.interaction.stop();
                            return;
                        }

                        this.selectText(textLayer.id);
                        this.beginTransaction();
                    },
                    move: (event) => {
                        const text = this.findTextById(textLayer.id);
                        if (!text) {
                            return;
                        }

                        const metrics = this.getSurfaceMetrics();
                        const currentRect = this.getTextPixelRect(text, metrics);
                        const nextRect = {
                            left: currentRect.left + event.deltaRect.left,
                            top: currentRect.top + event.deltaRect.top,
                            width: currentRect.width + event.deltaRect.width,
                            height: currentRect.height + event.deltaRect.height,
                        };

                        text.x = nextRect.left / metrics.scale / this.state.sourceBounds.width;
                        text.y = nextRect.top / metrics.scale / this.state.sourceBounds.height;
                        text.width = nextRect.width / metrics.scale / this.state.sourceBounds.width;
                        text.height = nextRect.height / metrics.scale / this.state.sourceBounds.height;
                        this.clampText(text);
                        this.syncTextElements();
                    },
                    end: () => {
                        this.finishTransaction();
                    },
                },
            });

        return element;
    }

    enterTextEditing(textId) {
        const textElement = this.textLayerTarget.querySelector(`[data-text-id="${textId}"]`);
        if (!textElement) {
            return;
        }

        this.selectText(textId);
        this.textEditSnapshot = this.cloneState(this.state);
        this.editingTextId = textId;
        this.syncTextElements();
        textElement.focus();
        placeCursorAtEnd(textElement);
        this.setStatus('Editing text layer.');
    }

    exitTextEditing() {
        if (!this.editingTextId) {
            return;
        }

        const previousState = this.textEditSnapshot;
        this.editingTextId = null;
        this.textEditSnapshot = null;
        if (previousState) {
            this.commitState(previousState);
        }
        this.renderAll();
    }

    selectText(textId) {
        this.selectedTextId = textId;
        if (!textId) {
            this.editingTextId = null;
        }
        this.refreshInspector();
        this.renderLayers();
        this.renderImageBox();
        this.syncTextElements();
        this.updateSelectionSummary();
    }

    renderAll(forceLayout = false) {
        if (!this.state || !this.image) {
            return;
        }

        this.getSurfaceMetrics(forceLayout);
        this.updateSurfaceLayout();
        this.renderPreview();
        this.renderImageBox();
        this.renderCropBox();
        this.syncTextElements();
        this.refreshInspector();
        this.renderLayers();
        this.updateHistoryButtons();
        this.updateSelectionSummary();
        this.updateCropSummary();
        this.updateImageScaleLabel();
        this.updateToolButtons();
    }

    renderPreview() {
        const metrics = this.getSurfaceMetrics();
        const devicePixelRatio = window.devicePixelRatio || 1;
        const width = Math.max(1, Math.round(metrics.width));
        const height = Math.max(1, Math.round(metrics.height));

        this.canvasTarget.width = Math.round(width * devicePixelRatio);
        this.canvasTarget.height = Math.round(height * devicePixelRatio);
        this.canvasTarget.style.width = `${width}px`;
        this.canvasTarget.style.height = `${height}px`;

        const context = this.canvasTarget.getContext('2d');
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);
        context.save();
        context.scale(metrics.scale, metrics.scale);
        this.drawBaseImage(context);
        context.restore();
    }

    drawBaseImage(context) {
        const sourceWidth = this.state.sourceBounds.width;
        const sourceHeight = this.state.sourceBounds.height;

        context.save();
        this.applyBaseImageTransform(context);
        context.drawImage(this.image, 0, 0, sourceWidth, sourceHeight);
        context.restore();
    }

    applyBaseImageTransform(context) {
        const sourceWidth = this.state.sourceBounds.width;
        const sourceHeight = this.state.sourceBounds.height;
        const { scale, offsetX, offsetY } = this.state.baseImage;

        context.translate(offsetX * sourceWidth, offsetY * sourceHeight);
        context.translate(sourceWidth / 2, sourceHeight / 2);
        context.scale(scale, scale);
        context.translate(-sourceWidth / 2, -sourceHeight / 2);
    }

    renderCropBox() {
        const cropRect = this.getCropPixelRect();
        this.cropBoxTarget.style.left = `${cropRect.left}px`;
        this.cropBoxTarget.style.top = `${cropRect.top}px`;
        this.cropBoxTarget.style.width = `${cropRect.width}px`;
        this.cropBoxTarget.style.height = `${cropRect.height}px`;
        this.cropBoxTarget.classList.toggle('is-inactive', this.activeTool !== 'crop');
    }

    renderImageBox() {
        const imageRect = this.getBaseImagePixelRect();
        const isVisible = this.activeTool === 'select' && !this.selectedTextId;
        this.imageBoxTarget.style.left = `${imageRect.left}px`;
        this.imageBoxTarget.style.top = `${imageRect.top}px`;
        this.imageBoxTarget.style.width = `${imageRect.width}px`;
        this.imageBoxTarget.style.height = `${imageRect.height}px`;
        this.imageBoxTarget.classList.toggle('hidden', !isVisible);
    }

    syncTextElements() {
        const existingElements = new Map(
            Array.from(this.textLayerTarget.querySelectorAll('.image-editor-text')).map((element) => [element.dataset.textId, element])
        );

        const activeIds = new Set(this.state.texts.map((text) => text.id));

        existingElements.forEach((element, id) => {
            if (!activeIds.has(id)) {
                interact(element).unset();
                element.remove();
            }
        });

        this.state.texts.forEach((textLayer) => {
            let element = existingElements.get(textLayer.id);

            if (!element) {
                element = this.buildTextElement(textLayer);
                this.textLayerTarget.appendChild(element);
            }

            this.updateTextElement(element, textLayer);
        });
    }

    updateTextElement(element, textLayer) {
        const textRect = this.getTextPixelRect(textLayer);
        element.style.left = `${textRect.left}px`;
        element.style.top = `${textRect.top}px`;
        element.style.width = `${textRect.width}px`;
        element.style.height = `${textRect.height}px`;
        element.style.fontFamily = buildCssFontFamily(textLayer.fontFamily);
        element.style.fontSize = `${Math.max(textLayer.fontSize * this.surfaceMetrics.scale, 12)}px`;
        element.style.fontWeight = textLayer.fontWeight;
        element.style.fontStyle = textLayer.fontStyle;
        element.style.color = textLayer.color;
        element.style.textAlign = textLayer.textAlign;
        element.classList.toggle('is-selected', this.selectedTextId === textLayer.id);
        element.classList.toggle('is-editing', this.editingTextId === textLayer.id);
        element.setAttribute('contenteditable', this.editingTextId === textLayer.id ? 'true' : 'false');

        if (this.editingTextId !== textLayer.id && element.innerText !== textLayer.text) {
            element.textContent = textLayer.text;
        }
    }

    renderLayers() {
        const totalLayers = this.state.texts.length + 2;
        this.layerCountTarget.textContent = `${totalLayers} ${totalLayers === 1 ? 'layer' : 'layers'}`;
        this.layersListTarget.innerHTML = '';

        const layers = [
            ...this.state.texts.map((text, index) => ({ type: 'text', text, index })).reverse(),
            { type: 'crop' },
            { type: 'image' },
        ];

        layers.forEach((layer) => {
            this.layersListTarget.appendChild(this.buildLayerRow(layer));
        });
    }

    buildLayerRow(layer) {
        const row = document.createElement('div');
        row.className = 'image-editor-layer-row';

        const isSelected = layer.type === 'text'
            ? this.selectedTextId === layer.text.id
            : layer.type === 'crop'
                ? this.activeTool === 'crop' && !this.selectedTextId
                : this.activeTool === 'select' && !this.selectedTextId;

        if (isSelected) {
            row.classList.add('is-selected');
        }

        const mainButton = document.createElement('button');
        mainButton.type = 'button';
        mainButton.className = 'image-editor-layer-main';
        mainButton.addEventListener('click', () => {
            this.activateLayer(layer);
        });

        const icon = document.createElement('span');
        icon.className = 'image-editor-layer-icon';
        icon.textContent = layer.type === 'text' ? 'T' : layer.type === 'crop' ? 'C' : 'IMG';

        const textWrap = document.createElement('div');
        textWrap.className = 'image-editor-layer-text';

        const title = document.createElement('div');
        title.className = 'image-editor-layer-title';
        title.textContent = this.getLayerTitle(layer);

        const subtitle = document.createElement('div');
        subtitle.className = 'image-editor-layer-subtitle';
        subtitle.textContent = this.getLayerSubtitle(layer);

        textWrap.append(title, subtitle);
        mainButton.append(icon, textWrap);
        row.appendChild(mainButton);

        if (layer.type === 'text') {
            const actions = document.createElement('div');
            actions.className = 'image-editor-layer-actions';
            actions.append(
                this.createLayerAction('↑', 'Bring Forward', layer.index >= this.state.texts.length - 1, () => this.moveTextLayer(layer.text.id, 1)),
                this.createLayerAction('↓', 'Send Backward', layer.index <= 0, () => this.moveTextLayer(layer.text.id, -1)),
                this.createLayerAction('×', 'Delete Layer', false, () => this.deleteTextLayerById(layer.text.id))
            );
            row.appendChild(actions);
        }

        return row;
    }

    createLayerAction(label, title, disabled, handler) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'image-editor-layer-action';
        button.textContent = label;
        button.title = title;
        button.disabled = disabled;
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!disabled) {
                handler();
            }
        });

        return button;
    }

    activateLayer(layer) {
        if (layer.type === 'text') {
            this.selectedTextId = layer.text.id;
            this.editingTextId = null;
            this.activeTool = 'select';
            this.renderAll();
            this.setStatus(`Selected ${truncateText(layer.text.text || 'text layer', 24)}.`);
            return;
        }

        this.selectText(null);
        this.setActiveTool(layer.type === 'crop' ? 'crop' : 'select');
    }

    moveTextLayer(textId, delta) {
        const index = this.state.texts.findIndex((text) => text.id === textId);
        const nextIndex = index + delta;

        if (index < 0 || nextIndex < 0 || nextIndex >= this.state.texts.length) {
            return;
        }

        const previousState = this.cloneState(this.state);
        [this.state.texts[index], this.state.texts[nextIndex]] = [this.state.texts[nextIndex], this.state.texts[index]];
        this.selectedTextId = textId;
        this.commitState(previousState);
        this.renderAll();
        this.setStatus('Layer order updated.');
    }

    deleteTextLayerById(textId) {
        const textLayer = this.findTextById(textId);
        if (!textLayer) {
            return;
        }

        const previousState = this.cloneState(this.state);
        this.state.texts = this.state.texts.filter((text) => text.id !== textId);

        if (this.selectedTextId === textId) {
            this.selectedTextId = null;
        }
        if (this.editingTextId === textId) {
            this.editingTextId = null;
        }

        this.commitState(previousState);
        this.renderAll(true);
        this.setStatus(`Deleted ${truncateText(textLayer.text || 'text layer', 24)}.`);
    }

    getLayerTitle(layer) {
        if (layer.type === 'image') {
            return 'Base image';
        }

        if (layer.type === 'crop') {
            return 'Crop frame';
        }

        return truncateText(layer.text.text || 'Untitled text', 28);
    }

    getLayerSubtitle(layer) {
        if (layer.type === 'image') {
            return `Scale ${Math.round(this.state.baseImage.scale * 100)}%`;
        }

        if (layer.type === 'crop') {
            return `${Math.round(this.state.crop.width * 100)}% × ${Math.round(this.state.crop.height * 100)}% export area`;
        }

        const fontSize = Math.round(layer.text.fontSize);
        return `${layer.text.fontFamily} • ${fontSize}px`;
    }

    getPropertiesEmptyState() {
        if (this.activeTool === 'crop') {
            return {
                title: 'Crop frame active',
                message: 'Resize or drag the crop frame directly on the canvas to change the export area.',
            };
        }

        if (this.activeTool === 'text') {
            return {
                title: 'Add a text layer',
                message: 'Click anywhere on the canvas to add a new text layer, then select it to edit its properties.',
            };
        }

        return {
            title: 'Base image selected',
            message: 'Use Select mode to drag the image or resize it from the corner handles, or choose a text layer from Layers to edit its properties.',
        };
    }

    refreshInspector() {
        const selectedText = this.getSelectedText();

        if (!selectedText) {
            this.propertiesEmptyStateTarget.classList.remove('hidden');
            this.textInspectorTarget.classList.add('hidden');
            const emptyState = this.getPropertiesEmptyState();
            this.propertiesEmptyTitleTarget.textContent = emptyState.title;
            this.propertiesEmptyMessageTarget.textContent = emptyState.message;
            return;
        }

        this.propertiesEmptyStateTarget.classList.add('hidden');
        this.textInspectorTarget.classList.remove('hidden');
        this.fontFamilySelectTarget.value = normalizeFont(selectedText.fontFamily);
        this.fontSizeInputTarget.value = String(Math.round(selectedText.fontSize));
        this.colorInputTarget.value = normalizeColor(selectedText.color);
        toggleActiveFormat(this.boldButtonTarget, selectedText.fontWeight === 'bold');
        toggleActiveFormat(this.italicButtonTarget, selectedText.fontStyle === 'italic');
        this.alignButtonTargets.forEach((button) => {
            toggleActiveFormat(button, button.dataset.styleValue === selectedText.textAlign);
        });
    }

    updateSelectionSummary() {
        const selectedText = this.getSelectedText();
        if (selectedText) {
            this.selectionSummaryTarget.textContent = `Selected text: ${truncateText(selectedText.text || 'Untitled', 28)}`;
            return;
        }

        if (this.activeTool === 'crop') {
            this.selectionSummaryTarget.textContent = 'Crop frame selected';
            return;
        }

        this.selectionSummaryTarget.textContent = this.activeTool === 'text'
            ? 'Text tool active'
            : 'Base image selected';
    }

    updateCropSummary() {
        const widthPercent = Math.round(this.state.crop.width * 100);
        const heightPercent = Math.round(this.state.crop.height * 100);
        this.cropSummaryTarget.textContent = `Crop: ${widthPercent}% × ${heightPercent}%`;
    }

    updateImageScaleLabel() {
        this.imageScaleLabelTarget.textContent = `${Math.round(this.state.baseImage.scale * 100)}%`;
    }

    updateHistoryButtons() {
        this.undoButtonTarget.disabled = this.history.length === 0;
        this.redoButtonTarget.disabled = this.future.length === 0;
    }

    updateToolButtons() {
        this.toolButtons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.tool === this.activeTool);
        });
    }

    updateSurfaceLayout() {
        this.surfaceTarget.style.width = `${this.surfaceMetrics.width}px`;
        this.surfaceTarget.style.height = `${this.surfaceMetrics.height}px`;
        this.surfaceTarget.style.left = `${this.surfaceMetrics.left}px`;
        this.surfaceTarget.style.top = `${this.surfaceMetrics.top}px`;
    }

    renderExportCanvas() {
        const sourceCanvas = document.createElement('canvas');
        sourceCanvas.width = this.state.sourceBounds.width;
        sourceCanvas.height = this.state.sourceBounds.height;
        const sourceContext = sourceCanvas.getContext('2d');

        if (this.getOutputMimeType() === 'image/jpeg') {
            sourceContext.fillStyle = '#ffffff';
            sourceContext.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
        } else {
            sourceContext.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
        }

        this.drawBaseImage(sourceContext);
        this.drawTextLayersToCanvas(sourceContext);

        const cropRect = this.getCropSourceRect();
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = Math.max(1, Math.round(cropRect.width));
        exportCanvas.height = Math.max(1, Math.round(cropRect.height));
        const exportContext = exportCanvas.getContext('2d');

        if (this.getOutputMimeType() === 'image/jpeg') {
            exportContext.fillStyle = '#ffffff';
            exportContext.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        } else {
            exportContext.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
        }

        exportContext.drawImage(
            sourceCanvas,
            cropRect.left,
            cropRect.top,
            cropRect.width,
            cropRect.height,
            0,
            0,
            exportCanvas.width,
            exportCanvas.height
        );

        return {
            canvas: exportCanvas,
            mimeType: this.getOutputMimeType(),
            extension: this.getOutputExtension(),
        };
    }

    drawTextLayersToCanvas(context) {
        this.state.texts.forEach((textLayer) => {
            const x = textLayer.x * this.state.sourceBounds.width;
            const y = textLayer.y * this.state.sourceBounds.height;
            const width = Math.max(textLayer.width * this.state.sourceBounds.width, 1);
            const height = Math.max(textLayer.height * this.state.sourceBounds.height, 1);

            context.save();
            context.beginPath();
            context.rect(x, y, width, height);
            context.clip();
            context.fillStyle = textLayer.color;
            context.textBaseline = 'top';
            context.textAlign = textLayer.textAlign;
            context.font = buildCanvasFont(textLayer);

            const lines = wrapTextLines(context, textLayer.text, width);
            const lineHeight = textLayer.fontSize * 1.2;
            const drawX = textLayer.textAlign === 'center'
                ? x + (width / 2)
                : textLayer.textAlign === 'right'
                    ? x + width
                    : x;

            lines.forEach((line, index) => {
                const drawY = y + (index * lineHeight);
                if (drawY + lineHeight <= y + height) {
                    context.fillText(line, drawX, drawY);
                }
            });

            context.restore();
        });
    }

    beginTransaction() {
        if (!this.transactionState) {
            this.transactionState = this.cloneState(this.state);
        }
    }

    finishTransaction() {
        if (!this.transactionState) {
            return;
        }

        const previousState = this.transactionState;
        this.transactionState = null;
        this.commitState(previousState);
        this.renderAll();
    }

    commitState(previousState) {
        if (!previousState || statesEqual(previousState, this.state)) {
            return;
        }

        this.history.push(previousState);
        if (this.history.length > HISTORY_LIMIT) {
            this.history.shift();
        }

        this.future = [];
    }

    clearWheelCommitTimer() {
        clearTimeout(this.wheelCommitTimer);
        this.wheelCommitTimer = null;
    }

    applyImageScale(nextScale, anchorPoint) {
        const currentScale = this.state.baseImage.scale;
        if (nextScale === currentScale) {
            return;
        }

        const sourceWidth = this.state.sourceBounds.width;
        const sourceHeight = this.state.sourceBounds.height;
        const centerX = sourceWidth / 2;
        const centerY = sourceHeight / 2;
        const offsetX = this.state.baseImage.offsetX * sourceWidth;
        const offsetY = this.state.baseImage.offsetY * sourceHeight;
        const nextOffsetX = offsetX + ((anchorPoint.x - centerX) * (currentScale - nextScale));
        const nextOffsetY = offsetY + ((anchorPoint.y - centerY) * (currentScale - nextScale));

        this.state.baseImage.scale = nextScale;
        this.state.baseImage.offsetX = nextOffsetX / sourceWidth;
        this.state.baseImage.offsetY = nextOffsetY / sourceHeight;
    }

    applyBaseImageResize(nextRect, edges, currentRect, metrics) {
        const sourceWidth = this.state.sourceBounds.width;
        const sourceHeight = this.state.sourceBounds.height;
        const nextScale = clamp(
            Math.max(
                nextRect.width / metrics.scale / sourceWidth,
                nextRect.height / metrics.scale / sourceHeight
            ),
            MIN_IMAGE_SCALE,
            MAX_IMAGE_SCALE
        );
        const scaledWidth = nextScale * sourceWidth * metrics.scale;
        const scaledHeight = nextScale * sourceHeight * metrics.scale;
        const anchorX = edges.left ? currentRect.left + currentRect.width : currentRect.left;
        const anchorY = edges.top ? currentRect.top + currentRect.height : currentRect.top;
        const nextLeft = edges.left ? anchorX - scaledWidth : anchorX;
        const nextTop = edges.top ? anchorY - scaledHeight : anchorY;
        const centerX = sourceWidth / 2;
        const centerY = sourceHeight / 2;
        const leftSource = nextLeft / metrics.scale;
        const topSource = nextTop / metrics.scale;

        this.state.baseImage.scale = nextScale;
        this.state.baseImage.offsetX = (leftSource + ((nextScale * sourceWidth) / 2) - centerX) / sourceWidth;
        this.state.baseImage.offsetY = (topSource + ((nextScale * sourceHeight) / 2) - centerY) / sourceHeight;
    }

    eventToSourcePoint(event) {
        const surfaceRect = this.surfaceTarget.getBoundingClientRect();
        const relativeX = event.clientX - surfaceRect.left;
        const relativeY = event.clientY - surfaceRect.top;

        if (relativeX < 0 || relativeY < 0 || relativeX > surfaceRect.width || relativeY > surfaceRect.height) {
            return null;
        }

        return {
            x: relativeX / this.surfaceMetrics.scale,
            y: relativeY / this.surfaceMetrics.scale,
        };
    }

    selectBaseImage() {
        this.selectText(null);
    }

    clampCrop() {
        const minWidth = Math.max(40 / this.state.sourceBounds.width, 0.05);
        const minHeight = Math.max(40 / this.state.sourceBounds.height, 0.05);

        this.state.crop.width = clamp(this.state.crop.width, minWidth, 1);
        this.state.crop.height = clamp(this.state.crop.height, minHeight, 1);
        this.state.crop.x = clamp(this.state.crop.x, 0, 1 - this.state.crop.width);
        this.state.crop.y = clamp(this.state.crop.y, 0, 1 - this.state.crop.height);
    }

    clampText(text) {
        const minWidth = Math.max(40 / this.state.sourceBounds.width, 0.04);
        const minHeight = Math.max(40 / this.state.sourceBounds.height, 0.04);
        text.width = clamp(text.width, minWidth, 1);
        text.height = clamp(text.height, minHeight, 1);
        text.x = clamp(text.x, 0, 1 - text.width);
        text.y = clamp(text.y, 0, 1 - text.height);
        text.fontSize = clamp(text.fontSize, 8, this.state.sourceBounds.height);
        text.fontFamily = normalizeFont(text.fontFamily);
        text.color = normalizeColor(text.color);
        text.fontWeight = text.fontWeight === 'bold' ? 'bold' : 'normal';
        text.fontStyle = text.fontStyle === 'italic' ? 'italic' : 'normal';
        text.textAlign = normalizeTextAlign(text.textAlign);
    }

    getSurfaceMetrics(force = false) {
        if (this.surfaceMetrics && !force) {
            return this.surfaceMetrics;
        }

        const sourceWidth = this.state.sourceBounds.width;
        const sourceHeight = this.state.sourceBounds.height;
        const workspaceWidth = Math.max(this.workspaceTarget.clientWidth - 32, 200);
        const workspaceHeight = Math.max(this.workspaceTarget.clientHeight - 32, 200);
        const scale = Math.min(workspaceWidth / sourceWidth, workspaceHeight / sourceHeight);
        const width = sourceWidth * scale;
        const height = sourceHeight * scale;

        this.surfaceMetrics = {
            scale,
            width,
            height,
            left: (this.workspaceTarget.clientWidth - width) / 2,
            top: (this.workspaceTarget.clientHeight - height) / 2,
        };

        return this.surfaceMetrics;
    }

    getCropPixelRect(metrics = this.getSurfaceMetrics()) {
        return {
            left: this.state.crop.x * this.state.sourceBounds.width * metrics.scale,
            top: this.state.crop.y * this.state.sourceBounds.height * metrics.scale,
            width: this.state.crop.width * this.state.sourceBounds.width * metrics.scale,
            height: this.state.crop.height * this.state.sourceBounds.height * metrics.scale,
        };
    }

    getBaseImagePixelRect(metrics = this.getSurfaceMetrics()) {
        const sourceWidth = this.state.sourceBounds.width;
        const sourceHeight = this.state.sourceBounds.height;
        const scaledWidth = this.state.baseImage.scale * sourceWidth;
        const scaledHeight = this.state.baseImage.scale * sourceHeight;
        const left = ((this.state.baseImage.offsetX * sourceWidth) + ((sourceWidth - scaledWidth) / 2)) * metrics.scale;
        const top = ((this.state.baseImage.offsetY * sourceHeight) + ((sourceHeight - scaledHeight) / 2)) * metrics.scale;

        return {
            left,
            top,
            width: scaledWidth * metrics.scale,
            height: scaledHeight * metrics.scale,
        };
    }

    getTextPixelRect(textLayer, metrics = this.getSurfaceMetrics()) {
        return {
            left: textLayer.x * this.state.sourceBounds.width * metrics.scale,
            top: textLayer.y * this.state.sourceBounds.height * metrics.scale,
            width: Math.max(textLayer.width * this.state.sourceBounds.width * metrics.scale, 24),
            height: Math.max(textLayer.height * this.state.sourceBounds.height * metrics.scale, 24),
        };
    }

    getCropSourceRect() {
        return {
            left: this.state.crop.x * this.state.sourceBounds.width,
            top: this.state.crop.y * this.state.sourceBounds.height,
            width: this.state.crop.width * this.state.sourceBounds.width,
            height: this.state.crop.height * this.state.sourceBounds.height,
        };
    }

    getCropCenterPoint() {
        const cropRect = this.getCropSourceRect();
        return {
            x: cropRect.left + (cropRect.width / 2),
            y: cropRect.top + (cropRect.height / 2),
        };
    }

    getSelectedText() {
        if (!this.selectedTextId) {
            return null;
        }

        return this.findTextById(this.selectedTextId);
    }

    findTextById(textId) {
        return this.state.texts.find((text) => text.id === textId) ?? null;
    }

    buildSerializableState() {
        return this.cloneState(this.state);
    }

    buildStateFromScript(parsedScript) {
        if (!parsedScript || parsedScript.version !== 1) {
            throw new Error('Only version 1 editor scripts can be applied.');
        }

        if (!parsedScript.crop || !parsedScript.baseImage || !Array.isArray(parsedScript.texts)) {
            throw new Error('The script is missing one or more required fields.');
        }

        const sourceHeightRatio = parsedScript.sourceBounds?.height
            ? this.state.sourceBounds.height / parsedScript.sourceBounds.height
            : 1;

        const nextState = {
            version: 1,
            sourceBounds: {
                width: this.state.sourceBounds.width,
                height: this.state.sourceBounds.height,
            },
            crop: {
                x: Number(parsedScript.crop.x),
                y: Number(parsedScript.crop.y),
                width: Number(parsedScript.crop.width),
                height: Number(parsedScript.crop.height),
            },
            baseImage: {
                scale: clamp(Number(parsedScript.baseImage.scale), MIN_IMAGE_SCALE, MAX_IMAGE_SCALE),
                offsetX: Number(parsedScript.baseImage.offsetX),
                offsetY: Number(parsedScript.baseImage.offsetY),
            },
            texts: parsedScript.texts.map((text) => ({
                id: createTextId(),
                text: typeof text.text === 'string' ? text.text : '',
                x: Number(text.x),
                y: Number(text.y),
                width: Number(text.width),
                height: Number(text.height),
                fontFamily: normalizeFont(text.fontFamily),
                fontSize: clamp(Number(text.fontSize) * sourceHeightRatio, 8, this.state.sourceBounds.height),
                color: normalizeColor(text.color),
                fontWeight: text.fontWeight === 'bold' ? 'bold' : 'normal',
                fontStyle: text.fontStyle === 'italic' ? 'italic' : 'normal',
                textAlign: normalizeTextAlign(text.textAlign),
            })),
        };

        if (!Number.isFinite(nextState.crop.x) || !Number.isFinite(nextState.crop.y) || !Number.isFinite(nextState.crop.width) || !Number.isFinite(nextState.crop.height)) {
            throw new Error('The script crop values are invalid.');
        }

        this.clampStateCopy(nextState);
        return nextState;
    }

    clampStateCopy(state) {
        const minCropWidth = Math.max(40 / state.sourceBounds.width, 0.05);
        const minCropHeight = Math.max(40 / state.sourceBounds.height, 0.05);

        state.crop.width = clamp(state.crop.width, minCropWidth, 1);
        state.crop.height = clamp(state.crop.height, minCropHeight, 1);
        state.crop.x = clamp(state.crop.x, 0, 1 - state.crop.width);
        state.crop.y = clamp(state.crop.y, 0, 1 - state.crop.height);
        state.baseImage.scale = clamp(state.baseImage.scale, MIN_IMAGE_SCALE, MAX_IMAGE_SCALE);
        state.baseImage.offsetX = Number.isFinite(state.baseImage.offsetX) ? state.baseImage.offsetX : 0;
        state.baseImage.offsetY = Number.isFinite(state.baseImage.offsetY) ? state.baseImage.offsetY : 0;
        state.texts.forEach((text) => {
            text.width = clamp(text.width, Math.max(40 / state.sourceBounds.width, 0.04), 1);
            text.height = clamp(text.height, Math.max(40 / state.sourceBounds.height, 0.04), 1);
            text.x = clamp(text.x, 0, 1 - text.width);
            text.y = clamp(text.y, 0, 1 - text.height);
        });
    }

    getOutputMimeType() {
        return this.mimeTypeValue === 'image/gif' ? 'image/png' : this.mimeTypeValue;
    }

    getOutputExtension() {
        return this.getOutputMimeType() === 'image/jpeg'
            ? 'jpg'
            : this.getOutputMimeType().split('/')[1];
    }

    cloneState(state) {
        return JSON.parse(JSON.stringify(state));
    }

    setStatus(message, tone = 'info') {
        this.statusTarget.textContent = message;
        this.statusTarget.classList.remove('text-slate-500', 'text-green-600', 'text-red-600');

        if (tone === 'success') {
            this.statusTarget.classList.add('text-green-600');
        } else if (tone === 'error') {
            this.statusTarget.classList.add('text-red-600');
        } else {
            this.statusTarget.classList.add('text-slate-500');
        }
    }
}

function buildCanvasFont(textLayer) {
    const weight = textLayer.fontWeight === 'bold' ? 'bold' : 'normal';
    const style = textLayer.fontStyle === 'italic' ? 'italic' : 'normal';
    const family = textLayer.fontFamily.includes(' ')
        ? `"${textLayer.fontFamily}"`
        : textLayer.fontFamily;

    return `${style} ${weight} ${textLayer.fontSize}px ${family}`;
}

function buildCssFontFamily(fontFamily) {
    const normalizedFont = normalizeFont(fontFamily);
    return normalizedFont.includes(' ')
        ? `"${normalizedFont}", sans-serif`
        : `${normalizedFont}, sans-serif`;
}

function wrapTextLines(context, rawText, maxWidth) {
    const paragraphs = String(rawText ?? '').split('\n');
    const lines = [];

    paragraphs.forEach((paragraph) => {
        if (paragraph === '') {
            lines.push('');
            return;
        }

        const words = paragraph.split(/\s+/);
        let currentLine = '';

        words.forEach((word) => {
            const candidate = currentLine ? `${currentLine} ${word}` : word;

            if (context.measureText(candidate).width <= maxWidth) {
                currentLine = candidate;
                return;
            }

            if (currentLine) {
                lines.push(currentLine);
            }

            if (context.measureText(word).width <= maxWidth) {
                currentLine = word;
                return;
            }

            const brokenWord = breakWord(context, word, maxWidth);
            brokenWord.slice(0, -1).forEach((piece) => lines.push(piece));
            currentLine = brokenWord.at(-1) ?? '';
        });

        lines.push(currentLine);
    });

    return lines;
}

function breakWord(context, word, maxWidth) {
    const pieces = [];
    let buffer = '';

    [...word].forEach((character) => {
        const candidate = `${buffer}${character}`;

        if (context.measureText(candidate).width <= maxWidth || buffer === '') {
            buffer = candidate;
            return;
        }

        pieces.push(buffer);
        buffer = character;
    });

    if (buffer) {
        pieces.push(buffer);
    }

    return pieces;
}

function truncateText(text, limit) {
    return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function normalizeFont(fontFamily) {
    return SUPPORTED_FONTS.includes(fontFamily) ? fontFamily : SUPPORTED_FONTS[0];
}

function normalizeColor(color) {
    return /^#[0-9a-f]{6}$/i.test(String(color ?? '')) ? color.toLowerCase() : '#111827';
}

function normalizeTextAlign(textAlign) {
    return ['left', 'center', 'right'].includes(textAlign) ? textAlign : 'left';
}

function placeCursorAtEnd(element) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

function toggleActiveFormat(element, isActive) {
    element.classList.toggle('image-editor-format-active', isActive);
}

function clamp(value, min, max) {
    if (!Number.isFinite(value)) {
        return min;
    }

    return Math.min(Math.max(value, min), max);
}

function statesEqual(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
}

function makeSafeFilename(value) {
    return String(value ?? 'asset')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'asset';
}

function createTextId() {
    return globalThis.crypto?.randomUUID?.() ?? `text-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function generateUploadKey() {
    if (globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
    }

    return `upload-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSafeExtension(filename) {
    const match = filename.match(/\.([A-Za-z0-9]{1,20})$/);

    if (!match) {
        return '';
    }

    return `.${match[1].toLowerCase()}`;
}

export function createTusUploadMetadata(file, shareToken = null) {
    const uploadKey = generateUploadKey();
    const metadata = {
        filename: `${uploadKey}${getSafeExtension(file.name)}`,
        original_filename: file.name,
        filetype: file.type || 'application/octet-stream',
    };

    if (shareToken) {
        metadata.share_token = shareToken;
    }

    return {
        uploadKey,
        metadata,
    };
}

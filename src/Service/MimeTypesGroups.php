<?php

namespace App\Service;

class MimeTypesGroups
{
    static public function getMimeTypes(string $group): array
    {
        $map = [
            'images' => ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/tiff', 'image/svg+xml', 'image/x-eps'],
            'videos' => ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
            'audio' => ['audio/mpeg', 'audio/wav', 'audio/aiff'],
            'documents' => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            '3d' => ['model/gltf-binary', 'model/obj'],
            'code' => ['text/html', 'text/css', 'application/javascript'],
            'zip' => ['application/zip'],
        ];

        return $map[$group] ?? [];
    }
}

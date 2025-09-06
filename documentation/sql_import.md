# SQL Import From FTP

```mysql
-- ====================================================================
SET @filePathRoot = '/';
SET @thumbnailPathRoot = '/';
-- ====================================================================

SELECT
    f.name AS `name`,
    f.description AS `description`,
    CONCAT(@filePathRoot, f.url) AS `filePath`,
    CONCAT(@thumbnailPathRoot, f.thumbnail) AS `thumbnailPath`,
    CASE f.color_format
        WHEN 1 THEN 'cmyk'
        ELSE 'rgb'
    END AS `colorSpace`,
    CASE f.status
        WHEN 1 THEN 'active'
        ELSE 'inactive'
    END AS `status`,
    f.date_available AS `embargoDate`,
    CASE
        WHEN f.date_expire > DATE_ADD(CURDATE(), INTERVAL 5 YEAR) THEN NULL
        ELSE f.date_expire
    END AS `expirationDate`,
    1 AS `uploadedby`,
    f.item AS `itemcode`,
    (SELECT GROUP_CONCAT(b.name SEPARATOR ', ') FROM brands b JOIN files_to_brands ftb ON b.id = ftb.brands_id WHERE ftb.files_id = f.id) AS `brand`,
    (SELECT GROUP_CONCAT(c.name SEPARATOR ', ') FROM categories c JOIN files_to_categories ftc ON c.id = ftc.categories_id WHERE ftc.files_id = f.id) AS `category`,
    CASE
        WHEN col.name = 'core' THEN NULL
        WHEN col.name REGEXP ' [0-9]{4}$' THEN SUBSTRING(col.name, 1, LENGTH(col.name) - 5)
        ELSE col.name
    END AS `collection`,
    CASE
        WHEN col.name REGEXP ' [0-9]{4}$' THEN RIGHT(col.name, 4)
        ELSE NULL
    END AS `collection_year`,
    NULL AS `tag`
FROM
    files f
LEFT JOIN
    collections col ON f.collection_id = col.id
WHERE
    f.url IS NOT NULL AND f.url != ''

UNION ALL

SELECT
    f.name AS `name`,
    f.description AS `description`,
    CONCAT(@filePathRoot, ftw.url_workers) AS `filePath`,
    CONCAT(@thumbnailPathRoot, f.thumbnail) AS `thumbnailPath`,
    CASE f.color_format
        WHEN 1 THEN 'cmyk'
        ELSE 'rgb'
    END AS `colorSpace`,
    CASE f.status
        WHEN 1 THEN 'active'
        ELSE 'inactive'
    END AS `status`,
    f.date_available AS `embargoDate`,
    CASE
        WHEN f.date_expire > DATE_ADD(CURDATE(), INTERVAL 5 YEAR) THEN NULL
        ELSE f.date_expire
    END AS `expirationDate`,
    1 AS `uploadedby`,
    f.item AS `itemcode`,
    (SELECT GROUP_CONCAT(b.name SEPARATOR ', ') FROM brands b JOIN files_to_brands ftb ON b.id = ftb.brands_id WHERE ftb.files_id = f.id) AS `brand`,
    (SELECT GROUP_CONCAT(c.name SEPARATOR ', ') FROM categories c JOIN files_to_categories ftc ON c.id = ftc.categories_id WHERE ftc.files_id = f.id) AS `category`,
    CASE
        WHEN col.name = 'core' THEN NULL
        WHEN col.name REGEXP ' [0-9]{4}$' THEN SUBSTRING(col.name, 1, LENGTH(col.name) - 5)
        ELSE col.name
    END AS `collection`,
    CASE
        WHEN col.name REGEXP ' [0-9]{4}$' THEN RIGHT(col.name, 4)
        ELSE NULL
    END AS `collection_year`,
    NULL AS `tag`
FROM
    files_to_workers ftw
JOIN
    files f ON ftw.files_id = f.id
LEFT JOIN
    collections col ON f.collection_id = col.id
WHERE
    ftw.url_workers IS NOT NULL AND ftw.url_workers != '';
```

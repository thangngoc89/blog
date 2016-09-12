---
layout: Post
title: 'Xóa tất cả table trong database MySQL'
date: 2015-03-15 08:00:00
description: 'MySQL Procedure giúp xóa nhanh tất cả table trong 1 database'
tags: [mysql]
toc: false
---

Nếu bạn đang dùng mysql command line để quản lí database (nhất là khi sử dụng VPS...) thì bạn sẽ biết rằng MySQL không hỗ trợ việc xóa tất cả table. Cách thường được dùng đó là xóa hẳn database và tạo database mới. Việc này khá tốn thời gian và cần dùng đến 3 câu query dài để thực hiện (gồm xóa, tạo database, cấp quyền cho user).

Mình có tìm được đoạn code ngắn này mời các bạn tham khảo:

```mysql
DELIMITER $$

DROP PROCEDURE IF EXISTS `drop_all_tables_from` $$

CREATE PROCEDURE `drop_all_tables_from`(IN schema_target VARCHAR(128))
BEGIN
    DECLARE table_list TEXT;

    SELECT
        GROUP_CONCAT(`TABLE_NAME`)
    INTO
        table_list

    FROM `information_schema`.`TABLES`
    WHERE
          `TABLE_SCHEMA` = schema_target;

    IF table_list IS NOT NULL THEN
        SET @drop_tables = CONCAT("DROP TABLE ", table_list);

        PREPARE stmt FROM @drop_tables;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;

END $$

DELIMITER ;
```

Sử dụng đơn giản bằng các gọi lệnh sau, thay database_name bằng tên phù hợp

```mysql
CALL drop_all_tables_from("database_name");
```

**Lưu ý:** Lệnh trên sẽ xóa mọi table trong database mà không hề có bất cứ cảnh báo hay xác nhận nào. Sử dụng cẩn thận.

Nguồn: [dor.ky](http://dor.ky/mysql-procedure-drop-all-tables-in-database/)

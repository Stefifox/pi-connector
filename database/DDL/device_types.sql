create table if not exists wt_service.device_types
(
    tp_id   int auto_increment
        primary key,
    tp_name varchar(50) not null
);


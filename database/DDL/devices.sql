create table if not exists wt_service.devices
(
    dev_id          int auto_increment
        primary key,
    dev_uid         varchar(36)  not null,
    dev_name        varchar(50)  not null,
    dev_description varchar(255) null,
    dev_user        int          not null,
    dev_kind        int          not null,
    constraint uid_key
        unique (dev_uid),
    constraint type_key
        foreign key (dev_kind) references wt_service.device_types (tp_id),
    constraint user_key
        foreign key (dev_user) references wt_service.users (user_id)
);


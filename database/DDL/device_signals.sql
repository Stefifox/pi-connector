create table if not exists wt_service.device_signals
(
    signal_id        int auto_increment
        primary key,
    signal_timestamp datetime default CURRENT_TIMESTAMP not null,
    signal_value     float                              not null,
    device_id        int                                not null,
    constraint device_key
        foreign key (device_id) references wt_service.devices (dev_id)
);


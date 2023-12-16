create table if not exists wt_service.users
(
    user_id       int auto_increment
        primary key,
    user_name     varchar(50)  not null,
    user_surname  varchar(50)  null,
    user_mail     varchar(255) not null,
    user_password varchar(255) not null,
    constraint users_mail_key
        unique (user_mail)
);


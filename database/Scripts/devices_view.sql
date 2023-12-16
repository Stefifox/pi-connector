create view v_devices
as
    select
        dev_id,
        dev_uid,
        dev_name,
        dev_description,
        us.user_id as linked_user_id,
        us.user_mail as linked_user_mail,
        type.tp_id as linked_tp_id,
        tp_name as linked_tp_name
    from devices
    left join device_types as type on devices.dev_kind = type.tp_id
    left join users as us on devices.dev_user = us.user_id;
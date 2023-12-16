create definer = admin@`%` view wt_service.v_devices as
select `wt_service`.`devices`.`dev_id`          AS `dev_id`,
       `wt_service`.`devices`.`dev_uid`         AS `dev_uid`,
       `wt_service`.`devices`.`dev_name`        AS `dev_name`,
       `wt_service`.`devices`.`dev_description` AS `dev_description`,
       `us`.`user_id`                           AS `linked_user_id`,
       `us`.`user_mail`                         AS `linked_user_mail`,
       `type`.`tp_id`                           AS `linked_tp_id`,
       `type`.`tp_name`                         AS `linked_tp_name`
from ((`wt_service`.`devices` left join `wt_service`.`device_types` `type`
       on ((`wt_service`.`devices`.`dev_kind` = `type`.`tp_id`))) left join `wt_service`.`users` `us`
      on ((`wt_service`.`devices`.`dev_user` = `us`.`user_id`)));




DROP TABLE IF EXISTS `word_suffix`;
CREATE TABLE `word_suffix` (
  `id` bigint(20) unsigned NOT NULL COMMENT 'ID',
  `text` varchar(16) NOT NULL COMMENT '后缀文本',
  `explain` varchar(256) DEFAULT '' COMMENT '后缀解释',
  `word_type_id` bigint(20) unsigned NOT NULL COMMENT '单词类型 ID',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='单词后缀表';

INSERT INTO `word_suffix`(`id`, `word_type_id`, `text`) VALUES(11, 64, 'する');
INSERT INTO `word_suffix`(`id`, `word_type_id`, `text`) VALUES(21, 41, 'い');
INSERT INTO `word_suffix`(`id`, `word_type_id`, `text`) VALUES(31, 42, 'だ');
INSERT INTO `word_suffix`(`id`, `word_type_id`, `text`) VALUES(32, 42, 'たる');
INSERT INTO `word_suffix`(`id`, `word_type_id`, `text`) VALUES(41, 32, '（と）');
INSERT INTO `word_suffix`(`id`, `word_type_id`, `text`) VALUES(42, 32, '（と｜に）');


DROP TABLE IF EXISTS `word_type`;
CREATE TABLE `word_type` (
  `id` bigint(20) unsigned NOT NULL COMMENT 'ID',
  `name` varchar(8) NOT NULL COMMENT '类型名称',
  `explain` varchar(256) DEFAULT '' COMMENT '类型解释',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='单词类型表';

INSERT INTO `word_type`(`id`, `name`) VALUES(11, '名');
INSERT INTO `word_type`(`id`, `name`) VALUES(12, '代');
INSERT INTO `word_type`(`id`, `name`) VALUES(13, '数');
INSERT INTO `word_type`(`id`, `name`) VALUES(21, '助');
INSERT INTO `word_type`(`id`, `name`) VALUES(22, '助動');
INSERT INTO `word_type`(`id`, `name`) VALUES(31, '感');
INSERT INTO `word_type`(`id`, `name`) VALUES(32, '副');
INSERT INTO `word_type`(`id`, `name`) VALUES(33, '連体');
INSERT INTO `word_type`(`id`, `name`) VALUES(34, '接続');
INSERT INTO `word_type`(`id`, `name`) VALUES(41, '形');
INSERT INTO `word_type`(`id`, `name`) VALUES(42, '形動');
INSERT INTO `word_type`(`id`, `name`) VALUES(51, '自動');
INSERT INTO `word_type`(`id`, `name`) VALUES(52, '他動');
INSERT INTO `word_type`(`id`, `name`) VALUES(53, '自他動');
INSERT INTO `word_type`(`id`, `name`) VALUES(61, '五段');
INSERT INTO `word_type`(`id`, `name`) VALUES(62, '一段');
INSERT INTO `word_type`(`id`, `name`) VALUES(63, 'カ変');
INSERT INTO `word_type`(`id`, `name`) VALUES(64, 'サ変');

DROP TABLE IF EXISTS `word_classify`;
CREATE TABLE `word_classify` (
  `id` bigint(20) unsigned NOT NULL COMMENT 'ID',
  `name` varchar(8) NOT NULL COMMENT '分类名称',
  `explain` varchar(256) DEFAULT '' COMMENT '分类解释',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='单词分类表';

INSERT INTO `word_classify`(`id`, `name`) VALUES(11, 'N1');
INSERT INTO `word_classify`(`id`, `name`) VALUES(12, 'N2');
INSERT INTO `word_classify`(`id`, `name`) VALUES(13, 'N3');
INSERT INTO `word_classify`(`id`, `name`) VALUES(14, 'N4');
INSERT INTO `word_classify`(`id`, `name`) VALUES(15, 'N5');

DROP TABLE IF EXISTS `word`;
CREATE TABLE `word` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增 ID',
  `text` varchar(64) NOT NULL COMMENT '单词文本',
  `accent` int(8) NOT NULL COMMENT '单词音调',
  `kana` varchar(64) NOT NULL COMMENT '单词假名',
  `source` varchar(64) DEFAULT '' COMMENT '单词释义',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='单词信息表';

DROP TABLE IF EXISTS `word_classify_list`;
CREATE TABLE `word_classify_list` (
  `word_id` bigint(20) unsigned NOT NULL COMMENT '单词 ID',
  `word_classify_id` bigint(20) unsigned NOT NULL COMMENT '单词分类 ID',
  PRIMARY KEY (`word_id`, `word_classify_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='单词分类列表表';


DROP TABLE IF EXISTS `word_type_list`;
CREATE TABLE `word_type_list` (
  `word_id` bigint(20) unsigned NOT NULL COMMENT '单词 ID',
  `word_type_id` bigint(20) unsigned NOT NULL COMMENT '单词类型 ID',
  PRIMARY KEY (`word_id`, `word_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='单词类型列表表';


DROP TABLE IF EXISTS `word_suffix_list`;
CREATE TABLE `word_suffix_list` (
  `word_id` bigint(20) unsigned NOT NULL COMMENT '单词 ID',
  `word_suffix_id` bigint(20) unsigned NOT NULL COMMENT '单词后缀 ID',
  PRIMARY KEY (`word_id`, `word_suffix_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='单词后缀列表表';
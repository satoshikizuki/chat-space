# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|email|string|null: false, unique: true|

### Association
- has_many :groups through: :user_groups
- has_many :user_groups
- has_many :messages



## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :users, trough: :user_groups
- has_many :user_groups
- has_many :messages



## user_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to: user
- belongs_to: group



## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|text|text|
|image|string|

### Association
- belongs_to :user
- belongs_to :group
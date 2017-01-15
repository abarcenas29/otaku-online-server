'use strict'

exports.up = function (db) {
  return db.createTable('items', {
    id: { type: 'uuid', primaryKey: true, unique: true },
    user_id: { type: 'uuid', notNull: true },
    name: { type: 'string', notNull: true },
    description: { type: 'string', notNull: true },
    country: { type: 'uuid', notNull: true },
    region: { type: 'uuid', notNull: true },
    area: { type: 'uuid', notNull: true },
    category_ids: { type: 'integer[]', notNull: true },
    photos: { type: 'integer[]', notNull: true },
    primary_photo: { type: 'uuid', notNull: true },
    currency: { type: 'string', notNull: true },
    price: { type: 'numeric', notNull: true },
    is_ship: {type: 'boolean', notNull: true},
    is_meetup: { type: 'boolean', notNull: true },
    is_neg: { type: 'boolean', notNull: true },
    is_second_hand: { type: 'boolean', notNull: true },
    is_for_trade: { type: 'boolean', notNull: true },
    is_rent: { type: 'boolean', notNull: true },
    status: { type: 'string', notNull: true },
    expire_at: { type: 'timestamp', notNull: true },
    created_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (db) {
  return db.dropTable('items')
}

exports._meta = {
  'version': 1
}

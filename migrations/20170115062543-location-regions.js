'use strict'

exports.up = function (db) {
  return db.createTable('location_regions', {
    id: { type: 'uuid', primaryKey: true, unique: true },
    country_id: { type: 'uuid', notNull: true },
    name: { type: 'string', unique: true, notNull: true },
    created_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (db) {
  return db.dropTable('location_regions')
}

exports._meta = {
  'version': 1
}

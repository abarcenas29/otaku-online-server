'use strict'

exports.up = function (db) {
  return db.createTable('location_areas', {
    id: { type: 'uuid', primaryKey: true, unique: true },
    region_id: { type: 'uuid', notNull: true },
    name: { type: 'string', notNull: true },
    created_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (db) {
  return db.dropTable('location_areas')
}

exports._meta = {
  'version': 1
}

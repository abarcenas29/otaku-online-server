'use strict'

exports.up = function (db) {
  return db.createTable('location_countries', {
    id: { type: 'uuid', primaryKey: true, unique: true },
    name: { type: 'string', unique: true, notNull: true },
    created_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (db) {
  return db.dropTable('location_countries')
}

exports._meta = {
  'version': 1
}

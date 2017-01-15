'use strict'

exports.up = function (db) {
  return db.createTable('photos', {
    id: { type: 'uuid', primaryKey: true, unique: true },
    data: { type: 'date', notNull: true },
    filename: {type: 'string', notNull: true},
    created_by: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (db) {
  return db.dropTable('photos')
}

exports._meta = {
  'version': 1
}

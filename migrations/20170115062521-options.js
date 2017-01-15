'use strict'

exports.up = function (db) {
  return db.createTable('options', {
    id: { type: 'uuid', primaryKey: true, unique: true },
    key: { type: 'string', notNull: true },
    value: { type: 'string', notNull: true },
    options: { type: 'string', notNull: true },
    created_by: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamp', notNull: true },
    updated_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (db) {
  return db.dropTable('options')
}

exports._meta = {
  'version': 1
}

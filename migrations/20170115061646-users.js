'use strict'

exports.up = function (db) {
  return db.createTable('users', {
    id: { type: 'uuid', primaryKey: true, unique: true },
    fbid: { type: 'string', unique: true },
    email: { type: 'string', notNull: true },
    role: { type: 'string', notNull: true },
    mobile_no: 'string',
    created_by: { type: 'uuid', notNull: true },
    updated_by: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamp', notNull: true },
    updated_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function (db) {
  return db.dropTable('users')
}

exports._meta = {
  'version': 1
}

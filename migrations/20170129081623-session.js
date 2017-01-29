'use strict'

exports.up = function (db) {
  return db.createTable('session', {
    sid: {type: 'string', notNull: true, collate: 'default'},
    sess: {type: 'json', notNull: true},
    expire: {type: 'timestamp(6)', notNull: true}
  })
}

exports.down = function (db) {
  return db.dropTable('session')
}

exports._meta = {
  'version': 1
}


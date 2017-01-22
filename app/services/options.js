import db from '~/utils/pg'
import { formatUpdate } from '~/app/utils/dbformater'
import ResponseFormatter from '~/app/utils/responseFormatter'
import uuidV4 from 'uuid/v4'

const responseFormat = ResponseFormatter

export function list (params) {
  const { option } = params
  return new Promise((resolve, reject) => {
    db.any(`
      SELECT
        *
      FROM
        options
      WHERE
        options = $1
    `, [option])
    .then(data => resolve(responseFormat.response({rows: data}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormat.reponse({error: e}).error())
    })
  })
}

export function create (params) {
  const { option, key, value } = params
  return new Promise((resolve, reject) => {
    db.oneOrNone(`
      SELECT
        COUNT(*)
      FROM
        options
      WHERE
        options = $1
        AND
        key = $2
        AND
        value = $3
    `, [option, key, value])
    .then(data => {
      resolve(data)
    })
  })
  .then(data => {
    if (parseInt(data.count) === 0) {
      const now = new Date()
      const uuid = uuidV4()
      return db.one(`
        INSERT INTO options(
          id,
          options,
          key,
          value,
          created_by,
          created_at,
          updated_at
        )
        VALUES(
          $1,$2,$3,$4,$5,$6,$7
        )
        returning id;
      `, [uuid, option, key, value, uuid, now, now])
    }
    return 0
  })
  .then(data => {
    if (data === 0) {
      return responseFormat.response({ created: false, id: null }).success()
    } else {
      return responseFormat.response({ created: true, id: data.id }).success()
    }
  })
}

export function update (params) {
  return new Promise((resolve, reject) => {
    const now = new Date()

    params.set.updated_at = now
    params = formatUpdate(params)

    db.oneOrNone(`
      UPDATE options
      SET
        ${params.set}
      WHERE
        ${params.where}
      returning *
    `, params.values)
    .then(data => resolve(
      responseFormat.response({data}).success()
    ))
    .catch(e => {
      console.log(e)
      reject(responseFormat.response({msg: e.error}).error())
    })
  })
}

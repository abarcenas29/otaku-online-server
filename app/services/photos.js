import db from '~/utils/pg'
import { inArrayFormat } from '~/app/utils/dbformater'
import ResponseFormatter from '~/app/utils/responseFormatter'
import uuidV4 from 'uuid/v4'

const responseFormat = ResponseFormatter

export function list (params) {
  const ids = params.ids.split(',')
  params = inArrayFormat(ids)

  return new Promise((resolve, reject) => {
    db.any(`
      SELECT 
        *
      FROM
        photos
      WHERE
        id IN (${params})
    `, ids)
    .then(data => resolve(responseFormat.response({rows: data}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormat.response({error: e}).error())
    })
  })
}

export function create (params) {
  const { date, filename } = params
  return new Promise((resolve, reject) => {
    const now = new Date()
    const uuid = uuidV4()

    return db.one(`
      INSERT INTO photos(
        id,
        date,
        filename,
        created_by,
        created_at
      )
      VALUES(
        $1,$2,$3,$4,$5
      )
      returning id;
    `, [uuid, date, filename, uuid, now])
    .then(data =>
      resolve(responseFormat.response({created: true, id: data.id}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormat.response({created: false, id: null, error: e}).error())
    })
  })
}

export function remove (params) {
  const ids = params.ids
  params = inArrayFormat(ids)
  return new Promise((resolve, reject) => {
    return db.oneOrNone(`
      DELETE FROM photos
      WHERE id IN (${params})
    `, ids)
    .then(data => resolve(responseFormat.response({data}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormat.response({error: e}))
    })
  })
}

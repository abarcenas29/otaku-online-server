import db from '~/utils/pg'
import { formatUpdate } from '~/app/utils/dbformater'
import ResponseFormatter from '~/app/utils/responseformatter'
import uuidV4 from 'uuid/v4'
import jwt from 'jwt-simple'

const responseFormat = ResponseFormatter

export function list (params) {
  const { limit, offset } = params
  return new Promise((resolve, reject) => {
    db.any(`
      SELECT
        *
      FROM
        users
      LIMIT $1
      OFFSET $2
    `, [limit, offset])
    .then((data) => {
      resolve(responseFormat.response({row: data}).success())
    })
    .catch(e => {
      console.log(e)
      reject(e)
    })
  })
}

export function create (params) {
  const { token, mobile_no } = params
  const decodeToken = jwt.decode(token, process.env.JWT_SECRET)
  console.log('token', decodeToken)
  return new Promise((resolve, reject) => {
    if (!decodeToken.Error) {
      const { id } = decodeToken
      db.oneOrNone(`
        SELECT
          COUNT(*)
        from
          users
        WHERE
          fbid = $1
      `, [id])
      .then(data => resolve(data))
      .catch(e => reject(e))
    } else {
      reject(decodeToken.Error)
    }
  })
  .then(data => {
    // return NULL if nothing found
    if (parseInt(data.count) === 0) {
      const { id, name, email, mobile_no } = decodeToken
      const now = new Date()
      const uuid = uuidV4()
      return db.one(`
        INSERT INTO users(
          id,
          fbid,
          email,
          name,
          role,
          mobile_no,
          created_by,
          updated_by,
          created_at,
          updated_at
        )
        values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        returning id;
      `, [uuid, id, email, name, 0, mobile_no, uuid, uuid, now, now])
    }
    return 0
  })
  .then(data => {
    // pass the data as JWT
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
    // temporary. It should pass value
    const uuid = uuidV4()

    params.set.updated_by = uuid
    params.set.updated_at = now
    params = formatUpdate(params)

    db.oneOrNone(`
      UPDATE users
      SET
        ${params.set}
      WHERE
        ${params.where}
      returning *`, params.values)
    .then(data => resolve(
      responseFormat.response({data}).success())
    )
    .catch(e => {
      console.log(e)
      reject(responseFormat.response({msg: e.error}).error())
    })
  })
}

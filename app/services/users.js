import db from './../../utils/pg'
import uuidV4 from 'uuid/v4'

export function create (params) {
  const { fbid, email, role, mobileNo } = params
  return new Promise((resolve, reject) => {
    db.oneOrNone(`
      SELECT
        COUNT(*)
      from
        users
      WHERE
        fbid = $1
    `, [fbid])
    .then(data => resolve(data))
    .catch(e => reject(e))
  })
  .then(data => {
    // return NULL if nothing found
    if (parseInt(data.count) === 0) {
      const now = new Date()
      const uuid = uuidV4()
      return db.one(`
        INSERT INTO users(
          id,
          fbid,
          email,
          role,
          mobile_no,
          created_by,
          updated_by,
          created_at,
          updated_at
        )
        values($1,$2,$3,$4,$5,$6,$7,$8,$9)
        returning id;
      `, [uuid, fbid, email, role, mobileNo, uuid, uuid, now, now])
    }
    return 0
  })
  .then(data => {
    if (data === 0) {
      return { success: true, response: { created: false, id: null } }
    } else {
      return { success: true, response: { created: true, id: data.id } }
    }
  })
}

export function update (params) {
  return new Promise((resolve, reject) => {
    const now = new Date()
    // temporary. It should pass value
    const uuid = uuidV4()
    db.oneOrNone(`
      UPDATE users
      SET
        email = $1,
        role = $2,
        mobile_no = $3,
        updated_by = $4,
        updated_at = $5
      WHERE
        fbid = $6
      returning *`, [params.email, params.role, params.mobileNo, uuid, now, params.fbid])
    .then(data => resolve({success: true, response: {data}}))
    .catch(e => {
      console.log(e)
      reject({success: false, response: {msg: e.error}})
    })
  })
}

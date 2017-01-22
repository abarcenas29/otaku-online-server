import db from '~/utils/pg'
import ResponseFormatter from '~/app/utils/responseFormatter'
import uuidV4 from 'uuid/v4'

const responseFormatter = ResponseFormatter

export function list (params) {
  return new Promise((resolve, reject) => {
    db.any(`
      SELECT *
      FROM items
      LIMIT \${limit}
      OFFSET \${offset}
    `, params)
    .then(data => resolve(responseFormatter.response({rows: data}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormatter.response({error: e}).error())
    })
  })
}

export function create (params) {
  return new Promise((resolve, reject) => {
    const uuid = uuidV4()
    const now = new Date()

    // format the query
    params.id = uuid
    // temporary
    params.user_id = uuidV4()
    params.currency = 'PHP'
    params.created_at = now
    params.expire_at = now

    db.one(`
      INSERT INTO items(
        id,
        user_id,
        name,
        description,
        country,
        region,
        area,
        category_ids,
        photos,
        primary_photo,
        currency,
        price,
        is_ship,
        is_meetup,
        is_neg,
        is_second_hand,
        is_for_trade,
        is_rent,
        status,
        expire_at,
        created_at
      )
      VALUES (
        \${id},
        \${user_id},
        \${name},
        \${description},
        \${country},
        \${region},
        \${area},
        \${category_ids}::uuid[],
        \${photos}::uuid[],
        \${primary_photo},
        \${currency},
        \${price},
        \${is_ship},
        \${is_meetup},
        \${is_neg},
        \${is_second_hand},
        \${is_for_trade},
        \${is_rent},
        \${status},
        \${expire_at},
        \${created_at}
      ) returning id;
    `, params)
    .then(data => resolve(responseFormatter.response({data}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormatter.response({error: e}).error())
    })
  })
}

export function update (params) {
  return new Promise((resolve, reject) => {
    params.currency = 'PHP'
    db.oneOrNone(`
      UPDATE items
      SET
        name=\${name},
        description=\${description},
        country=\${country},
        region=\${region},
        area=\${area},
        category_ids=\${category_ids}::uuid[],
        photos=\${photos}::uuid[],
        primary_photo=\${primary_photo},
        currency=\${currency},
        price=\${price},
        is_ship=\${is_ship},
        is_meetup=\${is_meetup},
        is_neg=\${is_neg},
        is_second_hand=\${is_second_hand},
        is_for_trade=\${is_for_trade},
        is_rent=\${is_rent},
        status=\${status}
      WHERE
        id = \${id}
      returning id;
    `, params)
    .then(data => resolve(responseFormatter.response({id: data}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormatter.response({error: e}).error())
    })
  })
}

export function remove (id) {
  // photos need to be deleted first
  // will add later
  return new Promise((resolve, reject) => {
    db.oneOrNone(`
      DELETE FROM items
      WHERE id = $1
    `, [id])
    .then(data => resolve(responseFormatter.response({data}).success()))
    .catch(e => {
      console.log(e)
      reject(responseFormatter.response({error: e}))
    })
  })
}

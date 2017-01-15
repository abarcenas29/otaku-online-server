import optionsJSON from './../data/options.json'
import uuidV4 from 'uuid/v4'
import db from './../../utils/pg'

function Options ({resolve, reject}) {
  db.tx((t) => {
    const batch = []
    const now = new Date()
    optionsJSON.data.forEach((item) => {
      const uuid = uuidV4()
      const values = [uuid, item.options, item.key, item.value, uuid, now, now]
      batch.push(t.none(`
        INSERT INTO 
          options(
            id,
            options,
            key,
            value,
            created_by,
            created_at,
            updated_at
          )
          values($1, $2, $3, $4, $5, $6, $7);`, values))
    })
    return t.batch(batch)
  })
  .then((data) => resolve(data))
  .catch((e) => console.log('ERROR:', e.message || e))
}

export default Options

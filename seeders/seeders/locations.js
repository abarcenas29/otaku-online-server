import locationsJSON from './../data/locations.json'
import uuidV4 from 'uuid/v4'
import db from './../../utils/pg'

const transactions = []

function squenceExecutor (index) {
  if (index < transactions.length) {
    return this.none(transactions[index].query, transactions[index].values)
  }
}

function Locations ({resolve, reject}) {
  db.tx(t => {
    const now = new Date()

    const countryUUID = uuidV4()
    // country
    transactions.push({
      query: `
        INSERT INTO
          location_countries(
            id,
            name,
            created_at
          )
          values($1, $2, $3);
      `,
      values: [countryUUID, 'philippines', now]
    })

    // Region
    locationsJSON.country.region.forEach(region => {
      const regionUUID = uuidV4()
      const regionValues = [regionUUID, countryUUID, region.name, now]
      transactions.push({
        query: `
          INSERT INTO
            location_regions(
              id,
              country_id,
              name,
              created_at
            )
            values($1,$2,$3,$4);
        `,
        values: regionValues
      })
      // Area
      region.area.forEach(area => {
        const areaUUID = uuidV4()
        const areaValues = [areaUUID, regionUUID, area.name, now]

        transactions.push({
          query: `
            INSERT INTO
              location_areas(
                id,
                region_id,
                name,
                created_at
              )
              values($1,$2,$3,$4);
          `,
          values: areaValues
        })
      })
    })

    return t.sequence(squenceExecutor)
  })
  .then(data => resolve(data))
  .catch(e => console.log('ERROR:', e.message || e))
}

export default Locations

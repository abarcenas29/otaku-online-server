import options from './seeders/options'
import locations from './seeders/locations'

function run () {
  return new Promise((resolve, reject) => {
    console.log('Migrating Options')
    const payload = {resolve, reject}
    options(payload)
  })
  .then((data) => {
    console.log('Migrating Locations')
    return new Promise((resolve, reject) => {
      const payload = {resolve, reject}
      locations(payload)
    })
  })
  .then(data => {
    console.log('Migration success')
    process.exit()
  })
  .catch(e => console.log(e))
}

run()

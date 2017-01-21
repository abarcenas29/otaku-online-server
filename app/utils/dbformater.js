// This lets the api updates what ever field is needed and not have to pass everything
// saves to produce more endpoints needed
export function formatUpdate (params) {
  let set = ''
  let num = 1
  const values = []

  const keys = Object.keys(params.set)
  keys.forEach((key) => {
    set = `${set},${key} = $${num}`
    num++
    values.push(params.set[key])
  })
  // Produces KEY = $n

  let WHERE = ''
  const where = Object.keys(params.where)
  where.forEach(where => {
    WHERE = `${WHERE},${where} = $${num}`
    num++
    values.push(params.where[where])
  })
  // Produces KEY = $n

  // remove first ,
  set = set.substring(1)
  WHERE = WHERE.substring(1)

  return {set, where: WHERE, values: values}
}

import unirest from 'unirest'
import ResponseFormatter from '~/app/utils/responseFormatter'

const endpoint = `https://anilist.co/api`
const responseFormatter = ResponseFormatter

export function list (params) {
  return new Promise((resolve, reject) => {
    const appId = process.env.ANILIST_ID
    const appSecret = process.env.ANILIST_SECRET
    const url = `${endpoint}/auth/access_token`
    unirest
      .post(url)
      .send({
        grant_type: 'client_credentials',
        client_id: appId,
        client_secret: appSecret
      })
      .end(({body}) => {
        if (!body.error) {
          resolve(body.access_token)
        } else {
          reject(responseFormatter.response(body).error())
        }
      })
  })
  .then(token => {
    const {seriesType, query} = params
    const url = `${endpoint}/${seriesType}/search/${query}?access_token=${token}`
    return new Promise((resolve, reject) => {
      unirest.get(url)
        .end(({body}) => {
          if (!body.error) {
            resolve(responseFormatter.response(body).success())
          } else {
            reject(responseFormatter.response(body).error())
          }
        })
    })
  })
  .catch(e => {
    console.log(e)
  })
}

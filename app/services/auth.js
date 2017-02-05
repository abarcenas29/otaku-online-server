import db from '~/utils/pg'
import ResponseFormatter from '~/app/utils/responseFormatter'
import jwt from 'jwt-simple'
import graph from 'fbgraph'
import _ from 'lodash'

const responseFormatter = ResponseFormatter

/*
  Check if the user is a legit facebook user
*/
export function verify ({code, redirect_uri}) {
  return new Promise((resolve, reject) => {
    // verify the passed code for fb verification
    graph.authorize({
      client_id: process.env.FB_APP_ID,
      client_secret: process.env.FB_APP_SECRET,
      redirect_uri: redirect_uri,
      code: code
    }, (err, fbRes) => {
      if (err) {
        reject(responseFormatter.response({error: err}).error())
      } else {
        resolve(fbRes.access_token)
      }
    })
  })
  .then(accessToken => {
    // get the user values
    return verifyUser(accessToken)
  })
  .then(fbRes => {
    // check if the user already exist
    return registerOrVerifyUser(fbRes)
  })
  .then(data => {
    // Handle the user data
    // Encode the result to JWT
    const token = jwt.encode(data, process.env.JWT_SECRET, 'HS512')
    return responseFormatter.response({token}).success()
  })
}

export function verifyUser (accessToken) {
  return new Promise((resolve, reject) => {
    const params = {fields: 'id,name,email'}
    graph
      .setAccessToken(accessToken)
      .get('me', params, (err, res) => {
        if (!err) {
          resolve({...res})
        } else {
          reject(responseFormatter.response({err}).error())
        }
      })
  })
}

export function registerOrVerifyUser (fbData) {
  return new Promise((resolve, reject) => {
    db.oneOrNone(`
        SELECT *
        FROM users
        WHERE
          fbid = $1
      `, [fbData.id]
    ).then(data => {
      if (data) {
        // pass the data
        const { id, name, email, role } = data
        resolve({ user: 'exist', id, name, email, role })
      } else {
        resolve({user: 'new', ...fbData})
      }
    })
  })
}

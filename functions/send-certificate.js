const axios = require('axios')
require('dotenv').config()

const { WP_HEADLESS_URL, APP_ADMIN_USER, APP_ADMIN_PSWD } = process.env

exports.handler = async (event) => {

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const data = JSON.parse(event.body)

  try {
    const response = await axios.get(
      WP_HEADLESS_URL + `/wp-json/digitrial/v1/user/${data.userId}/send-certificate`,
      {
        auth: {
          username: APP_ADMIN_USER,
          password: APP_ADMIN_PSWD,
        },
      }
    )
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    }
  } catch (err) {
    if (err.response) {
      return {
        statusCode: err.response.status,
        body: err.response.data.code,
      }
    }
  }
}

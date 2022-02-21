const axios = require('axios')
require('dotenv').config()

const { WP_HEADLESS_URL, APP_ADMIN_USER, APP_ADMIN_PSWD } = process.env

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const data = JSON.parse(event.body)
  const currentdate = new Date()
  // php equiv: Y-m-d H:i:s
  const loginDate =
    currentdate.getFullYear() +
    '-' +
    String(currentdate.getMonth() + 1).padStart(2,'0') +
    '-' +
    String(currentdate.getDate()).padStart(2,'0') +
    ' ' +
    String(currentdate.getHours()).padStart(2,'0') +
    ':' +
    String(currentdate.getMinutes()).padStart(2,'0') +
    ':' +
    String(currentdate.getSeconds()).padStart(2,'0')
  try {
    await axios.post(
      WP_HEADLESS_URL + `/wp-json/wp/v2/users/${data.userId}`,
      {
        'meta[last_login]': loginDate,
      },
      {
        // params: {
        //   'meta[last_login]': loginDate
        // },
        auth: {
          username: APP_ADMIN_USER,
          password: APP_ADMIN_PSWD,
        },
      }
    )

    return {
      statusCode: 200,
      body: 'Last login date update successful',
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Last login date update failed',
    }
  }
}

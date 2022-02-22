const axios = require('axios')
require('dotenv').config()

const { WP_HEADLESS_URL, APP_ADMIN_USER, APP_ADMIN_PSWD } = process.env

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const data = JSON.parse(event.body)

  try {
    await axios.post(
      WP_HEADLESS_URL + '/wp-json/wp/v2/users/register',
      {
        email: data.user_email,
        password: data.password,
        roles: 'trainee',
        first_name: data.first_name,
        last_name: data.last_name,
        meta: {
          hospital_trust: data.meta.hospital_trust,
          // clinical_grade_experience: data.meta.clinical_grade_experience,
        },
      },
      {
        auth: {
          username: APP_ADMIN_USER,
          password: APP_ADMIN_PSWD,
        },
      }
    )

    return {
      statusCode: 200,
      body: 'Registration successful',
    }
  } catch (error) {
    if (error.response) {
      return {
        statusCode: error.response.status,
        body: error.response.data.code,
      }
    } else {
      return {
        statusCode: 500,
        body: 'Registration failed',
      }
    }

  }
}

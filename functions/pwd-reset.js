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
            WP_HEADLESS_URL + `/wp-json/after-intervention/v1/user/pwd-reset`,
            {
                'username': data.username,
                'key': data.key,
                'new_password': data.new_password
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
            body: 'Password successfully reset',
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
                body: 'Password could not be reset',
            }
        }
    }
}

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
            WP_HEADLESS_URL + `/wp-json/wp/v2/users/${data.userId}`,
            {
                meta: {
                    last_step: data.completedStep.toString()
                }
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
            body: 'Last user step update successful',
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: 'Last user step date update failed',
        }
    }
}

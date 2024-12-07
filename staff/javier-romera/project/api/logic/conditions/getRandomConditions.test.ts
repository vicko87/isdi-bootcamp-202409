import 'dotenv/config'
import db from 'dat'

import getRandomConditions from './getRandomConditions.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const conditions = await getRandomConditions('67540f707dc9ab4a54ae8909')

    console.log(conditions)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
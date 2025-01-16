import 'dotenv/config'
import db from 'dat'

import toggleManualTimeTracker from './toggleManualTimeTracker.js'

await db.connect(process.env.MONGO_URL)

const userId = '6780f8fe58255d20563d6a5f' //risto
const packId = '6780f9aa58255d20563d6a76'
const customerId = '6780f91758255d20563d6a61' //cirera
const description = 'Quito una hora manualmente'

const timeAdjust = '-01:00:00'

try {
    const pack = await toggleManualTimeTracker(userId, packId, customerId, description, timeAdjust)
    console.log(pack)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}


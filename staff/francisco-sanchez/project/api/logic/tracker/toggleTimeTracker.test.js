import 'dotenv/config'
import db from 'dat'

import toggleTimeTracker from './toggleTimeTracker.js'

await db.connect(process.env.MONGO_URL)

const packId = '6762dc6e22333bfc20ee549b' //pack for testing ISDI 10h
const customerId = '6762dbbc22333bfc20ee5489' //cirera
const userId = '6762dba622333bfc20ee5487' //risto

const description = 'Trabajando en la creación de la lógica de api de toggletimmerTracker'
const operation = 'substract'

try {
    const pack = await toggleTimeTracker(userId, packId, customerId, description, operation)
    console.log(pack)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}


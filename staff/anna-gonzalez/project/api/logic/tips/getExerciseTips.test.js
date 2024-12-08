import 'dotenv/config'
import db from 'dat'
import getExerciseTips from './getExerciseTips.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getExerciseTips('67559e378e4a0d332e927d4e', 'menstruation')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
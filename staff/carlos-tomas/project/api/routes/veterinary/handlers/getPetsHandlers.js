import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'


export default createFunctionalHandler(async (req, res) => {
    const { userId } = req
    const pets = await logic.getPets(userId)

    res.json(pets)

})
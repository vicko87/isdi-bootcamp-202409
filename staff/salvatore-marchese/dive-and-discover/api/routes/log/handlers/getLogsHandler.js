import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId, params: { logbookId } } = req

    const logs = await logic.getLogs(userId, logbookId);
    return res.json(logs);
});
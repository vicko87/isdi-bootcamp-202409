import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { noteId } } = req

    return logic.deleteNote(userId, noteId).then(() => res.status(204).send())
})
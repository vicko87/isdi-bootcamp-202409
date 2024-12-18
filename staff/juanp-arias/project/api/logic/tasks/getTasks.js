import { User, Task } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            const now = new Date()
            return Task.find({ assignes: userId, date: { $gt: now } })
                .populate('assignes', 'name')
                .populate('viewed', 'name')
                .populate('creator', 'name')
                .sort({ date: 1 })
                .lean()
        })
        .then(tasks => {
            tasks.forEach(task => {
                task.id = task._id.toString()
                delete task._id
            })
            return tasks
        })
        .catch(error => {
            if (error instanceof NotFoundError || error instanceof ValidationError) throw error
            throw new SystemError(error.message)
        })
}
import { User, Task } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Task.countDocuments({ assignes: userId, viewed: { $ne: userId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(unseenTaskCount => { return unseenTaskCount })
}
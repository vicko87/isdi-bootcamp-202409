import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (name, email, dateOfBirth, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.date(new Date(dateOfBirth))
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.create({ name, email, dateOfBirth, password: hash })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        }
    })()
}


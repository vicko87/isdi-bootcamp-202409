import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        //console.log('token is: ' + token)

        req.userId = userId
        console.log('userIdf ' + userId)

    } catch (error) {
        next(new AuthorizationError(error.message))
    }
}
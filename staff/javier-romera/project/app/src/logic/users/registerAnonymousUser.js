import { errors } from 'com'

const { SystemError } = errors

export default () => {
    return fetch(`http://${import.meta.env.VITE_API_URL}/users/anonymous`, {
        method: 'POST',
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) return res.json()

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}
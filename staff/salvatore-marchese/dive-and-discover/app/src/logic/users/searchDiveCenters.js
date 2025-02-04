import { validate, errors } from 'com';

const { SystemError } = errors;

export default (userId, city) => {
    validate.id(userId, 'userId')
    validate.city(city, 'city')

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/diver/search?city=${encodeURIComponent(city)}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok)
            return res.json()
                .catch(error => { throw new SystemError(error.message) })

        return res.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(({ error, message }) => { throw new errors[error](message) })
    })
};
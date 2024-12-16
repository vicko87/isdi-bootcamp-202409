import { errors } from 'com'

const { SystemError } = errors

export default () =>
  fetch(`http://${import.meta.env.VITE_API_URL}/ads/favorites`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok)
        return res
          .json()
          .catch((error) => {
            throw new SystemError(error.message)
          })
          .then((data) => {
            console.debug('Succesfully fetched favorite ads:', data)
            return data
          })

      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then(({ error, message }) => {
          throw new errors[error](message)
        })
    })

import axios from 'axios'
import { validate, errors } from '../com'
import { getToken } from '../utils'

const { SystemError } = errors

export default async (chip, name, race, sex, weight, sterilized, dateOfBirth) => {
    validate.chip(chip)
    validate.name(name)
    validate.race(race)
    validate.sex(sex)
    validate.weight(weight)
    validate.sterilized(sterilized)
    validate.dateOfBirth(dateOfBirth)

    let token

    try {
        token = await getToken()
    } catch (error) {
        throw new SystemError(error.message)
    }

    let response

    try {
        response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/veterinary/registerPet`,
            {
                chip,
                name,
                race,
                sex,
                weight,
                sterilized,
                dateOfBirth,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data
    } catch (error) {

        if (error.response) {
            const { data } = error.response
            throw new errors[data.error](data.message)
        } else {
            throw new SystemError(error.message)

        }
    }
}
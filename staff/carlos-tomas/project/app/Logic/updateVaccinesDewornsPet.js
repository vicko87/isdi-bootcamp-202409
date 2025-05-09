import axios from 'axios'
import { validate, errors } from '../com'
import { getToken } from '../utils'

const { SystemError } = errors

const updateVaccinesDewornsPet = async (petId, vaccine, deworn) => {
    validate.id(petId, 'petId')
    if (vaccine) {
        validate.vaccineName(vaccine)
    }
    if (deworn) {
        validate.deworn(deworn)
    }

    let token

    try {
        token = await getToken()
    } catch (error) {
        throw new SystemError(error.message)
    }

    let response

    try {
        response = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/veterinary/updatePet`,
            {
                petId,
                vaccine,
                deworn
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
export default updateVaccinesDewornsPet
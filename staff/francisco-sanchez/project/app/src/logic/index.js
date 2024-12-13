import {
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName,
    getCustomers,
} from './users'

import {
    createPack,
    getBasePacks,
    getBasePacksDetails,
    assignPack,
} from './packs'


const logic = {
    //Users
    registerUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    getUserId,
    getUserName,
    getCustomers,


    //Packs
    createPack,
    getBasePacks,
    getBasePacksDetails,
    assignPack
}

export default logic
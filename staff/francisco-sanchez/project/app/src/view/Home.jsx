import { useState, useEffect } from "react"
import logic from "../logic"

import { Button } from "../library";
import { useLocation } from 'react-router-dom'

import useContext from './useContext'


export default function Home(props) {
    const [name, setName] = useState('')
    const location = useLocation()

    const { alert, confirm } = useContext()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            if (error.message === 'jwt expired') {
                                error.message = 'Your session has expired.'
                                alert(error.message)
                                console.error(error.message)
                                localStorage.removeItem('token')
                                navigate('/login')
                            }
                            alert(error.message)
                            console.error(error.message)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
        } else setName(null)
    }, [location.pathname])

    const handleTrackerClick = event => {
        console.log('Click on tracker compo')
        props.onTrackerClick()
    }

    const handleManagePacks = event => {
        console.log("Manage packs clicked");
        //event.preventDefault()
        props.onManagePacksClick()
    };

    const handleManageCustomers = event => {
        console.log("Manage customers clicked");
        //event.preventDefault()
        props.onManageCustomersClick()
    };

    /* const handleManagePurchasedPacks = event => {
        console.log("Manage Purchased packs clicked");
        //event.preventDefault()
        props.onManagePurchasedPacksClick()
    } */;

    {
        return (
            <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow p-4 pt-12">

                <header className="mb-8 text-center ">
                    <h2 className="text-3xl font-bold text-color_darkBlue mb-2">{`Welcome, ${name}`}</h2>
                    <p className="text-color_strongGrey">What would you like to do today?</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl justify-items-center">
                    <Button className="bg-color_green hover:bg-color_greenDark text-white" onClick={handleTrackerClick}>Start tracking</Button>
                    <Button className="bg-color_green hover:bg-color_greenDark text-white" onClick={handleManagePacks}>Manage your packs</Button>
                    <Button className="bg-color_green hover:bg-color_greenDark text-white" onClick={handleManageCustomers}>Manage your customers</Button>
                    {/* <Button className="bg-color_green hover:bg-color_greenDark text-white" onClick={handleManagePurchasedPacks}>See purchased services</Button> */}
                    {/* <Button className="bg-color_green hover:bg-color_greenDark text-white">Settings</Button> */}
                </div>
            </main>
        )
    }
}
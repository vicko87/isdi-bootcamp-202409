import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import logic from '../logic'

export default function Register() {

    const navigation = useNavigation()

    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [passwordRepeat, setPasswordRepeat] = useState(null)

    const handleRegister = async () => {

        try {
            await logic.registerUser(name, username, password, phone, email, passwordRepeat)

            navigation.navigate('Login')
        } catch (error) {
            Alert.alert(error.message)
            console.error(error)
        }
    }
    return (

        <ScrollView
            contentContainerStyle={signInScreen.scrollView}
        >
            <View
                style={signInScreen.form}>

                <Text
                    style={signInScreen.text}>
                    Registro de usuario
                </Text>

                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Nombre'
                    autoCapitalize='words'
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Usuario'
                    autoCapitalize='none'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Repetir contraseña'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={passwordRepeat}
                    onChangeText={setPasswordRepeat}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Teléfono'
                    keyboardType='phone-pad'
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={signInScreen.text_input}
                    placeholder='Email'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity
                    style={signInScreen.submit}
                    onPress={handleRegister}
                >
                    <Text style={signInScreen.textSubmit}>
                        Register
                    </Text>

                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}
const signInScreen = StyleSheet.create({

    text: {
        fontSize: 30
    },

    form: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,


    },

    text_input: {
        borderWidth: 1,
        fontSize: 22,
        width: 350,
        padding: 16,
        borderRadius: 8
    },

    submit: {
        width: 325,
        backgroundColor: "#c1f1cf",
        borderBottomColor: 'black',
        borderWidth: 0.5,
        borderRadius: 25,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        paddingTop: 100,

    },
    textSubmit: {
        fontSize: 20
    }
})
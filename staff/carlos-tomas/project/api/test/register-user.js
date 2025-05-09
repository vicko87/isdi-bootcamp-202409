fetch('http://192.168.232.128:8080/usersRegister', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: "Pin Otto",
        username: "PinOtto",
        password: "123123123",
        phone: "+34682519205",
        email: "pinotto@gmail.com",
        passwordRepeat: "123123123"
    })
})
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Error: ${response.status} - ${text}`);
            })
        }
        return response.json()
    })
    .then(data => {
        console.log('Respuesta de la API:', data)
    })
    .catch((error) => {
        console.error('Error:', error.message)
    })


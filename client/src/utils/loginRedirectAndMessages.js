import axios from "axios";

export default async({email, password}) => {
    let loginMessage = '';
    try {
        await axios.post(
            '/api/login',
            {email: email, password: password},
            {headers: {'content-type': 'application/json'}}
        )
        window.location = "/";
        return loginMessage;
    } catch(error) {
        console.log(error.message);
    }

    let res = await axios.get('/api/loginMessage');
    loginMessage = res.data.error[0];

    return await loginMessage;
}
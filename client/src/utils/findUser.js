import axios from "axios";

export default async(userName) => {
    try {
        let res = await axios.post(
            '/api/findUser',
            {userName: userName},
            {headers: {'content-type': 'application/json'}}
        )
        console.log(res.data);
        return res.data;

    } catch(error) {
        console.log(error.message);
        return [];
    }
}
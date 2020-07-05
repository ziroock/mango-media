import axios from "axios";

export default async(userId) => {
    try {
        let res = await axios.post(
            '/api/findUser',
            {userId: userId},
            {headers: {'content-type': 'application/json'}}
        )
        console.log(res);
        return res.data.exist;

    } catch(error) {
        console.log(error.message);
        return false;
    }
}
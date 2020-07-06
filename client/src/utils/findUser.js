import axios from "axios";

/*
* This function was created to be used in the SearchBar component. However,
* I decided to move it in it's own file so I can reuse it in other Components.
*
* It returns the array received from the post request to findUser and an empty
* array if the request fails.
* */


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
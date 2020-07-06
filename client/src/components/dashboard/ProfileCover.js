import React, { Component } from "react";
import axios from 'axios';

import mangoCover from '../../images/mango-cover.jpg';
import profileAvatar from '../../images/profile-avatar.jpg';

/*
*   This component contains the ProfileCover items: Cover Photo, Profile Photo
*  and User's Name.
*
*   - componentDidMount():
*  This is a crucial function as I am getting the user info by sending a request
* to getUserInfo on the server side.
 */


class ProfileCover extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfo: {}}
    }

    componentDidMount() {
        console.log('UserId: ' + this.props.userId);
        axios.post('/api/getUserInfo',
            { userId: this.props.userId },
            {headers: {'content-type': 'application/json'}})
            .then(response => this.setState({userInfo: response.data}))
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.userInfo);
        return(
            <div style={{
                position: "relative",
                textAlign: "center",
                marginTop: "0.5em",
                height: "312px",
                width: "820px"}}>
                <div style={{ display: "inline-block" }}>
                    <img src={mangoCover} alt="mango-cover" style={{
                        objectFit: "cover",
                        width: "820px",
                        height: "312px"
                    }}/>
                    <img src={profileAvatar} alt="profile-avatar" style={{
                        objectFit: "cover",
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        top: "205px",
                        left: "10px"
                    }}/>
                    <h2 style={{
                        position: "absolute",
                        top: "205px",
                        left: "150px",
                        color: 'black'
                    }}> {this.state.userInfo.name} </h2>
                </div>
            </div>
        )
    }
}

export default ProfileCover;
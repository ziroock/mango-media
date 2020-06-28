import React from "react";
import mangoCover from '../../images/mango-cover.jpg';
import profileAvatar from '../../images/profile-avatar.jpg';

//TODO: Need to get user email and post as username, then change to Name when I add it to the model
export default () => {
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
                }}> Test User </h2>
            </div>
        </div>
    )
}
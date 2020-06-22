import React from "react";
import mangoCover from '../../images/mango-cover.jpg';
import profileAvatar from '../../images/profile-avatar.jpg';

//TODO: Good for now, but need to make scalable keeping the same resolution
export default () => {
    return(
        <div style={{
            position: "relative",
            textAlign: "center",
            marginTop: "0.5em",
            height: "820px",
            width: "312px"}}>
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
            </div>
        </div>
    )
}
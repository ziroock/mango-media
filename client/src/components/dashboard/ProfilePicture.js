import React from "react";
import profileAvatar from '../../images/profile-avatar.jpg';

//TODO: Good for now, but need to make scalable keeping the same resolution
export default () => {
    return(
        <div style={{ textAlign: "center", marginTop: "0.5em"}}>
            <img src={profileAvatar} alt="profile-avatar" style={{
                objectFit: "cover",
                width: "100px",
                height: "100px"
            }}/>
        </div>
    )
}
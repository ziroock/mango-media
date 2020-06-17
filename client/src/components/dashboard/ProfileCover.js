import React from "react";
import mangoCover from '../../images/mango-cover.jpg';

//TODO: Good for now, but need to make scalable keeping the same resolution
export default () => {
    return(
        <div style={{ textAlign: "center", marginTop: "0.5em"}}>
            <img src={mangoCover} alt="mango-cover" style={{
                objectFit: "cover",
                width: "900px",
                height: "250px"
            }}/>
        </div>
    )
}
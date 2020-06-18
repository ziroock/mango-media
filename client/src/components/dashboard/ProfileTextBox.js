import React from "react";

//TODO: Good for now, but need to make scalable keeping the same resolution
export default () => {
    return(
        <div style={{ textAlign: "center", marginTop: "0.5em"}}>
            <label style={{ fontSize: '20px'}}>Post</label>
            <form>
                <textarea style={{ width: "700px", height: "100px" }}>
                    Write a post...
                </textarea>
            </form>
        </div>
    )
}
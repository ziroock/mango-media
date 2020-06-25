import React from "react";

//TODO: Good for now, but need to make scalable keeping the same resolution
export default () => {
    return(
        <div style={{ textAlign: "center"}}>
            <label style={{ fontSize: '20px'}}>Post</label>
            <form>
                <textarea className="white" style={{ width: "700px", height: "100px", border: "none", resize: "none" }} defaultValue="Write a post...">
                </textarea>
            </form>
        </div>
    )
}
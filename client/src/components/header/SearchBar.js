import React, { Component } from 'react';
import findUser from "../../utils/findUser";
const defaultSearchValue = 'Search...';


/*
* The SearchBar Component handles the user search area inside Header.
* It calls the util function findUser().
*
* - handleChange():
*   + If the state.body = defaultSearchValue, then get only new keyboard input.
*   + Else update the body inside the text area based on every keyboard input.
* - handleSubmit():
*   + If the body is not empty and is not equal to defaultSearchValue then:
*       + execute findUsers() to fetch all users with this name (state.body)
*         and assign to userArray
*       + update state.userArray with the userArray and renderResults to true
*       + add an event listener to close the dropdown with results on anny click.
*   + TODO: add submit on enter, not just on the button click
* - closeResults():
*   + This function is called inside handleChange() and is used to se the state of
*     renderResults to false and remove the event listener set in handleChange().
*     All of this forces the drop down to close.
* - renderSearchResults():
*   + if renderResults is true and the userArray length not 0 then:
*       + map all the received results and add a link with the userName
*         and set it to the proper dashboard/user._id.
*   + else send No User Found! list element.
* - render():
*   + The component renders and takes care of the actions for a text area,
*     submit button, and a dropDown with results.
*/


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {body: defaultSearchValue, renderResults: false, userArray: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeResults = this.closeResults.bind(this);
    }

    handleChange(event) {
        if(this.state.body.trim() === defaultSearchValue) {
            this.setState({ [event.target.name]: event.target.value.slice(-1) });
        } else {
            this.setState({ [event.target.name]: event.target.value} );
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.body.trim() !== '' && this.state.body.trim() !== defaultSearchValue) {
            let userArray = await findUser(this.state.body);
            this.setState({ userArray: userArray });
            this.setState({ renderResults: true }, () => {
                document.addEventListener('click', this.closeResults);
            });
        }
    }

    closeResults() {
        this.setState({ renderResults: false }, () => {
            document.removeEventListener('click', this.closeResults);
        });
    }

    renderSearchResults() {
        if(this.state.renderResults && (this.state.userArray.length !== 0)) {
            return this.state.userArray.map((user, i) => {
                let userPageHref = `/dashboard/${user._id}`;
                return (
                    <li key={i} style={{display: 'block'}}><a href={userPageHref}>{user.name}</a></li>
                );
            });
        } else if (this.state.renderResults) {
            return <li key = "1">No user found!</li>;
        }
    }

    // TODO: Need to make the list ul into a column instead of a row???
    render() {
        return(
            <div id="searchBar" className='left'
                 style={{
                    top: "10px", left: "180px", position:"absolute", zIndex: '1',
                     fontSize: '20px', backgroundColor: "rgba(56,142,60, 0.5)"
                 }}
            >
                <textarea className="white left" onChange={this.handleChange} name="body"
                          style={{ width: "250px", height: "30px", border: "none", resize: "none"}}
                          value={this.state.body}
                />
                <li style={{ top: "-10px", right: " -70px", position:"absolute", cursor: 'pointer' }}
                    className="right" onClick={this.handleSubmit}
                >
                    Search
                </li>
                <div id="searchResults" style={{ width: "250px" }}>
                    <ul> {this.renderSearchResults()} </ul>
                </div>
            </div>
        )
    }
}

export default SearchBar;
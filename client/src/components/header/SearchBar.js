import React, { Component } from 'react';
import findUser from "../../utils/findUser";
// import { connect } from 'react-redux';
const defaultSearchValue = 'Search...';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {body: defaultSearchValue, renderResults: false, userExists: false};
        this.resutsArray = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(this.state.body.trim() === defaultSearchValue) {
            this.setState({ [event.target.name]: event.target.value.slice(-1) });
        } else {
            this.setState({ [event.target.name]: event.target.value} );
        }
    }

    // The function first executes the following:
    //  if the trimmed version of the body is not equal to the default value or if equal to just whitespaces
    //  then make the post request to create post and then update the body to the defaultPostValue
    // TODO: add submit on enter, not just on the button click
    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.body.trim() !== '' && this.state.body.trim() !== defaultSearchValue) {
            let userExists = await findUser(this.state.body);
            if(userExists) {
                // console.log('the body is: '+ this.state.body);
                this.setState({ userExists: true });
            } else {
                this.setState({ body: defaultSearchValue, userExists: false });
            }
            this.setState({ renderResults: true });
        }
    }

    renderSearchResults() {
        if(this.state.renderResults && this.state.userExists) {
            return <li key = "1"><a href={`/dashboard/${this.state.body}`}>{this.state.body}</a></li>;
        } else if (this.state.renderResults) {
            return <li key = "1">No user found!</li>;
        }
    }

    renderSearchBar() {
            return(
                <div>
                    <div id="searchBar" className='left' style={{
                        top: "10px", left: "180px", position:"absolute", zIndex: '1', fontSize: '20px'
                    }} >
                        <textarea className="white left" onChange={this.handleChange} name="body"
                                  style={{ width: "200px", height: "30px", border: "none", resize: "none"}}
                                  value={this.state.body}/>
                            <li style={{ top: "-10px", right: " -70px", position:"absolute", cursor: 'pointer' }}
                                className="right"     onClick={this.handleSubmit} >
                                Search
                            </li>
                    </div>
                    <ul id='searchResults'>
                        {this.renderSearchResults()}
                    </ul>

                </div>
            )
    }

    render() {
        return this.renderSearchBar();
    }
}

export default SearchBar;
// export default connect(mapStateToProps)(Header);
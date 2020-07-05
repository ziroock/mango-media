import React, { Component } from 'react';
//import { connect } from 'react-redux';
const defaultSearchValue = 'Search...';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {body: defaultSearchValue};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log('The handle change is: ' + event.target.value);
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
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.body.trim() !== '' && this.state.body.trim() !== defaultSearchValue) {
            // this.props.createPost(this.state);
            console.log('the body is: '+ this.state.body);
            this.setState({body: defaultSearchValue});
        }
    }

    renderSearchBar() {
        //top: 5px; left: 200px; z-index: 1; position:absolute
            return(
                <div id="searchBar" className='left' style={{
                    top: "10px", left: "180px", position:"absolute", zIndex: '1', fontSize: '20px'
                }} >
                    <textarea className="white left" onChange={this.handleChange} name="body"
                              style={{
                                  width: "200px",
                                  height: "30px",
                                  border: "none",
                                  resize: "none"
                              }} value={this.state.body}/>
                        <li style={{ top: "-10px", right: " -70px", zIndex: '1', position:"absolute", cursor: 'pointer' }}
                            className="right"     onClick={this.handleSubmit} >
                            Search
                        </li>
                </div>
            )
    }

    render() {
        return this.renderSearchBar();
    }
}

// Gets called with the entire state statement our of the reduxStore
// function mapStateToProps(state) {
//     //  console.log(state.auth);
//     return { auth: state.auth };
// }

export default SearchBar;
// export default connect(mapStateToProps)(Header);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import mangoSVGS from '../../utils/imporImages';

/**
 * The Header Component is a navigation bar fixed at the top of every page. It renders
 * based on conditional logic received from the authReducer.
 *
 * - renderContent():
 *   + This function renders different Header values base on authReducer _id value.
 *   + In case no response or page is not loaded show nothing.
 *   + In case the user is not authenticated show login and register links.
 *   + In case user is logged in then show SearchBar Component , Profile and Log Out links.
 * */

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  toggleMenu() {
    // console.log("title: " + this.props.title);
    // console.log("body: " + this.props.body);
    // console.log("date: " + this.props.date);

    this.setState({ showMenu: !this.state.showMenu });
    // console.log('The showEdit state: ' + this.state.showEdit);
  }

  renderContent() {
    switch (this.props.auth._id) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <a style={{ fontSize: '20px' }} href="/login">
              Sign In
            </a>
          </li>,
          <li key="2" className="teal accent-3">
            <a style={{ fontSize: '20px' }} href="/register">
              Sign Up
            </a>
          </li>,
        ];
      default:
        return null;
    }
  }
  renderSidebar() {
    //  && this.props.auth._id < -- add this after done testing
    if (this.state.showMenu) {
      return (
        <div className="mango-sidenav" id="mango-mobile-side-nav">
          <ul className="roboto-normal-white-21px" id="mango-sidenav-list">
            <li>
              <SearchBar />
            </li>
            <li>
              <a href={`/dashboard/${this.props.auth._id}`}>Profile</a>
            </li>
            <li>
              <a href="/">Dashboard</a>
            </li>
            <a href={`/photoGallery/${this.props.auth._id}`}>
              <li>Photo Gallery</li>
            </a>
            {/*<li>*/}
            {/*  <a href="/invitation/new">Invite Friends</a>*/}
            {/*</li>*/}
            {/*<li>Settings</li>*/}
            <li>
              <a href="/api/logout">Log Out</a>
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="mango-nav">
        <div id="mango-logo">
          <img alt={'mango-logo-m'} className="mango-logo-m" src={mangoSVGS.logo.logoM} />
          <img alt={'mango-logo-a'} className="mango-logo-a" src={mangoSVGS.logo.logoA} />
          <img alt={'mango-logo-n'} className="mango-logo-n" src={mangoSVGS.logo.logoN} />
          <img alt={'mango-logo-g'} className="mango-logo-g" src={mangoSVGS.logo.logoG} />
          <img alt={'mango-logo-o'} className="mango-logo-mango" src={mangoSVGS.logo.logoO} />
        </div>
        <div id="mango-menu-button">
          <i className="material-icons" onClick={() => this.toggleMenu()}>
            menu
          </i>
        </div>
        {this.renderSidebar()}
      </div>
    );
  }
}

// Gets called with the entire state statement our of the reduxStore
function mapStateToProps(state) {
  //  console.log(state.auth);
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);

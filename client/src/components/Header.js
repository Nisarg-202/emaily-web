import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payment from './Payment';

function Header(props) {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={props.auth ? '/dashboard' : '/'}>
          Emaily
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!props.auth && (
              <li className="nav-item">
                <a className="nav-link" href="/auth/google">
                  Login with google
                </a>
              </li>
            )}
            {props.auth && (
              <li className="nav-item">
                <Payment />
              </li>
            )}
            {props.auth && (
              <li className="nav-item">
                <Link className="nav-link">Credits: {props.auth.amount}</Link>
              </li>
            )}
            {props.auth && (
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps)(Header);

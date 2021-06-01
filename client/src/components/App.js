import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {userAction} from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';

function App(props) {
  const [isLoggedin, setisLoggedin] = useState(false);

  async function getUser() {
    await props.userAction();
    if (props.auth) {
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
  }

  useEffect(
    function () {
      getUser();
    },
    [getUser]
  );

  let router;
  if (isLoggedin) {
    router = (
      <Switch>
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/surveys/new" component={SurveyNew} exact />
        <Redirect to="/dashboard" exact />
      </Switch>
    );
  } else {
    router = (
      <Switch>
        <Route path="/" component={Landing} exact />
        <Redirect to="/" exact />
      </Switch>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        {router}
      </BrowserRouter>
    </div>
  );
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps, {userAction})(App);

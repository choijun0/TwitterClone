import React,{useState} from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Auth from "routes/Auth"
import Home from "routes/Home"
import Profile from "routes/Profile"
import Navigation from "./Navigation"

const AppRouter = ({refreshUser, isLoggedIn, user}) => {
	return (
	<Router>
    {isLoggedIn && <Navigation user={user} />}
    <Switch>
		{isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route exact path="/Profile">
              <Profile refreshUser={refreshUser} user={user} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
    </Switch>
  </Router>
	)
}

export default AppRouter;
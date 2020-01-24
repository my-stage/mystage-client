import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './pages/Login';
import MainLayout from './MainLayout';
import { UserContext } from './contexts';
import { Api, User } from './api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

export default function App() {
  const classes = useStyles();

  const [user, setUser] = React.useState<User|null>(null);
  const [token, setToken] = React.useState<string>(localStorage.getItem("mystage-token") || "");
  const [isLoading, setIsLoading] = React.useState(token ? true : false);

  const userContextValue = {
      user,
      setUser,
      token,
      setToken,
  };

  useEffect(() => {
      Api.token = token;
      localStorage.setItem("mystage-token", token);
      if(token) {
          User.MyUser().then((user) => {
              setUser(user);
              setIsLoading(false);
          });
      } else {
          setUser(null);
          setIsLoading(false);
      }
  }, [token]);

  return (
      <div className={classes.root}>
        <UserContext.Provider value={userContextValue}>
          <BrowserRouter>
            <CssBaseline />
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/login">
                  { user ? <Redirect to="/dashboard" /> : <Login />}
              </Route>
              <Route>
                  {token
                    ?
                      (user ? <MainLayout /> : "")
                    :
                      (user ? <MainLayout /> : <Redirect to="/login" />)

                      // if (token && !user) -> nothing
                      // if (token && user) -> MainLayout
                      // if (!token) -> Redirect
                  }
              </Route>
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
  );
}

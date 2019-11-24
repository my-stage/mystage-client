import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './pages/Login';
import MainLayout from './MainLayout';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route>
            <MainLayout />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

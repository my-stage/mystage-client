import React, { useState, useEffect } from 'react';
import { Api, User } from '../api';
import {Grid, makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        maxWidth: '600px',
    },
    select: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function UserForm() {
    const classes = useStyles();

    const history = useHistory();

    const params: {userId?:string|undefined} = useParams();

    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        if(params.userId && isLoading) {
            User.GetById(parseInt(params.userId)).then(user => {
                userDispatch({type:"user", value: user});
                setIsLoading(false);
                setOriUsername(user.username);
            });
        }
    }, []);


    const [user, userDispatch] = React.useReducer((state, action) => {
        if(action.type === "user") {
            return action.value;
        } else {
            const user = Object.assign(new User(), state); // copy variable
            user[action.type] = action.value;
            return user;
        }
    }, new User());

    const [oriUsername, setOriUsername] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = (event: React.FormEvent) => {
        console.log(user);
        event.preventDefault();
        // TODO: VALIDATE
        user.Save().then((res: object) => {
           history.push("/mgmt/users");
        });
    };

    return (
        <div className={classes.paper}>
            <Typography variant="h3" component="h1">
                { user.isNewModel ? "Create new User" : "Edit User " + oriUsername}
            </Typography>
            {error}
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={user.username}
                    autoFocus
                    onChange={(event) => userDispatch({type: "username", value: event.target.value})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    value={user.name}
                    onChange={(event) => userDispatch({type: "name", value: event.target.value})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => userDispatch({type: "password", value: event.target.value})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="E-Mail"
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(event) => userDispatch({type: "email", value: event.target.value})}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="sex-label">Tanzrolle</InputLabel>
                    <Select
                        labelId="sex-label"
                        id="sex"
                        value={user.sex}
                        onChange={(event) => userDispatch({type: "sex", value: event.target.value})}
                        className={classes.select}
                    >
                        <MenuItem value={1}>Herr</MenuItem>
                        <MenuItem value={2}>Dame</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Save
                </Button>
            </form>
        </div>
    );
}

export default UserForm;

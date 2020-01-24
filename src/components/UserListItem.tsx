import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Api, User } from '../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    key: {
      fontWeight: 700,
    },
    details: {
      flexDirection: "column",
    }
  }),
);

function UserListItem({ user, onDelete, ...props }: {user: User, onDelete: (user: User) => void}) {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{user.name} ({user.username})</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
          <span><span className={classes.key}>E-Mail: </span> {user.email}</span>
          <span><span className={classes.key}>Sex: </span> {user.sex}</span>
          <Button component={Link} to={"/mgmt/users/"+user.id} variant="contained" color="primary"
          >Edit</Button>
          <Button variant="contained" color="secondary"
            onClick={() => { onDelete(user); }}
          >Delete</Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default UserListItem;

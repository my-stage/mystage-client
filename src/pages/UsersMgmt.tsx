import React, { useState, useEffect } from 'react';
import { Api, User } from '../api';
import UserListItem from '../components/UserListItem';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

function UsersMgmt() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    User.GetAll().then(setUsers);
  }, []);

  const handleDelete = (user: User) => {
    user.Delete().then(res => {
      if(res.status === 200) {
        const index = users.findIndex(u => u.id === user.id);
        const newUsers = [...users.slice(0, index), ...users.slice(index+1)];
        setUsers(newUsers);
      }
    });
  };

  return (
    <>
      <Grid container spacing={10}>
        <Grid item>
          <Grid container justify="center" spacing={4}>
            <Grid item>
              <h1>Users Management</h1>
            </Grid>
            <Grid item>
              <Button component={Link} to="/mgmt/users/create" variant="contained" color="primary">
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {users.map((user: User) => (
        <UserListItem key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </>
  );
}

export default UsersMgmt;

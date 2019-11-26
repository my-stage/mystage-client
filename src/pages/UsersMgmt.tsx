import React, { useState, useEffect } from 'react';
import { Api, User } from '../api';

function UsersMgmt() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.getUsers().then(setUsers);
  }, []);

  return (
    <>
      <h1>Users Management</h1>
      {users.map((user: User) => (
        <>
          <h2>{user.username}</h2>
          <h2>{user.name}</h2>
        </>
      ))}
    </>
  );
}

export default UsersMgmt;

import React, { useState, useEffect } from 'react';
import API from '../API';

function UsersMgmt() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.getUsers().then(setUsers);
  }, []);

  return (
    <>
      <h1>Users Management</h1>
      {users.map(user => (
        <>
          <h2>{user["username"]}</h2>
          <h2>{user["name"]}</h2>
        </>
      ))}
    </>
  );
}

export default UsersMgmt;

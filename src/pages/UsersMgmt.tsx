import React, { useState, useEffect } from 'react';
import { MockApi as Api, User } from '../api';
import UserListItem from '../components/UserListItem';

function UsersMgmt() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    Api.getUsers().then(setUsers);
  }, []);

  return (
    <>
      <h1>Users Management</h1>
      {users.map((user: User) => (
        <UserListItem user={user} />
      ))}
    </>
  );
}

export default UsersMgmt;

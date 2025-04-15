import React, { useContext } from 'react';
import { AuthContext } from '../pages/auth/auth-signup';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>This is your profile page</h1>
      {user && <p>Welcome {user.firstName}!</p>}
    </div>
  );
};

export default Profile;
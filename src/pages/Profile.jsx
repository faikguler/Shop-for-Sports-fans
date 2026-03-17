import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getProfile()
      .then(res => setUser(res.data.user || res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3>My Profile</h3>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
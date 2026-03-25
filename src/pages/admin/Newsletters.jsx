import { useState, useEffect } from 'react';
import API from '../../services/api';

const AdminNewsletters = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await API.get('/newsletter');
      setSubscribers(res.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (email, currentStatus) => {
    try {
      await API.put(`/newsletter/${email}`, { isActive: !currentStatus });
      setSubscribers(subscribers.map(sub =>
        sub.email === email ? { ...sub, isActive: !currentStatus } : sub
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm('Delete this subscriber?')) {
      try {
        await API.delete(`/newsletter/${email}`);
        setSubscribers(subscribers.filter(sub => sub.email !== email));
      } catch (error) {
        console.error('Error deleting subscriber:', error);
      }
    }
  };

  if (loading) return <div>Loading subscribers...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Newsletter Subscribers</h2>
      <div className="card">
        <div className="card-header">Subscribers List</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Subscribed Date</th>
                <th>Actions</th>
               </tr>
            </thead>
            <tbody>
              {subscribers.map(sub => (
                <tr key={sub.email}>
                  <td>{sub.email}</td>
                  <td>
                    <span className={`badge ${sub.isActive ? 'bg-success' : 'bg-secondary'}`}>
                      {sub.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => toggleActive(sub.email, sub.isActive)}
                    >
                      {sub.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(sub.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsletters;
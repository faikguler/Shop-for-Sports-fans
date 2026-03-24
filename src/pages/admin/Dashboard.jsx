import { useState, useEffect } from 'react';
import API from '../../services/api';
import { productService } from '../../services/productService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // orders
      const ordersRes = await API.get('/orders');
      const orders = ordersRes.data;

      const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);

      // users count
      const usersRes = await API.get('/users');
      const productsRes = await productService.getAll();

      setStats({
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        totalUsers: usersRes.data.length,
        totalProducts: productsRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <h2>{stats.totalOrders}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <h2>£{(stats.totalRevenue || 0).toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <h2>{stats.totalProducts}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
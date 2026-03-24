import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { userService } from './services/userService';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './pages/admin/AdminSidebar';

// Public pages
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import OrderSuccess from './pages/OrderSuccess.jsx';
import OrderDetail from './pages/OrderDetail';
import DynamicPage from './pages/DynamicPage';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminCategories from './pages/admin/Categories';
import Adminpages from './pages/admin/Pages';
 

// Admin layout 
const AdminLayout = ({ setUser }) => (
  <div style={{ display: 'flex' }}>
    <AdminSidebar setUser={setUser} />
    <div style={{ flex: 1, background: '#f4f4f4' }}>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
        <Route path="pages" element={<Adminpages />} />
      </Routes>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState(null); // { id, name, email, role }  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userService.getProfile()
        .then(res => {
          setUser(res.data.user || res.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={
          user?.role === 'admin' ? <AdminLayout setUser={setUser} /> : <Navigate to="/" />
        } />

        {/* Public routes */}
        <Route path="*" element={
          <>
            <Navbar user={user} setUser={setUser} />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:id/success" element={<OrderSuccess />} />
                <Route path="/order/:id" element={<OrderDetail />} />
                <Route path="/page/:slug" element={<DynamicPage />} />

              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
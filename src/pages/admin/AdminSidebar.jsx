import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

   const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      width: '250px', 
      background: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#ffc107' }}>
        Admin Panel
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => 
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => 
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Users
          </NavLink>
        </li>

        <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) => 
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Categories
          </NavLink>
        </li>

          <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/pages"
            className={({ isActive }) => 
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Page Editor
          </NavLink>
        </li> 
         <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/slider"
            className={({ isActive }) => 
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Slider Editor
          </NavLink>
        </li> 
        
        <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/newsletters"
            className={({ isActive }) =>
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Newsletters
          </NavLink>
        </li>

          <li style={{ marginBottom: '10px' }}>
            <NavLink
              to="/admin/contact-messages"
              className={({ isActive }) =>
                `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
              }
            >
              Contact Messages
            </NavLink>
          </li>


        <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/products"
            className={({ isActive }) => 
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Products
          </NavLink>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => 
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Orders
          </NavLink>
        </li>

        <li style={{ marginBottom: '10px' }}>
          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              `text-white text-decoration-none d-block px-3 py-2 ${isActive ? 'bg-warning text-dark' : ''}`
            }
          >
            Reviews
          </NavLink>
        </li>


        <li style={{ marginTop: '30px', padding: '0 20px' }}>
          <button 
            onClick={handleLogout}
            className="btn btn-danger w-100"
          >
            Logout
          </button>
        </li>
          <li style={{ marginTop: '30px', padding: '0 20px' }}>
          <button 
            onClick={handleRedirect}
            className="btn btn-success w-100"
          >
            Home
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
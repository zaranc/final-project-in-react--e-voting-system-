import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Correct path

const Sidebar = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 

  // Function to handle logout
  const handleLogout = () => {

    window.location.href = '/'

    localStorage.clear()
    window.location.reload();
  };

  return (
    <div className="sidebar bg-dark text-white p-3">
      <div className="logo text-center mb-3 w-50">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRADpfeWoT-oOJ5Ip2X5JugYmj06CO0H5Rt0gtygESLzN3qCEez2Rb0zSGWNyI920QrTfY&usqp=CAU"
          alt="E-Voting System Logo"
          className="img-fluid m-4"
        />
      </div>
      <ul className="menu list-unstyled">
        <li className={`menu-item ${location.pathname === '/admin' ? 'active' : ''}`}>
          <Link to="/admin" className="text-white">Dashboard</Link>
        </li>
        <li className={`menu-item ${location.pathname === '/party' ? 'active' : ''}`}>
          <Link to="/party" className="text-white">Party</Link>
        </li>
        <li className={`menu-item ${location.pathname === '/election' ? 'active' : ''}`}>
          <Link to="/election" className="text-white">Election</Link>
        </li>
        <li className={`menu-item ${location.pathname === '/connection' ? 'active' : ''}`}>
          <Link to="/connection" className="text-white">Party-Connection</Link>
        </li>
        <li className={`menu-item ${location.pathname === '/user' ? 'active' : ''}`}>
          <Link to="/user" className="text-white">User</Link>
        </li>
      </ul>
      <div className="logout text-center mt-3"> {/* Logout button */}
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


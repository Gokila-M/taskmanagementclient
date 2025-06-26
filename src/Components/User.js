import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import './Dashboard.css';
import  { jwtDecode } from 'jwt-decode';

import { getAllUsers } from '../Utility/Apiservices';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => { 
    const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    const decoded = jwtDecode(token);
    setCurrentUserId(decoded.id); 
  }
    const fetchUsers = async () => {
      const res = await getAllUsers();
      if (res.ok) {
        console.log(res.data.users);
        
        setUsers(res.data.users);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
     
      <div className="sidebar">
        <h4 className="mb-4">Dashboard</h4>
        <ul className="list-unstyled ps-3">
          <li className="mb-3">
            <NavLink to="/dashboard/tasks" className="text-dark text-decoration-none">
              📝 Tasks
            </NavLink>
          </li>
          <li className="mt-5">
            <MDBBtn color="danger" onClick={handleLogout}>Logout</MDBBtn>
          </li>
        </ul>
      </div>

      
      <div className="main-content p-4">
        <h3 className="text-primary fw-bold mb-4">All Users</h3>
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-muted">No users found</td>
    </tr>
  ) : (
    users
      .filter((user) => user._id !== currentUserId)  
      .map((user, index) => (
        <tr key={user._id}>
          <td>{index + 1}</td>
          <td>{user.Name}</td>
          <td>{user.email}</td>
          <td>{user.mobile}</td>
          <td>{user.isAdmin ? "Admin" : "Non-Admin"}</td>
        </tr>
      ))
  )}
      </tbody>
        </table>
         <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;


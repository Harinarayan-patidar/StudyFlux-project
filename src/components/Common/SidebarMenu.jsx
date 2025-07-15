import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());          // your redux logout action
    localStorage.removeItem('token');  // if you're storing token locally
    navigate('/login');          // redirect to login or landing page
  };


  return (
    <Sidebar className="z-20">
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem
          className="bg-gray-400"
          component={<Link to="/Userprofile" />}
        >
          My-Profile
        </MenuItem>
        <MenuItem
          className="bg-gray-400"
          component={<Link to="/my-courses" />}
        >
          Enrolled courses
        </MenuItem>
        <MenuItem
          className="bg-gray-400"
          component={<Link to="/createcourses" />}
        >
          CreateCourses
        </MenuItem>
         <MenuItem
          className="bg-gray-400"
          component={<Link to="/createCategory" />}
        >
          CreateCategory
        </MenuItem>
        <MenuItem className="bg-gray-400 text-red-600" onClick={handleLogout}>
          Logout
        </MenuItem>
         <MenuItem
          className="bg-gray-400"
          component={<Link to="/AllCourses" />}
        > ALL Courses</MenuItem>
        
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;

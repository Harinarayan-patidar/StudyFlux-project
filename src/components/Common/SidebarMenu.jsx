import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import { IoMdClose } from "react-icons/io";

const SidebarMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout(navigate, dispatch));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Sidebar
      className="z-20 h-full min-h-screen w-[250px] bg-black text-yellow-300 flex flex-col justify-between"
      rootStyles={{ backgroundColor: '#000000' }}
    >
      <div>
        <Menu
          menuItemStyles={{
            button: {
              padding: '12px 20px',
              color: '#facc15', // yellow-400
              fontWeight: '500',
              '&:hover': {
                backgroundColor: '#1f2937',
                color: '#fde047', // yellow-300
              },
              '&.active': {
                backgroundColor: '#0f172a',
                color: '#fef9c3', // light yellow
              },
            },
          }}
        >
          <MenuItem component={<Link to="/dashboard/my-profile" />}>My Profile</MenuItem>

          {user?.accountType === "Student" && (
            <MenuItem component={<Link to="/dashboard/enrolled-courses" />}>Enrolled Courses</MenuItem>
          )}

          {user?.accountType === "Instructor" && (
            <MenuItem component={<Link to="/dashboard/createcourses" />}>Create Courses</MenuItem>
          )}

          {user?.accountType === "Admin" && (
            <MenuItem component={<Link to="/dashboard/createCategory" />}>Create Category</MenuItem>
          )}

          <MenuItem component={<Link to="/dashboard/AllCourses" />}>All Courses</MenuItem>
          <MenuItem component={<Link to="/dashboard/setting" />}>Setting</MenuItem>

          <MenuItem onClick={handleLogout} style={{ color: '#f87171', fontWeight: 'bold' }}>
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/* Close Button at Bottom on Mobile */}
      <div className="md:hidden px-4 py-3">
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 text-black bg-yellow-400 hover:bg-yellow-300 transition duration-200 font-semibold py-2 rounded-md shadow-md"
        >
          <IoMdClose size={20} />
          Close Sidebar
        </button>
      </div>
    </Sidebar>
  );
};

export default SidebarMenu;

import React, { useEffect, useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logoImg from '../../assets/images/logo.png';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { NavbarLinks } from '../../data/navbar-link';
import { Categories } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import { logout } from '../../services/operations/authAPI';
import { isTokenExpired } from '../../services/autoDeleteToken';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && isTokenExpired(storedToken)) {
      localStorage.removeItem("token");
      dispatch(logout());
    }

    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      if (currentToken && isTokenExpired(currentToken)) {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", Categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.error("Could not fetch category links", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <header className='border-b border-blue-50 bg-black text-white z-50'>
      <div className='flex flex-wrap items-center justify-between max-w-7xl mx-auto px-4 py-3 md:py-4'>
        {/* Logo */}
        <Link to="/" className='flex items-center space-x-2'>
          <img src={logoImg} alt="StudyFlux Logo" className='w-10 h-10' />
          <h1 className='text-2xl font-bold'>
            <span className='text-yellow-400'>Study</span>
            <span className='text-green-500'>Flux</span>
          </h1>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className='md:hidden text-white focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Nav Links */}
        <nav className={`w-full md:w-auto md:flex md:items-center ${menuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <ul className='flex flex-col md:flex-row gap-4 md:gap-6'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className='relative group'>
                    <div className='flex items-center cursor-pointer gap-1'>
                      <p>{link.title}</p>
                      <IoIosArrowDown />
                    </div>
                    <div className='absolute left-1/2 transform -translate-x-1/2 mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-100 text-black p-4 rounded-md shadow-lg z-40 w-60'>
                      {subLinks.length ? (
                        subLinks.map((subLink, idx) => (
                          <Link key={idx} to={`/catalog/${subLink._id}`} className='block py-1 px-2 hover:bg-gray-200 rounded'>
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <div>No course found</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} className={`${matchRoute(link?.path) ? "text-yellow-400" : "text-white"}`}>
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right Side Buttons */}
          <div className='mt-4 md:mt-0 md:ml-6 flex items-center gap-4'>
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <FaShoppingCart className='text-xl' />
                {totalItems > 0 && (
                  <span className='absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1'>
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {!token ? (
              <>
                <Link to="/login">
                  <button className='border border-blue-400 rounded px-3 py-1'>Log in</button>
                </Link>
                <Link to="/signup">
                  <button className='border border-blue-400 rounded px-3 py-1'>Signup</button>
                </Link>
              </>
            ) : (
              <ProfileDropDown />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

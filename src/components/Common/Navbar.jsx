import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo.png'
import { NavbarLinks } from '../../data/navbar-link'
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { IoIosArrowDown } from "react-icons/io";
import { Categories } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector'
 import { useDispatch } from 'react-redux';
 import { logout } from '../../services/operations/authAPI'
import { isTokenExpired } from '../../services/autoDeleteToken' // Import your token expiration utility
import { CgProfile } from "react-icons/cg";


function Navbar() {
 
  // remove the token if expires
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    if (storedToken && isTokenExpired(storedToken)) {
      localStorage.removeItem("token");
      dispatch(logout()); // update Redux
    }
  
    // Optional: check every 5 seconds
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      if (currentToken && isTokenExpired(currentToken)) {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [dispatch]);
  
    
      // continue main code
      const {token} = useSelector((state)=> state.auth);
      const {user} = useSelector((state)=> state.profile );
      const {totalItems} = useSelector((state)=> state.cart);
      const location =  useLocation();

      
      // API CALLL
      const [subLinks , setSubLinks] = useState([]);

      const fetchSubLinks = async()=>{
        try {
              const result = await apiConnector("GET", Categories.CATEGORIES_API)
              console.log("printing sublinks result", result);
               setSubLinks(result.data.data)
        
            } catch (error) {
              console.log(error);
              console.log("could not fetch the category link")
            }
          }

      useEffect(()=>{
        fetchSubLinks();
      },[])

    
    const matchRoute = (route) =>{
      return(
           matchPath( {path:route}, location.pathname) 
        )
    }
 
   
    return (
 <div className=' h-14   border-b-[1px] justify-center border-blue-50 items-center  '>
        <div className='flex w-11/12 items-center mx-auto justify-between max-w-[80%]  '>

           <Link className='flex flex-row items-center justify-center py-2' to ="/">
              <img src={logoImg} alt="image_logo"  height={40} width={40}/>
              <span className='text-white text-2xl'>StudyNotion</span>
           </Link>
             
          <nav>
            <ul className='flex flex-row gap-4 text-white '>
                {
                    NavbarLinks.map((link ,index)=>{
                        return(
                            <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                    <div className='cursor-pointer flex items-center gap-1 group relative'>
                                      <p className=' text-richblack-50 '>
                                        {link.title}
                                      </p>
                                      <IoIosArrowDown></IoIosArrowDown>
                                      
                                      <div className='invisible opacity-0 absolute left-[50%] top-[50%]
                                        translate-x-[-80%] translate-y-[50%] 
                                        flex flex-col rounded-md bg-gray-100 p-4 text-richblack-900 transition-all
                                        duration-200 group-hover:visible group-hover:opacity-100 lg:w-[250px]
                                      '>
                                         <div className='absolute left-[70%]  h-6 w-6 rotate-45 
                                           duration-200  translate-x-[90%] top-0  bg-gray-100'>
                                         </div>

                                          {
                                            subLinks.length? (
                                              
                                                subLinks.map((subLink , index)=>(
                                                 <Link to={`/catalog/${subLink._id}`} key={index}>
                                                    <p>{subLink.name}</p>
                                                 </Link>

                                                ))
                                              
                                            ): (<div> No course Found </div>)
                                          }

                                      </div>
                                     

                                    </div>
                                ):(
                                    <Link to={link?.path}>
                                       <p className={`${matchRoute(link?.path)? "text-yellow-400":"text-richblack-50"}`}>
                                        { link.title}
                                        </p>
                                    </Link>
                                )
                            }
                        </li>
                        )
                    })
                }   
            </ul>
          </nav>

           {/* {login , Signup , Dashboard } */}
           <div className='flex gap-x-4 items-center text-richblack-25 '>
               {
                 user &&  user?.accountType !== "Instructor" && (
                     <Link to="/dashboard/cart" className='relative'>
                         <FaShoppingCart/>
                         {
                            totalItems>0 && (
                                <span>
                                     {totalItems}
                                </span>
                            )
                         }
                     </Link>
                 )
               }  

               {
                 token === null && (
                    <Link to="/login">
                       <button className='border border-blue-25 rounded-xl shadow-blue-200 shadow-md px-2 py-1'>Log in</button>
                    </Link>
                 )
               }
               {
                 token === null && (
                    <Link to="/signup">
                       <button className='border border-blue-25 rounded-xl shadow-blue-200 shadow-md px-2 py-1'>
                          Signup
                       </button>
                    </Link>
                 )
               }
               
                  
               
               {
                 token!==null && <ProfileDropDown/>

               }
           </div>

        </div>
    </div>
  )
}

export default Navbar

import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Navbar from "./components/Common/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import UserProfile from "./components/analyticComp/UserProfile";

import VerifyEmail from "./Pages/VerifyEmail";
import CreateCategoryForm from "./Pages/CreateCategoryForm";
import CreateCoursePage from "./Pages/CreateCoursePage";
import CategoryCourses from './Pages/Category_Courses'; // adjust path as needed
import CourseDetails from "./Pages/CourseDetails";
import EnrolledCourse from "./Pages/EnrolledCourse";

import ALLCourses from "./Pages/ALLCourses";
import CartPage from "./Pages/Cartpage";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import { useSelector } from "react-redux";


function App() {
const userFromRedux = useSelector((state) => state.profile.user);
 const user = JSON.parse(localStorage.getItem('user')) || userFromRedux;



  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      {/* Set up routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/Userprofile" element={<UserProfile />} />
       <Route path="/createcourses" element={<CreateCoursePage/>} /> 
       <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/createCategory" element={<CreateCategoryForm/>} />
        <Route path="/catalog/:categoryId" element={<CategoryCourses />} />
         <Route path="/AllCourses" element={<ALLCourses/>} />
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>
        <Route path="/my-courses" element={<EnrolledCourse />} />
        <Route path="/dashboard/cart" element={<CartPage/>}></Route>

        <Route element ={  <ViewCourse/>}>
          {
             user?.accountType =="Student" && (
            <Route path="/view-Course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>} />)
          }
        </Route >



      </Routes>
    </div>
  );
}

export default App;

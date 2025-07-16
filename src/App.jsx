import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./components/Common/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserProfile from "./components/analyticComp/UserProfile";
import VerifyEmail from "./Pages/VerifyEmail";
import CreateCategoryForm from "./Pages/CreateCategoryForm";
import CreateCoursePage from "./Pages/CreateCoursePage";
import CategoryCourses from './Pages/Category_Courses';
import CourseDetails from "./Pages/CourseDetails";
import EnrolledCourse from "./Pages/EnrolledCourse";
import ALLCourses from "./Pages/ALLCourses";
import CartPage from "./Pages/Cartpage";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/core/Auth/PrivateRoutes";
import Dashboard from "./Pages/dashbord/Dashboard";
import AboutUs from "./Pages/Aboutus";
import ContactUs from "./Pages/ContactUs";
import Setting from "./Pages/Setting";
import { getUserDetails } from "./services/operations/profileAPI";
import { setUser, setUserProfile } from "./Slices/profileSlice";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const fetchedUser = await getUserDetails();
          dispatch(setUserProfile(fetchedUser));
        } catch (error) {
          console.log("Error fetching user profile", error);
        }
      }
    };
    fetchUser();
  }, [token, dispatch, user]);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/catalog/:categoryId" element={<CategoryCourses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/dashboard/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route element={<ViewCourse />}>
          {user?.accountType === "Student" && (
            <Route path="/view-Course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
          )}
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="my-profile" />} />
            <Route path="my-profile" element={<UserProfile />} />
            <Route path="enrolled-courses" element={<EnrolledCourse />} />
            <Route path="createcourses" element={<CreateCoursePage />} />
            <Route path="createCategory" element={<CreateCategoryForm />} />
            <Route path="AllCourses" element={<ALLCourses />} />
            <Route path="setting" element={<Setting />} />
            <Route path="settings" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentfeaturesApI';
import { getCourseDetails } from '../services/operations/courseAPI';
import { toast } from 'react-toastify';
import GetAvgRating from '../utils/averageRating';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import ConfirmationModal from '../components/Common/ConfirmationModal';

function CourseDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const tokenFromRedux = useSelector((state) => state.auth.token);
  const userFromRedux = useSelector((state) => state.profile.user);
  const token = localStorage.getItem('token') || tokenFromRedux;
  const user = JSON.parse(localStorage.getItem('user')) || userFromRedux;
  const loading = useSelector((state) => state.auth.loading);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState([]);

  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseDetails(courseId);
        if (response.success) {
          setCourseDetails(response.data);
          console.log("Fetched course details:", response.data);
        } else {
          console.error("Failed to fetch course details:", response);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Could not fetch course details.");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    if (courseDetails?.ratingAndReviews) {
      const count = GetAvgRating(courseDetails.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [courseDetails]);

  const [totalNumberofLectures, setTotalNumberofLectures] = useState(0);
  useEffect(() => {
    let totalLectures = 0;
    if (courseDetails?.courseContent) {
      courseDetails.courseContent.forEach(section => {
        totalLectures += section.subSection.length || 0;
      });
    }
    setTotalNumberofLectures(totalLectures);
  }, [courseDetails]);

  const handleBuyCourse = () => {
    if (!token || !user) {
      setConfirmationModal({
        text1: "You are not logged in",
        text2: "Please login to buy this course",
        btn1text: "Login",
        btn2text: "Cancel",
        btn1Handler: () => {
          navigate('/login');
          setConfirmationModal(null);
        },
        btn2Handler: () => {
          setConfirmationModal(null);
        }
      });
      return;
    }

    if (courseId) {
      buyCourse(courseId, token, user, navigate, dispatch);
    }
  };

  if (loading || !courseDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-richblack-900">
        <p className="text-white text-lg">Loading course details...</p>
      </div>
    );
  }

  const {
    courseName,
    courseDescription,
    courseContent,
    ratingAndReviews,
    price,
    instructor,
    studentsEnrolled,
    category,
    // createdAt, // not used
    whatYouWillLearn,
  } = courseDetails;

  return (
    <div className="relative bg-richblack-900 min-h-screen text-white py-10 px-4">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-10 right-10 w-full max-w-xs z-10">
          <CourseDetailsCard
            courseData={courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>

        <div className="bg-richblack-800 rounded-lg p-8 shadow-lg pr-[380px]">
          <p className="text-4xl font-bold mb-4 text-richblack-5">{courseName}</p>
          <p className="text-lg text-white mb-6">{courseDescription}</p>

          <div className="flex items-center gap-x-4 mb-4 text-richblack-50">
            <span className="text-yellow-100 font-semibold">{avgReviewCount.toFixed(1)}</span>
            <span className="text-white">({ratingAndReviews.length} reviews)</span>
            <span className="text-white">({studentsEnrolled.length} students enrolled)</span>
          </div>

          <div className="mb-4 text-richblack-50">
            <p>Created by: <span className="font-semibold text-richblack-5">{instructor?.firstName} {instructor?.lastName}</span></p>
            <p>Category: <span className="font-semibold text-richblack-5">{category?.[0]?.name}</span></p>
            <p>Lectures: <span className="font-semibold text-richblack-5">{totalNumberofLectures}</span></p>
            <p>Price: <span className="font-bold text-green-400 text-2xl">₹{price}</span></p>
          </div>
        </div>
      </div>

      <div>
        <p>What You Will Learn</p>
        <div>{whatYouWillLearn}</div>
      </div>

      <div className="mt-10 mx-3">
        <div><p>Course Content</p></div>
        <div className="flex gap-16 mt-2">
          <div className="flex">
            <div><span>{courseContent.length} section(s)</span></div>
            <p>,</p>
            <div>{totalNumberofLectures} lectures</div>
          </div>
          <div className="mx-5" onClick={() => setIsActive([])}>
            <button>Collapse all sections</button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default CourseDetails;

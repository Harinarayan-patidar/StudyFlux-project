import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homePage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths"
];

function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className='w-full px-4 py-10 md:px-8 lg:px-20 relative'>
      {/* Title */}
      <h2 className='text-3xl sm:text-4xl font-semibold text-center'>
        Unlock the <HighlightText text={"Power of Code"} />
      </h2>
      <p className='text-center text-richblack-100 text-sm mt-2'>
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}
      <div className='flex flex-wrap justify-center gap-3 mt-6 mb-6 bg-richblack-300 p-2 rounded-full'>
        {tabsName.map((tab, index) => (
          <button
            key={index}
            className={`text-sm md:text-base px-4 py-2 rounded-full border 
              ${currentTab === tab
                ? "bg-richblack-900 text-white font-semibold"
                : "bg-richblack-300 text-richblack-50 hover:text-yellow-400"}`}
            onClick={() => setMyCard(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {courses.map((card, idx) => (
          <CourseCard
            key={idx}
            cardData={card}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
}

export default ExploreMore;

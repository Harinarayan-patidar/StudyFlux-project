import React from 'react';
import { IoPeopleSharp, IoBook } from "react-icons/io5";

function CourseCard({ cardData, currentCard, setCurrentCard }) {
  const { heading, description, level, lessionNumber } = cardData;

  const isActive = currentCard === heading;

  return (
    <div
      onClick={() => setCurrentCard(heading)}
      className={`w-full sm:w-[48%] md:w-[30%] lg:w-[23%] max-h-[280px] p-4 cursor-pointer rounded-md transition-all duration-200 ${
        isActive
          ? "bg-white text-richblack-200 shadow shadow-yellow-300"
          : "bg-richblack-300 text-richblack-25"
      }`}
    >
      <div className="flex flex-col justify-between h-full gap-4">
        <h3 className={`text-lg sm:text-xl ${isActive && "text-richblack-800 font-semibold"}`}>
          {heading}
        </h3>

        <p className="text-sm leading-snug line-clamp-3">{description}</p>

        <div className="flex justify-between items-center text-sm">
          <div className={`flex items-center gap-2 ${isActive ? "text-green-800" : "text-richblack-25"}`}>
            <IoPeopleSharp />
            {level}
          </div>

          <div className={`flex items-center gap-1 ${isActive ? "text-green-800" : "text-richblack-25"}`}>
            <IoBook />
            {lessionNumber}
            <span className="font-semibold ml-1">lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

import React from 'react'
import { IoPeopleSharp } from "react-icons/io5";
import { IoBook } from "react-icons/io5";
function CourseCard({cardData ,currentCard ,  setCurrentCard }) {
    const { heading, description, level, lessonNumber } = cardData;
   
  return (
    <div
      className={`w-[25%]  ${
        currentCard === cardData?.heading
          ? "bg-white  text-richblack-200  shadow shadow-yellow-300"
          : "bg-richblack-300 text-richblack-25 rounded-sm transition-all duration-200"
      }  w-[25%] max-h-[250px] cursor-pointer text-start`}
      onClick={() => setCurrentCard(cardData?.heading)}
       >
          <div className='flex flex-col gap-4 justify-between h-full  p-4 w-fit '> 
              <div className={`${ currentCard === cardData?.heading && "text-richblack-800 font-semibold text-xl"}`}>
                  {cardData.heading}
              </div>

              <div className='max-w-[250px] mb-1'>{cardData.description}</div>
            
              <div className='flex flex-row justify-between   items-center'>
                   <div className={`flex flex-row gap-2 ${ currentCard === cardData?.heading? "text-green-800 items-center": 
                    "text-richblack-25 items-center"
                   }`} >
                     <IoPeopleSharp />
                       {cardData.level}   
                   </div>

                   <div className={`flex flex-row gap-2 ${ currentCard === cardData?.heading? "text-green-800 items-center": 
                    "text-richblack-25 items-center "
                   }`} >
                     < IoBook/>
                       {cardData.lessionNumber}<span className='font-semibold'>lessions</span>   
                   </div>
                  

              </div>

          </div>

        

    </div>
  )
}

export default CourseCard

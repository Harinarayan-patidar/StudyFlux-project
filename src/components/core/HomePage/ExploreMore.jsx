import React, { use, useState } from 'react'
import {HomePageExplore} from '../../../data/homePage-explore'
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabsName =[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
   ]


function ExploreMore() {

    const[currentTab , setCurrentTab] = useState(tabsName[0]);
    const[courses, setCourses] = useState(HomePageExplore[0].courses);
    const[currentCard ,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value)=>{
           setCurrentTab(value);
           const result = HomePageExplore.filter((course) => course.tag === value);
           setCourses(result[0].courses);
           setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>

        <div className='text-4xl font-semibold text-center'>
           Unlock the <HighlightText text={"Power of Code"}/>
        </div>

        <p  className='text-center text-richblack-100 text-sm mt-1'>
            Learn to build anything you can imagine
        </p>

         <div className='flex flex-row gap-4 mt-5 mb-4 bg-richblack-300 px-1 py-1 rounded-full'>
              {
                tabsName.map((element , index)=>{
                    return(
                        
                        <div
                          className={`text-[16px] flex flex-row  items-center gap-3 
                             cursor-pointer border  border-richblack-300 p-1 pl-4 pr-4 rounded-full
                              ${currentTab ===element? "bg-richblack-900 text-white font-medium" :
                                 "bg-richblack-300 text-richblack-50" }
                             transition-all duration-200  hover:text-warmyellow `}  
                             key={index}
                             onClick={()=> setMyCard(element)}
                        >
                            {element}
                        </div>
                    )
                })
              }
         </div>
         <div className='h-[180px]'> </div>

         <div className='absolute flex flex-row  gap-20 w-full left-[100px] -translate-y-[9rem]'>
              {
                courses.map((element ,index)=>{
                    return (
                          <CourseCard
                            key ={index}
                            cardData = {element}
                            currentCard ={currentCard}
                            setCurrentCard ={setCurrentCard}
                          />
                    )
                })
              }
         </div>

    </div>
  )
}

export default ExploreMore

import React from 'react'
import Instructor from '../../../assets/images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from '../Button'
import { TiArrowRightOutline } from "react-icons/ti";

function InstructorSection() {
  return (
    <div className='mt-14 min-w-[80%] mx-auto'>
    <div className='flex flex-row gap-6 items-center w-full mt-5'>
      <div className='w-1/2 flex justify-center'>
        <img
          src={Instructor}
          alt='instructor'
          className='shadow-white min-h-[350px] max-w-[350px] object-cover'
        />
      </div>
      <div className='w-1/2 flex flex-col text-white '>
         <div className='text-4xl font-semibold'>
          Become an <br/> <HighlightText text={"Instructor"} />
         </div>
         <p className='mt-4 w-[90%] text-richblack-200 text-[18px] font-medium  '>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptas
          neque quae culpa deleniti! Atque modi architecto nam!
        </p>
          <div className='w-fit mt-12'>
            <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-4 items-center'>
                            <p>Start teaching today</p>
                            <TiArrowRightOutline/>
                    </div>
            </CTAButton>
          </div>
      </div>
    </div>
  </div>
  
  )
}

export default InstructorSection

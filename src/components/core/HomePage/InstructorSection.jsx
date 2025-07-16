import React from 'react';
import Instructor from '../../../assets/images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from '../Button';
import { TiArrowRightOutline } from "react-icons/ti";

function InstructorSection() {
  return (
    <div className='mt-14 w-[90%] max-w-7xl mx-auto px-4'>
      <div className='flex flex-col-reverse lg:flex-row items-center gap-10'>
        
        {/* Right Section (Text) */}
        <div className='w-full lg:w-1/2 flex flex-col text-white text-center lg:text-left'>
          <div className='text-3xl sm:text-4xl font-semibold'>
            Become an <br /> <HighlightText text={"Instructor"} />
          </div>
          <p className='mt-4 text-richblack-200 text-base sm:text-lg font-medium'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptas
            neque quae culpa deleniti! Atque modi architecto nam!
          </p>
          <div className='w-fit mx-auto lg:mx-0 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex items-center gap-3'>
                <p>Start teaching today</p>
                <TiArrowRightOutline />
              </div>
            </CTAButton>
          </div>
        </div>

        {/* Left Section (Image) */}
        <div className='w-full lg:w-1/2 flex justify-center'>
          <img
            src={Instructor}
            alt='Instructor'
            className='min-h-[250px] max-h-[350px] w-auto max-w-full object-cover rounded-lg shadow-lg'
          />
        </div>

      </div>
    </div>
  );
}

export default InstructorSection;

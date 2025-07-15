import React from 'react'
import HighlightText from './HighlightText'
import Plan_your_lessons from "../../../assets/images/Plan_your_lessons.png"
import Know_your_progress from "../../../assets/images/Know_your_progress.png"
import Compare_with_others from "../../../assets/images/Compare_with_others.png"
import CTAButton from "../Button"

function LearningLanguageSection() {
  return (
    <div>
       <div className='flex flex-col gap-5 mt-[130px] mb-5'>
            <div className='text-4xl font-bold text-center tracking-tight'>
                Your Swiss Knief For 
                <HighlightText className="font-extrabold" text={"Learning Any Language"}></HighlightText>
            </div>
            <div className='text-center text-richblack-300 mx-auto text-base w-[70%]'>
                Lorem ipsum dolor sit, amet consectetur adipi necessitatibus consequatur
                 provident impedit. Culpa corpor reiciendis. Accusantium
            </div>
            <div className='flex flex-row items-center justify-center mt-5'>
               <img 
                  src={Know_your_progress}
                  alt='Know_your_progress'
                  className='object-contain h-[280] w-[280px] -mr-24'
                  />
                  <img 
                  src={Compare_with_others}
                  alt='Compare_with_others'
                  className='object-contain  h-[320px] w-[340px] -mr-20'
                />
                <img 
                  src={Plan_your_lessons}
                  alt='Plan_your_lessons'
                  className='object-contain  h-[300px] w-[300px]'
                />
            </div>

           <div className='items-center self-center'>
             <CTAButton active={true} linkto={"/signup"} >
              <div>Learn More</div> 
              </CTAButton>

           </div>
       </div>
    </div>
  )
}

export default LearningLanguageSection

import React from 'react'
import HighlightText from './HighlightText'
import Plan_your_lessons from "../../../assets/images/Plan_your_lessons.png"
import Know_your_progress from "../../../assets/images/Know_your_progress.png"
import Compare_with_others from "../../../assets/images/Compare_with_others.png"
import CTAButton from "../Button"

function LearningLanguageSection() {
  return (
    <div className='mt-20 mb-10 px-4'>
      <div className='flex flex-col gap-6 items-center'>

        {/* Heading */}
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center tracking-tight'>
          Your Swiss Knife For
          <HighlightText className="font-extrabold" text={" Learning Any Language"} />
        </h2>

        {/* Subheading */}
        <p className='text-center text-richblack-300 text-sm sm:text-base max-w-2xl'>
          Lorem ipsum dolor sit, amet consectetur adipi necessitatibus consequatur
          provident impedit. Culpa corpor reiciendis. Accusantium
        </p>

        {/* Image Row */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6 mt-6'>

          <img
            src={Know_your_progress}
            alt='Know your progress'
            className='object-contain h-[220px] sm:h-[260px] w-auto'
          />

          <img
            src={Compare_with_others}
            alt='Compare with others'
            className='object-contain h-[240px] sm:h-[280px] w-auto'
          />

          <img
            src={Plan_your_lessons}
            alt='Plan your lessons'
            className='object-contain h-[220px] sm:h-[260px] w-auto'
          />

        </div>

        {/* CTA Button */}
        <div className='mt-6'>
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection

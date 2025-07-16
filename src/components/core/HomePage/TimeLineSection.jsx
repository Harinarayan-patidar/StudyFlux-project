import React from 'react'
import Logo1 from '../../../assets/images/Logo1.png'
import Logo2 from '../../../assets/images/Logo2.png'
import Logo3 from '../../../assets/images/Logo3.png'
import Logo4 from '../../../assets/images/Logo4.png'
import timeLineImage from '../../../assets/images/homeImage2.jpg'

const timeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Empowerment",
    Description: "Become the Leader You Were Meant to Be",
  },
  {
    Logo: Logo3,
    Heading: "Growth",
    Description: "Grow Your Career with Our World-Class Training",
  },
  {
    Logo: Logo4,
    Heading: "Success",
    Description: "Start Building Your Future Today",
  },
]

const TimeLineSection = () => {
  return (
    <div className='w-full px-4 py-10'>
      <div className='flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-10'>

        {/* Timeline list */}
        <div className='flex flex-col gap-6 w-full lg:w-[45%]'>
          {timeLine.map((element, index) => (
            <div className='flex items-start gap-4' key={index}>
              <div className='w-[40px] h-[40px] bg-white rounded-md flex items-center justify-center shadow-md'>
                <img src={element.Logo} alt={element.Heading} className='w-6 h-6 object-contain' />
              </div>
              <div>
                <h2 className='text-lg font-semibold text-richblack-50'>{element.Heading}</h2>
                <p className='text-sm text-richblack-200'>{element.Description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className='relative w-full lg:w-[50%]'>
          <img
            src={timeLineImage}
            alt='Timeline visual'
            className='object-cover w-full max-h-[400px] rounded-md shadow-lg'
          />

          {/* Overlay box */}
         <div className='absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  bg-green-900 text-white rounded-md 
  flex flex-col sm:flex-row 
  w-[95%] sm:w-[75%] 
  p-3 sm:p-4 gap-3 sm:gap-6 justify-around text-center sm:text-left'
>
  {/* Experience */}
  <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2 border-b sm:border-b-0 sm:border-r border-green-400 px-3 sm:px-4 pb-2 sm:pb-0 sm:pr-4'>
    <p className='text-xl sm:text-2xl font-bold'>10</p>
    <p className='text-green-200 text-xs sm:text-sm'>Years of Experience</p>
  </div>

  {/* Courses */}
  <div className='flex flex-col sm:flex sm:flex-row items-center gap-1 sm:gap-2 px-3 sm:px-4 pt-2 sm:pt-0'>
    <p className='text-xl sm:text-2xl font-bold'>250+</p>
    <p className='text-yellow-200 text-xs sm:text-sm'>Types of Courses</p>
  </div>
</div>

        </div>
      </div>
    </div>
  )
}

export default TimeLineSection

import React from 'react'
import Logo1 from '../../../assets/images/Logo1.png';
import Logo2 from '../../../assets/images/Logo2.png';
import Logo3 from '../../../assets/images/Logo3.png';
import Logo4 from '../../../assets/images/Logo4.png';
import timeLineImage from '../../../assets/images/homeImage2.jpg';

const timeLine = [
    {
        Logo:Logo1,
        Heading:"Leadership",
        Description: "Fully commited to the success company"
    },
    {
        Logo:Logo2,
        Heading:" Empowerment",
        Description: " Become the Leader You Were Meant to Be"
    },
    {
        Logo:Logo3,
        Heading:"Growth",
        Description: "Grow Your Career with Our World-Class Training"
    },
    {
        Logo:Logo4,
        Heading:"Success",
        Description: "Start Building Your Future Today"
    },
]

const TimeLineSection = ()=> {
  return (
    <div>
        <div className='flex flex-row gap-1 items-center w-[90%] justify-around ml-8'>
            <div className='flex flex-col w-[40%] gap-4 '>
                 {
                      timeLine.map((element , index) =>{
                          return(
                               <div className='flex flex-row gap-4 ' key={index}> 
                                  <div className='w-[30px] h-[30px] bg-white  flex items-center m-2'> 
                                        <img src={element.Logo}/>
                                  </div>

                                  <div className=' flex flex-col'>
                                     <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                     <p className='text-base'>{element.Description}</p>
                                  </div>

                               </div>
                          )
                      })
                 }
            </div>
            <div className='relative shadow-blue-100 w-[50%]'>
                 <img src={timeLineImage}
                   alt='TimeLineImage'
                   className='shadow-yellow-100 object-cover h-fit'
                 ></img>

               <div className='absolute bg-green-900 flex - flex-row text-white w-[75%]  uppercase p-4
                                left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <div className='flex flex-row gap-5 items-center border-r border-green-400 px-4'>
                             <p className='text-4xl font-bold '>10</p>
                             <p className='text-green-200 text-sm'>Years of expirience</p>
                        </div>
                        <div className='flex flex-row gap-5 items-center px-4 py-2 '>
                               <p className='text-4xl font-bold'>250+</p>
                               <p className='text-yellow-200 text-sm'>Types of Courses</p>
                        </div>
               </div>

            </div>

        </div>

    </div>
  )
}

export default TimeLineSection

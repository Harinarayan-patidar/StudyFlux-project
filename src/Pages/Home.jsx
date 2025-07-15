import React from 'react'
import { TiArrowRightOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/Button';
import Video from '../assets/images/homeVideo.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection';
import FooterHome from '../components/core/HomePage/FooterHome';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/core/HomePage/ReviewSlider';

function Home() {
  return (
    <div>
        {/* // Section 1 create */}
        <div className='realtive mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
           
            <Link to ={"/signup"}>
                  <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-300 font-bold text-richblack-100 transition-all
                   duration-200 hover:scale-95 w-fit'>
                    
                     <div className='flex flex-row items-center gap-2 rounded-full
                         px-4 py-[4px] group-hover:bg-richblack-900 '>
                        <p>Become an Instructor</p>
                         <TiArrowRightOutline />
                      </div>

                  </div>
            </Link>
           
            <div className='text-center  text-4xl font-semibold mt-6'>
                 Empower Your Future With 
                 <HighlightText  text = {"Coding Skills"}/>
            </div>
            
            <div className=' mt-4 w-90% text-center text-lg font-bold text-richblack-200 max-w-[70%]'>
            Our course teaches essential coding skills, helping you build real-world applications and solve complex problems, preparing you for success in the fast-paced tech industry.
            </div>
           
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                     Learn More
                </CTAButton>  
                <CTAButton active={false} linkto={"/login"}> 
                    Book a Demo
                </CTAButton>  
            </div>
             
            <div className=' mx-3 my-10 shadow-blue-200 max-h-[30%] max-w-[60%]'>
                <video
                 muted
                 loop
                 autoPlay
                 >
                 <source src={Video} type='video/mp4'/>
                </video>
            </div>
            
            {/* // code section 1 */}
            <div className='w-[90%]'>
              <CodeBlocks
                 position={ "lg: flex-row "}
                 heading={ 
                  <div className='text-3xl font-bold'>
                      Unlock your 
                      <HighlightText text={"coding potential "}></HighlightText> 
                      with our online courses      
                  </div>
                }
                subheading={"Our courses are designed by industry experts, providing practical knowledge and skills to help you succeed in the tech world."}
                ctabtn1={
                    {
                      btnText:" Try it yourself",
                      linkto:"/signup",
                      active:true,
                    }
                }
                ctabtn2={
                    {
                      btnText:"learn more",
                      linkto:"/login",
                      active:false,
                    }
                }
               codeblock={`<<!DOCTYPE html> \n <html> \n <meta charset="UTF-8">\n
                                <meta name="viewport" , initial-scale=1.0">\n
                                   <title>Sample Page</title>\n  </head>\n <body>\n  <header>\n`}
                
                codeColour={"text-yellow-500"}

              />
            </div>
            
                {/* // code section 2 */}
            <div className='w-[90%]'>
              <CodeBlocks
                 position={ "lg: flex-row-reverse "}
                 heading={ 
                  <div className='text-3xl font-bold'>
                      Start Coding
                      <HighlightText text={"in seconds"}></HighlightText> 
                           
                  </div>
                }
                subheading={" our courses are best selling , in all over the worled . !Hurry !Hurry !Hurry buy it now and grab the best oppportunity"}
                ctabtn1={
                    {
                      btnText:" let's learn",
                      linkto:"/signup",
                      active:true,
                    }
                }
                ctabtn2={
                    {
                      btnText:"learn more",
                      linkto:"/login",
                      active:false,
                    }
                }
               codeblock={`<<!DOCTYPE html> \n <html> \n <meta charset="UTF-8">\n
                                <meta name="viewport" , initial-scale=1.0">\n
                                   <title>Sample Page</title>\n  </head>\n <body>\n  <header>\n`}
                
                codeColour={"text-yellow-500"}

              />
            </div>

            <ExploreMore/>

        </div>

 
        {/* // Section 2 create */}
        <div className='bg-gray-50 text-richblack-900 '>
            <div className='homepage_bg h-[280px]'>
               <div className=' flex-col w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                       <div className='h-[130px]'></div>
                       <div className='flex flex-row gap-7 text-white'>
                          <CTAButton active={true} linkto={"/signup"}>
                             <div className='items-center gap-3 flex'> 
                              Explore Full Catelog
                              <TiArrowRightOutline></TiArrowRightOutline> 
                             </div>
                          </CTAButton>
                          <CTAButton active={false} linkto={"/login"}>
                             <div className='items-center gap-3 flex'> 
                                 Learn More
                              <TiArrowRightOutline></TiArrowRightOutline> 
                             </div>
                          </CTAButton>
                       </div>
               </div>
            </div>

            <div className='mx-auto max-w-max flex flex-col items-center w-11/12 justify-between gap-8 '>
                 <div className='flex flex-row gap-5 max-w-[80%] my-7 '>

                     <div className='text-4xl font-semibold w-[45%]'>
                          Get the skills you need for a 
                          <HighlightText text={"Job that is in the demand"}></HighlightText>
                     </div>

                     <div className='flex flex-col  w-[50%] mx-2'>
                         <div className='gap-4 w-[80%] text-[17px] text-blue-900 '> <p>Lorem ipsum consectetur adipisicing elit. Laborum saepe omnis repellat officia corporis sit mollitia quam nobis neque enim?</p></div>
                         <div className=' my-3 w-[34%]  mx-4 '> 
                           <CTAButton  active={true} linkto={"/signup"}>
                             <div className='items-center gap-3 flex '> 
                                Learn More
                              <TiArrowRightOutline ></TiArrowRightOutline> 
                             </div>
                          </CTAButton>
                          </div>
                     </div>
                 </div>

                    
            <TimeLineSection/>
            <LearningLanguageSection/>
            
            </div>

          
        </div>

        {/* // Section 3 create */}
         <div className='w-11/12 mx-auto max-w-max items-center min-w-full flex flex-col justify-between bg-richblack-900'>
            <InstructorSection />

            <h2 className='text-center font-semibold text-white text-4xl mt-10'> Reviews From Other Learners</h2>

            {/* {review Slider here} */}
            <ReviewSlider/>



         </div>

        {/* // Footer create */}
        <div className='w-11/12  min-w-[100%] items-center mt-32 flex flex-col bg-richblack-300'>
          <div className='w-[75%]'>
           
            <FooterHome/>
 
          </div>
        </div>
    </div>
  )
}

export default Home

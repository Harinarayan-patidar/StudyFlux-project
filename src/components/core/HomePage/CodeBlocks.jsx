import React from 'react'
import CTAButton from '../Button'
import HighlightText from './HighlightText'
import { TiArrowRightOutline } from "react-icons/ti";
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({
     position , heading , subheading, ctabtn1 ,  ctabtn2 , backgroundGradiant ,codeblock, codeColour

}) {
  return (
    <div className={`flex ${position}  my-10 justify-between  gap-10 mx-auto w-[70%] ` }>
        {/* section 1 */}
        <div className='w-[50%] flex flex-col gap-3 ' >
            <div >{heading}</div>
            <div className='text-richblack-100 font-bold text-sm '>{subheading}</div>
            <div className='flex gap-7 mt-3'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}> 
                    <div className='flex gap-2 items-center'>
                         {ctabtn1.btnText}
                         <TiArrowRightOutline/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>    
                         {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/*section 2*/}
        <div className='flex flex-row h-fit text-[10px]  l: w-[500px]  py-4 sandeep'>
           {/* HW:- BG me Gradiant Dalo */}
           <div className='text-center flex-col  w-[10%] text-richblack-100 font-inter font-bold ' >
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
              <p>12</p>
              <p>13</p>
              <p>14</p>
           </div>
           <div className={`w-[90%] flex flex-col text-sm font-bold font-mono gap-2 ${codeColour} pr-2`}>
                 <TypeAnimation
                   sequence={[codeblock ,2000 ,""]}
                   repeat={Infinity}
                   cursor ={true}
                   style={
                        {
                          whiteSpace:"pre-line",
                          display:"block",

                        }

                   }
                  omitDeletionAnimation={true}
                 />
           </div>

        </div>
        
    </div>
  )
}

export default CodeBlocks

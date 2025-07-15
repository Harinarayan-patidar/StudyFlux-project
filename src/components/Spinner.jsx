import React from 'react'
import "./Spinner.css";
const Spinner = () => {
  return (
    <div className='flex justify-center items-center flex-col fixed top-[50%] left-[50%] '>
       <div className="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>

</div>
      <p className='font-bold text-lg py-6'>Loading...</p>
    </div>
  )
}

export default Spinner
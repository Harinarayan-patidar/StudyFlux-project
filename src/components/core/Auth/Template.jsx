import React from 'react'
import Spinner from '../../Spinner';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useState } from 'react';

function Template({title , description1 , description2 , image , formType}) {
  const [loading , setLoading] = useState(false);

  return (
    <div className='items-center'>
      {
         loading ? (<Spinner/>)  : (
              <div className='flex flex-row w-11/12 gap-5 p-4 '>
                 {/* {left div of form} */}
                   <div className='flex flex-col gap-2 mx-auto p-3'>
                        <h1> 
                            {title}
                        </h1>
                         
                         <p>
                            <span>{description1}</span>
                            <span>{description2}</span>
                         </p>
                          {
                           formType == "signup"? (<SignupForm/>):(<LoginForm/>)
                          }
                     </div>

                  {/* {right div of image} */}
                     <div className='w-[50%] p-4  width={500px}
                                 height={504px}
                                 loading="lazy"'>
                        <img src={image} />
                     </div>
                  
              </div>
         )
      }
      
    </div>
  )
}

export default Template

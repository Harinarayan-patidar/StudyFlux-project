import React from 'react'

function HighlightText({text}) {
  return (
     <span className='font-semibold text-blue-100 '>
        {" "}
        {text}
     </span>
  )
}

export default HighlightText

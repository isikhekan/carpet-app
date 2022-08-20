import "../App.css"
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),g
    ],
  }
  ```
*/
import React from 'react'
function TextArea({areaName}) {
    return (
      <div className='flex text-area-field flex-row relative'>
        <label htmlFor={areaName} className="border-0 text-center bg-white block rounded-md text-sm  absolute z-10 left-0 top-1 opacity-25">
          {areaName}
        </label>
        <div className="mt-1  relative ">
          <textarea
            style={{resize:"none"}}
            type="text"
            name={areaName}
            id={areaName}
            className=" bg-white  italic  block w-full h-24 max-w-10.5 pl-2 pr-12 sm:text-sm rounded-md border-0 outline-none"
            placeholder=""
          />
        </div>
      </div>
    )
  }
  export default TextArea
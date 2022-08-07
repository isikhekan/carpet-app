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
      <div>
        <label htmlFor={areaName} className="block text-sm font-medium text-gray-700">
          {areaName}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <textarea
            style={{resize:"none"}}
            type="text"
            name={areaName}
            id={areaName}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-40 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="Type here..."
          />
        </div>
      </div>
    )
  }
  export default TextArea
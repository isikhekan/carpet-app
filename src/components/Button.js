/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React from 'react'
function Button(props) {
    return (
        <button onClick={props.onClick} disabled={props.isActive} className="bg-gray-300 hover:bg-gray-400 text-gray-800 italic w-full max-w-10.5 py-2 px-4 rounded text-center text-lg">
        {props.value}
        </button>
    )
  }
  export default Button
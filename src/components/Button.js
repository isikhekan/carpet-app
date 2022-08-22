import '../App.css';

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
        <button onClick={props.onClick} disabled={props.isActive} className="mt-1 bg-teal hover:bg-sky-200  text-gray-800 italic w-full max-w-10.5  text-sm md:text-lg h-10 md:h-10  px-4 rounded-lg text-center  ">
        {props.value}
        </button>
    )
  }
  export default Button
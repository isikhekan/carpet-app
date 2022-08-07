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
import React ,{useState} from 'react'
function TextInput({inputName, onChange}) {
    console.log(inputName)
    const [roomNameIsValid,setRoomNameIsValid] = useState("")

    const checkRoomNameIsValid = () => {
        const inputRoomName = document.getElementById(inputName)
        const roomNameIsValid = inputRoomName.value
        setRoomNameIsValid(roomNameIsValid)
        onChange(roomNameIsValid)
    }
    return (
      <div>
        <label htmlFor={inputName} className="block text-sm font-medium text-gray-700">
          {inputName}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input onChange={checkRoomNameIsValid}
            type="text"
            name={inputName}
            id={inputName}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-10 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="Type here..."
          />
        </div>
      </div>
    )
  }
  export default TextInput
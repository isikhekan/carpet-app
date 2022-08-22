
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
import React ,{useState} from 'react'
function Input({inputName, onChange= ()=>{}, type="text",onClick =()=>{}, id,position=true} ) {
    const [roomNameIsValid,setRoomNameIsValid] = useState("")
    const checkRoomNameIsValid = () => {
        const inputRoomName = document.getElementById(id)
        const roomNameIsValid = inputRoomName.value
        setRoomNameIsValid(roomNameIsValid) 
        onChange(roomNameIsValid)
    }
    const isCheckboxChecked = ()=>{
      onClick(id)
    }
    return (
      <div className='input-field flex flex-row  h-full text-center items-center justify-center relative'>
        {position ? <label htmlFor={inputName} className="block  text-sm bg-white  absolute z-10 top-0 opacity-25   left-0  rounded-md   ">{inputName}</label> : <label htmlFor={inputName} className="mt-1  mr-3 block text-sm rounded-md">{inputName}</label>}
        <div className="mt-1 relative rounded-md ">
          <input autoComplete='off' onClick={isCheckboxChecked} onChange={checkRoomNameIsValid} 
            type={type}
            name = {id}
            id={id}
            className="outline-none italic max-w-10.5 block h-10 pl-2  sm:text-sm rounded-md border-0"
            placeholder=""
          />
        </div>
      </div>
    )
  }
  export default Input
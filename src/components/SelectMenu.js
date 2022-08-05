import React from "react";
const SelectMenu = (props)=>{
  const { values } = props
  return(
    <div className="w-full h-7 selectSection">
      <select className="border-white bg-gray-200 rounded-md bg-gray-400 w-24 text-center h-7 outline-0 border-b-2 border-b-gray-500" name="" id="">
        {values.map((item)=>(
          <option className="" value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )


}
export default SelectMenu

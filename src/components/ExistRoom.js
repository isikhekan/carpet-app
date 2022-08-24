import React from "react";
import Input from "./Input";
import SelectMenu from "./SelectMenu";
import '../App.css';


function ExistRoom(props){
    return(
        <span id={props.id}  className="select-none text-center flex flex-col border   border-solid bg-tiffany-blue  rounded-md w-full  justify-center items-center z-40">
            <div className="flex flex-row w-full items-center justify-center h-1/4">
                <div className="text-sm w-5/6 flex justify-evenly ">Room Name : {props.id}</div>
                <div className="w-1/6 flex items-center justify-center">
                    <svg onClick={props.deleteSelectedLines} xmlns="http://www.w3.org/2000/svg" className="h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
            <div className="h-1/4 flex flex-col justify-center items-center">
                <Input inputName="Glow/Unglow Lines" type="checkbox"  onClick={props.glowSelectedRoom} id={props.id} position={false}/>
            </div>
            <div className=" flex flex-row mt-2 h-1/4  ">
                <span className="text-sm flex justify-center items-center">
                    Carpet type : 
                </span>
                 <SelectMenu changeTypeOfCarpet = {props.changeTypeOfSelect}  defaultOption={{value: "multi-pieced", label: "Multi Piece"}} options = {[{value: "multi-pieced", label: "Multi Piece"},{value: "one-piece", label: "One Piece"}]} />
            </div>
            <div className="mt-2 w-full flex flex-row h-1/4">
                <span className="h-full text-sm">Total Carpet Piece :  </span>
                <input onInput={props.changeConnectedLinesTotalPiece} className=" w-14 border-2 border-solid h-5 outline-0 rounded-md text-center ml-1" min={1} value={props.pieceInputValue} type="number" />
            </div>
        </span>


    )

}
export default ExistRoom
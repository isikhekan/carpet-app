import React from "react";
import SelectMenu from "./SelectMenu";



function ExistRoom(props){


    return(
        
        <span  id={props.id} onClick={props.glowSelectedRoom} className="select-none text-center flex flex-col border-solid border-black rounded-lg h-full w-48 justify-center items-center">
            <div className=""><span className="w-full select-none">{props.id}</span></div>
            <SelectMenu defaultOption={{value: "multi-pieced", label: "Multi Piece"}} options = {[{value: "multi-pieced", label: "Multi Piece"},{value: "one-piece", label: "One Piece"}]} />
            <div className="w-full">
                <span>Total Piece : </span>
                <input onInput={props.changeConnectedLinesTotalPiece} className="w-16 border-2 border-solid h-6 outline-0 rounded-md text-center ml-1" min={1} value={props.pieceInputValue} type="number" />
            </div>
                <svg onClick={props.deleteSelectedLines} xmlns="http://www.w3.org/2000/svg" className="h-9 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
        </span>


    )

}
export default ExistRoom
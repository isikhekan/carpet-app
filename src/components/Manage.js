import React, { Component, Fragment } from 'react'
import { Transition } from '@headlessui/react'
import Draw from './Draw'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import "../App.css"
class Manage extends Component {
  state = {
    rooms: [],
    currentRoomName:"",
    selectedRoom: "",
    selectedRoomIndex: 0,
    roomNameIsValid: false,
  }
  checkRoomNameIsValid = (e) => {
    const roomNameIsValid = e.length > 3;
    this.currentRoomName = e

    this.setState({
      ...this.state,
      roomNameIsValid,
    })

  }
  showMenuSection = () => {
      const manage = document.getElementById("manageSection");
      const openMenuSection = document.getElementById("openMenuSection")
      openMenuSection.style.display = "none"
      manage.style.display="block"
      manage.style.zIndex = 50;
      openMenuSection.style.zIndex = 0;
  }
  
  closeMenuSection = ()=>{
    const openMenuSection = document.getElementById("openMenuSection")
    const manage = document.getElementById("manageSection");
    manage.style.display="none"
    openMenuSection.style.display="block"
    manage.style.zIndex = 0;
    openMenuSection.style.zIndex = 50;
  }

  changeSelectedRoom = () => {
    const selectedRoom = document.getElementById("roomSelect")
    const options = selectedRoom.options;
    this.setState({
      ...this.state,
      selectedRoomIndex: options[selectedRoom.selectedIndex].index,
      selectedRoom: options[selectedRoom.selectedIndex].text,
    })
  }
  updateStatement = ()=>{
    this.setState({
      ...this.state
    })
  }
  addRoom = () => {
    const id = this.currentRoomName
    const roomInput = document.createTextNode(id)
    const selectedRoom = document.getElementById("roomSelect");
    const options = selectedRoom.options;
    const option = document.createElement("option");
    option.setAttribute('id', id);
    selectedRoom.appendChild(option)
    option.appendChild(roomInput)
    selectedRoom.value = id;
    this.setState({
      ...this.state,
      rooms: [...this.state.rooms, { roomName: id, coordinates: { connectedLines: [[]], connectedLineCounter: 0 } }],
      selectedRoom: id,
      selectedRoomIndex: options[selectedRoom.selectedIndex].index
    })
  }

  render() {
    return (
      <div  className=" text-xs sm:text-lg w-screen h-screen flex flex-row  touch-none relative select-none transition-all" >
        <div id="openMenuSection" onClick={this.showMenuSection} className="  select-none md:hidden  border-solid border-l-0 border-r-0 rounded-2xl absolute z-50 md:z-0 top-0  left-0  flex items-center justify-center h-10 w-10 ">
          <svg  xmlns="http://www.w3.org/2000/svg" className=" h-full w-full text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path  strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>
        <div id="manageSection" className="hidden md:block z-10 left-5 w-4/5 md:w-1/5 top-0 max-w-18.75 absolute h-full rounded-md">
          <div className="w-full h-full flex flex-col justify-center  relative  text-black rounded-2xl">
            <div className="w-full h-3/4 relative flex justify-center  flex-col   bg-sky-50  shadow-allSide  rounded-2xl ">
                  <div onClick={this.closeMenuSection} className=" border-solid border-l-0 border-r-0 border-black rounded-2xl top-0 right-0 w-10 h-10 text-black absolute flex justify-center items-center">
                    <svg color='black' xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className=" w-full flex flex-row justify-center  items-center h-1/4">
                    <div className="flex flex-col justify-center">
                      <Input onChange={(e)=>{}} inputName="Name" id="getUserName"/>
                    </div>
                  </div>
                  <div className="h-1/4 w-full flex flex-row justify-center items-center">
                    <div className='flex flex-col justify-center'>
                      <TextArea areaName="Address"/>                    
                    </div>
                  </div>
                  <div className="w-full h-1/4 flex flex-row items-center justify-center relative">
                    <div className='flex w-full flex-col justify-center items-center'>
                      <label className=' w-full text-center text-sm absolute z-10 top-8 left-0 ' htmlFor="roomSelect">Exist Floors</label>
                      <select className=" border-1 ml-2 bg-sky-50 rounded-md max-w-10.5  italic w-full  outline-0 h-10 text-sm  text-black"
                          onChange={this.changeSelectedRoom} name="roomSelect" id="roomSelect">
                      </select>
                    </div>
                  </div>
                    <div className="w-full h-1/4 flex flex-row justify-center items-center  ">
                      <div className='flex flex-col '>
                          <Input onChange={this.checkRoomNameIsValid} id="addFloor" inputName = "For Enter Floor"/>
                          <Button onClick={this.addRoom} isActive={!this.state.roomNameIsValid} value="Add Floor "/>
                      </div>
                    </div>

            </div>
          </div>
        </div>
          <div className="w-full z-0">
          <div className="draw max-h-screen h-full">
            <div className="w-full max-h-screen h-full bg-cyan-50">
              {this.state.rooms.length ? (
                <Draw updateStateOnChange={this.updateStatement}
                  room={this.state.rooms}
                  currentRoom={this.state.selectedRoom}
                  currentRoomIndex={this.state.selectedRoomIndex}
                />
              ) : (
                <h2 className="italic text-center flex items-center justify-center h-full select-none  "><span>You must enter floor before draw</span></h2>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Manage

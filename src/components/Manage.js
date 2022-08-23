import React, { Component } from 'react'
import Draw from './Draw'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import "../App.css"

class Manage extends Component {
  state = {
    windowWidth:window.screen.width,
    windowHeigth:window.screen.height,
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

  closeMenuSection = ()=>{
    const openMenuSectionButton = document.getElementById("openMenuSection")
    const manage = document.getElementById("manageSection");
    openMenuSectionButton.style.visibility="visible"
    openMenuSectionButton.style.zIndex=50
    manage.style.visibility="hidden"
    manage.style.left=-50+"%";
    openMenuSectionButton.style.left = 0;
  }
  showMenuSection = () => {
      const manage = document.getElementById("manageSection");
      console.log(manage.offsetWidth)
      const openMenuSectionButton = document.getElementById("openMenuSection")
      openMenuSectionButton.style.visibility="hidden"
      manage.style.visibility="visible"
      manage.style.left= 0
      openMenuSectionButton.style.left = -50+"%"
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
      <div  className=" text-xs md:text-base flex flex-row h-screen w-screen   relative overflow-hidden" >
        <div id="openMenuSection" onClick={this.showMenuSection} className="invisible select-none  rounded-2xl absolute z-50 top-0 left-0  flex items-center justify-center h-10 w-10 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full  text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div id="manageSection" className=" visible z-50 left-1/8 sm:left-1/3 md:left-1/3 w-4/5 md:w-2/5 top-0 max-w-18.75 absolute h-full rounded-md ">
          <div className="w-full h-full flex flex-col justify-center  relative  text-black rounded-2xl">
            <div className="w-full min-h-3/4 h-3/4 relative flex justify-center  flex-col   bg-baby-blue  shadow-2xl shadow-slate-600  rounded-2xl ">
                  <div onClick={this.closeMenuSection} className=" ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="top-0 right-0 w-10 h-10 text-black absolute flex justify-center items-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className=" w-full flex flex-row justify-center  items-center h-1/4">
                    <div className="relative flex flex-col justify-center focus-within:text-green-600 focus-within:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className=" h-8 w-8 absolute top-1/6 z-10 opacity-75 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <Input onChange={(e)=>{}} inputName="User Name" id="getUserName"/>
                    </div>
                  </div>
                  <div className="h-1/4 w-full flex flex-row justify-center items-center">
                    <div className='flex flex-col justify-center relative focus-within:text-green-600 focus-within:opacity-100'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8  w-8 absolute z-10 top-2 opacity-75" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <TextArea areaName="User Address"/>                    
                    </div>
                  </div>
                  <div className="w-full h-1/4 flex flex-row items-center justify-center relative">
                    <div className='flex w-full flex-col justify-center items-center'>
                      <span>Exist Floors</span>
                      <select className=" border-1 ml-2 bg-sky-50 rounded-md max-w-10.5  italic w-full  outline-0 h-10 text-sm  text-black"
                          onChange={this.changeSelectedRoom} name="roomSelect" id="roomSelect">
                      </select>
                    </div>
                  </div>
                    <div className="w-full h-1/4 flex flex-row justify-center items-center focus-within:text-green-600 focus-within:opacity-100 ">
                      <div className='flex flex-row relative'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 absolute z-10  top-2 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                          </svg>
                          <Input onChange={this.checkRoomNameIsValid} id="addFloor" inputName = "For Enter Floor"/>
                          <Button onClick={this.addRoom} isActive={!this.state.roomNameIsValid} value="+"/>
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
                  windowWidth={this.state.windowWidth}
                  windowHeigth={this.state.windowHeigth}
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

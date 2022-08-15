import React, { Component } from 'react'
import Draw from './Draw'
import TextInput from './Input'
import TextArea from './TextArea'
import Button from './Button'
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
      <div className="text-xs sm:text-lg w-screen h-screen flex flex-row relative touch-none" >
        <div id="openMenuSection" onClick={this.showMenuSection} className="absolute z-50 md:z-0 top-0 left-0   shadow-2xl">
          <svg  color="black" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div id="manageSection" className="hidden  shadow-2xl md:block z-10 left-0 w-4/5 md:w-1/5 top-0 max-w-18.75 absolute h-full ">
          <div onClick={this.closeMenuSection} className=" top-0 right-[-2.75rem] text-black absolute"><svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg></div>
          <div className="w-full h-full flex flex-col text-black">
            <div className="w-full h-full flex flex-col bg-gray-100  ">
              <div className="w-full h-2/6   flex flex-row  ">
                <div className=" h-full w-full flex flex-col justify-between items-start ">
                  <div className="h-full w-full flex flex-col">
                    <TextInput inputName="Name"/>
                  </div>
                  <div className="h-full w-full flex flex-col">
                      <TextArea areaName="Address"/>                    
                  </div>
                </div>
              </div>
              <div className="w-full h-4/6 flex flex-col justify-around items-start text-black">
              
                <div className="w-full h-16 flex justify-center mt-1">
                  <div className="w-4/5 flex flex-col items-center justify-center">
                    <div className="w-full flex justify-center items-center">
                      <TextInput onChange={this.checkRoomNameIsValid} inputName = "Floor Name"/>
                    </div>
                    <div className="w-full mt-1 flex justify-center items-center">
                      <Button onClick={this.addRoom} isActive={!this.state.roomNameIsValid} value="Add Floor "/>
                    </div>
                  </div>
                </div>
                <div className="w-full h-16 flex justify-center mt-1">
                  <div className="w-4/5 flex flex-col items-center justify-center">
                    <h4 className="italic">Katlar</h4>
                    <select className="border-1 rounded-md max-w-10.5 italic w-3/4 outline-0 h-7  text-black"
                            onChange={this.changeSelectedRoom} name="roomSelect" id="roomSelect">
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="w-full z-0">
          <div className="draw max-h-screen h-full">
            <div className="w-full max-h-screen h-full">
              {this.state.rooms.length ? (
                <Draw
                  room={this.state.rooms}
                  currentRoom={this.state.selectedRoom}
                  currentRoomIndex={this.state.selectedRoomIndex}
                />
              ) : (
                <h2 className="italic text-center ">enter floor first</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Manage

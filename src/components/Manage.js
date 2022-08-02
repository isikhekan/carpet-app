import React, { Component,Keyboard,TouchableWithoutFeedback } from 'react'
import Draw from './Draw'

class Manage extends Component {
  state = {
    rooms: [],
    selectedRoom: "",
    selectedRoomIndex: 0,
    roomNameIsValid: false,
  }

  checkRoomNameIsValid = () => {
    const roomNameIsValid = document.getElementById("roomName").value.length > 3;

    this.setState({
      ...this.state,
      roomNameIsValid,
    })

  }
  showMenuSection = () => {
      const manage = document.getElementById("manageSection");
      const openMenuSection = document.getElementById("openMenuSection")
    console.log("asd")
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
    console.log(options[selectedRoom.selectedIndex].index)
    this.setState({
      ...this.state,
      selectedRoomIndex: options[selectedRoom.selectedIndex].index,
      selectedRoom: options[selectedRoom.selectedIndex].text,
    })
  }

  addRoom = () => {
    const id = document.getElementById("roomName").value
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
    document.getElementById("roomName").value = ""
  }

  render() {
    return (
      <div className="text-xs sm:text-lg w-screen h-screen flex flex-row relative touch-none" >
        <div id="openMenuSection" onClick={this.showMenuSection} className="absolute z-50 md:z-0 top-0 left-0   shadow-2xl">
          <svg  color="grey" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div id="manageSection" className="hidden   md:block z-10 left-0 w-4/5 md:w-1/5 top-0 max-w-18.75 absolute h-full">
          <div onClick={this.closeMenuSection} className=" top-0 right-[-2.75rem] text-gray-400 absolute"><svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg></div>
          <div className="w-full h-full flex flex-col text-gray-400">
            <div className="w-full h-full flex flex-col bg-gray-900 ">
              <div className="w-full h-full h-2/6   flex flex-row  ">
                <div className=" h-full w-full flex flex-col justify-between items-start ">
                  <div className="h-full w-full flex flex-col">
                    <label className="italic " htmlFor="userName">Name : </label>
                    <input
                      className="max-w-20 userName w-full outline-0 text-center text-gray-400 bg-gray-700 h-8  italic border-solid border  border-black outline-0 border-b-2 border-b-emerald-500"
                      type="text"/>
                  </div>
                  <div className="h-full w-full flex flex-col">
                    <label className="h-1/5 italic" htmlFor="userAddress">Address: </label>
                    <textarea style={{ resize: "none" }} name=""
                              className="max-w-20 text-gray-400 h-24 outline-0 text-gray-400 bg-gray-700 italic border-solid border  border-black outline-0 border-b-2 border-b-emerald-500 text-center"></textarea>
                  </div>
                </div>
              </div>

              <div className="w-full h-4/6 flex flex-col justify-around items-start text-gray-400">
                <div className="w-full h-16 flex justify-center ">
                  <div className="w-4/5 flex flex-col items-center justify-center">
                    <h4 className="italic text-center">Halı seçiniz</h4>
                    <select className=" max-w-10.5 italic w-3/4 outline-0 h-7 bg-gray-700 text-gray-400"
                            name="carpetType" id="carpetType">
                      <option value="">Düz</option>
                      <option value="">Desenli</option>
                      <option value="">Karışık</option>
                    </select>
                  </div>
                </div>
                <div className="w-full h-16 flex justify-center mt-1">
                  <div className="w-4/5 flex flex-col items-center justify-center">
                    <h4 className="italic ">Kat ismi giriniz</h4>
                    <div className="w-full flex justify-center items-center">
                      <input
                        className="text-center text-gray-400 w-full max-w-10.5   bg-gray-700 h-8 border-solid border border-black outline-0 border-b-2 border-b-emerald-500"
                        onChange={this.checkRoomNameIsValid}
                        placeholder='Enter floor / min. length 4' type="text" name="roomName"
                        id="roomName"/>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <button
                        className="active:bg-emerald-500  active:border-b-gray-100 active:text-gray-700 hover:bg-gray-900  border-solid outline-0 bg-gray-700 text-gray-400 italic h-6 border-0 mt-2.5  w-full max-w-10.5 border-b-emerald-400 border-b-2 border-b-emerald-500"
                        disabled={!this.state.roomNameIsValid} onClick={this.addRoom}   type="submit">Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full h-16 flex justify-center mt-1">
                  <div className="w-4/5 flex flex-col items-center justify-center">
                    <h4 className="italic">Katlar</h4>
                    <select className=" max-w-10.5 italic w-3/4 outline-0 h-7 bg-gray-700 text-gray-400"
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
                <h2 className="italic text-center">enter floor first</h2>
              )}
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Manage

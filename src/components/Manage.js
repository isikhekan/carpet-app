import React, { Component } from 'react'
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
      <div>
          <div>
            <div className="w-full h-full flex flex-col text-gray-400">
              <h1 className="bg-gray-900 text-gray-300 text-center text-black italic font-medium">Yönetim Paneli</h1>
              <hr/>

              <div className="w-full h-full flex flex-row bg-gray-900 ">
                <div className="w-4/6 h-50  flex flex-row mt-6 ">
                  <div className=" h-2/4 w-full flex justify-evenly ">
                    <div className="h-full w-2/5 flex flex-col">
                     <label className="italic " htmlFor="userName">Name : </label>
                      <input className="userName w-2/3 outline-0 text-center text-gray-400 bg-gray-700 h-8  italic border-solid border  border-black outline-0 border-b-2 border-b-emerald-500" type="text"/>
                   </div>
                    <div className="h-full w-2/5 flex flex-row">
                     <label className="h-1/5 italic" htmlFor="userAddress">Address: </label>
                      <textarea style={{ resize: "none" }} name="" className="text-gray-400 h-16 outline-0 text-gray-400 bg-gray-700 italic border-solid border  border-black outline-0 border-b-2 border-b-emerald-500 text-center"></textarea>
                   </div>
                 </div>
               </div>

                <div className="w-2/6 flex flex-col text-gray-400">
                    <div className="w-full h-16 flex justify-center ">
                        <div className="w-4/5 flex flex-col items-center justify-center">
                          <h4 className="italic text-center">Halı seçiniz</h4>
                          <select className=" italic w-3/4 outline-0 h-7 bg-gray-700 text-gray-400" name="carpetType" id="carpetType">
                            <option value="">Düz</option>
                            <option value="">Desenli</option>
                            <option value="">Karışık</option>
                          </select>
                        </div>
                    </div>
                    <div className="w-full h-16 flex justify-center mt-1">
                          <div className="w-4/5 flex flex-col items-center justify-center">
                              <h4 className="italic ">Kat ismi giriniz</h4>
                              <div>
                                <input  className="text-center text-gray-400 bg-gray-700 h-8 border-solid border border-black outline-0 border-b-2 border-b-emerald-500" onChange={this.checkRoomNameIsValid}
                                        placeholder='Enter floor / min. length 4' type="text" name="roomName"
                                        id="roomName"/>
                              </div>
                            <div className="w-2/4" >
                              <button className="active:bg-emerald-500 active:border-b-gray-100 active:text-gray-700 hover:bg-gray-900  border-solid outline-0 bg-gray-700 text-gray-400 italic h-6 border-0 mt-2.5  w-full border-b-emerald-400 border-b-2 border-b-emerald-500" disabled={!this.state.roomNameIsValid} onClick={this.addRoom} type="submit">Submit</button>
                            </div>
                          </div>
                    </div>
                  <div className="w-full h-16 flex justify-center mt-1">
                      <div className="w-4/5 flex flex-col items-center justify-center">
                          <h4 className="italic">Katlar</h4>
                          <select className=" italic w-3/4 outline-0 h-7 bg-gray-700 text-gray-400" onChange={this.changeSelectedRoom} name="roomSelect" id="roomSelect">
                          </select>
                      </div>
                  </div>

                </div>


              </div>
            </div>
          </div>
          <div>
            <div className="draw w-full">
              <div className="w-full">
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

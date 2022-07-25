import React, { Component } from 'react'
import Draw from './Draw'

class Manage extends Component {
  state = {
    rooms: [],
    selectedRoom: "",
    selectedRoomIndex: 0,
    roomNameIsValid:false,
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
      rooms: [...this.state.rooms, { roomName: id, coordinates: { pointsArray: [],connectedLines : [] } }],
      selectedRoom: id,
      selectedRoomIndex: options[selectedRoom.selectedIndex].index
    })
    document.getElementById("roomName").value = ""
  }

  render() {
    return (
      <div>
        <h1>Yönetim Paneli</h1>
        <div>
          <h4>Halı seçiniz</h4>
          <select name="carpetType" id="carpetType">
            <option value="">Düz</option>
            <option value="">Desenli</option>
            <option value="">Karışık</option>
          </select>
        </div>
        <div>
          <h4>Oda ismi giriniz</h4>
          <input onChange={this.checkRoomNameIsValid} className="" placeholder='Enter room name' type="text" name="roomName"
                 id="roomName"/>
          <button disabled={!this.state.roomNameIsValid} onClick={this.addRoom} type="submit">Submit</button>
        </div>
        <div>
          <h4>Odalarınız</h4>
          <select onChange={this.changeSelectedRoom} name="roomSelect" id="roomSelect">
          </select>
        </div>
        <div className="draw">
          <div>
            {this.state.rooms.length ? (
              <Draw
                room={this.state.rooms}
                currentRoom={this.state.selectedRoom}
                currentRoomIndex={this.state.selectedRoomIndex}
              />
            ) : (
              <p>select room first</p>
            )}
          </div>

        </div>
      </div>
    )
  }
}

export default Manage

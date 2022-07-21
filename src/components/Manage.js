import React, { Component } from 'react'
import Draw from './Draw'
class Manage extends Component {

  state = {
    rooms: [],


  }
  addRoom= () =>
  {

    const roomName = document.createTextNode(document.getElementById("roomName").value);
    const id = document.getElementById("roomName").value
    const roomSelect = document.getElementById("roomSelect");

    const option = document.createElement("option");
    option.setAttribute('id',id);
    console.log(document.getElementById(roomName))
    roomSelect.appendChild(option)
    option.appendChild(roomName)
    this.setState({
      rooms:[...this.state.rooms,roomName],
    })
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
          <input required={true}  className="" placeholder='Enter room name' type="text" name="roomName" id="roomName" />
           <button onClick={this.addRoom} type="submit">Add Room</button>
         </div>

         <div>
         <h4>Odalarınız</h4>
          <select name="roomSelect" id="roomSelect">
          </select>
         </div>

        <div className="draw">
          <Draw
            room={this.state.rooms}
          name="hekan"

          />
        </div>
      </div>
    )
  }
}

export default Manage

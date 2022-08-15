import React, { useEffect, useRef, useState } from "react"
import '../App.css';
import SelectMenu from "./SelectMenu";
import ReactDom from "react-dom/client";
import Button from "./Button"
import ExistRoom from "./ExistRoom"
let connectedLines = []
let connectedLineCounter = 0;
export default function DrawingDiv(props) {
  const { room, currentRoom, currentRoomIndex } = props
  const [lastMoveCoordinates, setLastMoveCoordinates] = useState({})
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const [lengthPoint, setLengthPoint] = useState(0)
  const [globalDotDistance, setGlobalDotDistance] = useState(20)
  const [mousePoint, setMousePoint] = useState([0, 0])
  const [lineConnected, setLineConnected] = useState(false)
  const lineDiv = document.getElementById("spanDiv")
  const [roomNumber, setRoomNumber] = useState(0)
  const lenPointDiv = document.getElementById("lenPointNum")
  const [connectedLineNameCounter, setConnectedLineNameCounter] = useState(0)
  const myStyle = {
    position: "absolute",
    color: "black",
    left: mousePoint[0],
    top: mousePoint[1],
    userSelect: "none",
    opacity: 0
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 2;
    contextRef.current = context;
    for (let i = 0; i < canvas.width; i += globalDotDistance) {
      for (let j = 0; j < canvas.height; j += globalDotDistance) {
        context.moveTo(i, j)
        context.arc(i, j, 1, 0, Math.PI * 2);
      }
    }
    context.strokeStyle = "black";
    context.stroke();
  }, [])
  useEffect(() => {
    getRoomContent()
  }, [connectedLineCounter])
  useEffect(() => {
    getRoomContent()
  }, [currentRoom])
  const isTwoLineConnected = (startXCoordinate, startYCoordinate,finishXCoordinate,finishYCoordinate) => {
    const currentConnectedLineArr = connectedLines[connectedLineCounter]
    let startConnected = false
    let endConnected = false
    for (let i in currentConnectedLineArr){
      if(currentConnectedLineArr[i] === connectedLines[connectedLineCounter][connectedLines[connectedLineCounter].length-1]){
      }
      else{
        if((startXCoordinate === currentConnectedLineArr[i].x.x1 && startYCoordinate === currentConnectedLineArr[i].y.y1) || (startXCoordinate === currentConnectedLineArr[i].x.x2 && startYCoordinate === currentConnectedLineArr[i].y.y2)){
          startConnected = true
        }
        if((finishXCoordinate === currentConnectedLineArr[i].x.x1 && finishYCoordinate === currentConnectedLineArr[i].y.y1) || (finishXCoordinate === currentConnectedLineArr[i].x.x2 && finishYCoordinate === currentConnectedLineArr[i].y.y2)){
          endConnected = true
        }
      }
    }
    if( startConnected && endConnected){
      return true
    }
  }
  const isLineConnected = () => {
    const finishXCoordinateOfLastLine = connectedLines[connectedLineCounter][connectedLines[connectedLineCounter].length - 1].x.x2;
    const finishYCoordinateOfLastLine = connectedLines[connectedLineCounter][connectedLines[connectedLineCounter].length - 1].y.y2;
    const startYCoordinateOfLastLine = connectedLines[connectedLineCounter][connectedLines[connectedLineCounter].length - 1].y.y1;
    const startXCoordinateOfLastLine = connectedLines[connectedLineCounter][connectedLines[connectedLineCounter].length - 1].x.x1;
    const startXCoordinateOfFirstLine =  connectedLines[connectedLineCounter][0].x.x1;
    const startYCoordinateOfFirstLine = connectedLines[connectedLineCounter][0].y.y1;
    if (isTwoLineConnected(startXCoordinateOfLastLine,startYCoordinateOfLastLine,finishXCoordinateOfLastLine,finishYCoordinateOfLastLine)) {
      setLineConnected(true)
      connectedLineCounter += 1
      connectedLines = [...connectedLines, []]
      addWhatIsRoomNumber(startXCoordinateOfFirstLine, startYCoordinateOfFirstLine, connectedLineCounter)
      const nameCounter = connectedLineNameCounter
      setConnectedLineNameCounter(nameCounter + 1)
    } else {
      connectedLines = [...connectedLines]
    }
    room[currentRoomIndex].coordinates.connectedLines = connectedLines
    room[currentRoomIndex].coordinates.connectedLineCounter = connectedLineCounter
    lineConnected ? getExistingRooms() : console.log("not yet")
  }
  const addWhatIsRoomNumber = (startX, startY, roomNum = 1) => {
    const whereToAdd = document.getElementById("spanDiv");
    const createRoomNumberSpan = document.createElement("span");
    createRoomNumberSpan.innerText = roomNum;
    whereToAdd.appendChild(createRoomNumberSpan)
    createRoomNumberSpan.style.color = "#3c34d1"
    createRoomNumberSpan.style.position = "absolute";
    createRoomNumberSpan.style.top = startY + "px";
    createRoomNumberSpan.style.left = startX + "px";
    createRoomNumberSpan.userSelect = "none";
  }

  const glowSelectedRoom = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 2;
    const targetId = e.target.id
      for (let i = 0; i < connectedLineCounter; i++) {
        connectedLines[i].forEach((path) => {
        if (path.id === targetId) {
            path.isLineRed ? context.strokeStyle = "black" : context.strokeStyle = "red"
            context.beginPath();
            context.moveTo(path.x.x1, path.y.y1);
            context.lineTo(path.x.x2, path.y.y2);
            context.stroke()
            context.closePath();
            path.isLineRed = !path.isLineRed
          }
        })
      }
  }
  const deleteSelectedLines = (e) => {
    const targetId = String(e.target.parentNode.id)
    for (let i = 0; i < connectedLines.length - 1; i++) {
      if (String(connectedLines[i][0].id) === targetId) {
        connectedLines.splice(i, 1)
        room[currentRoomIndex].coordinates.connectedLines = connectedLines
        room[currentRoomIndex].coordinates.connectedLineCounter -= 1
        connectedLineCounter = room[currentRoomIndex].coordinates.connectedLineCounter
      }
    }
    getRoomContent()
  }
  const changeConnectedLinesTotalPiece = (e) => {
    const existingRooms = document.getElementById("existingRoomsAtFloor")
    let roomIndex = undefined;
    for (let i = 0; i < existingRooms.children.length; i++) {
      if (existingRooms.children[i].children[0].id === e.target.parentNode.parentNode.id) {
        roomIndex = i;
      }
    }
    room[currentRoomIndex].coordinates.connectedLines[roomIndex].forEach((path) => {
      path.totalPiece = parseInt(e.target.value)
      connectedLines = room[currentRoomIndex].coordinates.connectedLines
      room[currentRoomIndex].coordinates.connectedLines = connectedLines
      getRoomContent()
    })
  }
  const writeLineLengths = (x1, y1, x2, y2) => {
    const createSpan = document.createElement("span")
    const text = document.createTextNode(lengthPoint.toString())
    createSpan.appendChild(text)
    lineDiv.appendChild(createSpan)
    createSpan.style.position = 'absolute'
    createSpan.style.color = "#c20606"
    createSpan.style.top = Math.round((y1 + y2) / 2) + 'px'
    createSpan.style.left = Math.round((x2 + x1) / 2) + 'px'
    createSpan.style.userSelect = "none"
  }
  const roundNearest = (num) => {
    return Math.round(num / globalDotDistance) * globalDotDistance
  }
  const calculateLength = (x, y, mouseX, mouseY) => {
    return Math.round(Math.sqrt((Math.pow(Math.abs(mouseX - x), 2) + (Math.pow(Math.abs(mouseY - y), 2)))))
  }
  const getExistingRooms = () => {
    const existingRoomDiv = document.getElementById("existingRoomsAtFloor")
    existingRoomDiv.innerHTML = ""
    for (let i = 0; i < room[currentRoomIndex].coordinates.connectedLineCounter; i++) {
      const createNewSpan = document.createElement("span")
      createNewSpan.style.height = `100%`
      const root1 = ReactDom.createRoot(createNewSpan)
      root1.render(<ExistRoom deleteSelectedLines={deleteSelectedLines} changeConnectedLinesTotalPiece={changeConnectedLinesTotalPiece}  glowSelectedRoom = {glowSelectedRoom}  id={room[currentRoomIndex].coordinates.connectedLines[i][0].id} pieceInputValue = {room[currentRoomIndex].coordinates.connectedLines[i][0].totalPiece}   />)
      existingRoomDiv.appendChild(createNewSpan)
    }
  }
  const getRoomNumbers = () => {
    for (let i = 0; i < connectedLines.length - 1; i++) {
      addWhatIsRoomNumber(connectedLines[i][0].x.x1, connectedLines[i][0].y.y1, room[currentRoomIndex].coordinates.connectedLines[i][0].id)
    }
  }
  const clearAllFloor = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById("spanDiv").innerHTML = ""
    document.getElementById("lenPointNum").innerText = "";
    context.beginPath()
    for (let i = 0; i < canvas.width; i += globalDotDistance) {
      for (let j = 0; j < canvas.height; j += globalDotDistance) {
        context.moveTo(i, j)
        context.arc(i, j, 1, 0, Math.PI * 2);
      }
    }
    context.stroke();
    room[currentRoomIndex].coordinates.connectedLines = []
    room[currentRoomIndex].coordinates.connectedLineCounter = 0
    connectedLines = room[currentRoomIndex].coordinates.connectedLines;
    connectedLineCounter = room[currentRoomIndex].coordinates.connectedLineCounter
    getExistingRooms()
  }
  const getRoomContent = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black"
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById("spanDiv").innerHTML = ""
    document.getElementById("lenPointNum").innerText = "";
    context.beginPath()
    for (let i = 0; i < canvas.width; i += globalDotDistance) {
      for (let j = 0; j < canvas.height; j += globalDotDistance) {
        context.moveTo(i, j)
        context.arc(i, j, 1, 0, Math.PI * 2);
      }
    }
    context.stroke()
    connectedLines = room[currentRoomIndex].coordinates.connectedLines
    connectedLineCounter = room[currentRoomIndex].coordinates.connectedLineCounter
    if (connectedLines.length) {
      if (connectedLines[connectedLines.length - 1].length < 1) {
        for (let i = 0; i < connectedLines.length - 1; i++) {
          connectedLines[i].forEach((path) => {
            path.isLineRed = false;
          })
        }
      }
    }

    getExistingRooms()
    setRoomNumber(currentRoomIndex)
    room[currentRoomIndex].coordinates.connectedLines.forEach((path) => {
      path.forEach((sPath) => {
        context.beginPath();
        context.moveTo(sPath.x.x1, sPath.y.y1);
        context.lineTo(sPath.x.x2, sPath.y.y2);
        context.stroke()
        const createSpan = document.createElement("span")
        const text = document.createTextNode(sPath.len)
        createSpan.appendChild(text)
        lineDiv.appendChild(createSpan)
        createSpan.style.fontSize = 2 + "vh"
        createSpan.style.color = "#c20606"
        createSpan.style.position = 'absolute'
        createSpan.style.top = Math.round((sPath.y.y1 + sPath.y.y2) / 2) + 'px'
        createSpan.style.left = Math.round((sPath.x.x1 + sPath.x.x2) / 2) + 'px'
        createSpan.style.userSelect = "none"
      })
    })
    if (connectedLines.length > 1) {
      for (let i = 0; i < connectedLines.length - 1; i++) {
        getRoomNumbers()
      }
    }
  }
  const startDrawing = ({ nativeEvent }) => {
    const myCanvas = document.getElementById("myCanvas")
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black"
    if (nativeEvent.type === "touchstart") {
      let x = roundNearest(nativeEvent.touches[0].clientX - myCanvas.getBoundingClientRect().left);
      let y = roundNearest(nativeEvent.touches[0].clientY - myCanvas.getBoundingClientRect().top);
      contextRef.current.beginPath();
      setPoint({ x, y })
    } else if (nativeEvent.type === "mousedown") {
      const { offsetX, offsetY } = nativeEvent;
      const x = roundNearest(offsetX);
      const y = roundNearest(offsetY);
      contextRef.current.beginPath();
      setPoint({ x, y })
    }
    const currentLength = document.getElementById("lenPointNum")
    currentLength.style.opacity = 1

    setIsDrawing(true)
    if (currentRoomIndex === roomNumber) {
    } else {
      getRoomContent()
    }
  }
  const finishDrawing = ({ nativeEvent }) => {
    const myCanvas = document.getElementById("myCanvas")
    if (nativeEvent.type == "touchend") {
      let x = roundNearest(lastMoveCoordinates.touches[0].clientX - myCanvas.getBoundingClientRect().left);
      let y = roundNearest(lastMoveCoordinates.touches[0].clientY - myCanvas.getBoundingClientRect().top);

      if (point.x === x && point.y === y) {
        alert("must be line")
      } else {
        contextRef.current.beginPath()
        contextRef.current.moveTo(point.x, point.y)
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        writeLineLengths(point.x, point.y, x, y)
        if (connectedLines.length < 1) {
          connectedLines.push([{
            x: { x1: point.x, x2: x },
            y: { y1: point.y, y2: y },
            id: "a" + 1,
            len: lengthPoint,
            totalPiece: 1,
            isLineRed: false,
            type: "simple"
          }])
        } else {
          connectedLines[connectedLineCounter].push({
            x: { x1: point.x, x2: x },
            y: { y1: point.y, y2: y },
            id: "a" + connectedLineNameCounter,
            len: lengthPoint,
            totalPiece: 1,
            isLineRed: false,
            type: "simple"
          })
        }
      }

    } else if (nativeEvent.type == "mouseup") {
      const { offsetX, offsetY } = nativeEvent;
      const x = roundNearest(offsetX);
      const y = roundNearest(offsetY);

      if (point.x === x && point.y === y) {
        alert("must be line")
      } else {
        contextRef.current.beginPath()
        contextRef.current.moveTo(point.x, point.y)
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        writeLineLengths(point.x, point.y, x, y)
        if (connectedLines.length < 1) {
          connectedLines.push([{
            x: { x1: point.x, x2: x },
            y: { y1: point.y, y2: y },
            id: "a" + 1,
            len: lengthPoint,
            totalPiece: 1,
            isLineRed: false,
            type: "simple"
          }])
        } else {
          connectedLines[connectedLineCounter].push({
            x: { x1: point.x, x2: x },
            y: { y1: point.y, y2: y },
            id: "a" + connectedLineNameCounter,
            len: lengthPoint,
            totalPiece: 1,
            isLineRed: false,
            type: "simple"
          })
        }
      }
    }
    const currentLength = document.getElementById("lenPointNum")
    setLineConnected(false)
    currentLength.style.opacity = 0

    setIsDrawing(false)
    isLineConnected()
    contextRef.current.closePath();
    lenPointDiv.innerText = ""
  }
  const draw = ({ nativeEvent }) => {
    const myCanvas = document.getElementById("myCanvas")
    if (!isDrawing) {
      return
    }
    if (nativeEvent.type == "touchmove") {
      let x = roundNearest(nativeEvent.touches[0].clientX - myCanvas.getBoundingClientRect().left);
      let y = roundNearest(nativeEvent.touches[0].clientY - myCanvas.getBoundingClientRect().top);
      setLengthPoint(calculateLength(point.x, point.y, x, y))
      setMousePoint([x, y])
      setLastMoveCoordinates(nativeEvent)
    } else if (nativeEvent.type == "mousemove") {
      const { offsetX, offsetY } = nativeEvent;
      const x = roundNearest(offsetX);
      const y = roundNearest(offsetY);
      setLengthPoint(calculateLength(point.x, point.y, x, y))
      setMousePoint([offsetX, offsetY])
    }


  }
  const undo = () => {
    connectedLineCounter = room[currentRoomIndex].coordinates.connectedLineCounter
    if (lineConnected) {
      connectedLines.pop();
      connectedLineCounter -= 1;
      if (connectedLineCounter === -1) {
        connectedLineCounter = 0;
      } else {
        connectedLines[connectedLineCounter].pop();
      }
      room[currentRoomIndex].coordinates.connectedLineCounter = connectedLineCounter
      setLineConnected(false);
    } else {
      if (connectedLines[connectedLineCounter].length === 1) {
        connectedLines[connectedLineCounter].pop();
        if (connectedLines.length === 0) {
          setLineConnected(false)
        } else {
          setLineConnected(true)
        }
      } else {
        if (connectedLines[0].length === 0) {
          connectedLines.pop()
        } else {
          connectedLines[connectedLineCounter].pop();
        }
      }
      room[currentRoomIndex].coordinates.connectedLineCounter = connectedLineCounter
    }
    for (let i = 0; i < connectedLines.length - 1; i++) {
      getRoomNumbers()
    }
    getRoomContent()
    room[currentRoomIndex].coordinates.connectedLineCounter = connectedLineCounter
  }

  return (
    <div id="main" className=" w-full h-full max-h-screen  flex flex-col">

      <h1 style={myStyle} id="lenPointNum" className="z-40">{lengthPoint}</h1>
      <div className="flex flex-row w-full h-1.5/10">
        <div id="existingRoomsAtFloor"
             className="text-black scroll-smooth scrollbar-hide existingRoomsAtFloor existingRoomsStyle w-10/12 flex flex-row flex-wrap overflow-auto items-center justify-center">
        </div>
        <div className="w-2/12   flex flex-col items-center justify-evenly">
              <Button id="undoBtt" onClick={undo} value="Undo"/>
              <Button onClick={clearAllFloor} value="Clear Floor"/>
        </div>
      </div>
      <div style={{ position: "relative",zIndex:10}} className=" shadow-allSide overflow-hidden h-8.5/10" id="canvasDiv">
        <div className="text-blue-400 " id="spanDiv">

        </div>
        <div className="w-full h-full">
          <canvas className=" " id="myCanvas"
                  onMouseDown={startDrawing}
                  onMouseUp={finishDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={finishDrawing}
                  onTouchMove={draw}
                  ref={canvasRef}
          />
        </div>
      </div>
    </div>
  )
}


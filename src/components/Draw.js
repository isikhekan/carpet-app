import React, { useEffect, useRef, useState } from "react"
import '../App.css';
let connectedLines = []
let connectedLineCounter = 0;
export default function DrawingDiv(props) {
  const { room, currentRoom, currentRoomIndex } = props
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
  const [connectedLineNameCounter,setConnectedLineNameCounter] = useState(0)
  const myStyle = {
    position: "absolute",
    color: "black",
    left: mousePoint[0],
    top: mousePoint[1] + 350,
    userSelect: "none",
    opacity: 0
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "grey";
    context.lineWidth = 2;
    contextRef.current = context;
    for (let i = 0; i < canvas.width; i += globalDotDistance) {
      for (let j = 0; j < canvas.height; j += globalDotDistance) {
        context.moveTo(i, j)
        context.arc(i, j, 1, 0, Math.PI * 2);
      }
    }
    context.stroke();
  }, [])
  useEffect(() => {
      getRoomContent()
    },[connectedLineCounter])
  useEffect(() => {
    getRoomContent()
  }, [currentRoom])
  const isLineConnected = () => {
    const startX = connectedLines[connectedLineCounter][0].x.x1;
    const startY = connectedLines[connectedLineCounter][0].y.y1;
    const endX  = connectedLines[connectedLineCounter][connectedLines[connectedLineCounter].length - 1].x.x2;
    const endY = connectedLines[connectedLineCounter][connectedLines[connectedLineCounter].length - 1].y.y2;
      if (startX === endX && startY === endY ) {
      setLineConnected(true)
      connectedLineCounter += 1
      connectedLines = [...connectedLines, []]
      addWhatIsRoomNumber(startX,startY,connectedLineCounter)
      const nameCounter = connectedLineNameCounter
      setConnectedLineNameCounter(nameCounter+1)
      } else {
      connectedLines = [...connectedLines]
    }
    room[currentRoomIndex].coordinates.connectedLines = connectedLines
    room[currentRoomIndex].coordinates.connectedLineCounter = connectedLineCounter
    lineConnected ? getExistingRooms() : console.log("not yet")
  }
  const addWhatIsRoomNumber = (startX,startY,roomNum = 1)=>{
    const whereToAdd = document.getElementById("spanDiv");
    const createRoomNumberSpan = document.createElement("span");
    createRoomNumberSpan.innerText = roomNum;
    whereToAdd.appendChild(createRoomNumberSpan)
    createRoomNumberSpan.style.color = "blue"
    createRoomNumberSpan.style.position = "absolute";
    createRoomNumberSpan.style.top = startY + "px";
    createRoomNumberSpan.style.left = startX +"px";
    createRoomNumberSpan.userSelect = "none";
  }

  const glowSelectedRoom = (e)=>{
  }
  const deleteSelectedLines = (e)=>{
    const targetId = e.target.parentNode.parentNode.id;
    for(let i = 0;i<connectedLines.length-1;i++){
      if(String(connectedLines[i][0].id) === targetId){
        connectedLines.splice(i,1)
        room[currentRoomIndex].coordinates.connectedLines = connectedLines
        room[currentRoomIndex].coordinates.connectedLineCounter -=1
        connectedLineCounter = room[currentRoomIndex].coordinates.connectedLineCounter
      }
    }
    getRoomContent()
  }
  const changeConnectedLinesTotalPiece = (e)=>{
    const existingRooms = document.getElementById("existingRoomsAtFloor")
    let roomIndex = undefined;
    for(let i = 0 ; i<existingRooms.children.length; i++ ){
      if(existingRooms.children[i].id ===e.target.parentNode.parentNode.id){
        roomIndex = i;
      }
    }
    room[currentRoomIndex].coordinates.connectedLines[roomIndex].forEach((path)=>{
      path.totalPiece  = parseInt(e.target.value)
      connectedLines = room[currentRoomIndex].coordinates.connectedLines
      room[currentRoomIndex].coordinates.connectedLines = connectedLines
    })

  }
  const writeLineLengths = (x1, y1, x2, y2) => {
    const createSpan = document.createElement("span")
    const text = document.createTextNode(lengthPoint.toString())
    createSpan.appendChild(text)
    lineDiv.appendChild(createSpan)
    createSpan.style.position = 'absolute'
    createSpan.style.background = "white"
    createSpan.style.fontSize = 0.8 + "vh"
    createSpan.style.borderRadius = 10
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
  const getExistingRooms = ()=>{
    const existingRoomDiv = document.getElementById("existingRoomsAtFloor")
    existingRoomDiv.innerHTML = ""
    for(let i  = 0;i<room[currentRoomIndex].coordinates.connectedLineCounter;i++){
      const createSpan  = document.createElement("span");
      const createDiv = document.createElement("div")
      createDiv.style.width = `100%`
      const createDeleteButtonSpan = document.createElement("span");
      const createInp = document.createElement("input");
      createDiv.appendChild(createInp)
      createInp.addEventListener("input",changeConnectedLinesTotalPiece)
      createInp.type = "number"
      createInp.value = room[currentRoomIndex].coordinates.connectedLines[i][0].totalPiece;
      createInp.min = 1;
      createInp.style.textAlign  = "center"
      createInp.style.width = `50%`
      createDeleteButtonSpan.innerHTML = "<span>SİL</span>"
      createDeleteButtonSpan.addEventListener("click",deleteSelectedLines)
      createSpan.classList.add("existingRoomsStyle")
      createSpan.style.flexDirection = "column"
      createSpan.setAttribute("id",room[currentRoomIndex].coordinates.connectedLines[i][0].id)
      createSpan.addEventListener("click", glowSelectedRoom)
      const createText = document.createTextNode(room[currentRoomIndex].coordinates.connectedLines[i][0].id)
      createSpan.appendChild(createText)
      createSpan.appendChild(createDiv)
      createSpan.appendChild(createDeleteButtonSpan)
      existingRoomDiv.appendChild(createSpan)
    }
  }
  const getRoomNumbers = ()=>{
    for(let i = 0;i<connectedLines.length-1;i++){
      addWhatIsRoomNumber(connectedLines[i][0].x.x1,connectedLines[i][0].y.y1,room[currentRoomIndex].coordinates.connectedLines[i][0].id)
    }
  }
  const clearAllFloor = ()=>{
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
    getExistingRooms()
    setRoomNumber(currentRoomIndex)
    room[currentRoomIndex].coordinates.connectedLines.forEach((path)=>{
      path.forEach((sPath)=>{
        context.beginPath();
        context.moveTo(sPath.x.x1, sPath.y.y1);
        context.lineTo(sPath.x.x2, sPath.y.y2);
        context.stroke()
        const createSpan = document.createElement("span")
        const text = document.createTextNode(sPath.len)
        createSpan.appendChild(text)
        lineDiv.appendChild(createSpan)
        createSpan.style.fontSize = .8 +"vh"
        createSpan.style.position = 'absolute'
        createSpan.style.top = Math.round((sPath.y.y1 + sPath.y.y2) / 2) + 'px'
        createSpan.style.left = Math.round((sPath.x.x1 + sPath.x.x2) / 2) + 'px'
        createSpan.style.userSelect = "none"
      })
    })
    if(connectedLines.length >1){
      for(let i = 0;i<connectedLines.length-1;i++){
        getRoomNumbers()
      }
    }
  }
  const startDrawing = ({ nativeEvent }) => {
    const currentLength = document.getElementById("lenPointNum")
    currentLength.style.opacity = 1
    const { offsetX, offsetY } = nativeEvent;
    const x = roundNearest(offsetX);
    const y = roundNearest(offsetY);
    contextRef.current.beginPath();
    setPoint({ x, y })
    setIsDrawing(true)
    if (currentRoomIndex === roomNumber) {
    } else {
      getRoomContent()
    }
  }
  const finishDrawing = ({ nativeEvent }) => {
    const currentLength = document.getElementById("lenPointNum")
    setLineConnected(false)
    currentLength.style.opacity = 0
    const { offsetX, offsetY } = nativeEvent;
    const x = roundNearest(offsetX);
    const y = roundNearest(offsetY);
    contextRef.current.beginPath()
    contextRef.current.moveTo(point.x, point.y)
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    writeLineLengths(point.x, point.y, x, y)
    if (connectedLines.length < 1) {
      connectedLines.push([{ x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y },id:"a"+1,len: lengthPoint,totalPiece : 1}])
    } else {
      connectedLines[connectedLineCounter].push({ x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y },id:"a"+connectedLineNameCounter, len: lengthPoint,totalPiece : 1})
    }
    setIsDrawing(false)
    isLineConnected()
    contextRef.current.closePath();
    lenPointDiv.innerText = ""
  }
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent;
    const x = roundNearest(offsetX);
    const y = roundNearest(offsetY);
    setLengthPoint(calculateLength(point.x, point.y, x, y))
    setMousePoint([offsetX, offsetY])
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

    }
    for(let i = 0;i<connectedLines.length-1;i++){
      getRoomNumbers()
    }
    getRoomContent()
    room[currentRoomIndex].coordinates.connectedLineCounter = connectedLineCounter
  }
  return (
    <div id="main">
      <div className="roomName"><h1>you'r in {currentRoom}</h1></div>
      <h1 style={myStyle} id="lenPointNum">{lengthPoint}</h1>
      <div className="undo">
        <button id="undoBtt" onClick={undo}>
          undo
        </button>
        <button onClick={clearAllFloor} id="clearAllFloorButton">Clear Floor</button>
      </div>
      <div style={{width:100+"vw",justifyContent:"start"}} id="existingRoomsAtFloor" className="existingRoomsAtFloor existingRoomsStyle">
      </div>
      <div style={{ position: "relative", width: 0, height: 0 }} id="canvasDiv">
        <div id="spanDiv"></div>
        <canvas id="myCanvas"
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
        />
      </div>
    </div>
  )
}


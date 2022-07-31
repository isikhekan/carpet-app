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
    color: "white",
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
    context.strokeStyle = "#cacccf";
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
    createRoomNumberSpan.style.color = "#4bc496"
    createRoomNumberSpan.style.position = "absolute";
    createRoomNumberSpan.style.top = startY + "px";
    createRoomNumberSpan.style.left = startX +"px";
    createRoomNumberSpan.userSelect = "none";
  }

  const glowSelectedRoom = (e)=>{
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const targetId = e.target.id
    if(connectedLines[connectedLines.length-1].length<1){
      for(let i = 0; i<connectedLines.length-1;i++){
        connectedLines[i].forEach((path)=>{
          if(path.id === targetId){
            path.isLineRed  ? context.strokeStyle = "grey" : context.strokeStyle = "#4bc496"
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
    createSpan.style.background = "black"
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
      createDiv.style.display = "flex"
      createDiv.style.justifyContent = "center"
      createDiv.style.alignItems = "center"
      createSpan.style.textAlign= "center"
      createSpan.style.border = `1px solid white`
      createSpan.style.height = `100%`
      createSpan.style.display  ="flex"
      createSpan.style.justifyContent = "center"
      createInp.addEventListener("input",changeConnectedLinesTotalPiece)
      createInp.type = "number"
      createInp.style.border = `2px solid #4bc496`
      createInp.value = room[currentRoomIndex].coordinates.connectedLines[i][0].totalPiece;
      createInp.min = 1;
      createInp.style.height = `1.8rem`
      createInp.style.outline = "none"
      createInp.style.borderRadius = `3rem`
      createInp.style.textAlign  = "center"
      createInp.style.width = `50%`
      createDeleteButtonSpan.style.height =`3rem`
      createDeleteButtonSpan.classList.add("deleteRoomButton")
      createDeleteButtonSpan.innerHTML = "<svg height='100%' color='#4bc496' xmlns=\"http://www.w3.org/2000/svg\" className=\"h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={2}>\n" +
        "  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\" />\n" +
        "</svg>"
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
    context.strokeStyle = "#cacccf"
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
    if(connectedLines.length) {
      if(connectedLines[connectedLines.length-1].length<1){
        for(let i = 0; i<connectedLines.length-1;i++){
          connectedLines[i].forEach((path)=>{
            path.isLineRed = false;
          })
        }
      }
    }

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
      connectedLines.push([{ x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y },id:"a"+1,len: lengthPoint,totalPiece : 1,isLineRed:false}])
    } else {
      connectedLines[connectedLineCounter].push({ x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y },id:"a"+connectedLineNameCounter, len: lengthPoint,totalPiece : 1,isLineRed:false})
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
    <div id="main" className="bg-gray-900">
      <div className="roomName text-center text-gray-400"><h1>you'r in {currentRoom}</h1></div>
      <hr className="mt-2 border-b-4 border-b-emerald-500"/>
      <h1 style={myStyle} id="lenPointNum">{lengthPoint}</h1>
      <div className="flex flex-row w-full h-24">
        <div  id="existingRoomsAtFloor" className="text-gray-400 scrollbar-hide existingRoomsAtFloor existingRoomsStyle w-11/12 flex flex-row flex-wrap overflow-auto items-center justify-center">
        </div>
        <div className="w-1/12   flex flex-col items-center justify-evenly">
          <button className="active:bg-emerald-500 active:border-b-gray-100 active:text-gray-700 border-l-0 border-r-0 hover:bg-gray-900 hover:border-white h-11 text-gray-400 bg-gray-700 border-solid border border-black w-full border-black    border-b-2 border-b-emerald-500"  id="undoBtt" onClick={undo}>
            undo
          </button>
          <button className="active:bg-emerald-500 active:border-b-gray-100 active:text-gray-700 hover:bg-gray-900 border-r-0 hover:border-white text-gray-400 bg-gray-700 h-11 border-l-0 border-solid w-full border-b-2 border-b-emerald-500" onClick={clearAllFloor} id="clearAllFloorButton">Clear Floor</button>
        </div>
      </div>
      <div  style={{ position: "relative"}} className="overflow-hidden" id="canvasDiv">
        <div className="text-emerald-500" id="spanDiv">

        </div>
        <div>
        <canvas className="bg-gray-900" id="myCanvas"
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
        />
      </div>
      </div>
    </div>
  )
}


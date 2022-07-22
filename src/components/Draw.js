import React, { useEffect, useRef, useState } from "react"

let lineConnectedCount = 0;

let connectedLines = []
//let randomColor = Math.floor(Math.random() * 16777215).toString(16);
export default function DrawingDiv(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const [lengthPoint, setLengthPoint] = useState(0)
  const [globalDotDistance, setGlobalDotDistance] = useState(20)
  const [mousePoint, setMousePoint] = useState([0, 0])
  const [pointsArray, setPointsArray] = useState([])
  const [lineConnected, setLineConnected] = useState(false)
  const lineDiv = document.getElementById("spanDiv")
  const canvas = canvasRef.current;

  const myStyle = {
    position: "absolute",
    color: "black",
    left: mousePoint[0],
    top: mousePoint[1] + 350,
    userSelect: "none"
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
    context.strokeStyle = "black";

    context.lineWidth = 2;
    contextRef.current = context;

    for (let i = 0; i < canvas.width; i += globalDotDistance) {
      for (let j = 0; j < canvas.height; j += globalDotDistance) {
        context.moveTo(i, j)
        context.arc(i, j, 1, 0, Math.PI * 2);
      }
    }

    window.onload = () => {
      context.stroke();
    }


  }, [globalDotDistance])
  const isLineConnected = () => {

    if (connectedLines[lineConnectedCount][0].x.x1 === connectedLines[lineConnectedCount][connectedLines[lineConnectedCount].length - 1].x.x2 && connectedLines[lineConnectedCount][0].y.y1 === connectedLines[lineConnectedCount][connectedLines[lineConnectedCount].length - 1].y.y2) {
      setLineConnected(true)
      lineConnectedCount += 1
      console.log("we are connected")
      connectedLines = [...connectedLines, []]
    } else {
      connectedLines = [...connectedLines]
    }
    console.log(connectedLines)

  }
  const writeLineLengths = (x1, y1, x2, y2) => {
    const createSpan = document.createElement("span")
    const text = document.createTextNode(lengthPoint.toString())
    createSpan.appendChild(text)
    lineDiv.appendChild(createSpan)
    createSpan.style.position = 'absolute'
    createSpan.style.top = Math.round((y1 + y2) / 2) + 'px'
    createSpan.style.left = Math.round((x2 + x1) / 2) + 'px'
    createSpan.style.userSelect = "none"

  }
  const roundNearest = (num) => {
    const round = Math.round(num / globalDotDistance) * globalDotDistance
    return round
  }
  const calculateLength = (x, y, mouseX, mouseY) => {
    return Math.round(Math.sqrt((Math.pow(Math.abs(mouseX - x), 2) + (Math.pow(Math.abs(mouseY - y), 2)))))
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const x = roundNearest(offsetX);
    const y = roundNearest(offsetY);
    contextRef.current.beginPath();
    setPoint({ x, y })
    setIsDrawing(true)

  }
  const finishDrawing = ({ nativeEvent }) => {
    setLineConnected(false)
    const { offsetX, offsetY } = nativeEvent;
    const x = roundNearest(offsetX);
    const y = roundNearest(offsetY);
    contextRef.current.beginPath()
    contextRef.current.moveTo(point.x, point.y)
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    writeLineLengths(point.x, point.y, x, y)
    if (connectedLines.length < 1) {
      connectedLines.push([{ x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y } }])
    } else {
      connectedLines[lineConnectedCount].push({ x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y } })
    }
    if (setPointsArray.length < 1) {
      setPointsArray({ x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y }, len: lengthPoint })
    } else {
      setPointsArray([...pointsArray, { x: { x1: point.x, x2: x }, y: { y1: point.y, y2: y }, len: lengthPoint }])
    }
    setIsDrawing(false)
    isLineConnected()
    contextRef.current.closePath();

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
    const context = canvas.getContext("2d");
    pointsArray.pop();
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
    pointsArray.forEach(path => {
      context.beginPath();
      context.moveTo(path.x.x1, path.y.y1);
      context.lineTo(path.x.x2, path.y.y2);
      context.stroke()
      const createSpan = document.createElement("span")
      const text = document.createTextNode(path.len)
      createSpan.appendChild(text)
      lineDiv.appendChild(createSpan)
      createSpan.style.position = 'absolute'
      createSpan.style.top = Math.round((path.y.y1 + path.y.y2) / 2) + 'px'
      createSpan.style.left = Math.round((path.x.x1 + path.x.x2) / 2) + 'px'
      createSpan.style.userSelect = "none"
    })
    console.log(lineConnected)
      if (lineConnected) {
        connectedLines.pop();
        lineConnectedCount -= 1;
        if(lineConnectedCount === -1 ){
          lineConnectedCount = 0;
        }else{
          connectedLines[lineConnectedCount].pop();

        }
        setLineConnected(false);
        // burada kontrol et
      } else {
        if (connectedLines[lineConnectedCount].length === 1) {
          connectedLines[lineConnectedCount].pop();
          if (connectedLines.length === 0) {
            setLineConnected(false)

          } else {
            setLineConnected(true)
          }

        } else {
          if(connectedLines[0].length ===  0){
            connectedLines.pop()
          }else{
            connectedLines[lineConnectedCount].pop();
          }
        }

      }

      console.log(connectedLines)


  }

  return (

    <div id="main">
      <h1 style={myStyle} id="lenPointNum">{lengthPoint}</h1>
      <div className="undo">
        <button id="undoBtt" onClick={undo}>
          undo
        </button>
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

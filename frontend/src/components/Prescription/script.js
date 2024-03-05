import bg from "./bg.png";


const UpadateCanvas=(appointmentDetails)=>{
const canvas = document.getElementById('drawing-area');
const canvasContext = canvas.getContext('2d');
const undoButton = document.getElementById('undo-button');
const clearButton = document.getElementById('clear-button');
const saveButton = document.getElementById('save-button');



const state = {
    mousedown: false,
    points: [],
};


// Get references to the color buttons
const blackColorButton = document.getElementById('black-color-button');
const blueColorButton = document.getElementById('blue-color-button');
const redColorButton = document.getElementById('red-color-button');



const data = document.getElementById('data');
const details = data.getAttribute('data-user');
const user = data.getAttribute('data-item');
console.log(details);
const appointment = JSON.parse(details);


let strokeColor = 'black';


    
let drName="";
let QueNo="";
let pfNum="";
let pName="";
let regNum = "";
let regDate="";

let month = appointment.createdAt.substring(5,7); 
let year = appointment.createdAt.substring(0,4); 
let day = appointment.createdAt.substring(8,10);

if (appointment ) {
    drName = appointment.doctorname;
    // QueNo = appointment.queueNo;
    pfNum = appointment.pfnumber;
    pName = appointment.firstname;
    regNum = appointment.reg_no;
    regDate = day + "-" + month +"-" + year;
}
// const drName = "Dr. Sumit Bhadwa"
// const QueNo ="29";
// const pfNum="210412";
// const pName="SNEHA";
// const regNum="12H23";
// const regDate="1/2/2003";
const drName_txt = `Dr. Name : ${drName}`;
const QueNo_txt = `Que No. : ${QueNo}`;
const pfNum_txt = `pf no. : ${pfNum}`;
const pName_txt = `patient Name: ${pName}`;
const regNum_txt=`reg num. : ${regNum}`;
const regDate_txt = `reg Date : ${regDate}`;
function drawText(){
    canvasContext.shadowColor="#000";
    canvasContext.font = "14px Arial";
    canvasContext.fillStyle = "#000";
    canvasContext.textBaseline = "middle";
    canvasContext.fillText(drName_txt, 100, 120);
    canvasContext.fillText(QueNo_txt,400,120);
    canvasContext.fillText(pfNum_txt,100,140);
    canvasContext.fillText(pName_txt,400,140);
    canvasContext.fillText(regNum_txt,100,160);
    canvasContext.fillText(regDate_txt,400,160);
}

let restore_array=[];
let index=-1;


var backgroundImage = new Image();
backgroundImage.crossOrigin = "Anonymous";
backgroundImage.onload = function() {
        canvasContext.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        // if( appointment.imageURL === "") {
            drawText();
        restore_array.push(canvasContext.getImageData(0,0,canvas.width,canvas.height));
        // }
        index=0;
    };

if(user === "Doctor" || user === "Reception")
  
backgroundImage.src = bg;
else if(appointment && (user !== "Doctor" || user !== "Reception")){
    // console.log(appointment.imagelink);
    backgroundImage.src = appointment.imglink;
}

const defaultImage = () => {
    var backgroundImage = new Image();
    backgroundImage.onload = function() {
        canvasContext.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        // if( appointment.imageURL === "")
        drawText();
    };
    
    if(user === "Doctor" || user === "Reception")
    backgroundImage.src = bg;
    else if(appointment && (user !== "Doctor" || user !== "Reception")){
        // console.log(appointment.imagelink);
        backgroundImage.src = appointment.imglink;
    }   
}

const lineWidth = 0.4; // Adjusted for a thinner pen-like stroke
// const strokeStyle = 'black'; // Pen stroke color
// const shadowColor ='#000';
const shadowBlur =0.7;
blackColorButton.style.border = "2px solid black";
blackColorButton.style.borderRadius = "7px";

if (user !== "Reception") {
    canvas.addEventListener('mousedown', handleWritingStart);
    canvas.addEventListener('mousemove', handleWritingInProgress);
    canvas.addEventListener('mouseup', handleDrawingEnd);
    canvas.addEventListener('mouseout', handleDrawingEnd);

    canvas.addEventListener('touchstart', handleWritingStart);
    canvas.addEventListener('touchmove', handleWritingInProgress);
    canvas.addEventListener('touchend', handleDrawingEnd);
}

undoButton.addEventListener('click',handleUndoButtonClick);
clearButton.addEventListener('click', handleClearButtonClick);
// saveButton.addEventListener('click', handleSaveButtonClick);

blackColorButton.addEventListener('click',()=>{
    strokeColor = 'black';
    blackColorButton.style.border = "2px solid black";
    blackColorButton.style.borderRadius = "7px";
    blueColorButton.style.border = "none";
    redColorButton.style.border = "none";
});
blueColorButton.addEventListener('click',()=>{
    strokeColor = 'blue';
    blueColorButton.style.border = "2px solid blue";
    blueColorButton.style.borderRadius = "7px";
    blackColorButton.style.border = "none";
    redColorButton.style.border = "none";
});
redColorButton.addEventListener('click',()=>{
    strokeColor = 'red';
    redColorButton.style.border = "2px solid red";
    redColorButton.style.borderRadius = "7px";
    blueColorButton.style.border = "none";
    blackColorButton.style.border = "none";
});


function handleWritingStart(event) {
    event.preventDefault();
    const mousePos = getMosuePositionOnCanvas(event);
    state.points.push({ x: mousePos.x, y: mousePos.y });
    state.mousedown = true;
}

function handleWritingInProgress(event) {
    event.preventDefault();
    if (state.mousedown) {
        const mousePos = getMosuePositionOnCanvas(event);
        state.points.push({ x: mousePos.x, y: mousePos.y });
        drawSmoothLine();
    }
}

function handleDrawingEnd(event) {
    event.preventDefault();
    state.mousedown = false;
    state.points = [];
    if(event.type !== 'mouseout'){
        restore_array.push(canvasContext.getImageData(0,0,canvas.width,canvas.height));
        //if(user === "Doctor")
        //  restore_array.push(canvasContext.getImageData(0,0,canvas.width,canvas.height));
        index+=1;
    }
}

function handleClearButtonClick(event) {
    event.preventDefault();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    defaultImage();
}

// function handleSaveButtonClick(event) {
//     event.preventDefault();
//     const image = canvas.toDataURL("image/png");

//     fetch('http://localhost:4000/api/v1/users/record', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ image: image })
//     })
//     .then(response => {
//         if (response.ok) {
//             alert('Image uploaded successfully');
//             // You can perform any additional actions here after successful upload
//         } else {
//             throw new Error('Failed to upload image');
//         }
//     })
//     .catch(error => {
//         console.error('Error uploading image:', error);
//         // Handle error, show error message, etc.
//     });
// }


function getMosuePositionOnCanvas(event) {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const { offsetLeft, offsetTop } = event.target;
    const canvasX = clientX - offsetLeft;
    const canvasY = clientY - offsetTop+window.scrollY;;
    return { x: canvasX, y: canvasY };
}

function drawSmoothLine() {
    if (state.points.length < 2) return;

    canvasContext.beginPath();
    canvasContext.moveTo(state.points[0].x, state.points[0].y);
    canvasContext.shadowColor=strokeColor;
    canvasContext.shadowBlur=shadowBlur;

    for (let i = 1; i < state.points.length - 2; i++) {
        const xc = (state.points[i].x + state.points[i + 1].x) / 2;
        const yc = (state.points[i].y + state.points[i + 1].y) / 2;
        canvasContext.quadraticCurveTo(state.points[i].x, state.points[i].y, xc, yc);
    }

    canvasContext.quadraticCurveTo(
        state.points[state.points.length - 2].x,
        state.points[state.points.length - 2].y,
        state.points[state.points.length - 1].x,
        state.points[state.points.length - 1].y
    );

    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineCap = 'round'; // Set line cap to round for smoother edges
    canvasContext.stroke();
}

function handleUndoButtonClick(event){
    event.preventDefault();
    console.log('dejg ti');
    if(index>=1){
        index-=1;
        restore_array.pop();
        canvasContext.putImageData(restore_array[index],0,0);
    }
}

}
export default UpadateCanvas;
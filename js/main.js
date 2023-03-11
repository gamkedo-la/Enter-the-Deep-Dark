let canvas, context;
const btn_move = document.getElementById("btn-move");
const btn_look = document.getElementById("btn-look");
const btn_take = document.getElementById("btn-take");
const btn_use = document.getElementById("btn-use");
const btn_drop = document.getElementById("btn-drop");
const btn_speak = document.getElementById("btn-speak");

const btn_yes = document.getElementById("btn-yes");
const btn_no = document.getElementById("btn-no");

const FRAMES_PER_SECOND = 5; 
console.log("FRAMES_PER_SECOND = ", FRAMES_PER_SECOND);

let currentAction = null;
let sceneObjects = {
    door: [401,157, 476,307]
}

//REMNANT OF USING DOM IMG TAG FOR GAME SCENE



function checkForSceneObject(){
    // compare mouse position with scene object positions.
}


function displayMousePos(e) {
    // console.log(e.offsetX, e.offsetY);
     console.log(e);
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    document.getElementById("mouse-xy").innerHTML = ("X: "+mouseX+", Y: "+mouseY+" ");

    // replace with function that compares all scene object positions with click point.
    if(mouseX >= sceneObjects.door[0] && 
        mouseX <= sceneObjects.door[2] &&
        mouseY >= sceneObjects.door[1] &&
        mouseY <= sceneObjects.door[3]) 
    {
            document.getElementById("item-clicked").innerHTML = "Door";
    } else { document.getElementById("item-clicked").innerHTML = "Nothing Interesting...";}
}



function setAction(action = null) {
    currentAction = action;
    console.log("currentAction = ",currentAction);
    document.getElementById("current-action").innerHTML = action.toUpperCase();
}




window.onload = function () {
    canvas = document.getElementById('game-canvas');
    context = canvas.getContext('2d');
  
    canvas.addEventListener("click", function(e) { displayMousePos(e) });

    btn_move.addEventListener("click", function(){ setAction("move") });
    btn_look.addEventListener("click", function(){ setAction("look") });
    btn_take.addEventListener("click", function(){ setAction("take") })
    btn_use.addEventListener("click", function(){ setAction("use") })
    btn_drop.addEventListener("click", function(){ setAction("drop") })
    btn_speak.addEventListener("click", function(){ setAction("speak") })

    btn_yes.addEventListener("click", function(){ setAction("yes") })
    btn_no.addEventListener("click", function(){ setAction("no") })

    colorRect(0, 0, canvas.width, canvas.height, 'blue'); // startup page
    colorText("Loading Images... please wait", 400, 300, 'black');

    console.log(" before: loadImages ")
    loadImages(); // Once images are loaded, imageLoadingDoneSoStartGame() is called to setup the rest.
};


function imageLoadingDoneSoStartGame() {
  setInterval(updateAll, 1000 / FRAMES_PER_SECOND);
  
}

function updateAll() {
    moveAll();
    drawAll();
    updateItems();
}

function moveAll() {
    //console.log("move all")
}

function drawAll() {
    //console.log("draw all")
    //colorRect(0,0, canvas.width,canvas.height, 'orange');
    context.drawImage(firstRoomPic, 0,0, canvas.width,canvas.height)
}

function updateItems() {
    //console.log("update items")
}






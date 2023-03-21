let canvas, context;
const btn_move = document.getElementById("btn-move");
const btn_examine = document.getElementById("btn-examine");
const btn_take = document.getElementById("btn-take");
const btn_open = document.getElementById("btn-open");
const btn_close = document.getElementById("btn-close");
const btn_use = document.getElementById("btn-use");
const btn_drop = document.getElementById("btn-drop");
const btn_speak = document.getElementById("btn-speak");
const btn_yes = document.getElementById("btn-yes");
const btn_no = document.getElementById("btn-no");

const FRAMES_PER_SECOND = 30; 

let currentRoom = "Room01";
let currentAction = null;
let listOfItemCoordinates = [];
let listOfItemDescriptions = [];
let listOfDrawnItems = []


function checkForClickableItems(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    displayMousePos(e, mouseX, mouseY);

    if(currentAction !== null) {
        if(currentRoom === 'Room01'){ checkThisRoom(Room01, mouseX, mouseY) };
        if(currentRoom === 'Room02'){ checkThisRoom(Room02, mouseX, mouseY) };
    };
}

function displayMousePos(e, mouseX, mouseY) {
    console.log(e);
    document.getElementById("mouse-xy").innerHTML = ("X: "+mouseX+", Y: "+mouseY+" ");
}

function checkThisRoom (whichRoom, mouseX, mouseY) {
    let dictionaryOfRoomItems;
    let itemIsClicked = false;
    let listOfAllRoomItems = Object.keys(whichRoom.allItems);
    dictionaryOfRoomItems = whichRoom.allItems;



    //Populate list of item's coords and descriptions.
    if (listOfItemCoordinates.length == 0) {
        listOfAllRoomItems.forEach(item => { listOfItemCoordinates.push(dictionaryOfRoomItems[item].coords) });
        listOfAllRoomItems.forEach(item => { listOfItemDescriptions.push(dictionaryOfRoomItems[item].description) });
    }
    console.log(listOfItemCoordinates, listOfAllRoomItems);

    for( let i = 0; itemIsClicked == false && i < listOfAllRoomItems.length ; i++ ) {
        if(mouseX >=  whichRoom.allItems[listOfAllRoomItems[i]].coords[0] && 
            mouseX <= whichRoom.allItems[listOfAllRoomItems[i]].coords[2] &&
            mouseY >= whichRoom.allItems[listOfAllRoomItems[i]].coords[1] &&
            mouseY <= whichRoom.allItems[listOfAllRoomItems[i]].coords[3] ) 
        {

            let clickedItem = whichRoom.allItems[listOfAllRoomItems[i]];
            itemIsClicked = true;
            //check type of item -- isDoor? isEnemy? isTakeable?
            
            // should iron-out all relevent events for interacting with a door; opening/closing/moving/using key/ect.

            if (clickedItem.isDoor) {
                let clickedDoor = clickedItem;

                if (currentAction === "move" && clickedDoor.isOpen ) {
                    currentRoom = clickedDoor.nextRoom;
                    currentAction = null;
                } else {  
                    document.getElementById("message-box").innerHTML = Messages.moveThroughUnopenDoor;
                      
                };

                if (currentAction === "examine") {
                    document.getElementById("message-box").innerHTML = clickedDoor.description;

                }
                if (currentAction === "open") {
                    clickedDoor.isOpen = true;
                    // probably should engage an event
                    document.getElementById("message-box").innerHTML = clickedDoor.onOpenMessage;
                }
                if (currentAction === "close") { clickedDoor.isOpen = false };

                currentAction = null;
            }
            
        } else { document.getElementById("message-box").innerHTML = "Quit joking around, there's nothing interesting here..." }
    }
}


function setCurrentAction(action = null) {
    currentAction = action;
    console.log("currentAction = ",currentAction);
    document.getElementById("current-action").innerHTML = action.toUpperCase();
}

window.onload = function () {
    canvas = document.getElementById('game-canvas');
    context = canvas.getContext('2d');

    canvas.addEventListener("click", function(e) { checkForClickableItems(e, whichRoom=currentRoom) });

    btn_move.addEventListener("click",  function(){ setCurrentAction("move") });
    btn_examine.addEventListener("click",  function(){ setCurrentAction("examine") });
    btn_take.addEventListener("click",  function(){ setCurrentAction("take") });
    btn_open.addEventListener("click",  function(){ setCurrentAction("open") });
    btn_close.addEventListener("click",  function(){ setCurrentAction("close") });
    btn_use.addEventListener("click",   function(){ setCurrentAction("use") });
    btn_drop.addEventListener("click",  function(){ setCurrentAction("drop") });
    btn_speak.addEventListener("click", function(){ setCurrentAction("speak") });
    btn_yes.addEventListener("click",   function(){ setCurrentAction("yes") });
    btn_no.addEventListener("click",    function(){ setCurrentAction("no") });

    colorRect(0, 0, canvas.width, canvas.height, 'blue'); // startup page
    colorText("Loading Images... please wait", 400, 300, 'black');

    loadImages(); // Once images are loaded, imageLoadingDoneSoStartGame() is called to setup the rest.
};

function imageLoadingDoneSoStartGame() {
  setInterval(frame, 1000 / FRAMES_PER_SECOND);
}

function frame() {
    updateAll();
    drawAll();
}

function updateAll() {
        
}

function drawAll() {
    if (currentRoom === "Room01") {
        context.drawImage(firstRoomPic, 0,0, canvas.width,canvas.height);

        if (Room01.allItems.door01.isOpen) {
            context.drawImage(room1_door1_openPic, 332,92,);
        }
    }
    

    if (currentRoom === "Room02") {
        context.drawImage(room2Pic, 0,0, canvas.width,canvas.height);
    }
}

function onTransport() {
    loadTheNextRoom();
}



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
}


var debugMode = true;
 
myDebug = function(msg,callback){
    //if app not in debug mode, exit immediately
    if(!debugMode || !console){return};
 
    //console.log the message
    if(msg && typeof msg === 'string'){console.log(msg)};
 
    //execute the callback if one was passed-in
    if(callback && callback instanceof Function){
      callback();
    };
}


function imageLoadingDoneSoStartGame() {
  setInterval(frame, 1000 / FRAMES_PER_SECOND);
}

function setCurrentAction(action = null) {
    currentAction = action;
    // console.log("currentAction = ",currentAction);
    document.getElementById("current-action").innerHTML = action.toUpperCase();
}

function displayMousePos(e, mouseX, mouseY) {
    console.log(e);
    document.getElementById("mouse-xy").innerHTML = ("X: "+mouseX+", Y: "+mouseY+" ");
}

function checkForClickableItems(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    displayMousePos(e, mouseX, mouseY);
    if(currentAction !== null || currentAction !== 'none') {
        if(currentRoom === 'Room01'){ checkThisRoom(Room01, mouseX, mouseY) };
        if(currentRoom === 'Room02'){ checkThisRoom(Room02, mouseX, mouseY) };
    };
}




function onMove(clickedItem) {
    myDebug("onMove fired")
    if(clickedItem.isDoor && clickedItem.isOpen) {
        currentRoom = clickedItem.nextRoom;
    } else if(clickedItem.isDoor && !clickedItem.isOpen) {
        // could also tell player if door is locked and needs a key, 
        document.getElementById("message-box").innerHTML = Messages.moveThroughUnopenDoor;
        currentAction = null;
    } else {
        document.getElementById("message-box").innerHTML = Messages.cannotTakeAction;
    }
    setCurrentAction("none");
}

function onExamine(clickedItem) {
    myDebug("onExamine fired")
    document.getElementById("message-box").innerHTML = clickedItem.description;
    setCurrentAction("none");
}

function onTake(clickedItem) {
    myDebug("onTake fired")
    if(clickedItem.isTool && !clickedItem.isTaken) {
        playerInventory.push(clickedItem);
        document.getElementById("player-inventory").innerHTML = clickedItem.toolName;
        clickedItem.isTaken = true;
    } else { document.getElementById("message-box").innerHTML = Messages.cannotTakeAction }
    setCurrentAction("none");
}

function onOpen(clickedItem) {
    myDebug("onOpen fired")
    clickedItem.isOpen = true;
    document.getElementById("message-box").innerHTML = clickedItem.onOpenMessage;
    setCurrentAction("none");
}

function onClose(clickedItem) {
    myDebug("onClose fired")
    clickedItem.isOpen = false;
    setCurrentAction("none");
}




function checkThisRoom (whichRoom, mouseX, mouseY) {
    var dictionaryOfRoomItems;
    var itemIsClicked = false;
    var listOfAllRoomItems = Object.keys(whichRoom.allItems);
    dictionaryOfRoomItems = whichRoom.allItems;

    //Populate list of item's coords and descriptions.
    if (listOfItemCoordinates.length == 0) {
        listOfAllRoomItems.forEach(item => { listOfItemCoordinates.push(dictionaryOfRoomItems[item].coords) });
        listOfAllRoomItems.forEach(item => { listOfItemDescriptions.push(dictionaryOfRoomItems[item].description) });
    }
    // console.log(listOfItemCoordinates, listOfAllRoomItems);

    for( let i = 0; itemIsClicked == false && i < listOfAllRoomItems.length ; i++ ) {
        if(mouseX >=  whichRoom.allItems[listOfAllRoomItems[i]].coords[0] && 
            mouseX <= whichRoom.allItems[listOfAllRoomItems[i]].coords[2] &&
            mouseY >= whichRoom.allItems[listOfAllRoomItems[i]].coords[1] &&
            mouseY <= whichRoom.allItems[listOfAllRoomItems[i]].coords[3] ) 
        {

            let clickedItem = whichRoom.allItems[listOfAllRoomItems[i]];
            itemIsClicked = true;

            if (clickedItem.isDoor) {
                myDebug("Clicked Item isDoor") 

                if (currentAction === "move") {
                    myDebug("checkpoint: move")
                    onMove(clickedItem);
                }
                if (currentAction === "examine") {
                    myDebug("checkpoint: examine")
                    onExamine(clickedItem);
                }
                if (currentAction === "open") {
                    myDebug("checkpoint: open")
                    onOpen(clickedItem);
                }
                if (currentAction === "close") {
                myDebug("checkpoint: close") 
                    onClose(clickedItem); 
                }
                // else { 
                //     document.getElementById("message-box").innerHTML = Messages.cannotTakeAction;
                //     myDebug("else reached; isDoor; cannot take action...")
                // }


            }
            if (clickedItem.isTool) {
                myDebug("clicked Item isTool")

                if(currentAction === 'examine'){
                    myDebug("checkpoint: examine")
                    onExamine(clickedItem);
                }
                if(currentAction === 'take'){
                    myDebug("checkpoint: move")
                    onTake(clickedItem);

                } //else { 
                //     document.getElementById("message-box").innerHTML = Messages.cannotTakeAction;
                //     setCurrentAction("none");
                //     myDebug("else reached; isTool; cannot take action")
                // }
            }
            if (clickedItem.isDoodad) { 
            document.getElementById("message-box").innerHTML = "This is a doodad...";
            setCurrentAction("none");
            myDebug("else reached; neither door nor tool; Quit joking around...")
            }
        } else {
            document.getElementById("message-box").innerHTML = Messages.cannotTakeAction;
        } 

    }
}


function frame() {
    //updateAll();
    drawAll();
}

function updateAll() {}

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




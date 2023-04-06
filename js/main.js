let canvas, context;
const btn_move = document.getElementById("btn-move");
const btn_goBack = document.getElementById("btn-go-back");
const btn_examine = document.getElementById("btn-examine");
const btn_take = document.getElementById("btn-take");
const btn_open = document.getElementById("btn-open");
const btn_close = document.getElementById("btn-close");
const btn_use = document.getElementById("btn-use");
const btn_drop = document.getElementById("btn-drop");
const btn_speak = document.getElementById("btn-speak");

const btn_yes = document.getElementById("btn-yes");
const btn_no = document.getElementById("btn-no");

const el_backdrop = document.getElementById("backdrop");

const FRAMES_PER_SECOND = 30; 

let roomHistoryList = ["Room01"];
let currentRoom = roomHistoryList[0];

let currentAction = null;
let lastMouseEvent = null;

let listOfItemCoordinates = [];
let listOfItemDescriptions = [];
let listOfDrawnItems = []
let drawAllBoxes = true;


window.onload = function () {
    canvas = document.getElementById('game-canvas');
    context = canvas.getContext('2d');

    canvas.addEventListener("click", function(e) { checkForClickableItems(e, whichRoom=currentRoom) });
    canvas.addEventListener("mousemove", function(e) { 
        lastMouseEvent = e;
        displayMousePos(e, e.offsetX, e.offsetY) });
    
    btn_move.addEventListener("click",  function(){ setCurrentAction("move") });
    btn_goBack.addEventListener("click",  function(){ onGoBack() });
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



function imageLoadingDoneSoStartGame() {
  setInterval(frame, 1000 / FRAMES_PER_SECOND);
}

function setCurrentAction(action = null) {
    currentAction = action;
    // console.log("currentAction = ",currentAction);
    document.getElementById("current-action").innerHTML = action.toUpperCase();
}

function displayMousePos(e, mouseX, mouseY) {
    //console.log(e);
    document.getElementById("mouse-xy").innerHTML = ("X:Y  "+mouseX+", "+mouseY+" ");
}

function checkForClickableItems(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    displayMousePos(e, mouseX, mouseY);
    if(currentAction !== null || currentAction !== 'none') {
        //if(currentRoom === 'Room01'){ checkThisRoom(Room01, mouseX, mouseY) };
        //if(currentRoom === 'Room02'){ checkThisRoom(Room02, mouseX, mouseY) };
        checkThisRoom(rooms[currentRoom], mouseX, mouseY);
    };
}




function onMove(clickedItem) {
    if(clickedItem.isDoor && clickedItem.isOpen) {
        roomHistoryList.unshift(clickedItem.nextRoom);
        currentRoom = roomHistoryList[0];
        console.log("MOVED : roomList ["+roomHistoryList+"] current room: "+currentRoom);

    } else if(clickedItem.isDoor && !clickedItem.isOpen) {
        // could also tell player if door is locked and needs a key, 
        document.getElementById("message-box").innerHTML = randomChoice(Messages.moveThroughUnopenDoor);
        currentAction = null;
    } else {
        document.getElementById("message-box").innerHTML = randomChoice(Messages.cannotTakeAction);
    }
    setCurrentAction("none");
}

function onGoBack() {

    if(roomHistoryList.length >= 2) {
        roomHistoryList.shift();
        currentRoom = roomHistoryList[0];
        console.log("MOVED BACK: roomList ["+roomHistoryList+"] current room: "+currentRoom);
    } else {
        document.getElementById("message-box").innerHTML =randomChoice(Messages.cannotGoBack);
    }
    
    setCurrentAction("none");
}

function onExamine(clickedItem) {
    document.getElementById("message-box").innerHTML = clickedItem.description;
    setCurrentAction("none");
}

function onTake(clickedItem) {
    if(clickedItem.isTool && !clickedItem.isTaken) {
        playerInventory.push(clickedItem);
        document.getElementById("player-inventory").innerHTML = clickedItem.toolName;
        clickedItem.isTaken = true;
        flashScreen(el_backdrop, "limegreen");
    } else { document.getElementById("message-box").innerHTML = randomChoice(Messages.cannotTakeAction) }
    setCurrentAction("none");
}

function onOpen(clickedItem) {
    clickedItem.isOpen = true;
    document.getElementById("message-box").innerHTML = clickedItem.onOpenMessage;
    setCurrentAction("none");
    flashScreen(el_backdrop, "white");
}

function onClose(clickedItem) {
    clickedItem.isOpen = false;
    setCurrentAction("none");
}

function flashScreen(elementToFlash, flashColor) {
    elementToFlash.style.backgroundColor = flashColor;
    setTimeout(function() {elementToFlash.style.backgroundColor = "black"}, 100);
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
    console.log(listOfItemCoordinates, listOfAllRoomItems);

    for( let i = 0; itemIsClicked == false && i < listOfAllRoomItems.length ; i++ ) {
        if(mouseX >=  whichRoom.allItems[listOfAllRoomItems[i]].coords[0] && 
            mouseX <= whichRoom.allItems[listOfAllRoomItems[i]].coords[2] &&
            mouseY >= whichRoom.allItems[listOfAllRoomItems[i]].coords[1] &&
            mouseY <= whichRoom.allItems[listOfAllRoomItems[i]].coords[3] ) 
        {

            let clickedItem = whichRoom.allItems[listOfAllRoomItems[i]];
            itemIsClicked = true;
            console.clear();

            if (clickedItem.isDoor) { 
                console.log("clicked item is Door...");

                if (currentAction === "move") {
                    onMove(clickedItem);
                }
                if (currentAction === "examine") {
                    onExamine(clickedItem);
                }
                if (currentAction === "open") {
                    onOpen(clickedItem);
                }
                if (currentAction === "close") {
                    onClose(clickedItem); 
                }
            }
            if (clickedItem.isTool) {
                console.log("clicked item is Tool...");

                if(currentAction === 'examine'){
                    onExamine(clickedItem);
                }
                if(currentAction === 'take'){
                    onTake(clickedItem);

                }
            }
            if (clickedItem.isDoodad) { 
                console.log("clicked item is Doodad...");

                if(currentAction === 'examine'){
                    onExamine(clickedItem);
                }
            }
            if (clickedItem.isCreature) { 
                console.log("clicked item is Creature...");

                if(currentAction === 'examine'){
                    onExamine(clickedItem);
                }
            }
        } else {
            console.log("cannot take action")
            document.getElementById("message-box").innerHTML = randomChoice(Messages.cannotTakeAction);
        } 

    }
}


function frame() {
    // updateAll();
    drawAll();
}

// function updateAll() {};

function drawAll() {
    rooms[currentRoom].drawRoom();

    drawItemBoxes(lastMouseEvent);
}

function drawItemBoxes(e){
    if (e == null) return;
    let x = e.offsetX, y = e.offsetY;

    //if we haven't clicked on anything yet, populate the list of item coordinates
    if(listOfItemCoordinates.length == 0){
        populateItemCoordinates();
    }
    for(let i = 0; i < listOfItemCoordinates.length; i++){
        //check if mouse is in the box
        //should probably abstract this into a check point in box function
        if(x >= listOfItemCoordinates[i][0] && x <= listOfItemCoordinates[i][2] && y >= listOfItemCoordinates[i][1] && y <= listOfItemCoordinates[i][3]){
            
            colorRectOutlineByCorner(listOfItemCoordinates[i][0], listOfItemCoordinates[i][1], listOfItemCoordinates[i][2], listOfItemCoordinates[i][3],
                "magenta");
        } else if (drawAllBoxes) {
            colorRectOutlineByCorner(listOfItemCoordinates[i][0], listOfItemCoordinates[i][1], listOfItemCoordinates[i][2], listOfItemCoordinates[i][3],
                "limegreen");
        }
    }
}

function populateItemCoordinates(){
    let dictionaryOfRoomItems = rooms[currentRoom].allItems 
    listOfAllRoomItems = Object.keys(dictionaryOfRoomItems);
    listOfAllRoomItems.forEach(item => { listOfItemCoordinates.push(dictionaryOfRoomItems[item].coords) });
}





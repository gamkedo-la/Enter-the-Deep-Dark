let demoVideoRecordingQuieterMusic = true;
let keyDebuggingCheatsEnabled = true;

let canvas, context;
const btn_move = document.getElementById("btn-move");
const btn_goBack = document.getElementById("btn-go-back");
const btn_examine = document.getElementById("btn-examine");
const btn_take = document.getElementById("btn-take");
const btn_open = document.getElementById("btn-open");
const btn_close = document.getElementById("btn-close");
const btn_use = document.getElementById("btn-use");
const btn_hit = document.getElementById("btn-hit");
const btn_drop = document.getElementById("btn-drop");
const btn_speak = document.getElementById("btn-speak");

const btn_yes = document.getElementById("btn-yes");
const btn_no = document.getElementById("btn-no");

const el_inventory = document.getElementById("player-inventory");
const el_backdrop = document.getElementById("backdrop");

const FRAMES_PER_SECOND = 30; 
const CUSTOM_CURSORS_ENABLED = true; // if false, always use browser default arrow

let roomHistoryList = ["Room01"];
let currentRoom = roomHistoryList[0];

let currentAction = null;
let currentTool = null;
let lastMouseEvent = null;

let listOfItemCoordinates = [];
let listOfItemDescriptions = [];
let listOfDrawnItems = []
let drawAllBoxes = true;
let gameTime = 0;
let torchLife = 0;
let torchIsLit = false;

const KEY_K = 75;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;

window.onload = function () {
    canvas = document.getElementById('game-canvas');
    context = canvas.getContext('2d');

    canvas.addEventListener("click", function(e) { checkForClickableItems(e, whichRoom=currentRoom) });
    canvas.addEventListener("mousemove", 
        function(e) { 
            lastMouseEvent = e;
            displayMousePos(e, e.offsetX, e.offsetY);
        }
    );

    canvas.addEventListener("keydown", keyPress);
    
    btn_move.addEventListener("click",  function(){ setCurrentAction("move") });
    btn_goBack.addEventListener("click",  function(){ onGoBack() });
    btn_examine.addEventListener("click",  function(){ setCurrentAction("examine") });
    btn_take.addEventListener("click",  function(){ setCurrentAction("take") });
    btn_open.addEventListener("click",  function(){ setCurrentAction("open") });
    btn_close.addEventListener("click",  function(){ setCurrentAction("close") });
    btn_use.addEventListener("click",   function(){ setCurrentAction("use") });
    btn_hit.addEventListener("click",  function(){ setCurrentAction("hit") });
    btn_drop.addEventListener("click",  function(){ setCurrentAction("drop") });
    btn_speak.addEventListener("click", function(){ setCurrentAction("speak") });
    btn_yes.addEventListener("click",   function(){ setCurrentAction("yes") });
    btn_no.addEventListener("click",    function(){ setCurrentAction("no") });

    colorRect(0, 0, canvas.width, canvas.height, 'blue'); // startup page
    colorText("Loading Images... please wait", 400, 300, 'black');

    loadImages(); // Once images are loaded, imageLoadingDoneSoStartGame() is called to setup the rest.
}

function keyPress(e) {
    let cheatName = "none";
    // note: keys currently only used for debugging cheats, keys below not detected if cheats are off!
    if(keyDebuggingCheatsEnabled == false) {
        return;
    }
    switch(e.keyCode) {
        case KEY_K:
            cheatName = "Give Key";
            addToolToInventory({
                isTool: true, // is object that can be taken
                toolName: "key", // as listed in the inventory (no spaces allowed)
                description:
                  "There's a key shimmering in the shattered pot remains...",
                picVar: room1_keyPic,
                drawCoords: [5, 5 ],
                coords: [100, 340, 128, 357],
                isTaken: false,
                isHidden: true,
              });
            break;
        case KEY_1:
            cheatName = roomNameList[0];
            changeToRoomRememberHistory(cheatName);
            cheatName = "Teleport to " + cheatName; // appending suffix after so only 1 line is different per cheat
            break;
        case KEY_2:
            cheatName = roomNameList[1];
            changeToRoomRememberHistory(cheatName);
            cheatName = "Teleport to " + cheatName;
            break;
        case KEY_3:
            cheatName = roomNameList[2];
            changeToRoomRememberHistory(cheatName);
            cheatName = "Teleport to " + cheatName;
            break;
        case KEY_4:
            cheatName = roomNameList[3];
            changeToRoomRememberHistory(cheatName);
            cheatName = "Teleport to " + cheatName;
            break;
        case KEY_5:
            cheatName = roomNameList[4];
            changeToRoomRememberHistory(cheatName);
            cheatName = "Teleport to " + cheatName;
            break;
        case KEY_6:
            cheatName = roomNameList[5];
            changeToRoomRememberHistory(cheatName);
            cheatName = "Teleport to " + cheatName;
            break;
        default:
            console.log("unused keycode: " + e.keyCode);
            break;
    }
    console.log("debug cheat used: " + cheatName);
}

function imageLoadingDoneSoStartGame() {
    
    // set up custom cursor on the game canvas
    if (CUSTOM_CURSORS_ENABLED) initCustomMouseCursor();
  
    setInterval(frame, 1000 / FRAMES_PER_SECOND);
}

function setCurrentAction(action = null) {
    currentAction = action;
    // console.log("currentAction = ",currentAction);
    document.getElementById("current-action").innerHTML = action.toUpperCase();

    if (action === "use") {
        onUse();
    }
    if (action === "hit") {
        document.getElementById("message-box").innerHTML = "What would you like to hit?..."
    }
}

function setCurrentTool(tool = null) {
    currentTool = tool.toolName;
    console.log("Current Tool = ", tool.toolName);
    document.getElementById("current-tool").innerHTML = tool.toolName.toUpperCase();

    if(tool.toolName === "torch" && currentAction === "use") {
        useTorch();
    } else {
        document.getElementById("message-box").innerHTML = "What would you like to do with this " + tool.toolName + " ?...";
    }




}

function displayMousePos(e, mouseX, mouseY) {
    //console.log(e);
    document.getElementById("mouse-xy").innerHTML = ("X:Y  "+mouseX+", "+mouseY+" "+currentlyHoveredItemName);
}

let firstClick = true;
function checkForClickableItems(e){
    if(firstClick) {
        console.log("first Click.")
        firstClick = false;
        musicTrack.play();
        if(demoVideoRecordingQuieterMusic) {
            musicTrack.volume = 0.1;
        }        
        musicTrack.loop = true;
    }
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    displayMousePos(e, mouseX, mouseY);
    if(currentAction !== null || currentAction !== 'none') {
        //if(currentRoom === 'Room01'){ checkThisRoom(Room01, mouseX, mouseY) };
        //if(currentRoom === 'Room02'){ checkThisRoom(Room02, mouseX, mouseY) };
        checkThisRoom(rooms[currentRoom], mouseX, mouseY);
    };
}


function changeToRoom(toRoom) {
    currentRoom = toRoom;
    populateItemCoordinates();
}

function changeToRoomRememberHistory(toRoom) { // helper for when we want to not forget to track history
    roomHistoryList.unshift(toRoom);
    changeToRoom(roomHistoryList[0]);
}

function onMove(clickedItem) {
    if(clickedItem.isDoor && clickedItem.isOpen) {
        changeToRoomRememberHistory(clickedItem.nextRoom);
        console.log("MOVED : roomList ["+roomHistoryList+"] current room: "+currentRoom);
        //if (soundEnabled) sounds.transferSound1.play();

    } else if(clickedItem.isDoor && !clickedItem.isOpen) {
        // could also tell player if door is locked and needs a key, 
        document.getElementById("message-box").innerHTML = randomChoice(Messages.moveThroughUnopenDoor);
        currentAction = null;
        if (soundEnabled) sounds.actionDenied.play();
    } else {
        document.getElementById("message-box").innerHTML = randomChoice(Messages.cannotTakeAction);
        if (soundEnabled) sounds.actionDenied.play();
    }
    setCurrentAction("none");
}

function onGoBack() {

    if(roomHistoryList.length >= 2) {
        roomHistoryList.shift();
        changeToRoom(roomHistoryList[0]);
        console.log("MOVED BACK: roomList ["+roomHistoryList+"] current room: "+currentRoom);
        //if (soundEnabled) sounds.transferSound1.play();
    } else {
        document.getElementById("message-box").innerHTML =randomChoice(Messages.cannotGoBack);
        if (soundEnabled) sounds.actionDenied.play();
    }
    
    setCurrentAction("none");
}

function onExamine(clickedItem) {
    document.getElementById("message-box").innerHTML = clickedItem.description;
    setCurrentAction("none");
}


function addToolToInventory(tool) {

    let li_element = document.createElement('li');
    let btn_element = document.createElement('button');

    console.log(tool.toolName);

    btn_element.classList.add(tool.toolName);
    btn_element.addEventListener('click', function() { setCurrentTool(tool) });

    let textNode = document.createTextNode(tool.toolName)
        //append all together
    btn_element.appendChild(textNode);
    li_element.appendChild(btn_element);
        //append to inventory ul
    el_inventory.appendChild(li_element);
}

function removeItemFromInventory(toolNameToRemove) {
    for(let invItem=1;invItem<el_inventory.childNodes.length;invItem++) { // 0 is "INVENTORY", >=1 is <li>
        // inspecting childNode[0] for its outerText, it's the button inside an <li>
        // console.log("comparing: " + el_inventory.childNodes[invItem].childNodes[0].outerText + " : " + currentTool);
        if(el_inventory.childNodes[invItem].childNodes[0].outerText == toolNameToRemove) {
            el_inventory.childNodes[invItem].remove(0); // remove li containing matching button
            break; // prevent removal of multiple if we have several
        }
    }
}

function onTake(clickedItem) {
    if(clickedItem.isTool && !clickedItem.isTaken) {
        playerInventory.push(clickedItem);
        // document.getElementById("player-inventory").innerHTML = clickedItem.toolName;
        addToolToInventory(clickedItem)

        clickedItem.isTaken = true;
        flashScreen(el_backdrop, "limegreen");
        if (soundEnabled) sounds.pickUpItemSound3.play();
    } else { 
        document.getElementById("message-box").innerHTML = randomChoice(Messages.cannotTakeAction) 
        if (soundEnabled) sounds.actionDenied.play();
    }
    setCurrentAction("none");
}

function onOpen(clickedItem) {
    if(clickedItem.isLocked === true ) {
        document.getElementById("message-box").innerHTML = clickedItem.messages.cannotOpen;
    } else {
        clickedItem.isOpen = true;
        document.getElementById("message-box").innerHTML = clickedItem.onOpenMessage;
        setCurrentAction("none");
        flashScreen(el_backdrop, "white");
        if (soundEnabled) sounds.openDoorSound.play();
    }
}

function onClose(clickedItem) {
    clickedItem.isOpen = false;
    setCurrentAction("none");
}

function onUse(clickedItem) {
    console.log( "USE..." )
    document.getElementById("message-box").innerHTML = "Please select a tool from your inventory..."
}

function onHit(clickedItem, allItems) {
    console.log("Hit...");

    let containedItem = allItems[clickedItem.contains];

    if(clickedItem.isDoodad && clickedItem.key === "hit") {
        clickedItem.altState = true;
        if(containedItem){
            containedItem.isHidden = false;
        }
    }
}

function useTorch() {
    document.getElementById("message-box").innerHTML = "You light a new torch!"
    flashScreen(el_backdrop, "orange");
    let i = 0;
    console.log(i)
    // remove torch from js playerInventory
    for(i = 0; i < 1; i++) {
        console.log(i)
        if(playerInventory[i].toolName === "torch") {
            playerInventory.splice(i, 1);
        }

        document.querySelector(".torch").remove();
        torchIsLit = true;
        torchLife = 50;
    }
    // remove torch from UI Inventory

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
            // console.clear(); // was preventing use of the console to debug what just happened

            if (clickedItem.isDoor) { 
                console.log("clicked item is Door...");

                if (currentAction === "move") {
                    onMove(clickedItem);
                    gameTime++;
                    torchLife--;
                }
                if (currentAction === "examine") {
                    onExamine(clickedItem);
                    gameTime++;
                    torchLife--;
                }
                if (currentAction === "open" && clickedItem.isLocked === false ) {
                    onOpen(clickedItem);
                    gameTime++;
                    torchLife--;
                }
                if (currentAction === "close") {
                    onClose(clickedItem);
                    gameTime++; 
                    torchLife--;
                }
                if (currentAction === "use" && currentTool === clickedItem.doorKey){
                    clickedItem.isLocked = false;
                    document.getElementById("message-box").innerHTML = clickedItem.messages.onUnlock;
                    gameTime++;
                    torchLife--;
                    removeItemFromInventory(currentTool);
                }
            }
            if (clickedItem.isTool) {
                console.log("clicked item is Tool...");

                if(currentAction === 'examine'){
                    onExamine(clickedItem);
                    gameTime++;
                    torchLife--;
                }
                if(currentAction === 'take'){
                    onTake(clickedItem);
                    gameTime++;
                    torchLife--;
                }
            }
            if (clickedItem.isDoodad) { 
                console.log("clicked item is Doodad...");

                if(currentAction === 'examine'){
                    onExamine(clickedItem);
                    gameTime++;
                    torchLife--;
                }
                if(currentAction === 'hit'){
                    onHit(clickedItem, dictionaryOfRoomItems);
                    gameTime++;
                    torchLife--;
                }
            }
            if (clickedItem.isCreature) { 
                console.log("clicked item is Creature...");

                if(currentAction === 'examine'){
                    onExamine(clickedItem);
                    gameTime++;
                    torchLife--;
                }
                if(currentAction === 'hit'){
                    onHit(clickedItem);
                    gameTime++;
                    torchLife--;
                }
            }
        } else {
            console.log("cannot take action")
            document.getElementById("message-box").innerHTML = randomChoice(Messages.cannotTakeAction);
        } 
    // console.log("Game Time: " + gameTime + " Torch is lit: " + torchIsLit + " Torch Life: " + torchLife);
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

    if (CUSTOM_CURSORS_ENABLED) drawCustomMouseCursor();
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
            
            // hovered!
            colorRectOutlineByCorner(listOfItemCoordinates[i][0], listOfItemCoordinates[i][1], listOfItemCoordinates[i][2], listOfItemCoordinates[i][3],
                "magenta");

        } else if (drawAllBoxes) {
            
            // not hovered
            colorRectOutlineByCorner(listOfItemCoordinates[i][0], listOfItemCoordinates[i][1], listOfItemCoordinates[i][2], listOfItemCoordinates[i][3],
                "limegreen");
        }
    }
}

function populateItemCoordinates(){
    listOfItemCoordinates = []; // emptying room items list to prevent item stacking
    let dictionaryOfRoomItems = rooms[currentRoom].allItems;
    listOfAllRoomItems = Object.keys(dictionaryOfRoomItems);
    listOfAllRoomItems.forEach(item => { listOfItemCoordinates.push(dictionaryOfRoomItems[item].coords) });
}

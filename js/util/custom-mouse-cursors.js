var customMouseCursorX = 0;
var customMouseCursorY = 0;
var currentlyHoveredItemName = "";


function initCustomMouseCursor() {
    console.log("initializing custom mouse cursor...");
    canvas.style.cursor='none'; // turn off the browser mouse arrow
    canvas.addEventListener("mousemove", 
        function(e) { 
            customMouseCursorX = e.offsetX;
            customMouseCursorY = e.offsetY;
            //console.log("mouse cursor pos:"+customMouseCursorX+","+customMouseCursorY);
        }
    );
}

// not currently used, but the mouse cursor could say "GET KEY" when you hover the key this way
function lookForHoveredItemName() {


    currentlyHoveredItemName = ""; 
    
    for (let thing of Object.values(rooms[currentRoom].allItems)) {
        if (customMouseCursorX >= thing.coords[0] && 
            customMouseCursorX <= thing.coords[2] &&
            customMouseCursorY >= thing.coords[1] &&
            customMouseCursorY <= thing.coords[3]) {
                
                if (thing.toolName) currentlyHoveredItemName = thing.toolName;
                else if (thing.name) currentlyHoveredItemName = thing.name;
                // console.log("hovering: "+ currentlyHoveredItemName);

        }
    }

}


function drawCustomMouseCursor() {

    //console.log(currentAction+ " cursor pos:"+customMouseCursorX+","+customMouseCursorY);

    lookForHoveredItemName();

    switch (currentAction) {
        
        case "move":
            context.drawImage(movePic,customMouseCursorX,customMouseCursorY);
        break;

        case "examine":
            context.drawImage(examinePic,customMouseCursorX-25,customMouseCursorY-25); // rised to center on the glass
        break;

        case "take":
            context.drawImage(takePic,customMouseCursorX,customMouseCursorY-38); // raised so it is where fingers grasp on the sprite
        break;

        case "open":
            context.drawImage(openPic,customMouseCursorX,customMouseCursorY);
        break;

        case "close":
            context.drawImage(closePic,customMouseCursorX,customMouseCursorY);
        break;

        case "use":
            context.drawImage(usePic,customMouseCursorX,customMouseCursorY);
        break;

        case "drop":
            context.drawImage(dropPic,customMouseCursorX,customMouseCursorY);
        break;

        case "speak":
            context.drawImage(speakPic,customMouseCursorX,customMouseCursorY);
        break;

        case "yes":
            context.drawImage(yesPic,customMouseCursorX,customMouseCursorY);
        break;

        case "no":
            context.drawImage(noPic,customMouseCursorX,customMouseCursorY);
        break;

        // otherwise use a default cursor
        case "none":
        case "null":
        default:
            context.drawImage(defaultCursorPic,customMouseCursorX,customMouseCursorY);
    }
}
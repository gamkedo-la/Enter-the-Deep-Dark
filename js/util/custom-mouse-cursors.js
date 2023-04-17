var customMouseCursorX = 0;
var customMouseCursorY = 0;

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

function drawCustomMouseCursor() {

    //console.log(currentAction+ " cursor pos:"+customMouseCursorX+","+customMouseCursorY);
    switch (currentAction) {
        
        case "move":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "examine":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "take":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "open":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "close":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "use":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "drop":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "speak":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "yes":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        case "no":
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
        break;

        // otherwise use a default cursor
        case "none":
        case "null":
        default:
            context.drawImage(hallway_torch1Pic,customMouseCursorX,customMouseCursorY);
    }
}
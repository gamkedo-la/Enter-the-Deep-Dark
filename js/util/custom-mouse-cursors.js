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
            context.drawImage(movePic,customMouseCursorX,customMouseCursorY);
        break;

        case "examine":
            context.drawImage(examinePic,customMouseCursorX,customMouseCursorY);
        break;

        case "take":
            context.drawImage(takePic,customMouseCursorX,customMouseCursorY);
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
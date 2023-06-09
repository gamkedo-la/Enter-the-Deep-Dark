
// all sounds used by the game are listed here
var sounds = {
    actionDenied : new Audio("snd/DD_action_denied.mp3"),
    pickUpItemSound1 : new Audio("snd/DD_pickup_item_1.mp3"),
    pickUpItemSound2 : new Audio("snd/DD_pickup_item_2.mp3"),
    pickUpItemSound3 : new Audio("snd/DD_pickup_item_3.mp3"),
    openDoorSound : new Audio("snd/DD_open_door.mp3"),

    creatureSound1: new Audio("snd/DD_creature_1.mp3"),
    transferSound1: new Audio("snd/DD_transfer_room_2.mp3"),
    oddSound1: new Audio("snd/DD_odd_1.mp3"),
    typingSound: new Audio("snd/DD_typing.mp3"),

}

let musicTrack = new Audio("snd/BGM-darkness_sits_in_the_corner.mp3");

// global audio mute toggle
var soundEnabled = true;

document.body.addEventListener("keydown", (event) => {
    if (event.key=="m") {
        soundEnabled = !soundEnabled;
        console.log("sound is "+(soundEnabled?"enabled":"muted"));
    }
});
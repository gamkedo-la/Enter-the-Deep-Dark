
let room1Pic = document.createElement("img");
let hallwayPic = document.createElement("img");
let kitchenPic = document.createElement("img");
let disposalPitPic = document.createElement("img");
let storageRoomPic = document.createElement("img");
let atriumPic = document.createElement("img");


let room1_door1_openPic = document.createElement("img");
let room1_clayPotPic = document.createElement("img");
let room1_torch1Pic = document.createElement("img");
let room1_torch2Pic = document.createElement("img");
let room1_stone1Pic = document.createElement("img");
let room1_stone2Pic = document.createElement("img");
let room1_stone3Pic = document.createElement("img");
let room1_keyPic = document.createElement("img");

let hallway_door1_openPic = document.createElement("img");
let hallway_door2_openPic = document.createElement("img");
let hallway_door3_openPic = document.createElement("img");
let hallway_torch1Pic = document.createElement("img");
let hallway_torch2Pic = document.createElement("img");
let hallway_creeperPic = document.createElement("img");

let kitchen_door1_openPic = document.createElement("img");
let kitchen_goblin1Pic = document.createElement("img");
let kitchen_goblin2Pic = document.createElement("img");


// mouse cursors
let defaultCursorPic = document.createElement("img");
let noPic = document.createElement("img");
let yesPic = document.createElement("img");
let speakPic = document.createElement("img");
let dropPic = document.createElement("img");
let usePic = document.createElement("img");
let closePic = document.createElement("img");
let openPic = document.createElement("img");
let takePic = document.createElement("img");
let examinePic = document.createElement("img");
let movePic = document.createElement("img");

let showImageLoadingDebug = false;

// let gamePics = [];
let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(fn="") {
	picsToLoad--;
	if (picsToLoad == 0) {
        if(showImageLoadingDebug) { console.log(" all images downloaded!"); }
		imageLoadingDoneSoStartGame();
	} else if(showImageLoadingDebug) { 
        console.log(" download complete: "+fn+". images remaining: "+picsToLoad);
    }
}

function imageLoadingError(fn="") {
    console.log("ERROR LOADING AN IMAGE: "+fn);
}

function beginLoadingImage(imgVar, fileName) {
	if(showImageLoadingDebug) { console.log(" beginLoadingImage: "+fileName); }
    imgVar.onload = function() { countLoadedImagesAndLaunchIfReady(fileName); };
    imgVar.onerror = function() { imageLoadingError(fileName); };
    imgVar.src = "img/" + fileName;
}

function loadImages() {

	if(showImageLoadingDebug) { console.log(" before: let imageList =..."); }
	let imageList = [
		{ varName: room1Pic , filePath: "room1/scene.png" },
		{ varName: room1_door1_openPic , filePath: "room1/door01-open.png"},
		{ varName: room1_clayPotPic , filePath: "room1/clay-pot.png"},

		{ varName: room1_torch1Pic , filePath: "room1/torch-1.png"},
		{ varName: room1_torch2Pic , filePath: "room1/torch-2.png"},
		{ varName: room1_stone1Pic , filePath: "room1/stone-1.png"},
		{ varName: room1_stone2Pic , filePath: "room1/stone-2.png"},
		{ varName: room1_stone3Pic , filePath: "room1/stone-3.png"},
		{ varName: room1_keyPic , 	 filePath: "room1/key.png"},

		{ varName: hallwayPic , filePath: "room2/scene.png" },
		{ varName: hallway_door1_openPic , filePath: "room2/door1.png"},
		{ varName: hallway_door2_openPic , filePath: "room2/door2.png"},
		{ varName: hallway_door3_openPic , filePath: "room2/door3.png"},
		{ varName: hallway_torch1Pic , filePath: "room2/torch1.png"},
		{ varName: hallway_torch2Pic , filePath: "room2/torch2.png"},
		{ varName: hallway_creeperPic , filePath: "room2/creeperPeeking.png"},

		{ varName: kitchenPic , filePath: "room3/scene.png"},
		{ varName: kitchen_door1_openPic , filePath: "room3/door1.png"},
		{ varName: kitchen_goblin1Pic , filePath: "room3/goblin1.png"},
		{ varName: kitchen_goblin2Pic , filePath: "room3/goblin2.png"},

		{ varName: disposalPitPic , filePath: "room4/scene.png"},
		{ varName: storageRoomPic , filePath: "room5/scene.png"},
		{ varName: atriumPic , filePath: "room6/scene.png"},

        { varName: defaultCursorPic , filePath: "defaultCursor.png"},
        { varName: noPic , filePath: "no.png"},
        { varName: yesPic , filePath: "yes.png"},
        { varName: speakPic , filePath: "speak.png"},
        { varName: dropPic , filePath: "drop.png"},
        { varName: usePic , filePath: "use.png"},
        { varName: closePic , filePath: "close.png"},
        { varName: openPic , filePath: "open.png"},
        { varName: takePic , filePath: "take.png"},
        { varName: examinePic , filePath: "examine.png"},
        { varName: movePic , filePath: "move.png"},
        
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
	
		beginLoadingImage(imageList[i].varName, imageList[i].filePath);
		// if (imageList[ i ].varName != undefined) {
		// 	beginLoadingImage(imageList[ i ].varName, imageList[ i ].theFile);
		// } else {
		// 	console.log(" Error in loading... ", imageList[ i ]);
		// }
	}

}

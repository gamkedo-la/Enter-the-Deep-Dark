
let room1Pic = document.createElement("img");
let hallwayPic = document.createElement("img");

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



// let gamePics = [];
let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(fn="") {
	picsToLoad--;
	if (picsToLoad == 0) {
        console.log(" all images downloaded!");
		imageLoadingDoneSoStartGame();
	} else {
        console.log(" download complete: "+fn+". images remaining: "+picsToLoad);
    }
}

function imageLoadingError(fn="") {
    console.log("ERROR LOADING AN IMAGE: "+fn);
}

function beginLoadingImage(imgVar, fileName) {
	console.log(" beginLoadingImage: "+fileName)
    imgVar.onload = function() { countLoadedImagesAndLaunchIfReady(fileName); };
    imgVar.onerror = function() { imageLoadingError(fileName); };
    imgVar.src = "img/" + fileName;
}

function loadImages() {

	console.log(" before: let imageList =...");
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

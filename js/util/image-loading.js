
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



// let gamePics = [];
let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
        console.log(" all images downloaded!");
		imageLoadingDoneSoStartGame();
	} else {
        console.log(" download complete. images remaining: "+picsToLoad);
    }
}

function imageLoadingError() {
    console.log("ERROR LOADING AN IMAGE!");
}

function beginLoadingImage(imgVar, fileName) {
	console.log(" beginLoadingImage: "+fileName)
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.onerror = imageLoadingError;
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

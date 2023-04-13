
let firstRoomPic = document.createElement("img");
let room2Pic = document.createElement("img");

let room1_door1_openPic = document.createElement("img");
let room1_door1_closedPic = document.createElement("img");
let room1_clayPot_takenPic = document.createElement("img");



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
		{ varName: firstRoomPic , filePath: "room1/scene.png" },
		{ varName: room1_door1_openPic , filePath: "room1/door01-open.png"},
		{ varName: room1_door1_closedPic , filePath: "room1/door01-closed.png"},
		{ varName: room1_clayPot_takenPic , filePath: "room1/clay-pot-taken.png"},

		{ varName: room2Pic , filePath: "room2/scene.png" },


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

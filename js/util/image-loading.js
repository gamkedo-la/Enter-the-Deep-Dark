
let firstRoomPic = document.createElement("img");


// let gamePics = [];
let picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	console.log(" beginLoadingImage ")
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "img/" + fileName;
}

function loadImages() {

	console.log(" before: let imageList =...");
	let imageList = [
		{ varName: firstRoomPic , filePath: "mock-scene-frame.png" }

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


let scene = {};

let room01 = {

	name: "Dank Entry",
	
	allItems: {
		stone: {},
		scroll: {},
		lamp: {}
	},

	allDoors: {
		door01: {
			name: "busted-up door",
			description: " ",

			canMove: 	true,
			canLook: 	true,
			canTake: 	false,
			canUse: 	false,
			canDrop: 	false,
			canSpeak: 	false,

			isOpen: 	false,
			isLocked: 	true,
			isSecret: 	false,
			
			doorKey: "simple key",
			transport: "room-02",

			filePath: "img/mock-scene-frame.png",
		},


		door02: {
			name: "busted-up door",
			description: " ",


			isSecret: true,
			isLocked: true,

			doorKey: "simple key",
			transport: "room-03",

		}, 
	}
}

// Array of all entities/clickable objects
let entityPositionList = [
		{ name:"busted-up door", entity: room01.allDoors.door01, coords: [400,128, 470,256] },
		{ name:"stone", entity: room01.allItems.stone, coords: [358,267, 379,279] },
		{ name:"glowing lamp", entity: room01.allItems.lamp, coords: [250,105, 275,174] }
	];


function sceneManager() {
	if(action === "move") {}
}
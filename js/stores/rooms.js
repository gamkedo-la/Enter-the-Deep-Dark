


function Room() {
	this.doors = {};
	this.itemsOnGround = {};
}

function Door() {
	this.name = name;
	this.description = description;
	this.isOpen = false;
	this.isLocked = isLocked;
	this.isSecret = isSecret;
	this.key = key;
	this.transport = {};

	

}



let room01 = {

	name: "Dank Entry",
	
	allItems: {
		stone: {},
		lamp: {},
	},

	allDoors: {
		door01: {
			name: "busted-up door",
			description: " ",

			isOpen: 	true,
			isLocked: 	false,
			isSecret: 	false,
			
			doorKey: 	null,
			transport: {nextRoomName:"room02", filePath:"img/room02.png" }
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
		{ name:"Wooden Door", 	entity: room01.allDoors.door01, coords: [360,128, 425,240] },
		{ name:"Stone-01", 			entity: room01.allItems.stone, coords: [319,281, 336,294] },
		{ name:"Stone-02", 			entity: room01.allItems.stone, coords: [241,325, 264,349] },
		{ name:"Clay Pot", 			entity: room01.allItems.stone, coords: [86,285, 143,355] },
		{ name:"Left Torch", 			entity: room01.allItems.stone, coords: [241,161, 262,182] },
		{ name:"Right Torch", 			entity: room01.allItems.stone, coords: [524,162, 557,182] },
		
	];


function sceneManager() {
	if(action === "move") {}
}
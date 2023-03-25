


let Room01 = { 

	description: " ",
	
	allItems: {
		stone01: {
			isTool: true,
			toolName: 'stone',
			description: "A stone small enough to pocket, but large enough to be useful.",
			coords: [319,281, 336,294],
			isTaken: false,
		},

		stone02: {
			isTool: true,
			toolName: 'stone',
			description: "A stone small enough to pocket, but large enough to be useful.",
			coords: [241,325, 264,349],
			isTaken: false,
		},

		torch01: {
			isTool: true,
			toolName: 'torch',
			description: "A torch lights the room, maybe you should take it.",
			coords: [524,162, 557,182],
			isTaken: false,
		},

		torch02: {
			isTool: true,
			toolName: 'torch',
			description: "A torch lights the room, maybe you should take it.",
			coords: [241,161, 262,182],
			isTaken: false,
		},

		clayPot: {
			isDoodad: true, // is object that can be interacted with but not taken
			description: "There's strange writing on the surface. Who knows if it would be useful...",
			coords: [86,285, 143,355],
		},

		door01: {
			description: "A strong wooden door with a ring hold and a keyhole.",
			onOpenMessage: "The door opens wide and a short chilly breeze blows through you.. ",
			coords: [360,128, 425,240],	
			isDoor: 	true,
			isOpen:  	false,
			doorKey: 	null,
			nextRoom: 	"Room02",
			openImg: 	"img/room1/door01-open.png",
			closedImg: 	"img/room1/door01-closed.png",
			drawCoords: [320, 93]

		},
	},
}

Room02 = {
	description: "You walk through the door and immediately feel a menacing presence. The air feels as if it's full of static electricity and it's ice cold in here...",

	allItems: {
		creeper: {
			isCreature: true,
			description: "a creeper creeps around a doorway...",
			coords: [419,263, 454,375],
		},

		table: {
			description: "You examine the wooden table... You find a screwdriver taped to the underside.",
			coords: [58,328, 201,475],
		},

		greenSplatter: {
			description: "A green fluid has splattered across the floor and on the wall... It seems to pulsate...",
			coords: [562,444, 630,594],
		},

		door01: {
			description: " Wooden door stands at the far end of the room. The creeper keeps you from approaching with it's frightening presence.",
			coords: [ 218, 225, 276, 339],
			isOpen: false,
		},

		farOpening: {
			description: "The doorway is guarded by a dark entity sporting a menacing pair of red eyes... It just stares at you, freezing you in your tracks.",
			coords: [ 386, 214, 444, 399],
			isOpen: false,

		},

		nearOpening: {
			description: "This doorway is free of creeping entities. It looks like to safest way forward...",
			coords: [ 612, 198, 656, 544],
			isOpen: true,
		},


	}

}


let playerInventory = [];


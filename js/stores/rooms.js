
let sceneRooms = {}

let room_01 = {
	name: "Dank Entry",
	
	idleObjects: {
		stone: {},
		scroll: {},
		pottery: {}
	},

	roomDoors: {
		door_01: {
			isSecret: false,
			isLocked: true,
			doorKey: "simple key",
			transport: "room-02",
		},
		door_02: {
			isSecret: true,
			isLocked: true,
			doorKey: "simple key",
			transport: "room-03",

		}, 
	}
}

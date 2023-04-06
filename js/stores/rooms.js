const rooms = {
  Room01: {
    description: " ",
    drawRoom: function() {
        context.drawImage(firstRoomPic, 0,0, canvas.width,canvas.height);

        if (rooms.Room01.allItems.door01.isOpen) {
            context.drawImage(room1_door1_openPic, 332,92);
        }
      },

    allItems: {
      stone01: {
        isTool: true,
        toolName: "stone",
        description:
          "A stone small enough to pocket, but large enough to be useful.",
        coords: [319, 281, 336, 294],
        isTaken: false,
      },

      stone02: {
        isTool: true,
        toolName: "stone",
        description:
          "A stone small enough to pocket, but large enough to be useful.",
        coords: [241, 325, 264, 349],
        isTaken: false,
      },

      torch01: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        coords: [524, 162, 557, 182],
        isTaken: false,
      },

      torch02: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        coords: [241, 161, 262, 182],
        isTaken: false,
      },

      clayPot: {
        isDoodad: true, // is object that can be interacted with but not taken
        description:
          "There's strange writing on the surface. Who knows if it would be useful...",
        coords: [79, 255, 149, 357],
      },

      door01: {
        description: "A strong wooden door with a ring hold and a keyhole.",
        onOpenMessage:
          "The door opens wide and a short chilly breeze blows through you.. ",
        coords: [360, 128, 425, 240],
        isDoor: true,
        isOpen: false,
        doorKey: null,
        nextRoom: "Room02",
        openImg: "img/room1/door01-open.png",
        closedImg: "img/room1/door01-closed.png",
        drawCoords: [320, 93],
      },
    },
  },

  Room02: {
    description: "You walk through the door and immediately feel a menacing presence. The air feels as if it's full of static electricity and it's ice cold in here...",
    drawRoom: function() {
      context.drawImage(room2Pic, 0,0, canvas.width,canvas.height);
    },

    allItems: {
      creeper: {
        isCreature: true,
        description: "a creeper creeps around a doorway...",
        coords: [422, 114, 456, 213],
      },

      torch01: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        coords: [462, 161, 491, 191],
        isTaken: false,
      },

      torch02: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        coords: [675, 215, 728, 265],
        isTaken: false,
      },

      greenSplatter: {
        isDoodad: true,
        description:
          "A green fluid has splattered across the floor and on the wall... It seems to pulsate...",
        coords: [485, 330, 652, 418],
      },

      door01: {
        description:
          " Wooden door stands at the far end of the room. The creeper keeps you from approaching with it's frightening presence.",
        onOpenMessage: "...",
        coords: [285, 102, 310, 162],
        isDoor: true,
        isOpen: false,
        doorKey: null,
        nextRoom: "none",
        openImg: " ",
        closedImg: " ",
        drawCoords: [0, 0],
      },

      door02: {
        description:
          "The doorway is guarded by a dark entity sporting a menacing pair of red eyes... It just stares at you, freezing you in your tracks.",
        onOpenMessage: "...",
        coords: [400, 100, 439, 219],
        isDoor: true,
        isOpen: false,
        doorKey: null,
        nextRoom: "none",
        openImg: " ",
        closedImg: " ",
        drawCoords: [0, 0],
      },

      door03: {
        description:
          "This doorway is free of creeping entities. It looks like to safest way forward...",
        onOpenMessage: "...",
        coords: [572, 114, 647, 345],
        isDoor: true,
        isOpen: false,
        doorKey: null,
        nextRoom: "none",
        openImg: " ",
        closedImg: " ",
        drawCoords: [0, 0],
      },
    },
  },
};

const playerInventory = [];

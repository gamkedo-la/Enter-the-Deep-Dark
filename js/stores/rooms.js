const roomNameList = ["Room01","Room02","Kitchen","PitRoom","StorageRoom","Atrium"];
const rooms = {
  Room01: {
    description: "It's midnight. You stand outside a huge stone fortress. There is a wooden door in the stone wall, dimly lit by burning torches. Rocks and a clay pot are strewn on the nearby shore.",
    drawRoom: function() {

      context.drawImage(room1Pic, 0,0, canvas.width,canvas.height);

      if (rooms.Room01.allItems.door01.isOpen) {
          context.drawImage(room1_door1_openPic, 332,92);
      }

      let listOfItems = Object.keys(rooms.Room01.allItems);


      for( i = 0; i < listOfItems.length; i++) {
        let givenItem = rooms.Room01.allItems[listOfItems[i]];



          if (givenItem.hasOwnProperty('isTaken') && givenItem.isTaken === false &&
          givenItem.hasOwnProperty('isHidden') && givenItem.isHidden !== true ||
          givenItem.hasOwnProperty('isDoodad') && givenItem.altState === false ) 
          {

            context.drawImage(givenItem.picVar, givenItem.drawCoords[0], givenItem.drawCoords[1]);
          }

          // if (givenItem.hasOwnProperty('isHidden') && givenItem.isHidden !== true ) {
          //   context.drawImage(givenItem.picVar, givenItem.drawCoords[0], givenItem.drawCoords[1]);
          // } 

        // if (rooms.Room01.allItems[listOfItems[i]].hasOwnProperty('isTaken') && rooms.Room01.allItems[listOfItems[i]].isTaken === false) {
        //   context.drawImage(rooms.Room01.allItems[listOfItems[i]].picVar, rooms.Room01.allItems[listOfItems[i]].coords[0],rooms.Room01.allItems[listOfItems[i]].coords[1]);
        // }
      }


    },

    allItems: {
      stone01: {
        isTool: true,
        toolName: "stone",
        description:
          "A stone small enough to pocket, but large enough to be useful.",
        picVar: room1_stone1Pic,
        drawCoords: [236, 320 ], 
        coords: [233, 321, 272, 357],
        isTaken: false,
        isHidden: false,
      },

      stone02: {
        isTool: true,
        toolName: "stone",
        description:
          "A stone small enough to pocket, but large enough to be useful.",
        picVar: room1_stone2Pic,
        drawCoords: [316, 280 ],
        coords: [313, 277, 339, 304],
        isTaken: false,
        isHidden: false,
      },

      stone03: {
        isTool: true,
        toolName: "stone",
        description:
          "A stone small enough to pocket, but large enough to be useful.",
        picVar: room1_stone3Pic,
        drawCoords: [540, 332 ],
        coords: [540, 329, 570, 353],
        isTaken: false,
        isHidden: false,
      },

      torch01: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        picVar: room1_torch1Pic,
        drawCoords: [224, 120 ],
        coords: [234, 145, 268, 187],
        isTaken: false,
        isHidden: false,
      },

      torch02: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        picVar: room1_torch2Pic,
        drawCoords: [520, 116 ],
        coords: [520, 144, 560, 187],
        isTaken: false,
        isHidden: false,
      },

      key: {
        isTool: true, // is object that can be taken
        toolName: "key", // as listed in the inventory (no spaces allowed)
        description:
          "There's a key shimmering in the shattered pot remains...",
        picVar: room1_keyPic,
        drawCoords: [100, 324 ],
        coords: [100, 340, 128, 357],
        isTaken: false,
        isHidden: true,
      },

      clayPot: {
        name: "clay pot",
        isDoodad: true, // is object that can be interacted with but not taken
        description:
          "A clay pot. There's strange writing on the surface, and it looks like there's something shining inside...",
        contains: "key",
        key: "hit",
        altState: false,
        picVar: room1_clayPotPic,
        // altPicVar: null,
        drawCoords: [40, 212 ],
        coords: [79, 255, 149, 357],
      },

      door01: {
        name: "wooden door",
        description: "...",
        onOpenMessage: "...",
        coords: [360, 128, 425, 240],
        isDoor: true,
        isOpen: false,
        isLocked: true,
        doorKey: "key",
        nextRoom: "Room02",
        openImg: "img/room1/door01-open.png",
        drawCoords: [320, 93],

        messages: {
          onExamine: "A strong wooden door with a ring hold and a keyhole.",
          onOpen: "The door opens wide and a short chilly breeze blows through you...",
          cannotOpen: "You try, like a dummy, to open the door, but it's locked.",
          onClose: "You slam the door shut!",
          onUnlock: "The door is unlocked.",
        },

      },
    },
  },

  Room02: {
    description: "You walk through the door and immediately feel a menacing presence. The air feels as if it's full of static electricity and it's ice cold in here...",
    drawRoom: function() {

      context.drawImage(hallwayPic, 0,0, canvas.width,canvas.height);

        let listOfItems = Object.keys(rooms.Room02.allItems);

        for( i = 0; i < listOfItems.length; i++) {
          let givenItem = rooms.Room02.allItems[listOfItems[i]];


          if (givenItem.isDoor && givenItem.isOpen === true) {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0],givenItem.drawCoords[1]) ;
          }

          if (givenItem.hasOwnProperty('isTaken') && givenItem.isTaken === false &&
            givenItem.hasOwnProperty('isHidden') && givenItem.isHidden !== true ||
            givenItem.hasOwnProperty('isDoodad') && givenItem.hasOwnProperty('drawCoords') ||
            givenItem.isCreature ) 
          {

            context.drawImage(givenItem.picVar, givenItem.drawCoords[0], givenItem.drawCoords[1]);
          }
        }
    },

    allItems: {

      torch01: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        coords: [462, 161, 491, 191],
        isTaken: false,
        isHidden: false,
        picVar: hallway_torch1Pic,
        drawCoords: [452, 152],
      },

      torch02: {
        isTool: true,
        toolName: "torch",
        description: "A torch lights the room, maybe you should take it.",
        coords: [675, 215, 728, 265],
        isTaken: false,
        isHidden: false,
        picVar: hallway_torch2Pic,
        drawCoords: [676, 212],
      },

      greenSplatter: {
        name: "green splatter",
        isDoodad: true,
        description:
          "A green fluid has splattered across the floor and on the wall... It seems to pulsate...",
        coords: [485, 330, 652, 418],
      },

      door01: {
        name: "wooden door",
        description:
          " Wooden door stands at the far end of the room. The creeper keeps you from approaching with it's frightening presence.",
        onOpenMessage: "...",
        coords: [285, 102, 310, 162],
        isDoor: true,
        isOpen: false,
        isLocked: false,
        doorKey: null,
        obstacle: "creeper",
        nextRoom: "Atrium",
        picVar: hallway_door1_openPic,
        drawCoords: [280, 100],
      },

      door02: {
        name: "dark door",
        description:
          "The doorway is guarded by a dark entity sporting a menacing pair of red eyes... It just stares at you, freezing you in your tracks.",
        onOpenMessage: "...",
        coords: [400, 100, 439, 219],
        isDoor: true,
        isOpen: false,
        isLocked: false,
        doorKey: null,
        obstacle: "creeper",
        nextRoom: "StorageRoom",
        picVar: hallway_door2_openPic,
        drawCoords: [384, 92],
      },

      door03: {
        name: "safe door",
        description:
          "This doorway is free of creeping entities. It looks like to safest way forward...",
        onOpenMessage: "...",
        coords: [572, 114, 647, 345],
        isDoor: true,
        isOpen: false,
        isLocked: false,
        doorKey: null,
        obstacle: null,
        nextRoom: "Kitchen",
        picVar: hallway_door3_openPic,
        drawCoords: [552, 96],
      },

      creeper: {
        name: "creeper",
        isCreature: true,
        description: "a creeper creeps around a doorway...",
        defeatKey: "creeper_begone", // was "torch" but torches vanish/burn when used, made this up to test
        coords: [422, 114, 456, 213],
        picVar: hallway_creeperPic,
        drawCoords: [420, 92],
      },

    },
  },

  Kitchen: {
    drawRoom: function () {
      context.drawImage(kitchenPic, 0,0, canvas.width,canvas.height);
        let listOfItems = Object.keys(rooms.Kitchen.allItems);

        for( i = 0; i < listOfItems.length; i++) {
          let givenItem = rooms.Kitchen.allItems[listOfItems[i]];

          if (givenItem.isDoor && givenItem.isOpen === true) {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0],givenItem.drawCoords[1]) ;
          }

          if (givenItem.hasOwnProperty('isTaken') && givenItem.isTaken === false &&
            givenItem.hasOwnProperty('isHidden') && givenItem.isHidden !== true ||
            givenItem.hasOwnProperty('isDoodad') && givenItem.hasOwnProperty('drawCoords') ||
            givenItem.isCreature ) 
          {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0], givenItem.drawCoords[1]);
          }
        }
    },

    allItems: {

      

      door01: {
        name: "door",
        description:
          "This doorway is a way forward...",
        onOpenMessage: "...",
        coords: [518, 60, 590, 176], // topLeftX, topLeftY, topLeftX+width, topLeftY+height
        isDoor: true,
        isOpen: false,
        isLocked: false,
        doorKey: null,
        obstacle: "goblin1",
        nextRoom: "PitRoom",
        picVar: kitchen_door1_openPic,
        drawCoords: [518, 60],
      },

      goblin1: {
        name: "goblin",
        isCreature: true,
        description: "That's totally a Goblin.",
        defeatKey: "stone",
        coords: [248, 56, 388, 345],
        picVar: kitchen_goblin1Pic,
        drawCoords: [248, 56],
      },

      goblin2: {
        name: "goblin",
        isCreature: true,
        description: "That's totally a Goblin.",
        defeatKey: "stone",
        coords: [544, 96, 688, 385],
        picVar: kitchen_goblin2Pic,
        drawCoords: [544, 96],
      },

    },

  },

  PitRoom: {
    drawRoom: function () {
      context.drawImage(disposalPitPic, 0,0, canvas.width,canvas.height);
        let listOfItems = Object.keys(rooms.PitRoom.allItems);

        for( i = 0; i < listOfItems.length; i++) {
          let givenItem = rooms.PitRoom.allItems[listOfItems[i]];

          if (givenItem.isDoor && givenItem.isOpen === true) {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0],givenItem.drawCoords[1]) ;
          }

          if (givenItem.hasOwnProperty('isTaken') && givenItem.isTaken === false &&
            givenItem.hasOwnProperty('isHidden') && givenItem.isHidden !== true ||
            givenItem.hasOwnProperty('isDoodad') && givenItem.hasOwnProperty('drawCoords') ||
            givenItem.isCreature ) 
          {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0], givenItem.drawCoords[1]);
          }
        }
    },

    allItems: {


    },

  },

  StorageRoom: {
    drawRoom: function () {
      context.drawImage(storageRoomPic, 0,0, canvas.width,canvas.height);
        let listOfItems = Object.keys(rooms.StorageRoom.allItems);

        for( i = 0; i < listOfItems.length; i++) {
          let givenItem = rooms.StorageRoom.allItems[listOfItems[i]];

          if (givenItem.isDoor && givenItem.isOpen === true) {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0],givenItem.drawCoords[1]) ;
          }

          if (givenItem.hasOwnProperty('isTaken') && givenItem.isTaken === false &&
            givenItem.hasOwnProperty('isHidden') && givenItem.isHidden !== true ||
            givenItem.hasOwnProperty('isDoodad') && givenItem.hasOwnProperty('drawCoords') ||
            givenItem.isCreature ) 
          {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0], givenItem.drawCoords[1]);
          }
        }
    },

    allItems: {



    },

  },

  Atrium: {
    drawRoom: function () {
      context.drawImage(atriumPic, 0,0, canvas.width,canvas.height);
        let listOfItems = Object.keys(rooms.Atrium.allItems);

        for( i = 0; i < listOfItems.length; i++) {
          let givenItem = rooms.Atrium.allItems[listOfItems[i]];

          if (givenItem.isDoor && givenItem.isOpen === true) {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0],givenItem.drawCoords[1]) ;
          }

          if (givenItem.hasOwnProperty('isTaken') && givenItem.isTaken === false &&
            givenItem.hasOwnProperty('isHidden') && givenItem.isHidden !== true ||
            givenItem.hasOwnProperty('isDoodad') && givenItem.hasOwnProperty('drawCoords') ||
            givenItem.isCreature ) 
          {
            context.drawImage(givenItem.picVar, givenItem.drawCoords[0], givenItem.drawCoords[1]);
          }
        }
    },

    allItems: {

      

    },

  },



};

const playerInventory = [];

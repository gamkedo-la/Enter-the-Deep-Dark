const rooms = {
  Room01: {
    description: " ",
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
          givenItem.hasOwnProperty('isDoodad') ) 
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
        toolName: "stone1",
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
        toolName: "stone2",
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
        isTool: true, // is object that can be interacted with but not taken
        description:
          "There's a key shimmering in the shattered pot remains...",
        picVar: room1_keyPic,
        drawCoords: [100, 324 ],
        coords: [100, 340, 128, 357],
        isTaken: false,
        isHidden: true,
      },

      clayPot: {
        isDoodad: true, // is object that can be interacted with but not taken
        description:
          "There's strange writing on the surface. Who knows if it would be useful...",
        picVar: room1_clayPotPic,
        drawCoords: [40, 212 ],
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
        drawCoords: [320, 93],
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
        nextRoom: null,
        picVar: hallway_door1_openPic,
        drawCoords: [280, 100],
      },

      door02: {
        description:
          "The doorway is guarded by a dark entity sporting a menacing pair of red eyes... It just stares at you, freezing you in your tracks.",
        onOpenMessage: "...",
        coords: [400, 100, 439, 219],
        isDoor: true,
        isOpen: false,
        doorKey: null,
        nextRoom: null,
        picVar: hallway_door2_openPic,
        drawCoords: [384, 92],
      },

      door03: {
        description:
          "This doorway is free of creeping entities. It looks like to safest way forward...",
        onOpenMessage: "...",
        coords: [572, 114, 647, 345],
        isDoor: true,
        isOpen: false,
        doorKey: null,
        nextRoom: null,
        picVar: hallway_door3_openPic,
        drawCoords: [552, 96],
      },

      creeper: {
        isCreature: true,
        description: "a creeper creeps around a doorway...",
        coords: [422, 114, 456, 213],
        picVar: hallway_creeperPic,
        drawCoords: [420, 92],
      },

    },
  },

  Kitchen: {
    draw: function () {
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


    },

  },

  PitRoom: {
    draw: function () {
      context.drawImage(pitRoomPic, 0,0, canvas.width,canvas.height);
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
    draw: function () {
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



};

const playerInventory = [];

// var innerWidth = window.innerWidth;
// var innerHeight = window.innerHeight;
// var gameRatio = innerWidth/innerHeight;	
// var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.AUTO);

// Initialize Phaser, and creates a 400x490px game
// var game = new Phaser.Game(889, 500, Phaser.AUTO, 'gameDiv');

var restartButton;
var gameAlive = true;
var pipe;
var pipesTime = 2927;
var score;
var verticalSprite;
var build;
var skip = 0;
var count = 0;
var continuousCount = 0;
var my_media;
var audioPlaying;
var planeAudio;
var level = 0;
var scoreAdded = 0;
var HitAdded = 0;
var reverseLayout = false;
var balloonReversed = 0;
var countBalloon = 0;
var pauseBackground = false;

var playAudio = function(audioID) {
	
	var audioElement = document.getElementById(audioID);
	var url = audioElement.getAttribute('src');
	
	var loop = function (status) {
		if (status === Media.MEDIA_STOPPED && gameAlive === true) {
			my_media.play();
		}
	};
	
	if (audioID === "Plane"){
		my_media = new Media(url, null, null, loop); 
	}
	else{
		my_media = new Media(url, null, null); 
	}
	
		   // // // Play audio
	 my_media.play();
	// // $("#Plane").on("ended", playAudio("Plane"));
}


var home = function(game){}
// Creates a new 'main' state that will contain the game
   home.prototype = {
		// Function called first to load all the assets
		preload: function() { 
			// Change the background color of the game	

			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("slice1a", "assets/slice1a.png");
			game.load.image("slice1b", "assets/slice1b.png");
			game.load.image("slice1c", "assets/slice1c.png");
			game.load.image("slice1d", "assets/slice1d.png");
			
			game.load.image("slice2a", "assets/slice2a.png");
			game.load.image("slice2b", "assets/slice2b.png");
			game.load.image("slice2c", "assets/slice2c.png");
			game.load.image("slice2d", "assets/slice2d.png");
			
			game.load.image("slice3", "assets/slice3.png");
			
			game.load.image("slice4a", "assets/slice4a.png");
			game.load.image("slice4b", "assets/slice4b.png");
			game.load.image("slice4c", "assets/slice4c.png");
			game.load.image("slice4d", "assets/slice4d.png");
			
			game.load.image("slice5a", "assets/slice5a.png");
			game.load.image("slice5b", "assets/slice5b.png");
			game.load.image("slice5c", "assets/slice5c.png");
			game.load.image("slice5d", "assets/slice5d.png");
			
			game.load.image("reverseObject", "assets/reverseObject.png");
			game.load.image("extraPoints", "assets/extraPoints.png");
			//game.load.image("pipe2", "assets/brownBalloon.png");
			game.load.image("explosion", "assets/explosion.png");
			//game.load.spritesheet('explosionSprite', 'assets/explosionSprite.png', 86, 65, 13);
		},

		// Fuction called after 'preload' to setup the game 
		create: function() { 	
			
			layer1 = game.add.sprite(0, 0, 'layer1');
			layer1_dup = game.add.sprite(900, 0, 'layer1');
			
			layer3 = game.add.sprite(0, 0, 'layer3');
			layer3_dup = game.add.sprite(1000, 0, 'layer3');
			
			layer2 = game.add.sprite(0, 0, 'layer2');
			layer2_dup = game.add.sprite(980, 0, 'layer2');
			
			// background2 = game.add.sprite(980, 0, 'background2');
			// background2_dup = game.add.sprite(1960, 0, 'background2');
			
			layer6 = game.add.sprite(0, 0, 'layer6');
			layer6_dup = game.add.sprite(1030, 0, 'layer6');
			
			createBalloonGroup();

			building3 = game.add.sprite(1289, 200, 'buildingSprites',2);
			game.physics.arcade.enable(building3);
			building3.giveScore = true;
			building3.anchor.set(0.5,0.5);
			
			building4 = game.add.sprite(1289, 200, 'buildingSprites',3);
			game.physics.arcade.enable(building4);
			building4.giveScore = true;
			building4.anchor.set(0.5,0.5);
			
			building5 = game.add.sprite(1289, 200, 'buildingSprites',4);
			game.physics.arcade.enable(building5);
			building5.giveScore = true;
			building5.anchor.set(0.5,0.5);
			
			building6 = game.add.sprite(1289, 200, 'buildingSprites',5);
			game.physics.arcade.enable(building6);
			building6.giveScore = true;
			building6.anchor.set(0.5,0.5);
				
			extraPoints = game.add.group();
			extraPoints.enableBody = true;
			extraPoints.createMultiple(5, 'extraPoints');
			
			reverseObjects = game.add.group();
			reverseObjects.enableBody = true;
			reverseObjects.createMultiple(5, 'reverseObject');
			
			// reverseObjectImg = game.add.sprite(989,250,'reverseObject');
		// game.physics.arcade.enable(reverseObjectImg);
			
			// Set the physics system
			game.physics.startSystem(Phaser.Physics.ARCADE);

			// Display the player on the screen
			player = game.add.sprite(250, 100, 'player');
			player.width = 80;
			player.anchor.set(0.5,0.5);
			
			// Add gravity to the player to make it fall
			game.physics.arcade.enable(player);
			// // // // // player.body.gravity.y = 800; 

			// // // // // game.input.onDown.add(jump, this);

			// Timer that calls 'addRowOfPipes' ever 2 seconds 
			timer = game.time.events.loop(pipesTime, addObstacles, this);  
			
			timer = game.time.events.loop(3967, addFloorsOfBuilding, this);
			
			timer = game.time.events.loop(5000, addReverseObject, this);
			
			score = 0;
			functionCalled = 0;
			
			//timer = game.time.events.loop(3000, changeBackground, this); 
			
			//timer = game.time.events.loop(3000, addObjects, this); 
			playAudio("Plane");
			//timer = game.time.events.loop(15000, playPlaneSound, this);  
			
			topScore = localStorage.getItem("topScore")==null?0:localStorage.getItem("topScore");
			scoreText = game.add.text(10,10,"-",{
				font:"bold 16px Arial", fill: "#ffffff" 
			});
			
			//layout();
			
			//player.animations.add("explode",'player',30,true);
			updateScore();

		},

		// This function is called 60 times per second
		update: function() {
			moveBackground(layer2,layer3,layer6);
			moveBackground(layer2_dup,layer3_dup,layer6_dup);
			
			// If the player is out of the world (too high or too low), call the 'restartGame' function
			if (player.inWorld == false){
				gameOver(); 
			}
			
			// If the player overlap any pipes, call 'gameOver'
			game.physics.arcade.overlap(player, part1as, gameOver, null, this);
			game.physics.arcade.overlap(player, part1bs, gameOver, null, this);
			game.physics.arcade.overlap(player, part1cs, gameOver, null, this);
			game.physics.arcade.overlap(player, part1ds, gameOver, null, this);
			
			game.physics.arcade.overlap(player, part2as, gameOver, null, this);
			game.physics.arcade.overlap(player, part2bs, gameOver, null, this);
			game.physics.arcade.overlap(player, part2cs, gameOver, null, this);
			game.physics.arcade.overlap(player, part2ds, gameOver, null, this);
			
			game.physics.arcade.overlap(player, part3s, gameOver, null, this);
			
			game.physics.arcade.overlap(player, part4as, gameOver, null, this);
			game.physics.arcade.overlap(player, part4bs, gameOver, null, this);
			game.physics.arcade.overlap(player, part4cs, gameOver, null, this);
			game.physics.arcade.overlap(player, part4ds, gameOver, null, this);
			
			game.physics.arcade.overlap(player, part5as, gameOver, null, this);
			game.physics.arcade.overlap(player, part5bs, gameOver, null, this);
			game.physics.arcade.overlap(player, part5cs, gameOver, null, this);
			game.physics.arcade.overlap(player, part5ds, gameOver, null, this);

			// // game.physics.arcade.overlap(player, pipes2, gameOver, null, this); 
			
			// // game.physics.arcade.overlap(player, pipes3, gameOver, null, this); 
			
			game.physics.arcade.overlap(player, reverseObjects, setReverseLayout, null, this); 
			
			game.physics.arcade.overlap(player, building3, gameOver, null, this); 
			
			game.physics.arcade.overlap(player, building4, gameOver, null, this); 
			
			game.physics.arcade.overlap(player, building5, gameOver, null, this); 
			
			game.physics.arcade.overlap(player, building6, gameOver, null, this); 
		
			// // // reverseGravityCheck();
		
			// // // If the player overlap any flying objects, call 'addScore'
			game.physics.arcade.overlap(player, extraPoints, addScore, null, this);
			
			computeScore();
			layout();
		}
   }
   
   function layout(){
	   if (gameAlive === true){
		   if (pauseBackground === false){
			    if (reverseLayout === false){
				   player.body.gravity.y = 800; 
				   game.input.onDown.add(jump, this);
			   }
			   else{
				   player.body.gravity.y = -800; 
				   game.input.onDown.add(jump, this);
			   }
		   }
		   else{
			   player.body.gravity.y = 0; 
		   }
		  
	   }
	   else{
		    player.body.gravity.y = 0; 
			player.body.velocity.y = 0; 
	   }
	  
   }
   
   function moveBackground(layer2,layer3,layer6){
	   if (pauseBackground === false){
		    if (layer2.x < -980){
				layer2.x = 980;	
				layer2.x -= 3;
			}
			else{
				layer2.x -= 3;
			}
			if (layer3.x < -1000){
				layer3.x = 1000;	
				layer3.x -= 2;
			}
			else{
				layer3.x -= 2;
			}
			if (layer6.x < -980){
				layer6.x = 980;	
				layer6.x -= 1;
			}
			else{
				layer6.x -= 1;
			}
	   }
	  else{
		   if (layer2.x < -980){
			layer2.x = 980;	
			layer2.x -= 0;
		}
		else{
			layer2.x -= 0;
		}
		if (layer3.x < -1000){
			layer3.x = 1000;	
			layer3.x -= 0;
		}
		else{
			layer3.x -= 0;
		}
		if (layer6.x < -980){
			layer6.x = 980;	
			layer6.x -= 0;
		}
		else{
			layer6.x -= 0;
		}
	  }
			
   }
   
   function setInWorldObjectReverse(){
	   if (reverseLayout === true){
		   if (building3.inWorld === true){
				buildingX = building3.x;
				buildingY = building3.y;
				building3.reset(buildingX,(140-(233/2)));
				building3.angle = -180;
				building3.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building3.body.velocity.x = -200;
			}
			if (building4.inWorld === true){
				buildingX = building4.x;
				buildingY = building4.y;
				building4.reset(buildingX,(171-(233/2)));
				building4.angle = -180;
				building4.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building4.body.velocity.x = -200;
			}
			if (building5.inWorld === true){
				buildingX = building5.x;
				buildingY = building5.y;
				building5.reset(buildingX,(201-(233/2)));
				building5.angle = -180;
				building5.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building5.body.velocity.x = -200;
			}
			if (building6.inWorld === true){
				buildingX = building6.x;
				buildingY = building6.y;
				building6.reset(buildingX,(233-(233/2)));
				building6.angle = -180;
				building6.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building6.body.velocity.x = -200;
			}		
			player.anchor.setTo(1,0.5);
			player.scale.y = -1;
	   }
	   else{
		   if (building3.inWorld === true){
				buildingX = building3.x;
				buildingY = building3.y;
				building3.reset(buildingX,(450-(110-(233/2))));
				building3.angle = 0;
				building3.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building3.body.velocity.x = -200;
			}
			if (building4.inWorld === true){
				buildingX = building4.x;
				buildingY = building4.y;
				building4.reset(buildingX,(450-(141-(233/2))));
				building4.angle = 0;
				building4.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building4.body.velocity.x = -200;
			}
			if (building5.inWorld === true){
				buildingX = building5.x;
				buildingY = building5.y;
				building5.reset(buildingX,(450-(171-(233/2))));
				building5.angle = 0;
				building5.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building5.body.velocity.x = -200;
			}
			if (building6.inWorld === true){
				buildingX = building6.x;
				buildingY = building6.y;
				building6.reset(buildingX,(450-(203-(233/2))));
				building6.angle = 0;
				building6.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
				building6.body.velocity.x = -200;
			}
			player.anchor.setTo(1,0.5);
			player.scale.y = 1;
	   }
   }
   
   function killPrevBalloon(x,part){
	   part.kill();
	   if (x < 800){
			for (var j = 0; j<part1bs.children.length; j++){
			   if ((part1as.children[j].x > x - 30) && (part1as.children[j].x < x + 30)){
				   part1as.children[j].kill();
			   }
			   if ((part1bs.children[j].x > x - 30) && (part1bs.children[j].x < x + 30)){
				   part1bs.children[j].kill();
			   }
			   if ((part1cs.children[j].x > x - 30) && (part1cs.children[j].x < x + 30)){
				   part1cs.children[j].kill();
			   }
			   if ((part1ds.children[j].x > x - 30) && (part1ds.children[j].x < x + 30)){
				   part1ds.children[j].kill();
			   }
			   if ((part2as.children[j].x > x - 30) && (part2as.children[j].x < x + 30)){
				   part2as.children[j].kill();
			   }
			   if ((part2bs.children[j].x > x - 30) || (part2bs.children[j].x < x + 30)){
				   part2bs.children[j].kill();
			   }
			   if ((part2cs.children[j].x > x - 30) || (part2cs.children[j].x < x + 30)){
				   part2cs.children[j].kill();
			   }
			   if ((part2ds.children[j].x > x - 30) || (part2ds.children[j].x < x + 30)){
				   part2ds.children[j].kill();
			   }
			   if ((part3s.children[j].x > x - 30) || (part3s.children[j].x < x + 30)){
				   part3s.children[j].kill();
			   }
			   if ((part4as.children[j].x > x - 30) || (part4as.children[j].x < x + 30)){
				   part4as.children[j].kill();
			   }
			   if ((part4bs.children[j].x > x - 30) || (part4bs.children[j].x < x + 30)){
				   part4bs.children[j].kill();
			   }
			   if ((part4cs.children[j].x > x - 30) || (part4cs.children[j].x < x + 30)){
				   part4cs.children[j].kill();
			   }
			   if ((part4ds.children[j].x > x - 30) || (part4ds.children[j].x < x + 30)){
				   part4ds.children[j].kill();
			   }
			   if ((part5as.children[j].x > x - 30) || (part5as.children[j].x < x + 30)){
				   part5as.children[j].kill();
			   }
			   if ((part5bs.children[j].x > x - 30) || (part5bs.children[j].x < x + 30)){
				   part5bs.children[j].kill();
			   }
			   if ((part5cs.children[j].x > x - 30) || (part5cs.children[j].x < x + 30)){
				   part5cs.children[j].kill();
			   }
			   if ((part5ds.children[j].x > x - 30) || (part5ds.children[j].x < x + 30)){
				   part5ds.children[j].kill();
			   }
		   }
	   }
	   
   }
   
   function balloonsOnReverse(){
	   part5ds.forEach(function(part5d){
				if (part5d.reversed === false){
					for (var i=0;i<part1as.children.length;i++){
						if (part1as.children[i].x > 0 && part1as.children[i].x < 989){
							x = part1as.children[i].x;
							killPrevBalloon(x,part1as.children[i]);
							x = part1as.children[i].x + 27;
							y = part1as.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1bs.children.length;i++){
						if (part1bs.children[i].x > 0 && part1bs.children[i].x < 989){
							x = part1bs.children[i].x;
							killPrevBalloon(x,part1bs.children[i]);
							x = part1bs.children[i].x + 24;
							y = part1bs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1cs.children.length;i++){
						if (part1cs.children[i].x > 0 && part1cs.children[i].x < 989){
							x = part1cs.children[i].x;
							killPrevBalloon(x,part1cs.children[i]);
							x = part1cs.children[i].x + 21;
							y = part1cs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1ds.children.length;i++){
						if (part1ds.children[i].x > 0 && part1ds.children[i].x < 989){
							x = part1ds.children[i].x;
							killPrevBalloon(x,part1ds.children[i]);
							x = part1ds.children[i].x + 18;
							y = part1ds.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2as.children.length;i++){
						if (part2as.children[i].x > 0 && part2as.children[i].x < 989){
							x = part2as.children[i].x;
							killPrevBalloon(x,part2as.children[i]);
							x = part2as.children[i].x + 15;
							y = part2as.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2bs.children.length;i++){
						if (part2bs.children[i].x > 0 && part2bs.children[i].x < 989){
							x = part2bs.children[i].x;
							killPrevBalloon(x,part2bs.children[i]);
							x = part2bs.children[i].x + 12;
							y = part2bs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2cs.children.length;i++){
						if (part2cs.children[i].x > 0 && part2cs.children[i].x < 989){
							x = part2cs.children[i].x;
							killPrevBalloon(x,part2cs.children[i]);
							x = part2cs.children[i].x + 9;
							y = part2cs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2ds.children.length;i++){
						if (part2ds.children[i].x > 0 && part2ds.children[i].x < 989){
							x = part2ds.children[i].x;
							killPrevBalloon(x,part2ds.children[i]);
							x = part2ds.children[i].x + 6;
							y = part2ds.children[i].y + 10;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part3s.children.length;i++){
						if (part3s.children[i].x > 0 && part3s.children[i].x < 989){
							x = part3s.children[i].x;
							killPrevBalloon(x,part3s.children[i]);
							x = part3s.children[i].x;
							y = part3s.children[i].y;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part4as.children.length;i++){
						if (part4as.children[i].x > 0 && part4as.children[i].x < 989){
							x = part4as.children[i].x;
							killPrevBalloon(x,part4as.children[i]);
							x = part4as.children[i].x - 6;
							y = part4as.children[i].y + 10;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1bs.children.length;i++){
						if (part4bs.children[i].x > 0 && part4bs.children[i].x < 989){
							x = part4bs.children[i].x;
							killPrevBalloon(x,part4bs.children[i]);
							x = part4bs.children[i].x -9;
							y = part4bs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part4cs.children.length;i++){
						if (part4cs.children[i].x > 0 && part4cs.children[i].x < 989){
							x = part4cs.children[i].x;
							killPrevBalloon(x,part4cs.children[i]);
							x = part4cs.children[i].x -12;
							y = part4cs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part4ds.children.length;i++){
						if (part4ds.children[i].x > 0 && part4ds.children[i].x < 989){
							x = part4ds.children[i].x;
							killPrevBalloon(x,part4ds.children[i]);
							x = part4ds.children[i].x - 15;
							y = part4ds.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5as.children.length;i++){
						if (part5as.children[i].x > 0 && part5as.children[i].x < 989){
							x = part5as.children[i].x;
							killPrevBalloon(x,part5as.children[i]);
							x = part5as.children[i].x - 18;
							y = part5as.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5bs.children.length;i++){
						if (part5bs.children[i].x > 0 && part5bs.children[i].x < 989){
							x = part5bs.children[i].x;
							killPrevBalloon(x,part5bs.children[i]);
							x = part5bs.children[i].x - 21;
							y = part5bs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5cs.children.length;i++){
						if (part5cs.children[i].x > 0 && part5cs.children[i].x < 989){
							x = part5cs.children[i].x;
							killPrevBalloon(x,part5cs.children[i]);
							x = part5cs.children[i].x - 24;
							y = part5cs.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5ds.children.length;i++){
						if (part5ds.children[i].x > 0 && part5ds.children[i].x < 989){
							x = part5ds.children[i].x;
							killPrevBalloon(x,part5ds.children[i]);
							x = part5ds.children[i].x - 27;
							y = part5ds.children[i].y + 12;
							createBalloonAngle(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setAngleTweenDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setAngleTweenUp();
							}
							setBalloonProperties();
						}
					}
				}
	   });
   }
   
   function balloonsOnNormal(){
	   part5ds.forEach(function(part5d){
				if (part5d.reversed === false){
					for (var i=0;i<part1as.children.length;i++){
						if (part1as.children[i].x > 0 && part1as.children[i].x < 989){
							x = part1as.children[i].x;
							killPrevBalloon(x,part1as.children[i]);
							x = part1as.children[i].x - 27;
							y = part1as.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1bs.children.length;i++){
						if (part1bs.children[i].x > 0 && part1bs.children[i].x < 989){
							x = part1bs.children[i].x;
							killPrevBalloon(x,part1bs.children[i]);
							x = part1bs.children[i].x - 24;
							y = part1bs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1cs.children.length;i++){
						if (part1cs.children[i].x > 0 && part1cs.children[i].x < 989){
							x = part1cs.children[i].x;
							killPrevBalloon(x,part1cs.children[i]);
							x = part1cs.children[i].x - 21;
							y = part1cs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1ds.children.length;i++){
						if (part1ds.children[i].x > 0 && part1ds.children[i].x < 989){
							x = part1ds.children[i].x;
							killPrevBalloon(x,part1ds.children[i]);
							x = part1ds.children[i].x - 18;
							y = part1ds.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2as.children.length;i++){
						if (part2as.children[i].x > 0 && part2as.children[i].x < 989){
							x = part2as.children[i].x;
							killPrevBalloon(x,part2as.children[i]);
							x = part2as.children[i].x - 15;
							y = part2as.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2bs.children.length;i++){
						if (part2bs.children[i].x > 0 && part2bs.children[i].x < 989){
							x = part2bs.children[i].x;
							killPrevBalloon(x,part2bs.children[i]);
							x = part2bs.children[i].x - 12;
							y = part2bs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2cs.children.length;i++){
						if (part2cs.children[i].x > 0 && part2cs.children[i].x < 989){
							x = part2cs.children[i].x;
							killPrevBalloon(x,part2cs.children[i]);
							x = part2cs.children[i].x - 9;
							y = part2cs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part2ds.children.length;i++){
						if (part2ds.children[i].x > 0 && part2ds.children[i].x < 989){
							x = part2ds.children[i].x;
							killPrevBalloon(x,part2ds.children[i]);
							x = part2ds.children[i].x - 6;
							y = part2ds.children[i].y - 10;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part3s.children.length;i++){
						if (part3s.children[i].x > 0 && part3s.children[i].x < 989){
							x = part3s.children[i].x;
							killPrevBalloon(x,part3s.children[i]);
							x = part3s.children[i].x;
							y = part3s.children[i].y;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part4as.children.length;i++){
						if (part4as.children[i].x > 0 && part4as.children[i].x < 989){
							x = part4as.children[i].x;
							killPrevBalloon(x,part4as.children[i]);
							x = part4as.children[i].x + 6;
							y = part4as.children[i].y - 10;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part1bs.children.length;i++){
						if (part4bs.children[i].x > 0 && part4bs.children[i].x < 989){
							x = part4bs.children[i].x;
							killPrevBalloon(x,part4bs.children[i]);
							x = part4bs.children[i].x + 9;
							y = part4bs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part4cs.children.length;i++){
						if (part4cs.children[i].x > 0 && part4cs.children[i].x < 989){
							x = part4cs.children[i].x;
							killPrevBalloon(x,part4cs.children[i]);
							x = part4cs.children[i].x +12;
							y = part4cs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part4ds.children.length;i++){
						if (part4ds.children[i].x > 0 && part4ds.children[i].x < 989){
							x = part4ds.children[i].x;
							killPrevBalloon(x,part4ds.children[i]);
							x = part4ds.children[i].x + 15;
							y = part4ds.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5as.children.length;i++){
						if (part5as.children[i].x > 0 && part5as.children[i].x < 989){
							x = part5as.children[i].x;
							killPrevBalloon(x,part5as.children[i]);
							x = part5as.children[i].x + 18;
							y = part5as.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5bs.children.length;i++){
						if (part5bs.children[i].x > 0 && part5bs.children[i].x < 989){
							x = part5bs.children[i].x;
							killPrevBalloon(x,part5bs.children[i]);
							x = part5bs.children[i].x + 21;
							y = part5bs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5cs.children.length;i++){
						if (part5cs.children[i].x > 0 && part5cs.children[i].x < 989){
							x = part5cs.children[i].x;
							killPrevBalloon(x,part5cs.children[i]);
							x = part5cs.children[i].x + 24;
							y = part5cs.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
				
				if (part5d.reversed === false){
					for (var i=0;i<part5ds.children.length;i++){
						if (part5ds.children[i].x > 0 && part5ds.children[i].x < 989){
							x = part5ds.children[i].x;
							killPrevBalloon(x,part5ds.children[i]);
							x = part5ds.children[i].x + 27;
							y = part5ds.children[i].y - 12;
							createBalloon(x,y);
							part5d.reversed = true;
							if (part5d.tweenBalloon === true && part5d.down === true){
								setTweenMoveDown();
							}
							else if (part5d.tweenBalloon === true && part5d.down === false){
								setTweenMoveUp();
							}
							setBalloonProperties();
						}
					}
				}
		   });
   }
   
   function killObstacles(){
	    if (building3.inWorld === true){
			building3.kill();
		}
		if (building4.inWorld === true){
			building4.kill();
		}
		if (building5.inWorld === true){
			building5.kill();
		}
		if (building6.inWorld === true){
			building6.kill();
		}
		part1as.forEach(function(part1a){
			if(part1a.inWorld == true){
				part1a.kill();
			}
		},this);
		part1bs.forEach(function(part1b){
			if(part1b.inWorld == true){
				part1b.kill();
			}
		},this);
		part1cs.forEach(function(part1c){
			if(part1c.inWorld == true){
				part1c.kill();
			}
		},this);
		part1ds.forEach(function(part1d){
			if(part1d.inWorld == true){
				part1d.kill();
			}
		},this);
		
		part2as.forEach(function(part2a){
			if(part2a.inWorld == true){
				part2a.kill();
			}
		},this);
		part2bs.forEach(function(part2b){
			if(part2b.inWorld == true){
				part2b.kill();
			}
		},this);
		part2cs.forEach(function(part2c){
			if(part2c.inWorld == true){
				part2c.kill();
			}
		},this);
		part2ds.forEach(function(part2d){
			if(part2d.inWorld == true){
				part2d.kill();
			}
		},this);
		
		part3s.forEach(function(part3){
			if(part3.inWorld == true){
				part3.kill();
			}
		},this);
		
		part4as.forEach(function(part4a){
			if(part4a.inWorld == true){
				part4a.kill();
			}
		},this);
		part4bs.forEach(function(part4b){
			if(part4b.inWorld == true){
				part4b.kill();
			}
		},this);
		part4cs.forEach(function(part4c){
			if(part4c.inWorld == true){
				part4c.kill();
			}
		},this);
		part4ds.forEach(function(part4d){
			if(part4d.inWorld == true){
				part4d.kill();
			}
		},this);
		
		part5as.forEach(function(part5a){
			if(part5a.inWorld == true){
				part5a.kill();
			}
		},this);
		part5bs.forEach(function(part5b){
			if(part5b.inWorld == true){
				part5b.kill();
			}
		},this);
		part5cs.forEach(function(part5c){
			if(part5c.inWorld == true){
				part5c.kill();
			}
		},this);
		part5ds.forEach(function(part5d){
			if(part5d.inWorld == true){
				part5d.kill();
			}
		},this);
   }
   
   function setReverseLayout(){
	   if (gameAlive === true && reverseObjectImg.hit === true){
			changedReverseLayout = !reverseLayout;
			pauseBackground = true;
			reverseObjectImg.hit = false;
			reverseObjectImg.kill();
			killObstacles();
			//player.angle = -180;
			reverseText = game.add.text(200,200,"",{
				font:"bold 16px Arial", fill: "#ffffff" 
			});
			if (changedReverseLayout === true){
				reverseText.text = "Reverse Gravity Enabled"
				player.anchor.setTo(1,0.5);
				player.scale.y = -1;
			}
			else{
				reverseText.text = "Reverse Gravity disabled"
				player.anchor.setTo(1,0.5);
				player.scale.y = 1;
			}
		
			setTimeout(function(){
				reverseText.text = "";
				reverseLayout = changedReverseLayout;
				pauseBackground = false;

				//setInWorldObjectReverse();
				// if (reverseLayout === true){
					// balloonsOnReverse();
				// }
				// else{
					// balloonsOnNormal();
				// }
			},2000);
			
			
			//reverseObjectImg.visible = false;
		}
	   
	   
	   // if (reverseObjectImg.hit === true){
	    // if (reverseLayout === true){
		   // reverseLayout = false;
	    // }
	    // else{
		   // reverseLayout = true;
	    // }
			// reverseObjectImg.hit = false;
			// //reverseObjectImg.visible = false;
			// reverseObjectImg.destroy();
		// }
			
   }
   
   function addReverseObject(){
	   if (gameAlive === true){
			reverseObjectImg = reverseObjects.getFirstDead();
				reverseObjectImg.visible = true;
				reverseObjectImg.reset(989,250);
				
				//reverseObjectImg.visible = true;
				var tween = game.add.tween(reverseObjectImg).to({ x: -50,y: 250}, 3000);
				tween.start();
				// // Set the new position of the points
				// points.reset(889, 250);

				// // Add velocity to the points to make it move left
				// points.body.velocity.x = -400; 
					   
				// Kill the points when it's no longer visible 
				reverseObjectImg.checkWorldBounds = true;
				reverseObjectImg.outOfBoundsKill = true;
				reverseObjectImg.hit = true;
	   }
   }
	   
		// //reverseObjectImg = reverseObjects.getFirstDead();
		// //reverseObjectImg.reset(989,250);
		// reverseObjectImg = game.add.sprite(989,250,'reverseObject');
		// game.physics.arcade.enable(reverseObjectImg);
	    // var tween = game.add.tween(reverseObjectImg).to({ x: -200,y: 250}, 3000);
		// tween.start();
	    // reverseObjectImg.checkWorldBounds = true;
	    // reverseObjectImg.outOfBoundsKill = true;
		// reverseObjectImg.anchor.set(0.5,0.5);
		// reverseObjectImg.hit = true;
   // }
   
	function createBalloonGroup(){
		part1as = game.add.group();
		part1as.enableBody = true;
		part1as.createMultiple(30,'slice1a');
		
		part1bs = game.add.group();
		part1bs.enableBody = true;
		part1bs.createMultiple(30,'slice1b');
		
		part1cs = game.add.group();
		part1cs.enableBody = true;
		part1cs.createMultiple(30,'slice1c');
		
		part1ds = game.add.group();
		part1ds.enableBody = true;
		part1ds.createMultiple(30,'slice1d');
		
		part2as = game.add.group();
		part2as.enableBody = true;
		part2as.createMultiple(30,'slice2a');
		
		part2bs = game.add.group();
		part2bs.enableBody = true;
		part2bs.createMultiple(30,'slice2b');
		
		part2cs = game.add.group();
		part2cs.enableBody = true;
		part2cs.createMultiple(30,'slice2c');
		
		part2ds = game.add.group();
		part2ds.enableBody = true;
		part2ds.createMultiple(30,'slice2d');
		
		part3s = game.add.group();
		part3s.enableBody = true;
		part3s.createMultiple(30,'slice3');
		
		part4as = game.add.group();
		part4as.enableBody = true;
		part4as.createMultiple(30,'slice4a');
		
		part4bs = game.add.group();
		part4bs.enableBody = true;
		part4bs.createMultiple(30,'slice4b');
		
		part4cs = game.add.group();
		part4cs.enableBody = true;
		part4cs.createMultiple(30,'slice4c');
		
		part4ds = game.add.group();
		part4ds.enableBody = true;
		part4ds.createMultiple(30,'slice4d');
		
		part5as = game.add.group();
		part5as.enableBody = true;
		part5as.createMultiple(30,'slice5a');
		
		part5bs = game.add.group();
		part5bs.enableBody = true;
		part5bs.createMultiple(30,'slice5b');
		
		part5cs = game.add.group();
		part5cs.enableBody = true;
		part5cs.createMultiple(30,'slice5c');
		
		part5ds = game.add.group();
		part5ds.enableBody = true;
		part5ds.createMultiple(30,'slice5d');
	}
	
	function addVerticalObstacle(){
		if (gameAlive === true){
			var ran = Math.floor(Math.random()*2)+1;
			
			var balloonType = Math.floor(Math.random()*3)+1;
			
			getFirstDeadPart();
			
			if (reverseLayout === false){
				if (ran === 1){
					createBalloon(500,0);
					setTweenMoveDown();
					part5d.down = true;
			    }
			    else{
				   createBalloon(500,500);
				   setTweenMoveUp();
				   part5d.down = false;
			    }
			}
			else{
				if (ran === 1){
					createBalloonAngle(500,0);
					setAngleTweenDown();
					part5d.down = true;
				}
				else{
					createBalloonAngle(500,500);
					setAngleTweenUp();
					part5d.down = false;
				}
			}  
		   setBalloonProperties();
		   part5d.tweenBalloon = true;
		  
		}
	}
	
	function setAngleTweenDown(){
		var tween1a = game.add.tween(part1a).to({x: 77, y: 612}, 4000);
		tween1a.start();
		var tween1b = game.add.tween(part1b).to({x: 74, y: 612}, 4000);
		tween1b.start();
		var tween1c = game.add.tween(part1c).to({x: 71, y: 612}, 4000);
		tween1c.start();
		var tween1d = game.add.tween(part1d).to({x: 68, y: 612}, 4000);
		tween1d.start();
		
		var tween2a = game.add.tween(part2a).to({x: 65, y: 612}, 4000);
		tween2a.start();
		var tween2b = game.add.tween(part2b).to({x: 62, y: 612}, 4000);
		tween2b.start();
		var tween2c = game.add.tween(part2c).to({x: 59, y: 612}, 4000);
		tween2c.start();
		var tween2d = game.add.tween(part2d).to({x: 56, y: 610}, 4000);
		tween2d.start();
		
		var tween3 = game.add.tween(part3).to({x: 50, y: 600}, 4000);
		tween3.start();
		
		var tween4a = game.add.tween(part4a).to({x: 44, y: 610}, 4000);
		tween4a.start();
		var tween4b = game.add.tween(part4b).to({x: 41, y: 612}, 4000);
		tween4b.start();
		var tween4c = game.add.tween(part4c).to({x: 38, y: 612}, 4000);
		tween4c.start();
		var tween4d = game.add.tween(part4d).to({x: 35, y: 612}, 4000);
		tween4d.start();
		
		var tween5a = game.add.tween(part5a).to({x: 32, y: 612}, 4000);
		tween5a.start();
		var tween5b = game.add.tween(part5b).to({x: 29, y: 612}, 4000);
		tween5b.start();
		var tween5c = game.add.tween(part5c).to({x: 26, y: 612}, 4000);
		tween5c.start();
		var tween5d = game.add.tween(part5d).to({x: 23, y: 612}, 4000);
		tween5d.start();
	}
	
	function setAngleTweenUp(){
		var tween1a = game.add.tween(part1a).to({x: 77, y: -88}, 4000);
		tween1a.start();
		var tween1b = game.add.tween(part1b).to({x: 74, y: -88}, 4000);
		tween1b.start();
		var tween1c = game.add.tween(part1c).to({x: 71, y: -88}, 4000);
		tween1c.start();
		var tween1d = game.add.tween(part1d).to({x: 68, y: -88}, 4000);
		tween1d.start();
		
		var tween2a = game.add.tween(part2a).to({x: 65, y: -88}, 4000);
		tween2a.start();
		var tween2b = game.add.tween(part2b).to({x: 62, y: -88}, 4000);
		tween2b.start();
		var tween2c = game.add.tween(part2c).to({x: 59, y: -88}, 4000);
		tween2c.start();
		var tween2d = game.add.tween(part2d).to({x: 56, y: -90}, 4000);
		tween2d.start();
		
		var tween3 = game.add.tween(part3).to({x: 50, y: -100}, 4000);
		tween3.start();
		
		var tween4a = game.add.tween(part4a).to({x: 44, y: -90}, 4000);
		tween4a.start();
		var tween4b = game.add.tween(part4b).to({x: 41, y: -88}, 4000);
		tween4b.start();
		var tween4c = game.add.tween(part4c).to({x: 38, y: -88}, 4000);
		tween4c.start();
		var tween4d = game.add.tween(part4d).to({x: 35, y: -88}, 4000);
		tween4d.start();
		
		var tween5a = game.add.tween(part5a).to({x: 32, y: -88}, 4000);
		tween5a.start();
		var tween5b = game.add.tween(part5b).to({x: 29, y: -88}, 4000);
		tween5b.start();
		var tween5c = game.add.tween(part5c).to({x: 26, y: -88}, 4000);
		tween5c.start();
		var tween5d = game.add.tween(part5d).to({x: 23, y: -88}, 4000);
		tween5d.start();
	}
	
	function setTweenMoveDown(){		
		var tween1a = game.add.tween(part1a).to({x: 26, y: 589}, 4000);
		tween1a.start();
		var tween1b = game.add.tween(part1b).to({x: 29, y: 589}, 4000);
		tween1b.start();
		var tween1c = game.add.tween(part1c).to({x: 32, y: 589}, 4000);
		tween1c.start();
		var tween1d = game.add.tween(part1d).to({x: 35, y: 589}, 4000);
		tween1d.start();
		
		var tween2a = game.add.tween(part2a).to({x: 38, y: 588}, 4000);
		tween2a.start();
		var tween2b = game.add.tween(part2b).to({x: 41, y: 588}, 4000);
		tween2b.start();
		var tween2c = game.add.tween(part2c).to({x: 44, y: 588}, 4000);
		tween2c.start();
		var tween2d = game.add.tween(part2d).to({x: 47, y: 590}, 4000);
		tween2d.start();
		
		var tween3 = game.add.tween(part3).to({x: 50, y: 600}, 4000);
		tween3.start();
		
		var tween4a = game.add.tween(part4a).to({x: 56, y: 590}, 4000);
		tween4a.start();
		var tween4b = game.add.tween(part4b).to({x: 59, y: 588}, 4000);
		tween4b.start();
		var tween4c = game.add.tween(part4c).to({x: 62, y: 588}, 4000);
		tween4c.start();
		var tween4d = game.add.tween(part4d).to({x: 65, y: 588}, 4000);
		tween4d.start();
		
		var tween5a = game.add.tween(part5a).to({x: 68, y: 588}, 4000);
		tween5a.start();
		var tween5b = game.add.tween(part5b).to({x: 71, y: 588}, 4000);
		tween5b.start();
		var tween5c = game.add.tween(part5c).to({x: 74, y: 588}, 4000);
		tween5c.start();
		var tween5d = game.add.tween(part5d).to({x: 77, y: 588}, 4000);
		tween5d.start();
	}
	
	function setTweenMoveUp(){		
		var tween1a = game.add.tween(part1a).to({x: 26, y: -112}, 4000);
		tween1a.start();
		var tween1b = game.add.tween(part1b).to({x: 29, y: -112}, 4000);
		tween1b.start();
		var tween1c = game.add.tween(part1c).to({x: 32, y: -112}, 4000);
		tween1c.start();
		var tween1d = game.add.tween(part1d).to({x: 35, y: -112}, 4000);
		tween1d.start();
		
		var tween2a = game.add.tween(part2a).to({x: 38, y: -112}, 4000);
		tween2a.start();
		var tween2b = game.add.tween(part2b).to({x: 41, y: -112}, 4000);
		tween2b.start();
		var tween2c = game.add.tween(part2c).to({x: 44, y: -112}, 4000);
		tween2c.start();
		var tween2d = game.add.tween(part2d).to({x: 47, y: -110}, 4000);
		tween2d.start();
		
		var tween3 = game.add.tween(part3).to({x: 50, y: -100}, 4000);
		tween3.start();
		
		var tween4a = game.add.tween(part4a).to({x: 56, y: -110}, 4000);
		tween4a.start();
		var tween4b = game.add.tween(part4b).to({x: 59, y: -112}, 4000);
		tween4b.start();
		var tween4c = game.add.tween(part4c).to({x: 62, y: -112}, 4000);
		tween4c.start();
		var tween4d = game.add.tween(part4d).to({x: 65, y: -112}, 4000);
		tween4d.start();
		
		var tween5a = game.add.tween(part5a).to({x: 68, y: -112}, 4000);
		tween5a.start();
		var tween5b = game.add.tween(part5b).to({x: 71, y: -112}, 4000);
		tween5b.start();
		var tween5c = game.add.tween(part5c).to({x: 74, y: -112}, 4000);
		tween5c.start();
		var tween5d = game.add.tween(part5d).to({x: 77, y: -112}, 4000);
		tween5d.start();
	}
	
	function updateScore(){
		scoreText.text = "Score: "+score+"\nBest: "+topScore;
			
	}
	
	// Make the player jump 
    function jump() {
		if (gameAlive == true){
			if (pauseBackground === false){
				if (reverseLayout === false){
					// Add a vertical velocity to the player
					player.body.velocity.y = -250;
					//blaster.play();
				}
				else{
					// Add a vertical velocity to the player
				player.body.velocity.y = 250;
				//blaster.play();
				}
			}
			else{
				player.body.velocity.y = 0;
			}

		}
		else{
			player.body.velocity.y = 0;
			player.body.gravity.y = 0; 
		}
        
    }
	
	function restart() {
		//my_media.pause();
		gameAlive = true;
		skip = 0;
		game.state.start("Home",true,false);	
	}
	
	function gameOverScreen(){
		transparentOverlay = game.add.tileSprite(0,0,1500,1000,'transparentOverlay');
		gameOverBanner = game.add.sprite((innerWidth/2.75), 100, 'gameOverBanner');
		gameOverBanner.anchor.set(0.5,0.5);
		plane = game.add.sprite((innerWidth/2.25),200,'player');
		plane.width = 80;
		plane.anchor.set(0.5,0.5);
		
		restartText = game.add.bitmapText((innerWidth/3.25), 430, "SFComic", "Touch anywhere to play again", 24);
		
		gameOverScore = game.add.bitmapText((innerWidth/3.25), 280, "Kg", "Your Score: "+score, 36);
		bestScore = game.add.bitmapText((innerWidth/3.25), 330, "Kg", "Best Score: "+topScore, 24);
		game.input.onDown.add(restart, this);
	}
	
	function stopBalloonMovement(){
		part1as.forEach(function(part1a){
			if(part1a.inWorld == true){
				part1a.body.velocity.x = 0;
			}
		},this);
		part1bs.forEach(function(part1b){
			if(part1b.inWorld == true){
				part1b.body.velocity.x = 0;
			}
		},this);
		part1cs.forEach(function(part1c){
			if(part1c.inWorld == true){
				part1c.body.velocity.x = 0;
			}
		},this);
		part1ds.forEach(function(part1d){
			if(part1d.inWorld == true){
				part1d.body.velocity.x = 0;
			}
		},this);
		
		part2as.forEach(function(part2a){
			if(part2a.inWorld == true){
				part2a.body.velocity.x = 0;
			}
		},this);
		part2bs.forEach(function(part2b){
			if(part2b.inWorld == true){
				part2b.body.velocity.x = 0;
			}
		},this);
		part2cs.forEach(function(part2c){
			if(part2c.inWorld == true){
				part2c.body.velocity.x = 0;
			}
		},this);
		part2ds.forEach(function(part2d){
			if(part2d.inWorld == true){
				part2d.body.velocity.x = 0;
			}
		},this);
		
		part3s.forEach(function(part3){
			if(part3.inWorld == true){
				part3.body.velocity.x = 0;
			}
		},this);
		
		part4as.forEach(function(part4a){
			if(part4a.inWorld == true){
				part4a.body.velocity.x = 0;
			}
		},this);
		part4bs.forEach(function(part4b){
			if(part4b.inWorld == true){
				part4b.body.velocity.x = 0;
			}
		},this);
		part4cs.forEach(function(part4c){
			if(part4c.inWorld == true){
				part4c.body.velocity.x = 0;
			}
		},this);
		part4ds.forEach(function(part4d){
			if(part4d.inWorld == true){
				part4d.body.velocity.x = 0;
			}
		},this);
		
		part5as.forEach(function(part5a){
			if(part5a.inWorld == true){
				part5a.body.velocity.x = 0;
			}
		},this);
		part5bs.forEach(function(part5b){
			if(part5b.inWorld == true){
				part5b.body.velocity.x = 0;
			}
		},this);
		part5cs.forEach(function(part5c){
			if(part5c.inWorld == true){
				part5c.body.velocity.x = 0;
			}
		},this);
		part5ds.forEach(function(part5d){
			if(part5d.inWorld == true){
				part5d.body.velocity.x = 0;
			}
		},this);
	}
	
	function gameOver() {
		my_media.pause();
		gameAlive = false;
		reverseLayout = false;
		skip = 0;
		localStorage.setItem("topScore",Math.max(score,topScore));	
		functionCalled = functionCalled+1;
		if (functionCalled === 1){
			playAudio("Collision")
		
		stopBalloonMovement();
		
		if (building3.inWorld === true){
			building3.body.velocity.x = 0;
		}
		if (building4.inWorld === true){
			building4.body.velocity.x = 0;
		}
		if (building5.inWorld === true){
			building5.body.velocity.x = 0;
		}
		if (building6.inWorld === true){
			building6.body.velocity.x = 0;
		}
		
		player.body.velocity.y = 0;
		player.body.gravity.y = 0; 
		explosion = game.add.sprite(player.x+40, player.y, 'explosion');
		explosion.anchor.set(0.5,0.5);
		
		// var explosionSprite = game.add.sprite(player.x, player.y-50, 'explosionSprite');
		// var explode = explosionSprite.animations.add('explode');
		// explosionSprite.animations.play('explode', [0,1,2,3,4,5,6,7,8,9], 60, false);
		
		setTimeout(function(){
				gameOverScreen();
			},2000);
		}
		
	}
	
   
    // Add a row of 6 pipes with a hole somewhere in the middle
    function addRowOfPipes() {
		if (gameAlive == true){
			var balloonType = Math.floor(Math.random()*3)+1;
			var place = Math.floor(Math.random()*2)+1;
			getFirstDeadPart();
			if (reverseLayout === false){
				if (place === 1) {
					createBalloon(1289,100);
				}
				else{
					createBalloon(1289,250);
				}
			}
			
			else{
				if (place === 1) {
					createBalloonAngle(1289,350);
				}
				else{
					createBalloonAngle(1289,250);
				}
			}
			setBalloonProperties();
			part5d.giveScore = true;
			part5d.reversed = false;
			part5d.tweenBalloon = false;
		}
    }
	
	function createBalloonAngle(x,y){
		part1a.reset((x+27), (y+12));
		part1a.angle = 180;
		part1b.reset((x+24), (y+12));
		part1b.angle = 180;
		part1c.reset((x+21), (y+12));
		part1c.angle = 180;
		part1d.reset((x+18), (y+12));
		part1d.angle = 180;
		
		part2a.reset((x+15), (y+12));
		part2a.angle = 180;
		part2b.reset((x+12), (y+12));
		part2b.angle = 180;
		part2c.reset((x+9), (y+12));
		part2c.angle = 180;
		part2d.reset((x+6), (y+10));
		part2d.angle = 180;
		
		part3.reset(x, y);
		part3.angle = 180;
		
		part4a.reset((x-6), (y+10));
		part4a.angle = 180;
		part4b.reset((x-9), (y+12));
		part4b.angle = 180;
		part4c.reset((x-12), (y+12));
		part4c.angle = 180;
		part4d.reset((x-15), (y+12));
		part4d.angle = 180;
		
		part5a.reset((x-18), (y+12));
		part5a.angle = 180;
		part5b.reset((x-21), (y+12));
		part5b.angle = 180;
		part5c.reset((x-24), (y+12));
		part5c.angle = 180;
		part5d.reset((x-27), (y+12));
		part5d.angle = 180;
	}
	
	function getFirstDeadPart(){
		part1a = part1as.getFirstDead();
		part1b = part1bs.getFirstDead();
		part1c = part1cs.getFirstDead();
		part1d = part1ds.getFirstDead();
		
		part2a = part2as.getFirstDead();
		part2b = part2bs.getFirstDead();
		part2c = part2cs.getFirstDead();
		part2d = part2ds.getFirstDead();
		
		part3 = part3s.getFirstDead();
		
		part4a = part4as.getFirstDead();
		part4b = part4bs.getFirstDead();
		part4c = part4cs.getFirstDead();
		part4d = part4ds.getFirstDead();
		
		part5a = part5as.getFirstDead();
		part5b = part5bs.getFirstDead();
		part5c = part5cs.getFirstDead();
		part5d = part5ds.getFirstDead();
	}
	
	function createBalloon(x,y){
		part1a.reset((x-27), (y-12));
		part1a.angle = 0;
		part1b.reset((x-24), (y-12));
		part1b.angle = 0;
		part1c.reset((x-21), (y-12));
		part1c.angle = 0;
		part1d.reset((x-18), (y-12));
		part1d.angle = 0;
		
		part2a.reset((x-15), (y-12));
		part2a.angle = 0;
		part2b.reset((x-12), (y-12));
		part2b.angle = 0;
		part2c.reset((x-9), (y-12));
		part2c.angle = 0;
		part2d.reset((x-6), y-10);
		part2d.angle = 0;
		
		part3.reset(x, y);
		part3.angle = 0;
		
		part4a.reset((x+6), y-10);
		part4a.angle = 0;
		part4b.reset((x+9), (y-12));
		part4b.angle = 0;
		part4c.reset((x+12), (y-12));
		part4c.angle = 0;
		part4d.reset((x+15), (y-12));
		part4d.angle = 0;
		
		part5a.reset((x+18), (y-12));
		part5a.angle = 0;
		part5b.reset((x+21), (y-12));
		part5b.angle = 0;
		part5c.reset((x+24), (y-12));
		part5c.angle = 0;
		part5d.reset((x+27), (y-12));
		part5d.angle = 0;
	}
	
	function setBalloonProperties(){
		part1a.body.velocity.x = -200; 
        part1a.checkWorldBounds = true;
        part1a.outOfBoundsKill = true;
		part1a.anchor.set(0.5,0.5);
		
		part1b.body.velocity.x = -200; 
        part1b.checkWorldBounds = true;
        part1b.outOfBoundsKill = true;
		part1b.anchor.set(0.5,0.5);
		
		part1c.body.velocity.x = -200; 
        part1c.checkWorldBounds = true;
        part1c.outOfBoundsKill = true;
		part1c.anchor.set(0.5,0.5);
		
		part1d.body.velocity.x = -200; 
        part1d.checkWorldBounds = true;
        part1d.outOfBoundsKill = true;
		part1d.anchor.set(0.5,0.5);
		
		part2a.body.velocity.x = -200; 
        part2a.checkWorldBounds = true;
        part2a.outOfBoundsKill = true;
		part2a.anchor.set(0.5,0.5);
		
		part2b.body.velocity.x = -200; 
        part2b.checkWorldBounds = true;
        part2b.outOfBoundsKill = true;
		part2b.anchor.set(0.5,0.5);
		
		part2c.body.velocity.x = -200; 
        part2c.checkWorldBounds = true;
        part2c.outOfBoundsKill = true;
		part2c.anchor.set(0.5,0.5);
		
		part2d.body.velocity.x = -200; 
        part2d.checkWorldBounds = true;
        part2d.outOfBoundsKill = true;
		part2d.anchor.set(0.5,0.5);
		
		part3.body.velocity.x = -200; 
        part3.checkWorldBounds = true;
        part3.outOfBoundsKill = true;
		part3.anchor.set(0.5,0.5);
		
		part4a.body.velocity.x = -200; 
        part4a.checkWorldBounds = true;
        part4a.outOfBoundsKill = true;
		part4a.anchor.set(0.5,0.5);
		
		part4b.body.velocity.x = -200; 
        part4b.checkWorldBounds = true;
        part4b.outOfBoundsKill = true;
		part4b.anchor.set(0.5,0.5);
		
		part4c.body.velocity.x = -200; 
        part4c.checkWorldBounds = true;
        part4c.outOfBoundsKill = true;
		part4c.anchor.set(0.5,0.5);
		
		part4d.body.velocity.x = -200; 
        part4d.checkWorldBounds = true;
        part4d.outOfBoundsKill = true;
		part4d.anchor.set(0.5,0.5);
		
		part5a.body.velocity.x = -200; 
        part5a.checkWorldBounds = true;
        part5a.outOfBoundsKill = true;
		part5a.anchor.set(0.5,0.5);
		
		part5b.body.velocity.x = -200; 
        part5b.checkWorldBounds = true;
        part5b.outOfBoundsKill = true;
		part5b.anchor.set(0.5,0.5);
		
		part5c.body.velocity.x = -200; 
        part5c.checkWorldBounds = true;
        part5c.outOfBoundsKill = true;
		part5c.anchor.set(0.5,0.5);
		
		part5d.body.velocity.x = -200; 
        part5d.checkWorldBounds = true;
        part5d.outOfBoundsKill = true;
		part5d.anchor.set(0.5,0.5);
	}
	
	function addFloorsOfBuilding() {
		if (gameAlive == true){
			var floors = Math.floor(Math.random()* 4)+3;
			if (continuousCount < 4 && count === floors){
				continuousCount++;
				addFloorsOfBuilding();
			}
			else{
				if (reverseLayout === false){
					if (floors === 3){
						building3.reset(989,(450-(110-(233/2))));
						building3.angle = 0;
						building3.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
				
					else if (floors === 4){
						building4.reset(989, (450-(141-(233/2))));
						building4.angle = 0;
						building4.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
					
					else if (floors === 5){
						building5.reset(989, (450-(171-(233/2))));
						building5.angle = 0;
						building5.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
					
					else if (floors === 6){
						building6.reset(989, (450-(203-(233/2))));
						building6.angle = 0;
						building6.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
				
				}
				else{
					if (floors === 3){
						building3.reset(989,(140-(233/2)));
						building3.angle = -180;
						building3.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
						building3.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
					
					else if (floors === 4){
						building4.reset(989, (171-(233/2)));
						building4.angle = -180;
						building4.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
						building4.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
					
					else if (floors === 5){
						building5.reset(989, (201-(233/2)));
						building5.angle = -180;
						building5.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
						building5.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
					
					else if (floors === 6){
						building6.reset(989, (233-(233/2)));
						building6.angle = -180;
						building6.allowCollision = { none: false, any: true, up: true, down: true, left: true, right: true };
						building6.body.velocity.x = -200;
						continuousCount = 1;
						count = floors;
					}
				}	
			}
			
			if (building3.inWorld === false){
				building3.giveScore = true;
			}
			
			if (building4.inWorld === false){
				building4.giveScore = true;
			}
			
			if (building5.inWorld === false){
				building5.giveScore = true;
			}
			
			if (building6.inWorld === false){
				building6.giveScore = true;
			}
		}
	}
		
	function addObstacles() {
		if (skip === 3){
			addVerticalObstacle();
			skip = 0;
		}
		
		else{
			addRowOfPipes();
			skip += 1;
		}
	}
	
	function computeScore() {
		part5ds.forEach(function (part5d){
			if (part5d.inWorld == true && part5d.x+part5d.width<player.x && part5d.giveScore && gameAlive === true){
				score += 1;
				updateScore();
				part5d.giveScore = false;
			}
		},this);
		
		if (building3.inWorld === true && building3.x+building3.width<player.x && building3.giveScore){
			score += 1;
			updateScore();
			building3.giveScore = false;
		}
		if (building4.inWorld === true && building4.x+building4.width<player.x && building4.giveScore){
			score += 1;
			updateScore();
			building4.giveScore = false;
		}
		if (building5.inWorld === true && building5.x+building4.width<player.x && building5.giveScore){
			score += 1;
			updateScore();
			building5.giveScore = false;
		}
		if (building6.inWorld === true && building6.x+building6.width<player.x && building6.giveScore){
			score += 1;
			updateScore();
			building6.giveScore = false;
		}
		
		if (score%15 === 0){
			scoreAdded = scoreAdded + 1;
			if (scoreAdded === 1){
				addObjects();
			}
		}
		else{
			scoreAdded = 0;
		}
		
		// if (score%20 === 0){
			// HitAdded = HitAdded + 1;
			// if (HitAdded === 1){
				// addReverseObject();
			// }
		// }
		// else{
			// HitAdded = 0;
		// }
		
	}
	
	// Add extra points when advantageous object is collected
	function addScore() {
		if (gameAlive === true && points.giveScore === true){
			score += 5;
			updateScore();
			points.giveScore = false;
			points.visible = false;
		}
	}
	
	function addObjects() {		
		if (gameAlive === true){
			//if (score%15 === 0){
				// Get the first dead points of our group
				points = extraPoints.getFirstDead();
				
				points.reset(130,-30);
				
				//extraPoints.visible = true;
				var tween = game.add.tween(points).to({ x: 500,y: 500}, 3000);
				tween.start();
				// // Set the new position of the points
				// points.reset(889, 250);

				// // Add velocity to the points to make it move left
				// points.body.velocity.x = -400; 
					   
				// Kill the points when it's no longer visible 
				points.checkWorldBounds = true;
				points.outOfBoundsKill = true;
				points.giveScore = true;
			//}
			
		// else if (score === 10){
			// // Get the first dead points of our group
			// var dynamite = dynamite.getFirstDead();

			// // Set the new position of the points
			// dynamite.reset(889, 250);

			// // Add velocity to the points to make it move left
			// dynamite.body.velocity.x = -300; 
				   
			// // Kill the points when it's no longer visible 
			// dynamite.checkWorldBounds = true;
			// dynamite.outOfBoundsKill = true;
			// }
		}
		
	}
	
	// function playAudio(audioID) {
	// var audioElement = document.getElementById(audioID);
	// var url = audioElement.getAttribute('src');
	// my_media = new Media(url,
			// // success callback
			 // function () { my_media.release(); },
			// // error callback
			 // function (err) { my_media.release(); }
	// );
		   // // Play audio
	// my_media.play();
// }
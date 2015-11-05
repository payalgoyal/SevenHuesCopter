var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var gameRatio = innerWidth/innerHeight;	
//var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.AUTO);

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
var reverseObjAppear = 0;
var playerNormal = true;
var changedReverseLayout = false;
var enableObstacleCollide = true;

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


var play = function(game){}
// Creates a new 'main' state that will contain the game
   play.prototype = {
		// Function called first to load all the assets
		preload: function() { 
			// Change the background color of the game	

			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("Nightlayer1", "assets/layer-1_night.png");
			game.load.image("Eveninglayer1", "assets/layer-1_evening.png");
			
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
			game.load.image("resizeObject", "assets/resizeObject.png");
			game.load.image("CollisionDisableObject", "assets/collisionDisableObject.png");
			game.load.image("extraPoints", "assets/extraPoints.png");
			//game.load.image("pipe2", "assets/brownBalloon.png");
			game.load.image("explosion", "assets/explosion.png");
			//game.load.spritesheet('explosionSprite', 'assets/explosionSprite.png', 86, 65, 13);
		},

		// Fuction called after 'preload' to setup the game 
		create: function() { 	
			Nightlayer1 = game.add.sprite(0, 0, 'Nightlayer1');
			Nightlayer1_dup = game.add.sprite(980, 0, 'Nightlayer1');
		
			Eveninglayer1 = game.add.sprite(0, 0, 'Eveninglayer1');
			Eveninglayer1_dup = game.add.sprite(980, 0, 'Eveninglayer1');
			
			layer1 = game.add.sprite(0, 0, 'layer1');
			layer1_dup = game.add.sprite(980, 0, 'layer1');
			
			layer3 = game.add.sprite(0, 0, 'layer3');
			layer3_dup = game.add.sprite(1000, 0, 'layer3');
			
			layer2 = game.add.sprite(0, 0, 'layer2');
			layer2_dup = game.add.sprite(980, 0, 'layer2');
			
			// background2 = game.add.sprite(980, 0, 'background2');
			// background2_dup = game.add.sprite(1960, 0, 'background2');
			
			layer6 = game.add.sprite(0, 0, 'layer6');
			layer6_dup = game.add.sprite(1030, 0, 'layer6');
			
			createBalloonGroup();
			
			pipes1 = game.add.group();
			pipes1.enableBody = true;
			pipes1.createMultiple(25, 'pipe1');
			
			pipes2 = game.add.group();
			pipes2.enableBody = true;
			pipes2.createMultiple(25, 'pipe2');

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
			
			resizeObjects = game.add.group();
			resizeObjects.enableBody = true;
			resizeObjects.createMultiple(5, 'resizeObject');
			
			CollisionDisableObjects = game.add.group();
			CollisionDisableObjects.enableBody = true;
			CollisionDisableObjects.createMultiple(5, 'CollisionDisableObject');
			
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
			
			// player.body.gravity.y = 800; 
			// game.input.onDown.add(jump, this);

			createBackgroundBalloons();
			timer = game.time.events.loop(1000, createBackgroundBalloons, this);  
			
			// Timer that calls 'addRowOfPipes' ever 2 seconds 
			timer = game.time.events.loop(pipesTime, addObstacles, this);  
			
			timer = game.time.events.loop(3967, addFloorsOfBuilding, this);
			
			//timer = game.time.events.loop(3000, addReverseObject, this);
			timer = game.time.events.loop(15000, powerUp, this);
			
			score = 0;
			functionCalled = 0;
			checkSlices = 0;
			collidedIndex = -1;
			
			timer = game.time.events.loop(10000, changeBackground, this); 
			
			//timer = game.time.events.loop(3000, addObjects, this); 
			//playAudio("Plane");
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
			game.physics.arcade.overlap(player, part1as, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part1bs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part1cs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part1ds, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			
			game.physics.arcade.overlap(player, part2as, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part2bs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part2cs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part2ds, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			
			game.physics.arcade.overlap(player, part3s, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			
			game.physics.arcade.overlap(player, part4as, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part4bs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part4cs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part4ds, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			
			game.physics.arcade.overlap(player, part5as, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part5bs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part5cs, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);
			game.physics.arcade.overlap(player, part5ds, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this);

			// // game.physics.arcade.overlap(player, pipes2, gameOver, null, this); 
			
			// // game.physics.arcade.overlap(player, pipes3, gameOver, null, this); 
			
			game.physics.arcade.overlap(player, reverseObjects, setReverseLayout, null, this); 
			
			game.physics.arcade.overlap(player, resizeObjects, resizePlayer, null, this); 
			
			game.physics.arcade.overlap(player, CollisionDisableObjects, disableCollision, null, this); 
			
			game.physics.arcade.overlap(player, building3, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this); 
			
			game.physics.arcade.overlap(player, building4, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this); 
			
			game.physics.arcade.overlap(player, building5, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this); 
			
			game.physics.arcade.overlap(player, building6, gameOver, function() {
				if (enableObstacleCollide) {
					return true;
				}
				return false;
			}, this); 
		
			// // // reverseGravityCheck();
		
			// // // If the player overlap any flying objects, call 'addScore'
			game.physics.arcade.overlap(player, extraPoints, addScore, null, this);
			
			computeScore();
			layout();
		}
   }
   
   function createBackgroundBalloons(){
	    var ran = Math.floor(Math.random()*5)+1;
		var balloonSize = Math.floor(Math.random()*3)+1;
		var balloonType = Math.floor(Math.random()*2)+1;
		
		if (balloonType === 1){
			pipeOnboard = pipes1.getFirstDead();
		}
		else{
			pipeOnboard = pipes2.getFirstDead();
		}
		if (balloonSize === 1){
			pipeOnboard.width = 35;
			pipeOnboard.height = 45;
		}
		else if (balloonSize === 2){
			pipeOnboard.width = 30;
			pipeOnboard.height = 35;
		}
		else{
			pipeOnboard.width = 20;
			pipeOnboard.height = 25;
		}
		
		if (ran === 1){
			pipeOnboard.reset(1289,100);
		}
		else if (ran === 2){
			pipeOnboard.reset(1289,270);
		}
		else if (ran === 3){
			pipeOnboard.reset(1289,350);
		}
		else if (ran === 4){
			pipeOnboard.reset(300,-100);
		}
		else {
			pipeOnboard.reset(300,600);
		}
		if (ran === 1 || ran === 2 ||  ran === 3){
			pipeOnboard.body.velocity.x = -100;
		}
		else if(ran === 4){
			var tween = game.add.tween(pipeOnboard).to({x: 550, y: 600}, 6000);
			tween.start();
		}
		else{
			var tween = game.add.tween(pipeOnboard).to({x: 550, y: -100}, 6000);
			tween.start();
		}
		if (reverseLayout === true){
			pipeOnboard.angle = -180;
		}
		else{
			pipeOnboard.angle = 0;
		}
		pipeOnboard.checkWorldBounds = true;
		pipeOnboard.outOfBoundsKill = true;
		
   }
   
   function changeBackground(){
	   if (gameAlive === true){
			level = level + 1;
			if (level === 1){
				var tween = game.add.tween(layer1).to({ alpha:0.3}, 4000);
				tween.start();
				var tween = game.add.tween(layer1_dup).to({ alpha:0.3}, 4000);
				tween.start();
			}
			else if (level === 2){
				var tween = game.add.tween(Eveninglayer1).to({ alpha:0.3}, 2000);
				tween.start();
				var tween = game.add.tween(Eveninglayer1_dup).to({ alpha:0.3}, 2000);
				tween.start();
			}
			else if (level === 3){
				var tween = game.add.tween(Nightlayer1).to({ alpha:0.3}, 3000);
				tween.start();
				var tween = game.add.tween(Nightlayer1_dup).to({ alpha:0.3}, 3000);
				tween.start();
			}
			else if (level === 4){
				var tween = game.add.tween(Nightlayer1).to({ alpha:1}, 3000);
				tween.start();
				var tween = game.add.tween(Nightlayer1_dup).to({ alpha:1}, 3000);
				tween.start();
				//tween.onComplete.add(NightToDawn, this);
			}
			else if (level === 5){
				var tween = game.add.tween(Eveninglayer1).to({ alpha:1}, 2000);
				tween.start();
				var tween = game.add.tween(Eveninglayer1_dup).to({ alpha:1}, 2000);
				tween.start();
				//tween.onComplete.add(NightToDawn, this);
			}
			else if (level === 6){
				var tween = game.add.tween(layer1).to({ alpha:1}, 4000);
				tween.start();
				var tween = game.add.tween(layer1_dup).to({ alpha:1}, 4000);
				tween.start();
				//tween.onComplete.add(NightToDawn, this);
				level = 0;
			}
	   }
   }
   
   function layout(){
	   if (gameAlive === true){
		   if (pauseBackground === true){
			   player.body.gravity.y = 0; 
		   }
		   else{
			    if (reverseLayout === false){
				   player.body.gravity.y = 800; 
				   game.input.onDown.add(jump, this);
			   }
			   else{
				   player.body.gravity.y = -800; 
				   game.input.onDown.add(jump, this);
			   }
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
   
   function killPrevBalloon(x,y,part){
	   part.kill();
	   if (x < 800 || y < 600){
			for (var j = 0; j<part1bs.children.length; j++){
			   if (((part1as.children[j].x > x - 30) && (part1as.children[j].x < x + 30)) || (part1as.children[j].y < y) ){
				   part1as.children[j].kill();
			   }
			   if (((part1bs.children[j].x > x - 30) && (part1bs.children[j].x < x + 30)) || (part1bs.children[j].y < y) ){
				   part1bs.children[j].kill();
			   }
			   if (((part1cs.children[j].x > x - 30) && (part1cs.children[j].x < x + 30)) || (part1cs.children[j].y < y) ){
				   part1cs.children[j].kill();
			   }
			   if (((part1ds.children[j].x > x - 30) && (part1ds.children[j].x < x + 30)) || (part1ds.children[j].y < y) ){
				   part1ds.children[j].kill();
			   }
			   if (((part2as.children[j].x > x - 30) && (part2as.children[j].x < x + 30)) || (part2as.children[j].y < y) ){
				   part2as.children[j].kill();
			   }
			   if (((part2bs.children[j].x > x - 30) || (part2bs.children[j].x < x + 30)) || (part2bs.children[j].y < y) ){
				   part2bs.children[j].kill();
			   }
			   if (((part2cs.children[j].x > x - 30) || (part2cs.children[j].x < x + 30)) || (part2cs.children[j].y < y) ){
				   part2cs.children[j].kill();
			   }
			   if (((part2ds.children[j].x > x - 30) || (part2ds.children[j].x < x + 30)) || (part2ds.children[j].y < y) ){
				   part2ds.children[j].kill();
			   }
			   if (((part3s.children[j].x > x - 30) || (part3s.children[j].x < x + 30)) || (part3s.children[j].y < y) ){
				   part3s.children[j].kill();
			   }
			   if (((part4as.children[j].x > x - 30) || (part4as.children[j].x < x + 30)) || (part4as.children[j].y < y) ){
				   part4as.children[j].kill();
			   }
			   if (((part4bs.children[j].x > x - 30) || (part4bs.children[j].x < x + 30)) || (part4bs.children[j].y < y) ){
				   part4bs.children[j].kill();
			   }
			   if (((part4cs.children[j].x > x - 30) || (part4cs.children[j].x < x + 30)) || (part4cs.children[j].y < y) ){
				   part4cs.children[j].kill();
			   }
			   if (((part4ds.children[j].x > x - 30) || (part4ds.children[j].x < x + 30)) || (part4ds.children[j].y < y) ){
				   part4ds.children[j].kill();
			   }
			   if (((part5as.children[j].x > x - 30) || (part5as.children[j].x < x + 30)) || (part5as.children[j].y < y) ){
				   part5as.children[j].kill();
			   }
			   if (((part5bs.children[j].x > x - 30) || (part5bs.children[j].x < x + 30)) || (part5bs.children[j].y < y) ){
				   part5bs.children[j].kill();
			   }
			   if (((part5cs.children[j].x > x - 30) || (part5cs.children[j].x < x + 30)) || (part5cs.children[j].y < y) ){
				   part5cs.children[j].kill();
			   }
			   if (((part5ds.children[j].x > x - 30) || (part5ds.children[j].x < x + 30)) || (part5ds.children[j].y < y) ){
				   part5ds.children[j].kill();
			   }
		   }
	   }
	   
   }
    
   function killObstacles(){
		building3.kill();
		building4.kill();
		building5.kill();
		building6.kill();

		for (var i=0; i<15; i++){
			part1as.children[i].kill();
			part1bs.children[i].kill();
			part1cs.children[i].kill();
			part1ds.children[i].kill();
			
			part2as.children[i].kill();
			part2bs.children[i].kill();
			part2cs.children[i].kill();
			part2ds.children[i].kill();
			
			part3s.children[i].kill();
			
			part4as.children[i].kill();
			part4bs.children[i].kill();
			part4cs.children[i].kill();
			part4ds.children[i].kill();
			
			part5as.children[i].kill();
			part5bs.children[i].kill();
			part5cs.children[i].kill();
			part5ds.children[i].kill();
		}
   }
   
   function setReverseLayout(){
	   if (gameAlive === true && reverseObjectImg.hit === true){
			changedReverseLayout = !reverseLayout;
			pauseBackground = true;
			gameAlive = false;
			this.currentTimer = game.time.create(false);
			reverseObjectImg.hit = false;
			reverseObjectImg.kill();
			killObstacles();
			if (changedReverseLayout === true){
				reverseText = game.add.bitmapText(450, 200, "SFComic", "Gravity Reversed", 48);
				var reverseTextTween = game.add.tween(reverseText).to({ x: 150,y: 200, alpha: 1 }, 500).to({ x: 170 }, 100);
				reverseTextTween.start();
				// my_media.pause();
				playAudio("Swoosh");
				player.anchor.setTo(1,0.5);
				player.scale.y = -1;
			}
			// else{
				// reverseText = game.add.bitmapText(450, 200, "SFComic", "Gravity Reversed", 36);
				// var reverseTextTween = game.add.tween(reverseText).to({ x: 150,y: 200, alpha: 1 }, 500).to({ x: 170 }, 100);
				// //var reverseTextTween = game.add.tween(reverseText).to({ x: 200,y: 200, alpha: 1 }, 600);
				// reverseTextTween.start();
				// // my_media.pause();
				// // playAudio("Swoosh");
				// player.anchor.setTo(1,0.5);
				// player.scale.y = 0.5;
			// }
		
			gamePause();
			
			resetToNormal();
			
		}
			
   }
   
   function addReverseObject(){
	    if (gameAlive === true){
			// reverseObjAppear = reverseObjAppear+1;
		    // if (reverseObjAppear === 3){
				reverseObjectImg = reverseObjects.getFirstDead();
				reverseObjectImg.visible = true;
				reverseObjectImg.reset(989,250);
				
				var tween = game.add.tween(reverseObjectImg).to({ x: -50,y: 250}, 3000);
				tween.start();
					   
				// Kill the points when it's no longer visible 
				reverseObjectImg.checkWorldBounds = true;
				reverseObjectImg.outOfBoundsKill = true;
				reverseObjectImg.hit = true;
				// reverseObjAppear = 0;
		    // }
	    }
    }
	
	function resizePlayer(){
		if (gameAlive === true && resizeObjImg.hit === true){
			changedPlayerToNormal = !playerNormal;
			pauseBackground = true;
			gameAlive = false;
			
			resizeObjImg.hit = false;
			resizeObjImg.kill();
			killObstacles();
			// if (reverseLayout === true){
				// player.anchor.setTo(1,0.5);
				// player.scale.y = -1;
			// }
			// else{
				// player.anchor.setTo(1,0.5);
				// player.scale.y = 1;
			// }
			if (changedPlayerToNormal === false){
				resizeText = game.add.bitmapText(450, 200, "SFComic", "Player resized to small", 48);
				resizeTextTween = game.add.tween(resizeText).to({ x: 150,y: 200, alpha: 1 }, 500).to({ x: 170 }, 100);
				resizeTextTween.start();
				// my_media.pause();
				playAudio("Swoosh");
				
				player.width = player.width/2;
				player.height = player.height/2; 
				
			}
		
			gamePause();
			
			resetToNormal();
			
		}
	}
	
	function disableCollision(){
		if (gameAlive === true && collisionDisableImg.hit === true){
			disableCollisionCheck = true;
			pauseBackground = true;
			gameAlive = false;
			
			collisionDisableImg.hit = false;
			collisionDisableImg.kill();
			killObstacles();
			
			disableText = game.add.bitmapText(450, 200, "SFComic", "Collision Disabled", 48);
			disableTextTween = game.add.tween(disableText).to({ x: 150,y: 200, alpha: 1 }, 500).to({ x: 170 }, 100);
			disableTextTween.start();
			// my_media.pause();
			playAudio("Swoosh");
			
			setAlphaForObstacle();
				
			gamePause();
			
			resetToNormal();
			
		}
	}
	
	function setAlphaForObstacle(){
		if (disableCollisionCheck == true){
			building3.alpha = 0.4;
			building4.alpha = 0.4;
			building5.alpha = 0.4;
			building6.alpha = 0.4;
			for (var i=0; i<15; i++){
				part1as.children[i].alpha = 0.4;
				part1bs.children[i].alpha = 0.4;
				part1cs.children[i].alpha = 0.4;
				part1ds.children[i].alpha = 0.4;
				
				part2as.children[i].alpha = 0.4;
				part2bs.children[i].alpha = 0.4;
				part2cs.children[i].alpha = 0.4;
				part2ds.children[i].alpha = 0.4;
				
				part3s.children[i].alpha = 0.4;
				
				part4as.children[i].alpha = 0.4;
				part4bs.children[i].alpha = 0.4;
				part4cs.children[i].alpha = 0.4;
				part4ds.children[i].alpha = 0.4;
				
				part5as.children[i].alpha = 0.4;
				part5bs.children[i].alpha = 0.4;
				part5cs.children[i].alpha = 0.4;
				part5ds.children[i].alpha = 0.4;
			}
		}
		else{
			building3.alpha = 1;
			building4.alpha = 1;
			building5.alpha = 1;
			building6.alpha = 1;
			for (var i=0; i<15; i++){
				part1as.children[i].alpha = 1;
				part1bs.children[i].alpha = 1;
				part1cs.children[i].alpha = 1;
				part1ds.children[i].alpha = 1;
				
				part2as.children[i].alpha = 1;
				part2bs.children[i].alpha = 1;
				part2cs.children[i].alpha = 1;
				part2ds.children[i].alpha = 1;
				
				part3s.children[i].alpha = 1;
				
				part4as.children[i].alpha = 1;
				part4bs.children[i].alpha = 1;
				part4cs.children[i].alpha = 1;
				part4ds.children[i].alpha = 1;
				
				part5as.children[i].alpha = 1;
				part5bs.children[i].alpha = 1;
				part5cs.children[i].alpha = 1;
				part5ds.children[i].alpha = 1;
			}
		}
		
	}
	
	function resetToNormal(){	
		setTimeout(function(){
			if (reverseLayout == true){
				killObstacles();
				reverseText = game.add.bitmapText(450, 200, "SFComic", "Gravity Reversed", 36);
				var reverseTextTween = game.add.tween(reverseText).to({ x: 150,y: 200, alpha: 1 }, 500).to({ x: 170 }, 100);
				//var reverseTextTween = game.add.tween(reverseText).to({ x: 200,y: 200, alpha: 1 }, 600);
				reverseTextTween.start();
				// // my_media.pause();
				// // playAudio("Swoosh");
				player.anchor.setTo(1,0.5);
				player.scale.y = 1;
				reverseLayout = false;
				setTimeout(function(){
					reverseTextTween = game.add.tween(reverseText).to({alpha: 0 }, 100);
					reverseTextTween.start();

				},1000);
			}
			else if (disableCollisionCheck){
				killObstacles();
				disableText = game.add.bitmapText(450, 200, "SFComic", "Collision Enabled", 36);
				var disableTextTween = game.add.tween(disableText).to({ x: 150,y: 200, alpha: 1 }, 500).to({ x: 170 }, 100);
				//var reverseTextTween = game.add.tween(reverseText).to({ x: 200,y: 200, alpha: 1 }, 600);
				disableTextTween.start();
				// // my_media.pause();
				// // playAudio("Swoosh");
				setAlphaForObstacle();
				disableCollisionCheck = false;
				setTimeout(function(){
					disableTextTween = game.add.tween(disableText).to({alpha: 0 }, 100);
					disableTextTween.start();

				},1000);
			}
			else{
				resizeText = game.add.bitmapText(450, 200, "SFComic", "Player resized to normal", 48);
				var resizeTextTween = game.add.tween(resizeText).to({ x: 150,y: 200, alpha: 1 }, 500).to({ x: 170 }, 100);
				resizeTextTween.start();
				
				player.width = player.width * 2;
				player.height = player.height * 2; 
				
				playerNormal = true;
				setTimeout(function(){
					resizeTextTween = game.add.tween(resizeText).to({alpha: 0 }, 100);
					resizeTextTween.start();

				},1000);
			}
			
			

		},9000);
	}
	
	function gamePause(){
		setTimeout(function(){
				gameAlive = true;
				if (changedReverseLayout === true){
					// my_media.pause();
					// playAudio("bgmusic");
					reverseTextTween = game.add.tween(reverseText).to({alpha: 0 }, 100);
					reverseTextTween.start();
					
					reverseLayout = changedReverseLayout;
					pauseBackground = false;
					changedReverseLayout = false;
				}
				else{
					// my_media.pause();
					// playAudio("bgmusic");
					resizeTextTween = game.add.tween(resizeText).to({alpha: 0 }, 100);
					resizeTextTween.start();
					
					playerNormal = changedPlayerToNormal;
					pauseBackground = false;
				}
			},1000);
		
	}
   
   function addResizingObject(){
	    if (gameAlive === true){
			// resizeObjAppear = resizeObjAppear+1;
		    // if (resizeObjAppear === 3){
				resizeObjImg = resizeObjects.getFirstDead();
				resizeObjImg.visible = true;
				resizeObjImg.reset(989,150);
				
				var tween = game.add.tween(resizeObjImg).to({ x: -50,y: 150}, 3000);
				tween.start();
					   
				// Kill the points when it's no longer visible 
				resizeObjImg.checkWorldBounds = true;
				resizeObjImg.outOfBoundsKill = true;
				resizeObjImg.hit = true;
				// resizeObjAppear = 0;
		    // }
	    }
   }
   
   function addCollisionDisableObject(){
	   if (gameAlive === true){
			// resizeObjAppear = resizeObjAppear+1;
		    // if (resizeObjAppear === 3){
				collisionDisableImg = collisionDisableObjects.getFirstDead();
				collisionDisableImg.visible = true;
				collisionDisableImg.reset(989,150);
				
				var tween = game.add.tween(collisionDisableImg).to({ x: -50,y: 150}, 3000);
				tween.start();
					   
				// Kill the points when it's no longer visible 
				collisionDisableImg.checkWorldBounds = true;
				collisionDisableImg.outOfBoundsKill = true;
				collisionDisableImg.hit = true;
				// resizeObjAppear = 0;
		    // }
	    }
   }
	   
	function powerUp(){
		var ran = Math.floor(Math.random()*3)+1;
		
		if (ran === 1){
			addReverseObject();
		}
		else if (ran === 2){
			addResizingObject();
		}
		else{
			addCollisionDisableObject();
		}
	}
   
	function createBalloonGroup(){
		part1as = game.add.group();
		part1as.enableBody = true;
		part1as.createMultiple(15,'slice1a');
		
		part1bs = game.add.group();
		part1bs.enableBody = true;
		part1bs.createMultiple(15,'slice1b');
		
		part1cs = game.add.group();
		part1cs.enableBody = true;
		part1cs.createMultiple(15,'slice1c');
		
		part1ds = game.add.group();
		part1ds.enableBody = true;
		part1ds.createMultiple(15,'slice1d');
		
		part2as = game.add.group();
		part2as.enableBody = true;
		part2as.createMultiple(15,'slice2a');
		
		part2bs = game.add.group();
		part2bs.enableBody = true;
		part2bs.createMultiple(15,'slice2b');
		
		part2cs = game.add.group();
		part2cs.enableBody = true;
		part2cs.createMultiple(15,'slice2c');
		
		part2ds = game.add.group();
		part2ds.enableBody = true;
		part2ds.createMultiple(15,'slice2d');
		
		part3s = game.add.group();
		part3s.enableBody = true;
		part3s.createMultiple(15,'slice3');
		
		part4as = game.add.group();
		part4as.enableBody = true;
		part4as.createMultiple(15,'slice4a');
		
		part4bs = game.add.group();
		part4bs.enableBody = true;
		part4bs.createMultiple(15,'slice4b');
		
		part4cs = game.add.group();
		part4cs.enableBody = true;
		part4cs.createMultiple(15,'slice4c');
		
		part4ds = game.add.group();
		part4ds.enableBody = true;
		part4ds.createMultiple(15,'slice4d');
		
		part5as = game.add.group();
		part5as.enableBody = true;
		part5as.createMultiple(15,'slice5a');
		
		part5bs = game.add.group();
		part5bs.enableBody = true;
		part5bs.createMultiple(15,'slice5b');
		
		part5cs = game.add.group();
		part5cs.enableBody = true;
		part5cs.createMultiple(15,'slice5c');
		
		part5ds = game.add.group();
		part5ds.enableBody = true;
		part5ds.createMultiple(15,'slice5d');
	}
	
	function addVerticalObstacle(){
		if (gameAlive === true){
			var ran = Math.floor(Math.random()*2)+1;
			
			var balloonType = Math.floor(Math.random()*3)+1;
			
			getFirstDeadPart();
			checkSlices = checkSlices + 1;
			if (reverseLayout === true){
				if (checkSlices > 4 && ran === 2)
				{
					createBalloonAngle(500,500);
					setAngleTweenUp();
					part5d.down = false;
				}
				else{
					createBalloonAngle(500,0);
					setAngleTweenDown();
					part5d.down = true;
					
				}
			}
			else{
				if (ran === 1){
					createBalloon(500,0);
					setTweenMoveDown();
					part5d.down = true;
					checkSlices = 0;
			    }
			    else{
				   createBalloon(500,500);
				   setTweenMoveUp();
				   part5d.down = false;
				   checkSlices = 0;
			    }
			}

		   setBalloonPropertiesTween();
		   part5d.tweenBalloon = true;
		  
		}
	}
	
	function setBalloonPropertiesTween(){
		// part1a.body.velocity.x = -200; 
        part1a.checkWorldBounds = true;
        part1a.outOfBoundsKill = true;
		part1a.anchor.set(0.5,0.5);
		part1a.visible = true;
		
		// part1b.body.velocity.x = -200; 
        part1b.checkWorldBounds = true;
        part1b.outOfBoundsKill = true;
		part1b.anchor.set(0.5,0.5);
		part1b.visible = true;
		
		// part1c.body.velocity.x = -200; 
        part1c.checkWorldBounds = true;
        part1c.outOfBoundsKill = true;
		part1c.anchor.set(0.5,0.5);
		part1c.visible = true;
		
		// part1d.body.velocity.x = -200; 
        part1d.checkWorldBounds = true;
        part1d.outOfBoundsKill = true;
		part1d.anchor.set(0.5,0.5);
		part1d.visible = true;
		
		// part2a.body.velocity.x = -200; 
        part2a.checkWorldBounds = true;
        part2a.outOfBoundsKill = true;
		part2a.anchor.set(0.5,0.5);
		part2a.visible = true;
		
		// part2b.body.velocity.x = -200; 
        part2b.checkWorldBounds = true;
        part2b.outOfBoundsKill = true;
		part2b.anchor.set(0.5,0.5);
		part2b.visible = true;
		
		// part2c.body.velocity.x = -200; 
        part2c.checkWorldBounds = true;
        part2c.outOfBoundsKill = true;
		part2c.anchor.set(0.5,0.5);
		part2c.visible = true;
		
		// part2d.body.velocity.x = -200; 
        part2d.checkWorldBounds = true;
        part2d.outOfBoundsKill = true;
		part2d.anchor.set(0.5,0.5);
		part2d.visible = true;
		
		// part3.body.velocity.x = -200; 
        part3.checkWorldBounds = true;
        part3.outOfBoundsKill = true;
		part3.anchor.set(0.5,0.5);
		part3.visible = true;
		
		// part4a.body.velocity.x = -200; 
        part4a.checkWorldBounds = true;
        part4a.outOfBoundsKill = true;
		part4a.anchor.set(0.5,0.5);
		part4a.visible = true;
		
		// part4b.body.velocity.x = -200; 
        part4b.checkWorldBounds = true;
        part4b.outOfBoundsKill = true;
		part4b.anchor.set(0.5,0.5);
		part4b.visible = true;
		
		// part4c.body.velocity.x = -200; 
        part4c.checkWorldBounds = true;
        part4c.outOfBoundsKill = true;
		part4c.anchor.set(0.5,0.5);
		part4c.visible = true;
		
		// part4d.body.velocity.x = -200; 
        part4d.checkWorldBounds = true;
        part4d.outOfBoundsKill = true;
		part4d.anchor.set(0.5,0.5);
		part4d.visible = true;
		
		// part5a.body.velocity.x = -200; 
        part5a.checkWorldBounds = true;
        part5a.outOfBoundsKill = true;
		part5a.anchor.set(0.5,0.5);
		part5a.visible = true;
		
		// part5b.body.velocity.x = -200; 
        part5b.checkWorldBounds = true;
        part5b.outOfBoundsKill = true;
		part5b.anchor.set(0.5,0.5);
		part5b.visible = true;
		
		// part5c.body.velocity.x = -200; 
        part5c.checkWorldBounds = true;
        part5c.outOfBoundsKill = true;
		part5c.anchor.set(0.5,0.5);
		part5c.visible = true;
		
		// part5d.body.velocity.x = -200; 
        part5d.checkWorldBounds = true;
        part5d.outOfBoundsKill = true;
		part5d.anchor.set(0.5,0.5);
		part5d.visible = true;
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
				//playAudio("clickPlane");
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
		killObstacles();
		//my_media.pause();
		// playAudio("bgmusic");
		level = 0;
		gameAlive = true;
		skip = 0;
		game.state.start("Play",true,false);	
	}
	
	function gameOverScreen(){
		transparentOverlay = game.add.tileSprite(0,0,1500,1000,'transparentOverlay');
		gameOverBanner = game.add.sprite((innerWidth/1.5), 100, 'gameOverBanner');
		gameOverBanner.anchor.set(0.5,0.5);
		plane = game.add.sprite((innerWidth/1.5),185,'player');
		plane.width = 80;
		plane.anchor.set(0.5,0.5);
		planeMoveDown();
		
		//restartText = game.add.bitmapText(250, 430, "SFComic", "Touch anywhere to play again", 24);
		restartText = game.add.bitmapText((innerWidth/2.3), 430, "SFComic", "touch anywhere to play again", 24);
		restartText.alpha = 0.3;
		onCompleteBright();

		//gameOverScore = game.add.bitmapText(50, 280, "Kg", "Your Score: "+score, 36);
		gameOverScore = game.add.bitmapText(50, 280, "SFComic", "Your Score: "+score, 36);
		gameOverScore.alpha = 0.1;
		var gameOverScoreTween = game.add.tween(gameOverScore).to({ x: (innerWidth/2),y: 280, alpha: 1 }, 800);
		gameOverScoreTween.start();
		//bestScore = game.add.bitmapText(450, 330, "Kg", "Best Score: "+topScore, 24);
		bestScore = game.add.bitmapText(450, 330, "SFComic", "Best Score: "+topScore, 24);
		bestScore.alpha = 0.1;
		var bestScoreTween = game.add.tween(bestScore).to({ x: (innerWidth/1.8),y: 330, alpha: 1 }, 800);
		bestScoreTween.start();
		game.input.onDown.add(restart, this);
	}
	
	function planeMoveDown(){
		var tween = game.add.tween(plane).to( { y: 210}, 1000);
		tween.start();
		tween.onComplete.add(planeMoveUp, this);
	}
	
	function planeMoveUp(){
		var tween = game.add.tween(plane).to( { y: 160}, 1000);
		tween.start();
		tween.onComplete.add(planeMoveDown, this);
	}
	
	function onCompleteFade() {
		var tween = game.add.tween(restartText).to( {alpha: 0.3 }, 1000);
		tween.start();
		tween.onComplete.add(onCompleteBright, this);
	}
	
	function onCompleteBright() {
		var tween = game.add.tween(restartText).to( {alpha: 1 }, 1000);
		tween.start();
		tween.onComplete.add(onCompleteFade, this);
	}
	
	function stopBalloonMovement(){
		part1as.forEach(function(part1a){
			// if(part1a.inWorld == true){
				part1a.body.velocity.x = 0;
			// }
		},this);
		part1bs.forEach(function(part1b){
			// if(part1b.inWorld == true){
				part1b.body.velocity.x = 0;
			// }
		},this);
		part1cs.forEach(function(part1c){
			// if(part1c.inWorld == true){
				part1c.body.velocity.x = 0;
			// }
		},this);
		part1ds.forEach(function(part1d){
			// if(part1d.inWorld == true){
				part1d.body.velocity.x = 0;
			// }
		},this);
		
		part2as.forEach(function(part2a){
			// if(part2a.inWorld == true){
				part2a.body.velocity.x = 0;
			// }
		},this);
		part2bs.forEach(function(part2b){
			// if(part2b.inWorld == true){
				part2b.body.velocity.x = 0;
			// }
		},this);
		part2cs.forEach(function(part2c){
			// if(part2c.inWorld == true){
				part2c.body.velocity.x = 0;
			// }
		},this);
		part2ds.forEach(function(part2d){
			// if(part2d.inWorld == true){
				part2d.body.velocity.x = 0;
			// }
		},this);
		
		part3s.forEach(function(part3){
			// if(part3.inWorld == true){
				part3.body.velocity.x = 0;
			// }
		},this);
		
		part4as.forEach(function(part4a){
			// if(part4a.inWorld == true){
				part4a.body.velocity.x = 0;
			// }
		},this);
		part4bs.forEach(function(part4b){
			// if(part4b.inWorld == true){
				part4b.body.velocity.x = 0;
			// }
		},this);
		part4cs.forEach(function(part4c){
			// if(part4c.inWorld == true){
				part4c.body.velocity.x = 0;
			// }
		},this);
		part4ds.forEach(function(part4d){
			// if(part4d.inWorld == true){
				part4d.body.velocity.x = 0;
			// }
		},this);
		
		part5as.forEach(function(part5a){
			// if(part5a.inWorld == true){
				part5a.body.velocity.x = 0;
			// }
		},this);
		part5bs.forEach(function(part5b){
			// if(part5b.inWorld == true){
				part5b.body.velocity.x = 0;
			// }
		},this);
		part5cs.forEach(function(part5c){
			// if(part5c.inWorld == true){
				part5c.body.velocity.x = 0;
			// }
		},this);
		part5ds.forEach(function(part5d){
			// if(part5d.inWorld == true){
				part5d.body.velocity.x = 0;
			// }
		},this);
	}
	
	function gameOver() {
		gameAlive = false;
		
		skip = 0;
		localStorage.setItem("topScore",Math.max(score,topScore));	
		functionCalled = functionCalled+1;
		
		if (functionCalled === 1){
			my_media.pause();
			playAudio("Collision")
		
		stopBalloonMovement();
		
			building3.body.velocity.x = 0;
			building4.body.velocity.x = 0;
			building5.body.velocity.x = 0;
			building6.body.velocity.x = 0;
		
		player.body.velocity.y = 0;
		player.body.gravity.y = 0; 
		
		buildingWidth = building3.width/3;
		
		for (var i=0; i<15; i++){
			if (part3s.children[i].x < 360 && part3s.children[i].x > 230){
				collidedIndex = i;
			}
		}
		
		if (reverseLayout === true){
			if (collidedIndex >= 0 && collidedIndex < 15){
				if (part3s.children[collidedIndex].y < player.y && part3s.children[collidedIndex].x > player.x){
					explosion = game.add.sprite(player.x, player.y-18, 'explosion');
				}
				else if (part3s.children[collidedIndex].y > player.y && part3s.children[collidedIndex].x > player.x){
					explosion = game.add.sprite(player.x, player.y+18 , 'explosion');
				}
				else if (part3s.children[collidedIndex].y < player.y && part3s.children[collidedIndex].x < player.x){
					explosion = game.add.sprite(player.x-40, player.y -18, 'explosion');
				}
				else if (part3s.children[collidedIndex].y > player.y && part3s.children[collidedIndex].x < player.x){
					explosion = game.add.sprite(player.x-40, player.y +18, 'explosion');
				}
			}
			else{
				if ((building3.x > 0 && building3.x+buildingWidth < player.x) || (building4.x > 0 && building4.x+buildingWidth < player.x) || (building5.x > 0 && building5.x+buildingWidth < player.x) || (building6.x > 0 && building6.x+buildingWidth < player.x)){
					explosion = game.add.sprite(player.x-30, player.y, 'explosion');
				}
				else if ((building3.x > 0 && building3.x < player.x) || (building4.x > 0 && building4.x < player.x) || (building5.x > 0 && building5.x < player.x) || (building6.x > 0 && building6.x < player.x)){
					explosion = game.add.sprite(player.x, player.y - 18, 'explosion');
				}
				else{
					explosion = game.add.sprite(player.x-40, player.y - 18, 'explosion');
				}
			
			}
			
		}
		else{
			if (collidedIndex >= 0 && collidedIndex < 15){
				if (part3s.children[collidedIndex].y < player.y && part3s.children[collidedIndex].x > player.x){
					explosion = game.add.sprite(player.x+40, player.y, 'explosion');
				}
				else if (part3s.children[collidedIndex].y > player.y && part3s.children[collidedIndex].x > player.x){
					explosion = game.add.sprite(player.x + 40, player.y , 'explosion');
				}
				else if (part3s.children[collidedIndex].y < player.y && part3s.children[collidedIndex].x < player.x){
					explosion = game.add.sprite(player.x-40, player.y , 'explosion');
				}
				else if (part3s.children[collidedIndex].y > player.y && part3s.children[collidedIndex].x < player.x){
					explosion = game.add.sprite(player.x-40, player.y , 'explosion');
				}
			}
			else{
				if ((building3.x > 0 && building3.x+buildingWidth < player.x) || (building4.x > 0 && building4.x+buildingWidth < player.x) || (building5.x > 0 && building5.x+buildingWidth < player.x) || (building6.x > 0 && building6.x+buildingWidth < player.x)){
					explosion = game.add.sprite(player.x-30, player.y, 'explosion');
				}
				else if ((building3.x > 0 && building3.x < player.x) || (building4.x > 0 && building4.x < player.x) || (building5.x > 0 && building5.x < player.x) || (building6.x > 0 && building6.x < player.x)){
					explosion = game.add.sprite(player.x+10, player.y + 18, 'explosion');
				}
				else{
					explosion = game.add.sprite(player.x+40, player.y , 'explosion');
				}
			}
		}
		explosion.anchor.set(0.5,0.5);
		
		reverseLayout = false;
		
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
		part1a.visible = true;
		part1b.reset((x+24), (y+12));
		part1b.angle = 180;
		part1b.visible = true;
		part1c.reset((x+21), (y+12));
		part1c.angle = 180;
		part1c.visible = true;
		part1d.reset((x+18), (y+12));
		part1d.angle = 180;
		part1d.visible = true;
		
		part2a.reset((x+15), (y+12));
		part2a.angle = 180;
		part2a.visible = true;
		part2b.reset((x+12), (y+12));
		part2b.angle = 180;
		part2b.visible = true;
		part2c.reset((x+9), (y+12));
		part2c.angle = 180;
		part2c.visible = true;
		part2d.reset((x+6), (y+10));
		part2d.angle = 180;
		part2d.visible = true;
		
		part3.reset(x, y);
		part3.angle = 180;
		part3.visible = true;
		
		part4a.reset((x-6), (y+10));
		part4a.angle = 180;
		part4a.visible = true;
		part4b.reset((x-9), (y+12));
		part4b.angle = 180;
		part4b.visible = true;
		part4c.reset((x-12), (y+12));
		part4c.angle = 180;
		part4c.visible = true;
		part4d.reset((x-15), (y+12));
		part4d.angle = 180;
		part4d.visible = true;
		
		part5a.reset((x-18), (y+12));
		part5a.angle = 180;
		part5a.visible = true;
		part5b.reset((x-21), (y+12));
		part5b.angle = 180;
		part5b.visible = true;
		part5c.reset((x-24), (y+12));
		part5c.angle = 180;
		part5c.visible = true;
		part5d.reset((x-27), (y+12));
		part5d.angle = 180;
		part5d.visible = true;
	}
	
	function getFirstDeadPart(){
		part1a = part1as.getFirstDead();
		for (var i=0; i<15;i++){
			if (part1as.children[i].x === part1a.x && part1as.children[i].y === part1a.y){
				index = i;
			}
		}
		part1a = part1as.children[index];
		part1b = part1bs.children[index];
		part1c = part1cs.children[index];
		part1d = part1ds.children[index];
		
		part2a = part2as.children[index];
		part2b = part2bs.children[index];
		part2c = part2cs.children[index];
		part2d = part2ds.children[index];
		
		part3 = part3s.children[index];
		
		part4a = part4as.children[index];
		part4b = part4bs.children[index];
		part4c = part4cs.children[index];
		part4d = part4ds.children[index];
		
		part5a = part5as.children[index];
		part5b = part5bs.children[index];
		part5c = part5cs.children[index];
		part5d = part5ds.children[index];
	}
	
	function createBalloon(x,y){
		part1a.reset((x-27), (y-12));
		part1a.angle = 0;
		part1a.visible = true;
		part1b.reset((x-24), (y-12));
		part1b.angle = 0;
		part1b.visible = true;
		part1c.reset((x-21), (y-12));
		part1c.angle = 0;
		part1c.visible = true;
		part1d.reset((x-18), (y-12));
		part1d.angle = 0;
		part1d.visible = true;
		
		part2a.reset((x-15), (y-12));
		part2a.angle = 0;
		part2a.visible = true;
		part2b.reset((x-12), (y-12));
		part2b.angle = 0;
		part2b.visible = true;
		part2c.reset((x-9), (y-12));
		part2c.angle = 0;
		part2c.visible = true;
		part2d.reset((x-6), y-10);
		part2d.angle = 0;
		part2d.visible = true;
		
		part3.reset(x, y);
		part3.angle = 0;
		part3.visible = true;
		
		part4a.reset((x+6), y-10);
		part4a.angle = 0;
		part4a.visible = true;
		part4b.reset((x+9), (y-12));
		part4b.angle = 0;
		part4b.visible = true;
		part4c.reset((x+12), (y-12));
		part4c.angle = 0;
		part4c.visible = true;
		part4d.reset((x+15), (y-12));
		part4d.angle = 0;
		part4d.visible = true;
		
		part5a.reset((x+18), (y-12));
		part5a.angle = 0;
		part5a.visible = true;
		part5b.reset((x+21), (y-12));
		part5b.angle = 0;
		part5b.visible = true;
		part5c.reset((x+24), (y-12));
		part5c.angle = 0;
		part5c.visible = true;
		part5d.reset((x+27), (y-12));
		part5d.angle = 0;
		part5d.visible = true;
	}
	
	function setBalloonProperties(){
		part1a.body.velocity.x = -200; 
		part1a.anchor.set(0.5,0.5);
		part1a.visible = true;
		part1a.checkWorldBounds = true;
        part1a.outOfBoundsKill = true;
		
		part1b.body.velocity.x = -200; 
		part1b.anchor.set(0.5,0.5);
		part1b.visible = true;
		part1b.checkWorldBounds = true;
        part1b.outOfBoundsKill = true;
		
		part1c.body.velocity.x = -200; 
		part1c.anchor.set(0.5,0.5);
		part1c.visible = true;
		part1c.checkWorldBounds = true;
        part1c.outOfBoundsKill = true;
		
		part1d.body.velocity.x = -200; 
		part1d.anchor.set(0.5,0.5);
		part1d.visible = true;
		part1d.checkWorldBounds = true;
        part1d.outOfBoundsKill = true;
		
		part2a.body.velocity.x = -200; 
		part2a.anchor.set(0.5,0.5);
		part2a.visible = true;
		part2a.checkWorldBounds = true;
        part2a.outOfBoundsKill = true;
		
		part2b.body.velocity.x = -200; 
		part2b.anchor.set(0.5,0.5);
		part2b.visible = true;
		part2b.checkWorldBounds = true;
        part2b.outOfBoundsKill = true;
		
		part2c.body.velocity.x = -200; 
		part2c.anchor.set(0.5,0.5);
		part2c.visible = true;
		part2c.checkWorldBounds = true;
        part2c.outOfBoundsKill = true;
		
		part2d.body.velocity.x = -200; 
        part2d.checkWorldBounds = true;
        part2d.outOfBoundsKill = true;
		part2d.anchor.set(0.5,0.5);
		part2d.visible = true;
		
		part3.body.velocity.x = -200; 
        part3.checkWorldBounds = true;
        part3.outOfBoundsKill = true;
		part3.anchor.set(0.5,0.5);
		part3.visible = true;
		
		part4a.body.velocity.x = -200; 
        part4a.checkWorldBounds = true;
        part4a.outOfBoundsKill = true;
		part4a.anchor.set(0.5,0.5);
		part4a.visible = true;
		
		part4b.body.velocity.x = -200; 
        part4b.checkWorldBounds = true;
        part4b.outOfBoundsKill = true;
		part4b.anchor.set(0.5,0.5);
		part4b.visible = true;
		
		part4c.body.velocity.x = -200; 
        part4c.checkWorldBounds = true;
        part4c.outOfBoundsKill = true;
		part4c.anchor.set(0.5,0.5);
		part4c.visible = true;
		
		part4d.body.velocity.x = -200; 
        part4d.checkWorldBounds = true;
        part4d.outOfBoundsKill = true;
		part4d.anchor.set(0.5,0.5);
		part4d.visible = true;
		
		part5a.body.velocity.x = -200; 
        part5a.checkWorldBounds = true;
        part5a.outOfBoundsKill = true;
		part5a.anchor.set(0.5,0.5);
		part5a.visible = true;
		
		part5b.body.velocity.x = -200; 
        part5b.checkWorldBounds = true;
        part5b.outOfBoundsKill = true;
		part5b.anchor.set(0.5,0.5);
		part5b.visible = true;
		
		part5c.body.velocity.x = -200; 
        part5c.checkWorldBounds = true;
        part5c.outOfBoundsKill = true;
		part5c.anchor.set(0.5,0.5);
		part5c.visible = true;
		
		part5d.body.velocity.x = -200; 
        part5d.checkWorldBounds = true;
        part5d.outOfBoundsKill = true;
		part5d.anchor.set(0.5,0.5);
		part5d.visible = true;
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
			for (var i=0;i<5;i++){
				extraPoints.children[i].kill();
			}
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
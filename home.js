var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var gameRatio = innerWidth/innerHeight;	
//var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.AUTO);

var playAudio = function(audioID) {
	
	var audioElement = document.getElementById(audioID);
	var url = audioElement.getAttribute('src');
	
	var loop = function (status) {
		if (status === Media.MEDIA_STOPPED && gameAlive === true) {
			my_media.play();
		}
	};
	
	// my_media = new Media(url, null, null, loop); 
	
		my_media = new Media(url, null, null); 

	
		   // // // Play audio
	 my_media.play();
	// // $("#Plane").on("ended", playAudio("Plane"));
} 

var home = function(game){}
	home.prototype = {
		preload: function() { 
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("layer1", "assets/layer-1_small.png");
			game.load.image("layer3", "assets/layer-3_small.png");
			game.load.image("layer2", "assets/layer-2_small.png");
			game.load.image("layer6", "assets/layer-6_small.png");
			
			game.load.image("player", "assets/plane.png");
			game.load.image("pipe", "assets/obstacle.png");
			game.load.image("pipe1", "assets/purpleBalloon.png");
			game.load.image("pipe2", "assets/brownBalloon.png");
			
			game.load.image("gameOverBanner", "assets/gameOverBanner.png");
			game.load.image("transparentOverlay", "assets/gradient.png");
			game.load.spritesheet("buildingSprites","assets/spritesheet.png",110,233,5);
			game.load.bitmapFont('SFComic', 'assets/font.png', 'assets/font.fnt');
			game.load.bitmapFont('Kg', 'assets/Kgfont.png', 'assets/Kgfont.fnt');
		
		},
		create: function() { 
			layer1 = game.add.sprite(0, 0, 'layer1');
			layer1_dup = game.add.sprite(900, 0, 'layer1');
			// // // layers.add(layer1);
			// // // // layer1.z = 0;
			
			layer3 = game.add.sprite(0, 0, 'layer3');
			layer3_dup = game.add.sprite(1000, 0, 'layer3');
			
			layer2 = game.add.sprite(0, 0, 'layer2');
			layer2_dup = game.add.sprite(980, 0, 'layer2');
			// // // layers.add(layer2);
			
			// // // layers.add(layer3);
			
			layer6 = game.add.sprite(0, 0, 'layer6');
			layer6_dup = game.add.sprite(1030, 0, 'layer6');
			
			building4 = game.add.sprite(100, 340, 'buildingSprites',2);
			building6 = game.add.sprite(789, 250, 'buildingSprites',5);
			
			ob1 = game.add.sprite(150,100,'pipe');
			ob1.height = 90;
			ob1.width = 60
			ob2 = game.add.sprite(689,180,'pipe1');
			ob2.height = 90;
			ob2.width = 60
			
			playAudio("bgmusic");
			//game.input.onDown.add(startGame, this);
			
			menuScreen();
			
		},
		update: function() {
			
		}
	}
	
game.state.add("Home",home);
game.state.start("Home");

 function startGame() {
	game.state.add("Play",play);
	game.state.start("Play");
 }
 
 function menuScreen() {
		transparentOverlay = game.add.tileSprite(0,0,1500,1000,'transparentOverlay');
		gameOverBanner = game.add.sprite((innerWidth/1.4), 130, 'gameOverBanner');
		gameOverBanner.anchor.set(0.5,0.5);
		//plane = game.add.sprite((innerWidth/2.75),200,'player');
		plane = game.add.sprite((innerWidth/1.5),190,'player');
		plane.width = 80;
		plane.anchor.set(0.5,0.5);
		planeMoveDown();
		
		//startText = game.add.bitmapText((innerWidth/4), 430, "SFComic", "Touch anywhere to start game", 36);
		startText = game.add.bitmapText((innerWidth/3.75), 400, "SFComic", "touch anywhere to start game", 36);
		startText.alpha = 0.3;
		onCompleteRight();
		
		game.input.onDown.add(startGame, this);
 }
 
	function planeMoveDown(){
		var tween = game.add.tween(plane).to( {y: 230}, 1000);
		tween.start();
		tween.onComplete.add(planeMoveUp, this);
	}
	
	function planeMoveUp(){
		var tween = game.add.tween(plane).to( { y: 200}, 1000);
		tween.start();
		tween.onComplete.add(planeMoveDown, this);
	}
 
 function onCompleteLeft() {
		var tween = game.add.tween(startText).to( {alpha: 0.3 }, 1000);
		tween.start();
		tween.onComplete.add(onCompleteRight, this);
	}
	
	function onCompleteRight() {
		var tween = game.add.tween(startText).to( { alpha: 1 }, 1000);
		tween.start();
		tween.onComplete.add(onCompleteLeft, this);
	}

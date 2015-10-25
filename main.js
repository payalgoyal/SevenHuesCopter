var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var gameRatio = innerWidth/innerHeight;	
var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.AUTO);

var main = function(game){}
	main.prototype = {
		preload: function() { 
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("splash", "splash.png");
		
		},
		create: function() { 
		splash = game.add.sprite(0, 0, 'splash');
		
		game.input.onDown.add(startMenuPage, this);
		timer = game.time.events.loop(5000, startMenuPage, this);
		},
		update: function() {
			
		}
	}
	
game.state.add("Main",main);
game.state.start("Main");


function startMenuPage(){
	game.state.add("Home",home);
	game.state.start("Home");
}
 
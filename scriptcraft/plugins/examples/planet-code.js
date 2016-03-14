/*************************************************************************
## Example Plugin #5 - Re-use - Using your own and others modules.

A simple minecraft plugin. Using Modules.

### Usage: 

At the in-game prompt type ...
  
    /jsp hello-module

... and a message `Hello {player-name}` will appear (where {player-name} is 
replaced by your own name).
  
This example demonstrates the use of modules. In
example-1-hello-module.js we created a new javascript module. In
this example, we use that module...

 * We load the module using the `require()` function. Because this
   module and the module we require are n the same directory, we
   specify `'./example-1-hello-module'` as the path (when loading a
   module from the same directory, `./` at the start of the path
   indicates that the file should be searched for in the same
   directory.

 * We assign the loaded module to a variable (`greetings`) and then
   use the module's `hello` method to display the message. 

Source Code...

    var greetings = require('./example-1-hello-module');
    command( 'hello-module', function( parameters, player ) {
      greetings.hello( player );
    });

***/

var Drone = require('drone'),
	blocks = require('blocks'),
    teleport = require('teleport'),
    utils = require('utils'),
	slash = require('slash');


var posY = 0; //middle of the sky
var posZ = 100;

var scaleBlock = 150; // 200 block diameter for the Sun
var Sun = 1391900
var distFactor = 100; //make the distances smaller
var scaleFactor = scaleBlock/Sun;

var planets ={
  'Mercury':[4866, 57950000, blocks.wool.gray],	
  'Venus':[12106, 108110000, blocks.wool.white],
  'Earth':[12742, 149570000, blocks.wool.blue],
  'Mars':[6760, 227840000, blocks.wool.red],
  'Jupiter':[142984,778140000, blocks.wool.yellow],
  'Saturn':[116438, 1427000000, blocks.wool.lightgray],
  'Uranus':[46940, 2870300000, blocks.wool.lightblue],
  'Neptune':[45432, 4499900000, blocks.wool.purple],
  'Pluto':[2274,5913000000, blocks.wool.pink]};


command( 'Sun', function( parameters, player ) {
  
  
  
    var posX = 0.0;
    var radius = scaleBlock/2;

    var cmLocation = Packages.net.canarymod.api.world.position.Location;
    var loc =  new cmLocation( player.world, posX, posY, posZ, 0, 0);

  	teleport(player, loc);

  	if(parameters[0] == 'create'){
	  
    	var d = new Drone(player);
    	d.sphere0(blocks.glowstone, radius);
	  	echo(player, 'Creating the Sun');
	}
});

command( 'planet', function( parameters, player ) {
  	var planet = parameters[0];
  	if(planet in planets){

	  var posX = scaleFactor * planets[planet][1]/ distFactor;
	  var radius = scaleFactor * planets[planet][0];

	  var block = planets[planet][2];

	  var cmLocation = Packages.net.canarymod.api.world.position.Location;
	  var loc =  new cmLocation( player.world, posX, posY + scaleBlock/2, posZ, 0, 0);

	  teleport(player, loc);

	  var d = new Drone(player);
	  d.sphere0(block, radius);
	  echo(player, 'Creating ' + planet);

	}else{
	  echo(player,'ERROR valid planets:\nMercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto');
	}
});


command( 'light', function( parameters, player ) {
	player.location.world.setTime(1000);

  
	slash([
	  'time set 6000',
	  'weather clear 1000000'
	], player);
  
});


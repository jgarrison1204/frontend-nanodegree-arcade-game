// Enemies our player must avoid
WIDTH = 505;
// Global array to randomize the speed of enenmies at 
var speeds = [50, 100, 150, 200, 250, 300];

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //sets the width and height for enemies for 2D collision dection. These values could be refined.
    this.width = 100; 
    this.height = 82;
   
    //Selects randmon index from speeds array
    this.speed = speeds[(Math.floor(Math.random() * speeds.length))];
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // sets the speed of the enemy from the speed property in the instance of enemy. 
    this.x += this.speed * dt;

    // restarts enemy position and speeds randomly on y-axis after enemy has traveled off canvas.
    if (this.x >= WIDTH) {
        var newStartLocation = Math.floor(Math.random() * 275);
        this.y = newStartLocation;
        this.x = 0;
        this.speed = speeds[(Math.floor(Math.random() * speeds.length))];
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.width = 100; 
    this.height = 82;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    this.collision();
};

Player.prototype.collision = function(){
    allEnemies.forEach(function(enemy){
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y
            ){
            player.reset();
        };
    });
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    if (key == "right" && this.x < 400) {
        this.x += 100;
    }else if (key == "left" && this.x > 0) {
        this.x += -100;
    }else if (key == "up" && this.y > 71 && this.y > 0) {
        this.y += -82;
    }else if (key == "down" && this.y < 400) {
        this.y += 82;
    }else if (this.y <= 71) {
        winCounter();
        this.reset();
    };
};

Player.prototype.reset = function(){
    this.x = startingX;
    this.y = startingY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug = new Enemy(0, 50);
var bug1 = new Enemy(0, 225);
var bug2 = new Enemy(0, 125);

var allEnemies = [bug, bug1, bug2];
var startingX = 200;
var startingY = 400;
var player = new Player(startingX, startingY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var counter = 0
function winCounter(){
    counter += 1;   
    document.getElementById("win-counter").innerHTML = counter;
}
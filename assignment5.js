/* Create the canvas*/
var canvas = document.createElement("canvas");

var cxt = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
canvas.style.border = "2px solid black";
document.body.appendChild(canvas);

/* Background image*/
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/leaves.jpg";

/* Lady Bug image*/
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "images/bug.png";

var score = 0;

/* Game objects*/
var bug = {

    spead: 2600 // movement in pixels per second
}

canvas.onmousedown = function (event) {

var rect = canvas.getBoundingClientRect();
mouseX = rect.left;
mouseY = rect.top;

    if ((event.clientX - mouseX) >= bug.x
        && (event.clientX - mouseX) <= bug.x + 70
        && (event.clientY - mouseY) >= bug.y
        && (event.clientY - mouseY) <= bug.y + 70)
    {
        
        reset();
        bug.spead -= 50;
        if (bug.spead > 1600) {
            ++score;
        }
        if (bug.spead == 1600)
        {
            ++score;
            swal("Well done!","Let's go to the next level");
        }
        if (bug.spead < 1600 && bug.spead > 800)
        {
            ++score;
        }
        if (bug.spead == 800)
        {
            ++score;
            swal("Good job!","Next level");
        }
        if (bug.spead < 800 && bug.spead > 0) {
    
            ++score;
        }
        else if (bug.spead == 0) {
            ++score;
            swal("Congratulation!","You are the winner");
            score = 0;
            bug.spead = 2600;
        }
               
        then = Date.now()
    }
}

/* Reset the game when the player catches the bug*/
var reset = function () {
    /* Throw the bug somewhere on the screen randomly*/
    bug.x = 70 + Math.random() * ((canvas.width - 125) - 70);
    bug.y = 70 + Math.random() * ((canvas.height - 125) - 70);

}

/* Draw everything on canvas*/
var render = function () {
    
    if (bgReady) {
        cxt.drawImage(bgImage,0,0);
    }
    if (bugReady) {
        cxt.drawImage(bugImage, bug.x, bug.y);
    }
    
    var scoreResult = document.getElementById('scoreDisplay');
    var result = "Score: " + score;
    scoreResult.innerHTML = result;
}
function resetScore() {
    score = 0;
    bug.spead = 2600;
}
function resetSpeed() {
    bug.spead = 2600;
}

scoreResult = score.value;

/* The main game loop*/
var main = function () {
    var now = Date.now();
    var delta = now - then;
    if (delta > bug.spead) {
        reset();
        then = now;
    }
    render();

    requestAnimationFrame(main);
}
/* Cross-browser support for requestAnimationFrame*/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

/* Let's play this game!*/
reset();
var then = Date.now();
main();


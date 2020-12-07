var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=0;

/**
 * Play specified sound in sounds/<name>.mp3
 * @param {string} name : name of the sound file, without extension.
 */
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * Animate the button of a specified color by adding the pressed class
 * and removing it after 100 ms.
 * @param {string} currentColor - color of the button to press
 */
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

/**
 * function to find a random color and show that randomly chosen color to the player
 * also increments the level of the player
 */
function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level "+level);
}

/**
 * Check the clicked button matches the game pattern
 * @param {int} currentLevel - the index to check in the gamePattern and userClickedPattern
 * @returns 1 if matches, 0 if not
 */
function checkAnswer(currentLevel){
  return gamePattern[currentLevel]===userClickedPattern[currentLevel];
}

/**
 * Game over - shows red game-over background and removes after 200 ms
 * Changes title to be game over.
 */
function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(()=>{
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
}

/**
 * startOver function, restarts level and started both to 0 and gamePattern to empty list
 */
function startOver(){
  level=0;
  gamePattern=[];
  started=0;
}

/**
 * on click, store what the user clicked and push it to their pattern
 * play sounds and animate the press.
 * Validate the user selected answer and if there is no pattern left to match
 *  add onto the sequence and reset userClickedPattern so they have to click all.
 */
$(".btn").on("click", function (event) {
  var userChosenColor=$(this).attr("id"); //could also do this.id
  var idx=userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(!checkAnswer(idx-1)){
    gameOver();
    startOver();
  }
  if (gamePattern.length===userClickedPattern.length){
    setTimeout(() => {
      nextSequence();
    }, 1000);
    userClickedPattern=[];
  }
});

/**
 * start for the game, picks the first in the sequence
 * updates the title to level 0
 */
$(document).on("keypress", function(){
  if (started!==0){
    return;
  }
  started=1;
  userClickedPattern=[]
  nextSequence();
  $("h1").text("Level "+level);
});

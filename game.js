var buttonColours = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
  
    playSound(userChosenColor);

    animatepress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
  
});

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();}, 1000)
      }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").removeClass("game-over");
    $("#level-title").text("Game Over, press any key to continue.")
    },200);
    startOver();
}
}
  
function nextSequence() {
  userClickedPattern=[];
  
  var randomNumber = Math.floor(Math.random() * 4);
  
    var randomChosenColor = buttonColours[randomNumber];
  
    gamePattern.push(randomChosenColor);
  
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  
  //play new color audio
  
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
  
    };
  
function playSound(name) {
  
  var audio = new Audio("sounds/" + name + ".mp3");
  
  audio.play();
  };

function animatepress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


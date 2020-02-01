
$(document).ready(function() {
  	if ($("video").prop('muted', false)){
      $("#mute").css("background-image","url(http://image.flaticon.com/icons/svg/10/10430.svg)");
    }

  $("#mute").click( function (){
    if( $("video").prop('muted') ) {
      $("video").prop('muted', false);
      $("#mute").css("background-image","url(http://image.flaticon.com/icons/svg/10/10430.svg)");
    } else {
      $("video").prop('muted', true);
      $("#mute").css("background-image","url(http://image.flaticon.com/icons/svg/10/10776.svg)");
    }
  });
  });














var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

if( $("video").prop('muted')===false){
  playSound(userChosenColour);

}


  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      if( $("video").prop('muted')===false){

      playSound("wrong");
    }
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  if( $("video").prop('muted')===false){

  playSound(randomChosenColour);
}
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("../sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

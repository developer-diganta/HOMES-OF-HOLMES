var i=0;
var level=0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];


$(".imgg").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(){
  if(i==0){
    i=1;
    $(".lvl").html("Level "+level);
    nextSequence();
  }
}
);
function nextSequence(){
  userClickedPattern = [];
  if(level==2){
    window.location.href="/round3";
  }
  level=level+1;
  $(".lvl").html("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");

  if(gamePattern.length===userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
else{
  var wrong=new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  console.log("Wrong!");
  $(".lvl").html("Game Over, Press Any Key to Restart");
  startOver();
}
}

function startOver(){
  level=0;
  i=0;
  gamePattern=[]
}

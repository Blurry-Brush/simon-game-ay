var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

//pattern generation
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//first time started or after the wrong one.
$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAns(currentLevel){
    //no need for loop if in between was wrong it would have been detected early on.
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
       
        if(userClickedPattern.length === gamePattern.length){


            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }
    else{
       wrong();
    }
}

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}
//wrong
function wrong(){
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press any Key to Restart");
    startOver();
}

//user input
$(".btn").click(function(e){
    //var userChosenColour = e.target.id;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAns(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

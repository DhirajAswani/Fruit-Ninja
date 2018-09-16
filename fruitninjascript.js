var playing = false;
var score;
var trialsLeft;
var action; 
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];

$(function(){
    
    $("#startreset").click(function(){
        if(playing == true){
            location.reload();
        }
        else{
            
//            we are not playing but starting to play
            playing = true;
            score = 0;
            $("#scorevalue").text(score);
            trialsLeft = 3;
            $("#trialsLeft").show();
            addHearts();
            
            
//            hide gameover og previous time if there
            $("#gameOver").hide();
            
            $("#startreset").text("Reset Game");
//            start sending fruits
            startAction();
        }
    });
    
    
    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i < trialsLeft ; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class=life>')
        }
    }
    
    
    function startAction(){
        console.log("before display");
        $("#fruit1").css("display","block");
        console.log("after display");
        chooseFruit();
        console.log("after generating fruit");
        $("#fruit1").css({
            'left':Math.round(500*Math.random()),
            'top':'-50px',
        });
        
        step = 1+Math.round(Math.random() * 5);
        action = setInterval(function(){
            $("#fruit1").css("top",$("#fruit1").position().top + step);
            
            if($("#fruit1").position().top > 
              $("#fruitsContainer").height()){
                if(trialsLeft > 1){
                    $("#fruit1").show();
                    chooseFruit();
                    
                    $("#fruit1").css({
                        'left':Math.round(500*Math.random()),
                        'top':'-50px',
                    });
                    
                    step = 1+Math.round(Math.random() * 5);
                    trialsLeft--;
                    addHearts();
                }
                else{
//                    game is over
                    playing = false;
                    $("#startreset").text("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over</p><p>Your score is : "+score+"</p>");
                    $("#trialsLeft").hide();
                    $("#fruit1").hide();
                    stopAction();
                }
            }
        },10);
    }
    
    function chooseFruit(){
        $("#fruit1").attr("src","images/" + fruits[Math.round((fruits.length-1)* Math.random())] +".png")
    }
    
    function stopAction(){
        clearInterval(action);
    }
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").text(score);
        $("#slicesound")[0].play();
        
        stopAction();
        
        $("#fruit1").hide("explode",500);
        setTimeout(startAction,600);
    });
    
});
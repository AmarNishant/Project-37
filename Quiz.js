class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    var heading = createElement('h1');
    heading.html("RESULT OF QUIZ");
    heading.position(350, 0);


    //call getContestantInfo( ) here

    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined

    if(allContestants !== 0){
      fill("blue");
      textSize(20);
      text("*NOTE: Contestants who answered correct are highlighted in green color!", 130, 230);

      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer){
          fill("green");
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 130, 250);
        }
        else {
          fill("red");
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 130, 270);
        }
      }
    }



    //write code to add a note here

    //write code to highlight contest who answered correctly
    
  }

}

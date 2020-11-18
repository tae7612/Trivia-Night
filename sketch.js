var apiRoot = "https://opentdb.com/api.php?amount=50&type=multiple"
var categoriesApi = "https://opentdb.com/api_category.php";
var categories;
var trivia = [];
var json;
var score =0;
var count;
var btnSelect;
var answers = [];
var answered = false;
var fade = 255;
var fadeAmnt =1;
var bg;
var font;


function preload(){
    font = loadFont("Bangers-Regular.ttf");
    json = loadJSON(categoriesApi,getCategory);
    getTriviaCategory(31);
    bg = loadImage("bg.jpg");
   
}

function setup() {
    
    let triviaBoard = createCanvas(windowWidth, windowHeight);
    triviaBoard.position(0,0);
    triviaBoard.style('z-index', '-1');
    triviaBoard.class('border-box').parent('canvasContainer');
    
   
    
    
}

function draw() {
    background(bg);
    textSize(70);
    textFont(font);
    textAlign(CENTER);
    text("Anime Trivia", windowWidth/2, 90);
     textSize(24);
    text("Score: "+score, windowWidth/2, 130);
    if(trivia.length > 0){
        textSize(25);
        //Question
        var question = trivia[count].question;
        question = question.replace(/&quot;/g, '"');
        question = question.replace(/&#039;/g, '\'');
        text(question, windowWidth/2, 180);
        
        //Answers
        
        if(answers.length < 1){
            correctAns = trivia[count].correct_answer;
            answers = trivia[count].incorrect_answers;
            answers.push(correctAns);
             console.log(answers);
            shuffle(answers, true);
            setBtns(answers);
        }
        
        if(answered){
            push();
                textSize(17);
                stroke(fade);
                fill("red");
                if (fade < 130) fadeAmnt = 1;

                if (fade > 255) fadeAmnt = -1;

                fade += fadeAmnt;
                text("Press Space to continue", windowWidth/2, 220);
            pop();
            


        }
        
        
    }
    

}

function checkAnswer(ans, correctAns){
   console.log(ans);
    if(!answered){    
         
        if(ans == correctAns){
            score = score +1;
            console.log(score);
        }
        
        answered = true;
        answerShow(ans, correctAns);
    

    }
   
}

function setBtns(answers){
    aBtn = select('#aBtn');
    aBtn.html(answers[0]);
    //Remove previous Button Classes
    aBtn.removeClass("btn-success");
    aBtn.removeClass("btn-danger");
    aBtn.addClass('btn-primary');
    aBtn.mousePressed(function() {
        console.log(answers);
        checkAnswer(aBtn.html(), correctAns);
        
    });
   
    
    bBtn = select('#bBtn');
    bBtn.html(answers[1]);
    //Remove previous Button Classes
    bBtn.removeClass("btn-success");
    bBtn.removeClass("btn-danger");
    bBtn.addClass('btn-primary');
    bBtn.mousePressed(function() {
        checkAnswer(bBtn.html(), correctAns);
        
    });
    
    cBtn = select('#cBtn');
    cBtn.html(answers[2]);
    //Remove previous Button Classes
    cBtn.removeClass("btn-success");
    cBtn.removeClass("btn-danger");
    cBtn.addClass('btn-primary');
    cBtn.mousePressed(function() {
        checkAnswer(cBtn.html(), correctAns);
        
    });
    
    dBtn = select('#dBtn');
    dBtn.html(answers[3]);
    //Remove previous Button Classes
    dBtn.removeClass("btn-success");
    dBtn.removeClass("btn-danger");
    dBtn.addClass('btn-primary');
    dBtn.mousePressed(function() {
        checkAnswer(dBtn.html(), correctAns);
        
    });
}


function answerShow(ans, correctAns){
    var id = "";
    // Answer Buttons
    aBtn = select('#aBtn');
    bBtn = select('#bBtn');
    cBtn = select('#cBtn');
    dBtn = select('#dBtn');
    
    btns = [aBtn,bBtn,cBtn,dBtn];
    
    // Checking Answers Uswer Selcted
    for (btn of btns){
        
        if(btn.html() == ans){
            btn.removeClass('btn-primary');
            //Checking if user selcetd the Right Answer
            if(btn.html() == correctAns ){
                btn.addClass('btn-success');
                break;
            }else{
                // Answer is Wrong
                btn.addClass('btn-danger');
                
                //Findind Correct Answer
                for(cbtn of btns){
                    if(cbtn.html() == correctAns){
                        cbtn.removeClass('btn-primary');
                        cbtn.addClass('btn-success');
                        break;
                    }//endif
                    
                }//End foreach
                
            }// End elseif
            
        }//endif
        
    }//end foreach
   
}


function getTrivia(){
    fetch("https://opentdb.com/api.php?amount=50&type=multiple")
        .then(response => response.json())
        .then(data => getData(data))
        .catch(err =>{
            console.error(err);   
        })
}

function getTriviaCategory(category){
    
    fetch("https://opentdb.com/api.php?amount=50&category="+category+"&type=multiple")
        .then(response => response.json())
        .then(data => getData(data))
        .catch(err =>{
            console.error(err);
            
        })
}

function getData(data){
    trivia = data.results;
    count = 0;
    console.log(trivia);
}

function getCategory(){
    console.log(json);
    categories = json.trivia_categories;
    console.log(categories);
}


function keyPressed(){
     if (key == " ") {
         // If answered
         if(answered){
             
             count = count + 1;
             if(count == 50){
                 trivia = [];
                 getTriviaCategory(31);
             }
                
             
             answers =[];
             
             answered = false;
        
              
             
         }
     }
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight); 
} 
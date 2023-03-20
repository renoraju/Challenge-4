const questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];
  
  //  elements 
  const introContainer = document.getElementById("intro"); 
  const gameContainer = document.getElementById("game"); 
  const questionContainer = document.getElementById("question"); 
  const answersContainer = document.getElementById("answers"); 
  const answerContainer = document.getElementById("answer"); //
  const endGameContainer = document.getElementById("end-game"); 
  const endMessageContainer = document.getElementById("end-message"); 
  const endScoreContainer = document.getElementById("end-score"); 
  const endAnswerContainer = document.getElementById("end-answers"); 
  const allButtons = document.getElementsByClassName("answer");
  
  var rightAnswer = ""; 
  var userAnswer = ""; 
  var rightAnswers = 0; 
  var wrongAnswers = 0; 
  var questionNumber = 0;
  var timer = 75; 
  var interval; 
  var highscore = 0; 
  
  let saveHighscore = window.localStorage.getItem("saveHighscore");
  
  document.getElementById("start").addEventListener("click", startGame); 
  document.getElementById("again").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.reload();
  })
  
  
  //start game function
  function startGame() {
    console.log("calling function");
  
    
    introContainer.classList.remove("d-block");
    introContainer.classList.add("d-none");
    
    gameContainer.classList.remove("d-none");
    gameContainer.classList.add("d-block");
   
    startTimer();
    
    displayQuestion(questions);
  };
  
  
 
  //function game over
  function gameOver() {
    
    clearInterval(interval);
    gameContainer.classList.remove("d-block");
    gameContainer.classList.add("d-none");
  
    endGameContainer.classList.remove("d-none");
    endGameContainer.classList.add("d-block");
   
    endMessageContainer.innerHTML = `<h3>Game over!</h3>`;
   
    endAnswerContainer.innerHTML = `Right answers: ${rightAnswers} | Wrong answers: ${wrongAnswers}`;
    
    endScoreContainer.innerHTML = highscore;
    
    document.getElementById("timer").textContent = "Time is up!";
  };
  
  //timer function
  function startTimer() {
    
    interval = setInterval(() => {
     
      document.getElementById("timer").textContent = `Time: ${timer}`;
      if (timer < 0) {
        
        clearInterval(interval);
        gameOver();
      } else {
      
        timer--;
      }
    }, 1000);
  };
  
  //display questions function
  function displayQuestion(array) {
   
    if (questionNumber < array.length) {
      
      rightAnswer = array[questionNumber].answer;
    
      questionContainer.innerText = array[questionNumber].title;
    
      const options = array[questionNumber].choices;
      
      for (let i = 0; i < options.length; i++) {
     
        const answerButton = document.createElement("button");
        
        answerButton.setAttribute("class", "btn btn-primary m-4 answer");
       
        answerButton.textContent = options[i];
     
        answersContainer.append(answerButton);
      }
      
    } else {
      
      highscore = timer;
      gameOver();
    }
  
  };
  
  //click event on answer buttons
  document.addEventListener("click", function (e) {
    
    if (e.target && e.target.matches(".answer")) {
     
      for (let button of allButtons) {
        button.setAttribute("disabled", "disabled");
      }
      
      userAnswer = e.target.textContent;
    
      if (userAnswer === rightAnswer) {
        
        rightAnswers++;
       
        answerContainer.textContent = "Right!";
      
        
       
      } else {
        
        wrongAnswers++;
        
        timer -= 15;
        
        answerContainer.textContent = "Wrong!";
       
        
      }
      
      questionNumber++;
      
      setTimeout(() => {
       
        answersContainer.innerHTML = "";
        questionContainer.innerHTML = "";
        answerContainer.textContent = "";
        
        displayQuestion(questions);
      }, 1000);
    };
  
  });
  
  
  document.getElementById("submit").addEventListener("click", addHighscore);
    function addHighscore() {
      let initials = document.getElementById("initials").value;    
      
    };
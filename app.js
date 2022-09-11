const game = document.getElementById('game');

const scoreDisplay = document.getElementById("score");

const jeopardyCategories = [
    {
        genre: "Who",
        questions: [
            {
                question: "Who wrote Harry potter",
                answers: ["JK Rowling", "JK Tyres"],
                correctAnswer: "JK Rowling",
                level: "easy",
            },

        
            {
                    question: "Who is shaktiman?",
                    answers: ["Gangadhar", "Geeta biswas"],
                    correctAnswer: "Gangadhar",
                    level: "medium",
            },
            
            {
                    question: "Who are you?",
                    answers: ["A bot", "Human"],
                    correctAnswer: "Human",
                    level: "hard"
            }
        ]
    },
    
    {
        genre: "Where",
        questions: [
            {
                question:"Where is Tajmahal?",
                answers: ["Agra", "Delhi"],
                correctAnswer: "Agra",
                level: "easy",
            },
            {
                question: "Where is Rammandir located?",
                answers: ["Ayodhya", "Varanasi"],
                correctAnswer: "Ayodhya",
                level: "medium",
            },{
                question:"Where is air?",
                answers: ["Everywhere", "Sky"],
                correctAnswer: "Everywhere",
                level: "hard",
            }
        ]
    
    },
    {
        genre: "When",
        questions: [
            {
                question: "When India got independence?",
                answers: ["1947", "1970"],
                correctAnswer: "1947",
                level: "easy",
            },
            {
                question: "When is independece day?",
                answers: ["15 Aug", "26 January"],
                correctAnswer: "15 Aug",
                level: "medium",
            },
            {
                question: "When is republic day?",
                answers: ["15 Aug", "26 January"],
                correctAnswer: "26 January",
                level: "hard",
            }
        ]
    
    },
    {
        genre: "What",
        questions: [
            {
            question: "What is capital of MP?",
            answers: ["Bhopal", "Indore"],
            correctAnswer: "Bhopal",
            level: "easy",
        },
        {
            question: "What is national animal?",
            answers: ["tiger", "lion"],
            correctAnswer: "tiger",
            level: "medium",
        },
        {
            question: "What is rasgulla?",
            answers: ["Mithai", "samosa"],
            correctAnswer: "Mithai",
            level: "hard",
        }
    ]
    
    },
    {
        genre: "How Many",
        questions: [
            {
            question: "How many seconds in an hour?",
            answers: ["3600", "36000"],
            correctAnswer: "3600",
            level: "easy",
        },
        {
            question: "How many people in India?",
            answers: ["1.4b", "1.1b"],
            correctAnswer: "1.4b",
            level: "hard",
        },
        {
            question: "How many languages in India",
            answers: ["18", "22"],
            correctAnswer: "22",
            level: "medium",
        },
    ],
    
    },
]

function addCategory(category) {

  const genreColumn = document.createElement("div");
  genreColumn.classList.add("genre-category");
  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");


  genreTitle.innerHTML = category.genre;

  genreColumn.appendChild(genreTitle);
  game.append(genreColumn);

  category.questions.forEach(question => {
    const card = document.createElement("div");
    card.classList.add("card");
    genreColumn.appendChild(card);

    if(question.level === "easy"){
        card.innerHTML = 100;
    }
    else if (question.level === "medium"){
        card.innerHTML = 200;
    }
    else{
        card.innerHTML = 300;        
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("data-answers1", question.answers[0]);
    card.setAttribute("data-answers2", question.answers[1]);
    card.setAttribute("data-correct", question.correctAnswer);
    card.setAttribute("data-value", card.getInnerHTML());
    card.addEventListener("click", flipCard);
  })

}

let score= 0;

function flipCard(){
   // console.log(this);
this.innerHTML = '';
this.style.fontSize = "15px";
this.style.lineHeight = "18px";
const cardTextDisplay = document.createElement("div");
cardTextDisplay.classList.add("card-text");
cardTextDisplay.innerHTML = this.getAttribute("data-question");
//cardTextDisplay.style.display = "flex";
const firstButton = document.createElement("button");
const secondButton = document.createElement("button");
firstButton.addEventListener("click", getResults);
secondButton.addEventListener("click", getResults);

firstButton.classList.add("first-button");
secondButton.classList.add("second-button");
firstButton.innerHTML = this.getAttribute("data-answers1");
secondButton.innerHTML = this.getAttribute("data-answers2");
this.append(cardTextDisplay, firstButton, secondButton);

const allCards = Array.from(document.querySelectorAll(".card"));
 allCards.forEach(card => card.removeEventListener("click", flipCard));

}

function getResults (){
    const allCardsAgain = Array.from(document.querySelectorAll(".card"));
    allCardsAgain.forEach(card => card.addEventListener("click", flipCard));
    
    // console.log(this.innerHTML);
    // console.log(this.parentElement.getAttribute("data-correct"));
    const cardOfButton = this.parentElement;
    // console.log(cardOfButton.firstChild);
    // console.log(this.parentElement.firstChild);



    const getAnswer = this.parentElement.getAttribute("data-correct");
    if(this.innerHTML === getAnswer) {
        score = score + parseInt(this.parentElement.getAttribute("data-value")); 
        scoreDisplay.innerHTML = 'The score is ' + score;;
        this.parentElement.classList.add("correct-answer");
        setTimeout(() => {
           // console.log(this.parentElement.firstChild);
         //   console.log(this.parentElement);
            while(cardOfButton.firstChild != null){
                cardOfButton.removeChild(cardOfButton.lastChild);
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
        },100)
    }
    else{
        score = score - parseInt(this.parentElement.getAttribute("data-value"));
        scoreDisplay.innerHTML = 'The score is ' + score;
        cardOfButton.classList.add("wrong-answer");
        setTimeout(() => {
            // console.log(this.parentElement.firstChild);
             //console.log(this.parentElement);
             while(cardOfButton.firstChild != null){
                 cardOfButton.removeChild(cardOfButton.lastChild);
             }
             cardOfButton.innerHTML = '-'+cardOfButton.getAttribute("data-value");
         },100);
     }
     cardOfButton.removeEventListener("click", flipCard);
   
    

}

jeopardyCategories.forEach(category => addCategory(category));



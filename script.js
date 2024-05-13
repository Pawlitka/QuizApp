const QUESTIONS = [
    {
        text: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", isCorrect: false},
            {text: "Blue whale", isCorrect: true},
            {text: "Elephant", isCorrect: false},
            {text: "Rabbit", isCorrect: false},
        ]
    },
    {
        text: "Which country is the smallest?",
        answers: [
            {text: "Vatican", isCorrect: true},
            {text: "Poland", isCorrect: false},
            {text: "Italy", isCorrect: false},
            {text: "France", isCorrect: false},
        ]
    },
    {
        text: "Which is largest continent in the world?",
        answers: [
            {text: "Asia", isCorrect: true},
            {text: "Africa", isCorrect: false},
            {text: "Australia", isCorrect: false},
            {text: "Europe", isCorrect: false},
            ]
    },
    {
        text: "Do I love my handsome boy",
        answers: [
            {text: "Yes", isCorrect: true},
            {text: "No", isCorrect: false},
        ]
    },
    {
        text: "Which is the longest river in the world?",
        answers: [
            {text: "Congo", isCorrect: false},
            {text: "Yellow", isCorrect: false},
            {text: "Nile", isCorrect: true},
            {text: "Niger", isCorrect: false},
            ]
    }
];
const QUESTION_ELEMENT = document.getElementById("question");
const ANSWER_BUTTON_ELEMENT = document.getElementById("answer-buttons");
const NEXT_BUTTON_ELEMENT = document.getElementById("next-btn");
const CORRECT_ANSWER_CLASS = "correct";
const INCORRECT_ANSWER_CLASS = "incorrect";


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    NEXT_BUTTON_ELEMENT.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = QUESTIONS[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    QUESTION_ELEMENT.innerHTML = questionNo + ". " + currentQuestion.text;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ANSWER_BUTTON_ELEMENT.appendChild(button);

        button.dataset.isCorrect = answer.isCorrect;

        button.addEventListener("click", handleOnClickAnswer);
    });
}

function resetState() {
    NEXT_BUTTON_ELEMENT.style.display = "none";
    while(ANSWER_BUTTON_ELEMENT.firstChild){
        ANSWER_BUTTON_ELEMENT.removeChild(ANSWER_BUTTON_ELEMENT.firstChild);
    }
}

function handleOnClickAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.isCorrect === "true";

    const extraAnswerClass = isCorrect ? CORRECT_ANSWER_CLASS : INCORRECT_ANSWER_CLASS;
    selectedBtn.classList.add(extraAnswerClass);

    if(isCorrect) {
        score++;
    }

    Array.from(ANSWER_BUTTON_ELEMENT.children).forEach(button => {
        if(button.dataset.isCorrect === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    NEXT_BUTTON_ELEMENT.style.display = "block";
}

function showScore(){
    resetState();
    QUESTION_ELEMENT.innerHTML = `You scored ${score} out of ${QUESTIONS.length}!`;
    NEXT_BUTTON_ELEMENT.innerHTML = "PLAY AGAIN";
    NEXT_BUTTON_ELEMENT.style.display = "block";
}





function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < QUESTIONS.length){
        showQuestion();
    }else{
        showScore();
    }
}


NEXT_BUTTON_ELEMENT.addEventListener("click", ()=>{
    if(currentQuestionIndex < QUESTIONS.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})



startQuiz();
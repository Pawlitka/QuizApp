const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Rabbit", correct: false},
        ]
    },
    {
        question: "Which country is the smallest?",
        answers: [
            {text: "Vatican", correct: true},
            {text: "Poland", correct: false},
            {text: "Italy", correct: false},
            {text: "France", correct: false},
        ]
    },
    {
        question: "Which is largest continent in the world?",
        answers: [
            {text: "Asia", correct: true},
            {text: "Africa", correct: false},
            {text: "Australia", correct: false},
            {text: "Europe", correct: false},
            ]
    },
    {
        question: "Do I love my handsome boy",
        answers: [
            {text: "Yes", correct: true},
            {text: "No", correct: false},
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            {text: "Congo", correct: false},
            {text: "Yellow", correct: false},
            {text: "Nile", correct: true},
            {text: "Niger", correct: false},
            ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const NextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    NextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    NextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    NextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    NextButton.innerHTML = "PLAY AGAIN";
    NextButton.style.display = "block";
}





function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


NextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})



startQuiz();
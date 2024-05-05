const questions = [
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.text;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        button.dataset.isCorrect = answer.isCorrect;

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
    const isCorrect = selectedBtn.dataset.isCorrect === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.isCorrect === "true"){
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
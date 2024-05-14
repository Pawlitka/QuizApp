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
const ANSWER_BUTTONS_CONTAINER_ELEMENT = document.getElementById("answer-buttons");
const NEXT_BUTTON_ELEMENT = document.getElementById("next-btn");
const CORRECT_ANSWER_CLASS = "correct";
const INCORRECT_ANSWER_CLASS = "incorrect";
const ANSWER_HTML_TAG_NAME = "button";
const ANSWER_CLASSES = "btn";

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    NEXT_BUTTON_ELEMENT.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = QUESTIONS[currentQuestionIndex];

    resetState();
    setQuestionElementMessageForQuestion(currentQuestion);
    prepareAnswersOf(currentQuestion);
}

function setQuestionElementMessageForQuestion(question) {
    let questionNo = currentQuestionIndex + 1;
    setQuestionElementMessage(questionNo + ". " + question.text);
}

function prepareAnswersOf(question) {
    question.answers.forEach(answer => prepareAnswer(answer));
}
// function showQuestion(){
//     resetState();
//     let currentQuestion = QUESTIONS[currentQuestionIndex];
//     let questionNo = currentQuestionIndex + 1;
//     QUESTION_ELEMENT.innerHTML = questionNo + ". " + currentQuestion.text;
//
//     currentQuestion.answers.forEach(answer => prepareAnswer(answer));
// }

function prepareAnswer(answer) {
    const answerElement = createAnswerElement(answer);
    ANSWER_BUTTONS_CONTAINER_ELEMENT.appendChild(answerElement);
}

function createAnswerElement(answer) {
    const answerElement = document.createElement(ANSWER_HTML_TAG_NAME);
    answerElement.innerHTML = answer.text;
    answerElement.classList.add(ANSWER_CLASSES);
    answerElement.dataset.isCorrect = answer.isCorrect;
    answerElement.addEventListener("click", handleOnClickAnswer);

    return answerElement;
}

function resetState() {
    NEXT_BUTTON_ELEMENT.style.display = "none";
    removeAllChildrenOf(ANSWER_BUTTONS_CONTAINER_ELEMENT);
}

function removeAllChildrenOf(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function handleOnClickAnswer(e){
    const selectedButtonElement = e.target;
    const isCorrect = selectedButtonElement.dataset.isCorrect === "true";

    const extraAnswerClass = isCorrect ? CORRECT_ANSWER_CLASS : INCORRECT_ANSWER_CLASS;
    selectedButtonElement.classList.add(extraAnswerClass);

    if(isCorrect) {
        score++;
    }

    const answerButtons = Array.from(ANSWER_BUTTONS_CONTAINER_ELEMENT.children);
    prepareButtonsAfterAnswer(answerButtons);
}

function prepareButtonsAfterAnswer(buttons) {
    buttons.forEach(button => {
        markIfCorrectAnswer(button);
        disableButton(button);
    });
    showNextButtonElement();
}

function markIfCorrectAnswer(button) {
    if(button.dataset.isCorrect === "true") {
        button.classList.add("correct");
    }
}

function disableButton(button) {
    button.disabled = true;
}

function showNextButtonElement() {
    NEXT_BUTTON_ELEMENT.style.display = "block";
}

const LABEL_TAGS = {
    score: '{!score}',
    maxScore: '{!maxScore}'
}

const LABELS = {
    finalScoreMessage: `You scored ${LABEL_TAGS.score} out of ${LABEL_TAGS.maxScore} score!`,
    playAgain: "PLAY AGAIN"
};


function showScore(){
    resetState();

    setQuestionElementMessage(getFinalScoreMessage());
    setNextButtonElementMessage(LABELS.playAgain);
    showNextButtonElement();
}

function getFinalScoreMessage() {
    return LABELS.finalScoreMessage
        .replaceAll(LABEL_TAGS.score, score)
        .replaceAll(LABEL_TAGS.maxScore, QUESTIONS.length);
}

function setQuestionElementMessage(message) {
    QUESTION_ELEMENT.innerHTML = message;
}

function setNextButtonElementMessage(message) {
    NEXT_BUTTON_ELEMENT.innerHTML = message;
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < QUESTIONS.length) {
        showQuestion();
    } else {
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
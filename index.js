"use strict"

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let predefinedQuestions = [
    {
        id: "1",
        text: "How many women are in a company?",
        userId: "1", 
        createdAt: new Date,
    },
    {
        id: "2",
        text: "Question 2",
        userId: "3",
        createdAt: new Date,
    },
    {
        id: "3",
        text: "Question 3",
        userId: "4",
        createdAt: new Date,
    },
    {
        id: "4",
        text: "Question 4",
        userId: "1",
        createdAt: new Date,
    },
    {
        id: "5",
        text: "Question 5",
        userId: "4",
        createdAt: new Date,
    },
]

let predefinedAnswers = [
    {
        id: uuidv4(),
        text: "kjsdahfkjeshf",
        userId: "1", 
        createdAt: new Date,
        questionId: "1"
    },
    {
        id: uuidv4(),
        text: "a,fnkdsjfn",
        userId: "3",
        createdAt: new Date,
        questionId: "1"
    },
    {
        id: uuidv4(),
        text: "aksdjbfakjsd",
        userId: "4",
        createdAt: new Date,
        questionId: "3"
    },
    {
        id: uuidv4(),
        text: "dsydsfd",
        userId: "1",
        createdAt: new Date,
        questionId: "4"
    },
    {
        id: uuidv4(),
        text: "syfdsf",
        userId: "4",
        createdAt: new Date,
        questionId: "5"
    },
]

let sectionQuestionCard = document.getElementById("question-card")

let newQuestionsArray = JSON.parse(localStorage.getItem("questions")) || []
let newAnswersArray = JSON.parse(localStorage.getItem("answers")) || []

predefinedQuestions.forEach((question) => {
    let questionDiv = document.createElement("div")
    let predifinednAswersHTML = predefinedAnswers
    .filter((answer) => answer.questionId == question.id)
    .map((answer) => `<p>${answer.text}</p>`)
    .join("");
    let newAnswersHTML = newAnswersArray
    .filter((answer) => answer.questionId == question.id)
    .map((answer) => `<p>${answer.text}</p>`)
    .join("");
    questionDiv.innerHTML = `
        <div style="border: solid 1px black">
            <p>${question.text}</p>
            <p> ${predifinednAswersHTML} </p>
            <p> ${newAnswersHTML} </p>
            <form>
            <input id="answer-input"/>
            <button onclick="addAnswer(${question.id})">Answer</button>
            </form>
        </div>
    `
    sectionQuestionCard.appendChild(questionDiv)   
})

function addQuestion() {
    let inputQuestion = document.getElementById("question-input").value
    if (inputQuestion !== "") {
    let newQuestion = {
        id: uuidv4(),
        text: inputQuestion,
        userId: "2", 
        createdAt: new Date,
    }
    newQuestionsArray.push(newQuestion)
    localStorage.setItem("questions", JSON.stringify(newQuestionsArray));
    } 
    else {
        alert("Please enter a valid question.")
    }
}

function addAnswer(questionId) {
    let inputAnswer = document.getElementById("answer-input").value
    if (inputAnswer !== "") {
    let newAnswer = {
        id: uuidv4(),
        text: inputAnswer,
        userId: "1", 
        createdAt: new Date,
        questionId: questionId
    }
    newAnswersArray.push(newAnswer)
    localStorage.setItem("answers", JSON.stringify(newAnswersArray));
   } else {
    alert("Please enter a valid answer.")
    }
}

newQuestionsArray.forEach((question) => {
    let questionDiv = document.createElement("div")
    // let answersHTML = newQuestionsArray
    // .filter((answer) => answer.questionId === question.id)
    // .map((answer) => `<p>${answer.text}</p>`)
    // .join("");
    questionDiv.innerHTML = `
        <div style="border: solid 1px black">
            <p>${question.text}</p>
            <form>
            <input id="answer-input"/>
            <button onclick="addAnswer(${question.id})">Answer</button>
            </form>
        </div>
    `
    sectionQuestionCard.appendChild(questionDiv)   
})


document.getElementById("add-question-button").addEventListener("click", addQuestion)

console.log("Predefined questions: ", predefinedQuestions)
console.log("Predefined answers: ", predefinedAnswers)
console.log("New questions: ", newQuestionsArray)
console.log("New answers: ", newAnswersArray)
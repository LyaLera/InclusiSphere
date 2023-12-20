"use strict"

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let predefinedQuestions = [
    {
        id: "01",
        text: "Question 1",
        userId: "1", 
        createdAt: new Date,
    },
    {
        id: "02",
        text: "Question 2",
        userId: "3",
        createdAt: new Date,
    },
    {
        id: "03",
        text: "Question 3",
        userId: "4",
        createdAt: new Date,
    },
    {
        id: "04",
        text: "Question 4",
        userId: "1",
        createdAt: new Date,
    },
    {
        id: "05",
        text: "Question 5",
        userId: "4",
        createdAt: new Date,
    },
]

console.log(predefinedQuestions)

let predefinedAnswers = [
    {
        id: uuidv4(),
        text: "kjsdahfkjeshf",
        userId: "1", 
        createdAt: new Date,
        questionId: "01"
    },
    {
        id: uuidv4(),
        text: "a,fnkdsjfn",
        userId: "3",
        createdAt: new Date,
        questionId: "01"
    },
    {
        id: uuidv4(),
        text: "aksdjbfakjsd",
        userId: "4",
        createdAt: new Date,
        questionId: "03"
    },
    {
        id: uuidv4(),
        text: "Answer 4",
        userId: "1",
        createdAt: new Date,
        questionId: "04"
    },
    {
        id: uuidv4(),
        text: "Answer 5",
        userId: "4",
        createdAt: new Date,
        questionId: "05"
    },
]

let newQuestions = []
let newAnwers = []

predefinedQuestions.forEach((question) => {
    let questionDiv = document.createElement("div")
    let answersHTML = predefinedAnswers
    .filter((answer) => answer.questionId === question.id)
    .map((answer) => `<p>${answer.text}</p>`)
    .join("");
    questionDiv.innerHTML = `
        <div style="border: solid 1px black">
            <p>${question.text}</p>
            <div>
                ${answersHTML}
            </div>
            <button>Answer</button>
        </div>
    `
    document.getElementById("question-card").appendChild(questionDiv)   
})
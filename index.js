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


// Add questions and answers functions
let sectionQuestionCard = document.getElementById("paginated-list")
let searchValue = ""

let newQuestionsArray = JSON.parse(localStorage.getItem("questions")) || []
let newAnswersArray = JSON.parse(localStorage.getItem("answers")) || []

function render(questions, answers) {
    // TODO - destroy existing DOM for the questions and answers
    sectionQuestionCard.innerHTML = ""
    questions.filter((question) => question.text.includes(searchValue))
    .forEach((question) => {
        let questionDiv = document.createElement("div")
        let newAnswersHTML = answers
        .filter((answer) => answer.questionId == question.id)
        .map((answer) => `<p>${answer.text}</p>`)
        .join("");
        questionDiv.innerHTML = `
        <div class="question-1 div-list">
                <h3>Question</h3>
                <p>${question.text}</p>
                <h3>Answer</h3>
                <p>${newAnswersHTML}</p>
            <div class="input-1-box">
                <input type="text" placeholder="Your answers !" id="answer-${question.id}" class="answer-input"/>
                <button data-id=${question.id} onclick="addAnswer(event)">Answer</button>
            </div>
       </div>
        `
        sectionQuestionCard.appendChild(questionDiv)   
    })
}

            // <div style="border: solid 1px black" class="div-list">
            //     <p>${question.text}</p>
            //     <p> ${newAnswersHTML} </p>
            //     <input id="answer-${question.id}" class="answer-input"/>
            //     <button data-id=${question.id} onclick="addAnswer(event)">Answer</button>
            // </div>

render([...predefinedQuestions, ...newQuestionsArray],[...predefinedAnswers, ...newAnswersArray])

function addQuestion() {
    let inputQuestionValue = document.getElementById("question-input").value
    if (inputQuestionValue !== "") {
    let newQuestion = {
        id: uuidv4(),
        text: inputQuestionValue,
        userId: "2", 
        createdAt: new Date,
    }
    newQuestionsArray.push(newQuestion)
    localStorage.setItem("questions", JSON.stringify(newQuestionsArray));
    } 
    else {
        alert("Please enter a valid question.")
    }
    render([...predefinedQuestions, ...newQuestionsArray],[...predefinedAnswers, ...newAnswersArray])
}

function addAnswer(event) {
    let inputAnswer = document.getElementById("answer-" + event.target.dataset.id).value
    if (inputAnswer !== "") {
    let newAnswer = {
        id: uuidv4(),
        text: inputAnswer,
        userId: "1", 
        createdAt: new Date,
        questionId: event.target.dataset.id
    }

    newAnswersArray.push(newAnswer)
    localStorage.setItem("answers", JSON.stringify(newAnswersArray));
   } else {
    alert("Please enter a valid answer.")
    }
    render([...predefinedQuestions, ...newQuestionsArray],[...predefinedAnswers, ...newAnswersArray])
}

document.getElementById("add-question-button").addEventListener("click", addQuestion)

console.log("Predefined questions: ", predefinedQuestions)
console.log("Predefined answers: ", predefinedAnswers)
console.log("New questions: ", newQuestionsArray)
console.log("New answers: ", newAnswersArray)


// Search function
const divItems = document.getElementsByClassName("div-list");
console.log(divItems)
// function liveSearch() {
//     let search_query = document.getElementById("searchbox").value;
//     for (var i = 0; i < divItems.length; i++) {
//         if(divItems[i].innerText.toLowerCase()
//         .includes(search_query)) {
//             console.log(divItems[i].innerText)
//             divItems[i].classList.remove("hidden");
//         } else {
//             divItems[i].classList.add("hidden");
//         }
//         console.log(divItems)
//     }
//     if (search_query === '') {
//         setCurrentPage(1)
//     }
// }


let searchInput = document.getElementById('searchbox');
searchInput.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    searchValue = e.target.value
    render([...predefinedQuestions, ...newQuestionsArray],[...predefinedAnswers, ...newAnswersArray])
})
  
// Pagination
// const paginationNumbers = document.getElementById("pagination-numbers");
// const paginatedList = document.getElementById("paginated-list");
// const divItems = paginatedList.getElementsByClassName("div-list");
// console.log(divItems)
// const nextButton = document.getElementById("next-button");
// const prevButton = document.getElementById("prev-button");

// const paginationLimit = 4;
// const pageCount = Math.ceil(divItems.length / paginationLimit);
// let currentPage = 1;

// const disableButton = (button) => {
//   button.classList.add("disabled");
//   button.setAttribute("disabled", true);
// };

// const enableButton = (button) => {
//   button.classList.remove("disabled");
//   button.removeAttribute("disabled");
// };

// const handlePageButtonsStatus = () => {
//   if (currentPage === 1) {
//     disableButton(prevButton);
//   } else {
//     enableButton(prevButton);
//   }

//   if (pageCount === currentPage) {
//     disableButton(nextButton);
//   } else {
//     enableButton(nextButton);
//   }
// };

// const handleActivePageNumber = () => {
//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     button.classList.remove("active");
//     const pageIndex = Number(button.getAttribute("page-index"));
//     if (pageIndex == currentPage) {
//       button.classList.add("active");
//     }
//   });
// };

// const appendPageNumber = (index) => {
//   const pageNumber = document.createElement("button");
//   pageNumber.className = "pagination-number";
//   pageNumber.innerHTML = index;
//   pageNumber.setAttribute("page-index", index);
//   pageNumber.setAttribute("aria-label", "Page " + index);

//   paginationNumbers.appendChild(pageNumber);
// };

// const getPaginationNumbers = () => {
//   for (let i = 1; i <= pageCount; i++) {
//     appendPageNumber(i);
//   }
// };

// const setCurrentPage = (pageNum) => {
//   currentPage = pageNum;

//   handleActivePageNumber();
//   handlePageButtonsStatus();
  
//   const prevRange = (pageNum - 1) * paginationLimit;
//   const currRange = pageNum * paginationLimit;

//   for(let i=0; i < divItems.length; i++) {
//     divItems[i].classList.add("hidden")
//     if (i >= prevRange && i < currRange) {
//         divItems[i].classList.remove("hidden")
//     }
//   }
// };

// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);

//   prevButton.addEventListener("click", () => {
//     setCurrentPage(currentPage - 1);
//   });

//   nextButton.addEventListener("click", () => {
//     setCurrentPage(currentPage + 1);
//   });

//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     const pageIndex = Number(button.getAttribute("page-index"));

//     if (pageIndex) {
//       button.addEventListener("click", () => {
//         setCurrentPage(pageIndex);
//       });
//     }
//   });
// });
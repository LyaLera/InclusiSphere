"use strict"

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let predefinedQuestions = [
    {
        id: "2",
        text: "How can individuals contribute to promoting inclusiveness in their communities?",
        userId: "2",
        createdAt: new Date(),
    },
    {
        id: "3",
        text: "What are some strategies for creating inclusive workplaces?",
        userId: "1",
        createdAt: new Date(),
    },
    {
        id: "4",
        text: "Why is representation important in media for gender equality?",
        userId: "3",
        createdAt: new Date(),
    },
    {
        id: "5",
        text: "How can educational institutions promote diversity and inclusion?",
        userId: "2",
        createdAt: new Date(),
    },
    {
        id: "6",
        text: "What are the benefits of gender-inclusive language?",
        userId: "1",
        createdAt: new Date(),
    },
    {
        id: "7",
        text: "How can we break stereotypes related to gender roles?",
        userId: "3",
        createdAt: new Date(),
    },
    {
        id: "8",
        text: "What initiatives can companies take to address the gender pay gap?",
        userId: "2",
        createdAt: new Date(),
    },
    {
        id: "9",
        text: "How can individuals be allies to the LGBTQ+ community?",
        userId: "1",
        createdAt: new Date(),
    },
    {
        id: "10",
        text: "What are some challenges faced by differently-abled individuals in the workplace?",
        userId: "3",
        createdAt: new Date(),
    },
]

let predefinedAnswers = [
    {
        id: uuidv4(),
        text: "Individuals can contribute to promoting inclusiveness in their communities by actively engaging in conversations, challenging stereotypes, and fostering an environment of acceptance. Supporting diverse initiatives, participating in community events, and being open-minded are essential actions.",
        userId: "3",
        createdAt: new Date(),
        questionId: "2",
    },
    {
        id: uuidv4(),
        text: "Strategies for creating inclusive workplaces include implementing diversity training programs, fostering a culture of respect and equality, providing equal opportunities for career advancement, and actively addressing bias and discrimination. Companies can also establish employee resource groups to support underrepresented communities.",
        userId: "2",
        createdAt: new Date(),
        questionId: "3",
    },
    {
        id: uuidv4(),
        text: "Representation in media is crucial for gender equality as it shapes societal perceptions. It challenges stereotypes, normalizes diverse experiences, and empowers individuals. Media should strive to depict a wide range of identities, breaking free from traditional norms and promoting a more inclusive narrative.",
        userId: "1",
        createdAt: new Date(),
        questionId: "4",
    },
    {
        id: uuidv4(),
        text: "Educational institutions can promote diversity and inclusion by implementing inclusive curricula, fostering a welcoming environment for students from all backgrounds, and actively addressing discrimination. Creating diverse faculty and student groups and promoting cultural awareness programs are key steps.",
        userId: "3",
        createdAt: new Date(),
        questionId: "5",
    },
    {
        id: uuidv4(),
        text: "The benefits of gender-inclusive language include promoting equality, challenging gender norms, and creating a more inclusive environment. Using language that is neutral and respectful of all genders contributes to breaking down traditional gender stereotypes and fostering a culture of equality.",
        userId: "2",
        createdAt: new Date(),
        questionId: "6",
    },
    {
        id: uuidv4(),
        text: "Breaking stereotypes related to gender roles involves challenging preconceived notions, supporting individuals who defy traditional roles, and promoting diverse representations. Encouraging conversations that challenge stereotypes and advocating for equal opportunities are essential.",
        userId: "1",
        createdAt: new Date(),
        questionId: "7",
    },
    {
        id: uuidv4(),
        text: "Initiatives companies can take to address the gender pay gap include conducting regular pay equity audits, implementing transparent salary policies, and promoting equal opportunities for career advancement. Establishing mentorship programs and diversity and inclusion committees can also contribute to creating a fair workplace.",
        userId: "3",
        createdAt: new Date(),
        questionId: "8",
    },
    {
        id: uuidv4(),
        text: "Being an ally to the LGBTQ+ community involves educating oneself about LGBTQ+ issues, actively supporting and advocating for LGBTQ+ rights, and creating a safe and inclusive environment. Allies listen to and amplify LGBTQ+ voices, challenge discrimination, and strive to be respectful allies in both personal and professional settings.",
        userId: "2",
        createdAt: new Date(),
        questionId: "9",
    },
    {
        id: uuidv4(),
        text: "Challenges faced by differently-abled individuals in the workplace include accessibility barriers, discrimination, and limited opportunities. Companies can address these challenges by implementing accessible facilities, providing reasonable accommodations, and fostering a culture of inclusion that values the unique contributions of differently-abled employees.",
        userId: "1",
        createdAt: new Date(),
        questionId: "10",
    },

]


// Add questions and answers functions
let sectionQuestionCard = document.getElementById("paginated-list")
let searchValue = ""

let newQuestionsArray = JSON.parse(localStorage.getItem("questions")) || []
let newAnswersArray = JSON.parse(localStorage.getItem("answers")) || []

function render(questions, answers, currentPage = 1, itemsPerPage = 4) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredQuestions = questions.filter((question) =>
        question.text.includes(searchValue)
    );
    const questionsForPage = filteredQuestions.slice(startIndex, endIndex);
    sectionQuestionCard.innerHTML = "";

    questionsForPage.forEach((question) => {
        const answersForQuestion = answers.filter(
            (answer) => answer.questionId == question.id
        );
        const newAnswersHTML = answersForQuestion
            .filter((answer) => answer.questionId == question.id)
            .map((answer) => `<p>${answer.text}</p>`)
            .join("");

        const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `
                <div class="question-1 div-list">
                    <h3>Question</h3>
                    <p>${question.text}</p>
                    <h3>Answer</h3>
                    <p>${newAnswersHTML}</p>
                    <div class="input-1-box">
                        <input type="text" placeholder="Your answer!" id="answer-${question.id}" class="answer-input"/>
                        <button data-id=${question.id} onclick="addAnswer(event)">Answer</button>
                    </div>
                </div>
        `;
        sectionQuestionCard.appendChild(questionDiv);
    });
    // TODO - destroy existing DOM for the questions and answers
    // sectionQuestionCard.innerHTML = ""
    // questions.filter((question) => question.text.includes(searchValue))
    // .forEach((question) => {
    //     let questionDiv = document.createElement("div")
    //     let newAnswersHTML = answers
    //     .filter((answer) => answer.questionId == question.id)
    //     .map((answer) => `<p>${answer.text}</p>`)
    //     .join("");
    //     questionDiv.innerHTML = `
    //     <div class="question-1 div-list">
    //             <h3>Question</h3>
    //             <p>${question.text}</p>
    //             <h3>Answer</h3>
    //             <p>${newAnswersHTML}</p>
    //         <div class="input-1-box">
    //             <input type="text" placeholder="Your answers !" id="answer-${question.id}" class="answer-input"/>
    //             <button data-id=${question.id} onclick="addAnswer(event)">Answer</button>
    //         </div>
    //    </div>
    //     `
    //     sectionQuestionCard.appendChild(questionDiv)   
    // })
    addPaginationControls(filteredQuestions.length, currentPage, itemsPerPage);
}

function addPaginationControls(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let paginationHTML = `
        <div class="pagination">
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>></button>
        </div>
    `;
    sectionQuestionCard.insertAdjacentHTML('beforeend', paginationHTML);
}

function changePage(newPage) {
    render([...predefinedQuestions, ...newQuestionsArray], [...predefinedAnswers, ...newAnswersArray], newPage);
}

render([...predefinedQuestions, ...newQuestionsArray],[...predefinedAnswers, ...newAnswersArray])

let searchInput = document.getElementById('searchbox');
searchInput.addEventListener('keyup', (e) => {
    searchValue = e.target.value
    render([...predefinedQuestions, ...newQuestionsArray],[...predefinedAnswers, ...newAnswersArray])
})

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
    document.getElementById("question-input").value = "";
    } 
    else {
        alert("Please enter a valid question.")
    }
    render([...predefinedQuestions, ...newQuestionsArray],[...predefinedAnswers, ...newAnswersArray])
}

document.getElementById("add-question-button").addEventListener("click", addQuestion)

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

console.log("Predefined questions: ", predefinedQuestions)
console.log("Predefined answers: ", predefinedAnswers)
console.log("New questions: ", newQuestionsArray)
console.log("New answers: ", newAnswersArray)


  

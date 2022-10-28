// Array of Questions
let questionsArray = [
  {
    title: "What is the past form of 'eat'?",
    options: ["eat", "ate", "eaten", "have ate"],
    answer: "ate",
  },
  {
    title: "Which sentence is present continuous tense?",
    options: [
      "I eat rice",
      "I am eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I am eating rice",
  },
  {
    title: "Which sentence is present perfect tense?",
    options: [
      "I eat rice",
      "I am eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I have eaten rice",
  },
  {
    title: "Which sentence is present perfect continuous tense?",
    options: [
      "I eat rice",
      "I am eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I have been eating rice for 1 year",
  },
  {
    title: "Which sentence is past continuous tense?",
    options: [
      "I eat rice",
      "I was eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I was eating rice",
  },
  {
    title: "Which sentence is past perfect tense?",
    options: [
      "I eat rice",
      "I was eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I have eaten rice",
  },
  {
    title: "Which sentence is past perfect continuous tense?",
    options: [
      "I eat rice",
      "I was eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I have been eating rice for 1 year",
  },
  {
    title: "Which sentence is future continuous tense?",
    options: [
      "I eat rice",
      "I will be eating rice",
      "I have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I will be eating rice",
  },
  {
    title: "Which sentence is future perfect tense?",
    options: [
      "I eat rice",
      "I will be eating rice",
      "I will have eaten rice",
      "I have been eating rice for 1 year",
    ],
    answer: "I will have eaten rice",
  },
  {
    title: "Which sentence is future perfect continuous tense?",
    options: [
      "I eat rice",
      "I will be eating rice",
      "I will have eaten rice",
      "I will have been eating rice for 1 year",
    ],
    answer: "I will have been eating rice for 1 year",
  },
];

// Query Selectors
const homePage = document.getElementById("home-page");
const mcqPage = document.getElementById("mcq-page");
const resultPage = document.getElementById("result-page");
const timeoutPage = document.getElementById("timeout-page");
const startButton = document.getElementById("start-btn");
const finishBtn = document.getElementById("finish-btn");
const resultPageStartAgainBtn = document.getElementById("result-start-again");
const timeoutPageStartAgainBtn = document.getElementById("timeout-start-again");
const remainingTimeContainer = document.getElementById("remaining-time");
const mcqContainer = document.getElementById("mcq-container");
const scoreContainer = document.getElementById("score-container");

// Variables
let countdownTimer;
let tenMinutesToSeconds;
let scoreCount;

// 10 Minutes Timer
const timerDisplay = () => {
  function twoDigits(n) {
    return n <= 9 ? "0" + n : n;
  }
  countdownTimer = setInterval(() => {
    let minutes = Math.floor(tenMinutesToSeconds / 60);
    let seconds = tenMinutesToSeconds - minutes * 60;
    tenMinutesToSeconds--;
    remainingTimeContainer.innerHTML = `00 : ${twoDigits(
      minutes
    )} : ${twoDigits(seconds)}`;
    if (tenMinutesToSeconds === 0) {
      clearInterval(countdownTimer);
      mcqPage.classList.add("hide");
      timeoutPage.classList.remove("hide");
    }
  }, 1000);
};

// Initializer
const init = () => {
  mcqContainer.innerHTML = "";
  scoreCount = 0;
  remainingTimeContainer.innerHTML = "";
  tenMinutesToSeconds = 600;

  timerDisplay();
  displayQuiz();
};

// Display Start Screen On Load & Reload
const showHomepage = () => {
  homePage.classList.remove("hide");
  mcqPage.classList.add("hide");
};

// Go To MCQ Page
const goToMCQ = () => {
  homePage.classList.add("hide");
  mcqPage.classList.remove("hide");
  init();
};

// Go To Result Page
const goToResultPage = () => {
  mcqPage.classList.add("hide");
  resultPage.classList.remove("hide");
  scoreContainer.innerHTML = scoreCount;
  clearInterval(countdownTimer);
};

// Restart Quiz App
const restartQuiz = () => {
  init();
  resultPage.classList.add("hide");
  homePage.classList.add("hide");
  timeoutPage.classList.add("hide");
  mcqPage.classList.remove("hide");
};

// Function to Generate & Show All The Quiz
function displayQuiz() {
  for (let i = 0; i < questionsArray.length; i++) {
    let div = document.createElement("div");
    div.classList.add("mcq", "box");

    let question_el = document.createElement("h3");
    question_el.classList.add("question");
    question_el.innerHTML = `${i + 1}. ${questionsArray[i].title}`;
    div.appendChild(question_el);
    questionsArray[i].options.forEach((option) => {
      div.innerHTML += `
                <label><input type="radio" data-Index="${i}" class="options" name="question${i}" value="${option}" onclick="checkAnswer(this)" >${option}</label>
       `;
    });
    mcqContainer.appendChild(div);
  }
}

// Check If The User Selected Correct Answer
function checkAnswer(userOption) {
  let userSolution = userOption.value;
  let questionIndex = userOption.dataset.index;
  let question = document.getElementsByClassName("mcq")[questionIndex];
  let options = question.querySelectorAll(".options");

  if (userSolution === questionsArray[questionIndex].answer) {
    scoreCount++;
  }
  // Disable All Options
  options.forEach((element) => {
    element.disabled = true;
  });
}

// Eventlisteners
startButton.addEventListener("click", goToMCQ);
finishBtn.addEventListener("click", goToResultPage);
resultPageStartAgainBtn.addEventListener("click", restartQuiz);
timeoutPageStartAgainBtn.addEventListener("click", restartQuiz);
window.addEventListener("load", showHomepage);

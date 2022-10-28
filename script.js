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
const startAgainBtn = document.getElementById("start-again");
const remainingTimeContainer = document.getElementById("remaining-time");
const mcqContainer = document.getElementById("mcq-container");
const scoreContainer = document.getElementById("score-container");

// Variables
let countdown;
let count = 600;
let scoreCount;

// Function to Restart Quiz

// Initializer
function init() {
  mcqContainer.innerHTML = "";
  scoreCount = 0;
  remainingTimeContainer.innerHTML = "";
  count = 60;
  timerDisplay();
  displayQuiz();
}

// Go to MCQ Page
startButton.addEventListener("click", () => {
  homePage.classList.add("hide");
  mcqPage.classList.remove("hide");
  init();
});

// Finish Quiz
finishBtn.addEventListener("click", () => {
  mcqPage.classList.add("hide");
  resultPage.classList.remove("hide");
  scoreContainer.innerHTML = scoreCount;
  clearInterval(countdown);
});

// Restart Quiz
startAgainBtn.addEventListener("click", (e) => {
  init();
  resultPage.classList.add("hide");
  homePage.classList.add("hide");
  mcqPage.classList.remove("hide");
});

const timerDisplay = () => {
  function twoDigits(n) {
    return n <= 9 ? "0" + n : n;
  }

  countdown = setInterval(() => {
    let minutes = Math.floor(count / 60);
    let seconds = count - minutes * 60;
    count--;
    remainingTimeContainer.innerHTML = `${twoDigits(minutes)}: ${twoDigits(
      seconds
    )}`;
    if (count == 0) {
      clearInterval(countdown);
      mcqPage.classList.add("hide");
      timeoutPage.classList.remove("hide");
    }
  }, 1000);
};

// // 10 Min Countdown Timer
// function countdown(elementName, minutes, seconds) {
//   let element, endTime, hours, mins, msLeft, time;

//   function twoDigits(n) {
//     return n <= 9 ? "0" + n : n;
//   }

//   function updateTimer() {
//     msLeft = endTime - +new Date();
//     if (msLeft < 1000) {
//       // element.innerHTML = "Time is up!";
//       clearTimeout();
//     } else {
//       time = new Date(msLeft);
//       hours = time.getUTCHours();
//       mins = time.getUTCMinutes();
//       element.innerHTML =
//         (hours ? hours + ":" + twoDigits(mins) : mins) +
//         ":" +
//         twoDigits(time.getUTCSeconds());
//       setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
//     }
//   }
//   element = elementName;
//   endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;

//   updateTimer();
// }

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

function checkAnswer(userOption) {
  let userSolution = userOption.value;
  let questionIndex = userOption.dataset.index;
  let question = document.getElementsByClassName("mcq")[questionIndex];
  let options = question.querySelectorAll(".options");

  if (userSolution === questionsArray[questionIndex].answer) {
    scoreCount++;
    //   } else {
    //     //For marking the correct option
    //     options.forEach((element) => {
    //       if (element.innerText == questionsArray[questionIndex].answer) {
    //         element.classList.add("correct");
    //       }
    //     });
  }
  options.forEach((element) => {
    element.disabled = true;
  });
}

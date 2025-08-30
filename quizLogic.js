let quizData = [];

async function loadQuiz() {
    const response = await fetch("quiz.json");
    const data = await response.json();
    quizData = data.quizzes;

    const quizContainer = document.getElementById("quiz");

    quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("eachQuestion");

    const questionEl = document.createElement("h3");
    questionEl.textContent = (index + 1) + ". " + q.question;
    questionDiv.appendChild(questionEl);

    q.options.forEach(option => {
        const label = document.createElement("label");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "question" + index;
        radio.value = option;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        questionDiv.appendChild(label);
    });

    const resultEl = document.createElement("div");
    resultEl.classList.add("result");
    questionDiv.appendChild(resultEl);

    quizContainer.appendChild(questionDiv);
    });
}

function checkAnswers() {
    const questions = document.querySelectorAll(".eachQuestion");
    let score = 0;

    questions.forEach((qDiv, index) => {
    const selected = qDiv.querySelector("input[type=radio]:checked");
    const resultEl = qDiv.querySelector(".result");

    if (selected) {
        if (selected.value === quizData[index].answer) {
        resultEl.textContent = "Correct!";
        resultEl.className = "result correct";
        score++;
        } else {
        resultEl.textContent = "Wrong!";
        resultEl.className = "result wrong";
        }
    } else {
        resultEl.textContent = "Not answered";
        resultEl.className = "result wrong";
    }
    });

    document.getElementById("score").textContent =
    `Your Score: ${score} / ${quizData.length}`;
}

document.getElementById("submitBtn").addEventListener("click", checkAnswers);

const timerDisplay = document.getElementById("timer");
let timeLeft = 30;
const countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(countdown);
        checkAnswers();
    }
}, 1000);

loadQuiz();
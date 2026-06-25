const nextbtn = document.getElementById("nextbtn");
const current = document.getElementById("current");
const options = document.querySelectorAll(".option");
const dots = document.querySelectorAll(".dot");
const ques = document.getElementById("question");
const timeDisplay = document.getElementById("time");

let currentques = 0;
let score = 0;
let answered = false;
let time = 10;
let timer;

const questions = [
    {
        question: "What is fullform of HTML?",
        answers: [
            "HyperText Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language",
        ],
        correct: 0
    },
    {
        question: "Which css property is used to change the text color?",
        answers: [
            "font-size",
            "color",
            "font-color",
            "color-text",
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for id selector in css?",
        answers: ["#", ".", "&", "*"],
        correct: 0
    },
    {
        question: "Which property is used to make text bold?",
        answers: [
            "text-style",
            "text-decoration",
            "font-size",
            "font-weight",
        ],
        correct: 3
    },
    {
        question: "Which HTML tag is used to insert an image?",
        answers: [
            "<image>",
            "<picture>",
            "<img>",
            "<src>",
        ],
        correct: 2
    }
];

//  TIMER START FUNCTION
function startTimer() {
    clearInterval(timer);

    time = 10;
    timeDisplay.innerText = time + "s"; 

    timer = setInterval(() => {

        time--;

        if (time >= 0) {
            timeDisplay.innerText = time + "s"; 
        }

        if (time < 0) {
            clearInterval(timer);
            moveNext();
        }

    }, 1000);
}
//  SHOW QUESTION
function showquestion() {
    answered = false;

    ques.innerText = questions[currentques].question;
    current.innerText = currentques + 1;

    options.forEach((option, index) => {
        option.innerText =
            String.fromCharCode(65 + index) + ". " + questions[currentques].answers[index];

        option.style.backgroundColor = "rgba(80, 2, 2, 0.521)";
        option.style.pointerEvents = "auto";
    });

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentques].classList.add("active");

    startTimer();
}

//  MOVE NEXT QUESTION
function moveNext() {
    if (currentques < questions.length - 1) {
        currentques++;
        showquestion();
    } else {
        ques.innerHTML = `
            🎉 Quiz Completed! <br>
            Your Score: ${score}/${questions.length}
        `;

        document.querySelector(".options").style.display = "none";
        nextbtn.style.display = "none";

        clearInterval(timer);
    }
}

//  OPTION CLICK
options.forEach((option, index) => {
    option.addEventListener("click", () => {
        if (answered) return;

        answered = true;
        clearInterval(timer);

        if (index === questions[currentques].correct) {
            option.style.backgroundColor = "green";
            score++;
        } else {
            option.style.backgroundColor = "red";
            options[questions[currentques].correct].style.backgroundColor = "green";
        }

        options.forEach(btn => btn.style.pointerEvents = "none");
    });
});

//  NEXT BUTTON
nextbtn.addEventListener("click", () => {
    clearInterval(timer);
    moveNext();
});

// START FIRST QUESTION
showquestion();

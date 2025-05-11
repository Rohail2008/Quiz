// script.js

// Full Quiz Questions
const questions = [
    // Multiple Choice
    {
        question: "حمد کا مطلب کیا ہے؟",
        options: ["دعا", "تعریف", "سوال", "جواب"],
        answer: "تعریف"
    },
    {
        question: "شاعر نے قدرت کی کن چیزوں کا ذکر کیا؟",
        options: ["گاڑی", "کمپیوٹر", "زمین و آسمان", "موبائل"],
        answer: "زمین و آسمان"
    },
    {
        question: "Who is praised in this poem?",
        options: ["The Prophet (PBUH)", "A king", "Allah Almighty", "A poet"],
        answer: "Allah Almighty"
    },
    {
        question: "تسبیح کا مطلب ہے:",
        options: ["Prayer", "Praise of Allah", "Complaint", "Question"],
        answer: "Praise of Allah"
    },
    {
        question: "Which element of nature is not mentioned in the poem?",
        options: ["Sky", "Light", "River", "Car"],
        answer: "Car"
    },

    // Short Answer
    {
        question: "نظم کا بنیادی پیغام کیا ہے؟",
        type: "short-answer"
    },
    {
        question: "شاعر کے نزدیک قدرت کس کی گواہی دیتی ہے؟",
        type: "short-answer"
    },
    {
        question: "تسبیح کا مطلب اپنے الفاظ میں بیان کریں۔",
        type: "short-answer"
    },
    {
        question: "What is the poet thankful for?",
        type: "short-answer"
    },
    {
        question: "What should a human being do in response to nature's beauty?",
        type: "short-answer"
    },

    // Fill in the Blank
    {
        question: "حمد کا مطلب ہے __________۔",
        type: "fill-in-the-blank",
        answer: "تعریف"
    },
    {
        question: "ہر چیز اللہ کی __________ کرتی ہے۔",
        type: "fill-in-the-blank",
        answer: "تعریف"
    },
    {
        question: "شاعر کے مطابق زمین و آسمان اللہ کی __________ ہیں۔",
        type: "fill-in-the-blank",
        answer: "نشانیاں"
    },
    {
        question: "Nature reflects the __________ of God.",
        type: "fill-in-the-blank",
        answer: "glory"
    },
    {
        question: "The poem teaches us to be __________.",
        type: "fill-in-the-blank",
        answer: "thankful"
    },

    // True/False
    {
        question: "حمد صرف انسانوں کی تعریف ہے۔",
        options: ["True", "False"],
        answer: "False",
        type: "true-false"
    },
    {
        question: "شاعر نے اللہ کی نشانیاں بیان کیں۔",
        options: ["True", "False"],
        answer: "True",
        type: "true-false"
    },
    {
        question: "The poem is about human emotions.",
        options: ["True", "False"],
        answer: "False",
        type: "true-false"
    },
    {
        question: "Nature is silent in praising God.",
        options: ["True", "False"],
        answer: "False",
        type: "true-false"
    },
    {
        question: "The sky and earth glorify Allah.",
        options: ["True", "False"],
        answer: "True",
        type: "true-false"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
const predefinedCode = '334556';

// Prevent incognito mode usage
function checkIncognito() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (e) {
        alert('You cannot take the quiz in incognito mode.');
        window.location.href = 'https://www.google.com';
    }
}

// Event bindings
document.getElementById('start-quiz-btn').addEventListener('click', () => {
    if (getCookie("quizTaken")) {
        showPage("code-page");
    } else {
        startQuiz();
    }
});
document.getElementById('retake-quiz-btn').addEventListener('click', () => showPage("code-page"));
document.getElementById('submit-code-btn').addEventListener('click', submitCode);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    setCookie("quizTaken", "true", 7);
    showPage("quiz-page");
    loadQuestion();
}

function loadQuestion() {
    const questionObj = questions[currentQuestionIndex];
    const questionBox = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');

    questionBox.textContent = questionObj.question;
    optionsContainer.innerHTML = '';
    nextBtn.disabled = true;

    if (questionObj.type === "short-answer" || questionObj.type === "fill-in-the-blank") {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "code-input";
        input.placeholder = "Your answer here";
        optionsContainer.appendChild(input);

        nextBtn.disabled = false;
        nextBtn.onclick = () => {
            const userInput = input.value.trim();
            if (questionObj.type === "fill-in-the-blank" && userInput.toLowerCase() === questionObj.answer.toLowerCase()) {
                score++;
            }
            userAnswers.push(userInput);
            moveToNextQuestion();
        };
    } else {
        questionObj.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => {
                if (option === questionObj.answer) score++;
                userAnswers.push(option);
                moveToNextQuestion();
            };
            optionsContainer.appendChild(btn);
        });
    }
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('score').textContent = `${score} / ${questions.filter(q => q.answer).length}`;
    showPage("score-page");
}

// 6-digit code for retake
function submitCode() {
    const codeInput = document.getElementById("code-input").value.trim();
    if (codeInput === predefinedCode) {
        eraseCookie("quizTaken");
        document.getElementById("error-message").textContent = '';
        startQuiz();
    } else {
        document.getElementById("error-message").textContent = "Incorrect Code. Please try again.";
    }
}

// Page display helper
function showPage(pageId) {
    ["welcome-page", "quiz-page", "score-page", "code-page"].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Cookie helpers
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}
function eraseCookie(name) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
}

// Initialization
window.onload = () => {
    checkIncognito();
    if (getCookie("quizTaken")) {
        showPage("code-page");
    } else {
        showPage("welcome-page");
    }
};

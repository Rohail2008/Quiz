// script.js

const questions = [
    // Multiple Choice Questions (MCQs)
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

    // Short Answer Questions
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

    // Fill in the blanks
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

    // True or False
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

// Predefined Code for retake
const predefinedCode = '334556';

// Check for incognito mode (localStorage)
function checkIncognito() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (e) {
        alert('You cannot take the quiz in incognito mode.');
        window.location.href = 'https://www.google.com';
    }
}

// Start quiz and load first question
function startQuiz() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    loadQuestion();
}

// Load question and options
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    if (question.type === "short-answer") {
        const input = document.createElement('input');
        input.type = "text";
        input.id = "short-answer";
        optionsContainer.appendChild(input);
        document.getElementById('next-btn').onclick = () => handleShortAnswer(input.value);
    } else if (question.type === "fill-in-the-blank") {
        const input = document.createElement('input');
        input.type = "text";
        input.id = "fill-in-the-blank";
        optionsContainer.appendChild(input);
        document.getElementById('next-btn').onclick = () => handleFillInTheBlank(input.value);
    } else if (question.type === "true-false") {
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => handleTrueFalse(option);
            optionsContainer.appendChild(button);
        });
    } else {
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => handleAnswer(option);
            optionsContainer.appendChild(button);
        });
    }
}

// Handle answer for MCQs
function handleAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Handle short answer
function handleShortAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Handle fill-in-the-blank
function handleFillInTheBlank(answer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Handle true/false answer
function handleTrueFalse(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Show score and allow retake
function showScore() {
    localStorage.setItem('quizScore', score);
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('score-page').style.display = 'block';
    document.getElementById('score').textContent = score + '/' + questions.length;
}

// Retake quiz page (prompt for 6-digit code)
function retakeQuiz() {
    document.getElementById('code-page').style.display = 'block';
    document.getElementById('retake-quiz-btn').style.display = 'none';
    document.getElementById('submit-code-btn').onclick = function() {
        const userCode = document.getElementById('code-input').value;
        if (userCode === predefinedCode) {
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById('code-page').style.display = 'none';
            document.getElementById('quiz-page').style.display = 'block';
            loadQuestion();
        } else {
            document.getElementById('error-message').textContent = 'Incorrect Code. Please try again.';
        }
    };
}

// Event Listeners
document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
document.getElementById('retake-quiz-btn').addEventListener('click', retakeQuiz);

// Initialize setup
checkIncognito();

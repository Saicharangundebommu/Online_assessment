let timer;
let timeRemaining;
let questions = [];
const numQuestions = 10; // Number of questions per quiz
const scoresRequired = {
    html: 2,
    css: 5,
    javascript: 5
};

// Function to start the exam
function startExam() {
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;

    if (name === '' || dob === '') {
        alert("Please enter your name and date of birth.");
        return;
    }

    // Validate date of birth format
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobPattern.test(dob)) {
        alert("Please enter a valid date of birth. It should be in YYYY-MM-DD format.");
        return;
    }

    // Display user details
    document.getElementById('displayName').textContent = name;
    document.getElementById('userDetails').style.display = 'block';

    // Hide login form and show topic selection
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('topicSelection').style.display = 'block';
}

// Function to start the quiz
function startQuiz() {
    const selectedTopic = document.getElementById('quizSelection').value;

    // Hide topic selection and show quiz form
    document.getElementById('topicSelection').style.display = 'none';
    document.getElementById('assessmentForm').style.display = 'block';
    document.getElementById('timerDisplay').style.display = 'block';

    // Set timer for 30 minutes
    timeRemaining = 30 * 60; // 30 minutes in seconds
    updateTimerDisplay();
    timer = setInterval(updateTimer, 1000);

    // Load questions based on the selected topic
    loadQuestions(selectedTopic);
}

// Function to load questions based on quiz type
function loadQuestions(quizType) {
    const questionsHTML = {
        html: [
            { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HyperText Machine Language", "Hyper Tool Markup Language", "HyperText Markdown Language"], answer: "HyperText Markup Language" },
            { question: "What is the purpose of the alt attribute in an <img> tag?", options: ["To specify the image source", "To provide alternative text for the image", "To set the image width", "To link an image"], answer: "To provide alternative text for the image" },
            { question: "What does the <head> element contain?", options: ["Metadata and links to scripts and styles", "Main content of the page", "Footer information", "Page layout"], answer: "Metadata and links to scripts and styles" },
            { question: "Which HTML attribute specifies an alternate text for an image if the image cannot be displayed?", options: ["src", "alt", "title", "img"], answer: "alt" },
            { question: "What does the <meta> tag provide?", options: ["It provides metadata about the HTML document", "It provides a description of the page", "It sets the document title", "It defines the page's character set"], answer: "It provides metadata about the HTML document" }
        ],
        css: [
            { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Cascading Script Sheets", "Creative Style Sheets", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
            { question: "How do you add a comment in CSS?", options: ["<!-- Comment -->", "/* Comment */", "// Comment", "# Comment"], answer: "/* Comment */" },
            { question: "Which property is used to change the background color in CSS?", options: ["bgcolor", "background-color", "color", "background"], answer: "background-color" },
            { question: "How can you center-align text in CSS?", options: ["text-align: center;", "align: center;", "text-center: true;", "center: text;"], answer: "text-align: center;" },
            { question: "What is the default value of the 'position' property in CSS?", options: ["static", "relative", "absolute", "fixed"], answer: "static" },
            { question: "How do you apply a style to all <p> elements in CSS?", options: ["p { style: ...; }", ".p { style: ...; }", "p { ... }", "#p { style: ...; }"], answer: "p { ... }" },
            { question: "What property is used to change the font size in CSS?", options: ["font-size", "text-size", "font-style", "size-font"], answer: "font-size" },
            { question: "How can you make a list horizontal in CSS?", options: ["list-style: horizontal;", "display: inline;", "list-style: inline;", "list-horizontal: true;"], answer: "display: inline;" },
            { question: "What does the 'z-index' property do in CSS?", options: ["Specifies the stack order of elements", "Sets the size of elements", "Defines the transparency level", "Defines the position of the element"], answer: "Specifies the stack order of elements" },
            { question: "Which property is used to add space between the content and the border in CSS?", options: ["margin", "padding", "border-spacing", "spacing"], answer: "padding" }
        ],
        javascript: [
            { question: "What does DOM stand for in JavaScript?", options: ["Document Object Model", "Document Orientation Model", "Document Object Method", "Data Object Model"], answer: "Document Object Model" },
            { question: "Which symbol is used for comments in JavaScript?", options: ["<!-- -->", "/* */", "//", "#"], answer: "//" },
            { question: "How do you declare a variable in JavaScript?", options: ["var name;", "let name;", "Both A and B", "None of the above"], answer: "Both A and B" },
            { question: "What method is used to add an element to an array in JavaScript?", options: ["add()", "append()", "push()", "insert()"], answer: "push()" },
            { question: "How can you create a function in JavaScript?", options: ["function myFunction() {}", "create function myFunction() {}", "def myFunction() {}", "fn myFunction() {}"], answer: "function myFunction() {}" },
            { question: "Which method is used to remove the last element from an array in JavaScript?", options: ["pop()", "shift()", "remove()", "delete()"], answer: "pop()" },
            { question: "How do you write an 'if' statement in JavaScript?", options: ["if (condition) {}", "if condition {} ", "if { condition }", "if [condition] {}"], answer: "if (condition) {}" },
            { question: "What will the following code output: console.log(typeof 'Hello')?", options: ["string", "object", "undefined", "null"], answer: "string" },
            { question: "Which operator is used to assign a value to a variable in JavaScript?", options: ["=", "==", "===", "::"], answer: "=" },
            { question: "What is the correct way to write a JavaScript array?", options: ["let arr = [1, 2, 3];", "let arr = (1, 2, 3);", "let arr = 1, 2, 3;", "let arr = {1, 2, 3};"], answer: "let arr = [1, 2, 3];" }
        ]        
    };

    // Ensure we have at least 'numQuestions' questions available
    const selectedQuestions = questionsHTML[quizType];
    questions = selectedQuestions.slice(0, numQuestions); // Take only the required number of questions

    // Render questions
    const form = document.getElementById('questionsContainer');
    form.innerHTML = ''; // Clear previous questions
    questions.forEach((q, index) => {
        const questionHTML = `
            <div class="question">
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <input type="radio" name="q${index + 1}" value="${String.fromCharCode(65 + i)}" id="q${index + 1}${String.fromCharCode(97 + i)}">
                    <label for="q${index + 1}${String.fromCharCode(97 + i)}">${String.fromCharCode(65 + i)}) ${option}</label><br>
                `).join('')}
            </div>
        `;
        form.insertAdjacentHTML('beforeend', questionHTML);
    });
}

// Function to update the timer
function updateTimer() {
    timeRemaining--;
    if (timeRemaining <= 0) {
        clearInterval(timer);
        alert("Time is up! Submitting the quiz automatically.");
        submitAssessment();
    }
    updateTimerDisplay();
}

// Function to update the timer element
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timeRemaining').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to submit the assessment
function submitAssessment() {
    clearInterval(timer); // Stop the timer

    // Calculate score
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selectedOption && selectedOption.value === getAnswerLetter(q.answer)) {
            score++;
        }
    });

    // Display score
    document.getElementById('score').textContent = score;
    document.getElementById('result').style.display = 'block';

    // Show certificate button if score meets the criteria
    const selectedTopic = document.getElementById('quizSelection').value;
    if (score >= scoresRequired[selectedTopic]) {
        document.getElementById('certificateButton').style.display = 'block';
        document.getElementById('congratulations').style.display = 'block';
    }
}

// Function to map answer to letter
function getAnswerLetter(answer) {
    const letters = ['A', 'B', 'C', 'D'];
    return letters[questions.find(q => q.answer === answer).options.indexOf(answer)];
}

// Function to generate and download the certificate
function generateCertificate() {
    const name = document.getElementById('displayName').textContent;
    const date = new Date().toLocaleDateString();
    const score = document.getElementById('score').innerText;
    const selectedTopic = document.getElementById('quizSelection').value;

    const certificateContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: aquamarine;
        }
        .all{
            border: solid;
            background-color: azure;
            text-align: center;
            padding: 5px;
            // margin-left: 300px;
            // margin-right: 300px;
            margin-top: 100px;
        }
        .all2{
            border: 3px dashed;

        }
        img{
            margin-top: 30px;
        }
            .print{
            text-align: center;
            margin-top: 20px
            }
    </style>
</head>
<body>
    <div class="all">
        <div class="all2">
        <img src="data:image/png;base64,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" alt="Vignan" >
        <div class="coa">
        <h2>Certificate of Achievement</h2>
        </div>

        <div class="content">
        <h3>This certificate is proudly presentated to :</h3>
        <h1><u>${name}</u></h1>
        <h3>has successfully completed the quiz with a score of ${score}
        <h3>on ${date}</h3>
        <h3>Congratulations on your achievement!</h3>
        </div>
</div>
  </div>
  <div class="print">
       <button type="button" onclick="window.print()">Print Certificate</button>
  </div>
</body>
</html>
    `;

    const blob = new Blob([certificateContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

// Reset Form
function handleFormReset(event) {
    event.preventDefault();
    document.getElementById('assessmentForm').reset();
    document.querySelectorAll('.question label').forEach(label => label.style.color = '');
    document.getElementById('result').style.display = 'none';
    clearInterval(timer);
    document.getElementById('loginForm').style.display = 'block';
}

// Event listeners
document.querySelector('input[type="reset"]').addEventListener('click', handleFormReset);
document.getElementById('certificateButton').addEventListener('click', generateCertificate);

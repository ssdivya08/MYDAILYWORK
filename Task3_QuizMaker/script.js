// Utility: Show only one section at a time
function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}

// Navigation buttons
document.getElementById("createQuizBtn").addEventListener("click", () => showSection("quizCreation"));
document.getElementById("takeQuizBtn").addEventListener("click", () => showSection("quizTaking"));
document.getElementById("listQuizzesBtn").addEventListener("click", () => {
  loadQuizList();
  showSection("quizListing");
});
document.getElementById("loginBtn").addEventListener("click", () => showSection("loginSection"));
document.getElementById("registerBtn").addEventListener("click", () => showSection("registerSection"));

// ---------------- QUIZ CREATION ----------------
document.getElementById("addQuestionBtn").addEventListener("click", () => {
  const container = document.getElementById("questionsContainer");
  const qIndex = container.children.length + 1;

  const questionDiv = document.createElement("div");
  questionDiv.innerHTML = `
    <label>Question ${qIndex}:</label>
    <input type="text" class="questionText" required><br>
    <label>Options (comma separated):</label>
    <input type="text" class="optionsText" required><br>
    <label>Correct Answer:</label>
    <input type="text" class="answerText" required><br><br>
  `;
  container.appendChild(questionDiv);
});

document.getElementById("quizForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("quizTitle").value;
  const questions = [];

  document.querySelectorAll("#questionsContainer div").forEach(div => {
    const q = div.querySelector(".questionText").value;
    const opts = div.querySelector(".optionsText").value.split(",");
    const ans = div.querySelector(".answerText").value;

    questions.push({ question: q, options: opts, answer: ans });
  });

  const quiz = { title, questions };

  // Save quizzes array in localStorage
  let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  quizzes.push(quiz);
  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  alert("Quiz saved successfully!");
  document.getElementById("quizForm").reset();
  document.getElementById("questionsContainer").innerHTML = "";
});

// ---------------- QUIZ LISTING ----------------
function loadQuizList() {
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = "";
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  quizzes.forEach((quiz, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${quiz.title} <button onclick="startQuiz(${index})">Take Quiz</button>`;
    quizList.appendChild(li);
  });
}

// ---------------- QUIZ TAKING ----------------
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(index) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  currentQuiz = quizzes[index];
  currentQuestionIndex = 0;
  score = 0;
  showSection("quizTaking");
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  if (currentQuestionIndex < currentQuiz.questions.length) {
    const qObj = currentQuiz.questions[currentQuestionIndex];
    const qElem = document.createElement("div");
    qElem.innerHTML = `<h3>${qObj.question}</h3>`;

    qObj.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.trim();
      btn.addEventListener("click", () => checkAnswer(opt.trim()));
      qElem.appendChild(btn);
    });

    container.appendChild(qElem);
  } else {
    showResults();
  }
}

function checkAnswer(selected) {
  const qObj = currentQuiz.questions[currentQuestionIndex];
  if (selected === qObj.answer.trim()) {
    score++;
  }
  currentQuestionIndex++;
  showQuestion();
}

// ---------------- QUIZ RESULTS ----------------
function showResults() {
  showSection("quizResults");
  document.getElementById("scoreDisplay").textContent =
    `You scored ${score} out of ${currentQuiz.questions.length}`;

  const answersDiv = document.getElementById("correctAnswers");
  answersDiv.innerHTML = "<h3>Correct Answers:</h3>";
  currentQuiz.questions.forEach((q, i) => {
    const p = document.createElement("p");
    p.textContent = `Q${i+1}: ${q.question} → ${q.answer}`;
    answersDiv.appendChild(p);
  });
}

// ---------------- LOGIN & REGISTER ----------------
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  localStorage.setItem("user", JSON.stringify({ email, password }));
  alert("Registration successful!");
  showSection("loginSection");
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    alert("Login successful!");
    showSection("quizListing");
    loadQuizList();
  } else {
    alert("Invalid credentials!");
  }
});

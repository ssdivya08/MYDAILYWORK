// Utility: Show only one section at a time
function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}

// ---------------- NAVIGATION ----------------
document.getElementById("createQuizBtn").addEventListener("click", () => showSection("quizCreation"));
document.getElementById("takeQuizBtn").addEventListener("click", () => showSection("quizTaking"));
document.getElementById("listQuizzesBtn").addEventListener("click", () => {
  loadQuizList();
  showSection("quizListing");
});
document.getElementById("loginBtn").addEventListener("click", () => showSection("loginSection"));
document.getElementById("registerBtn").addEventListener("click", () => showSection("registerSection"));
document.getElementById("profileBtn").addEventListener("click", () => showSection("profileSection"));

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
  quizList.innerHTML = ""; // clear old list
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  if (quizzes.length === 0) {
    quizList.innerHTML = "<p>No quizzes available. Create one to get started!</p>";
    return;
  }

  quizzes.forEach((quiz, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${quiz.title}</strong>
      <button onclick="startQuiz(${index})">Take Quiz</button>
      <button onclick="deleteQuiz(${index})">Delete</button>
    `;
    quizList.appendChild(li);
  });
}
// Seed quizzes into localStorage if none exist
if (!localStorage.getItem("quizzes")) {
  const sampleQuizzes = [
    {
      title: "General Knowledge Basics",
      questions: [
        { question: "What is the capital of France?", options: ["Paris","Rome","Berlin","Madrid"], answer: "Paris" },
        { question: "Who wrote Romeo and Juliet?", options: ["William Shakespeare","Charles Dickens","Mark Twain","Jane Austen"], answer: "William Shakespeare" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth","Mars","Jupiter","Venus"], answer: "Mars" }
      ]
    },
    {
      title: "Science Fundamentals",
      questions: [
        { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the chemical symbol for water?", options: ["H2O","O2","CO2","HO"], answer: "H2O" },
        { question: "Which organ in the human body pumps blood?", options: ["Brain","Heart","Lungs","Kidney"], answer: "Heart" }
      ]
    },
    {
      title: "World Geography",
      questions: [
        { question: "Which is the largest ocean on Earth?", options: ["Atlantic","Pacific","Indian","Arctic"], answer: "Pacific" },
        { question: "Mount Everest is located in which mountain range?", options: ["Alps","Himalayas","Andes","Rockies"], answer: "Himalayas" },
        { question: "The Nile River flows through which continent?", options: ["Asia","Africa","Europe","South America"], answer: "Africa" }
      ]
    },
    {
      title: "Math Quick Quiz",
      questions: [
        { question: "What is 12 × 8?", options: ["96","84","108","88"], answer: "96" },
        { question: "What is the square root of 144?", options: ["12","14","16","10"], answer: "12" },
        { question: "What is 25% of 200?", options: ["50","25","75","100"], answer: "50" }
      ]
    },
    {
      title: "Computer Basics",
      questions: [
        { question: "What does CPU stand for?", options: ["Central Processing Unit","Computer Personal Unit","Control Power Unit","Core Processing Utility"], answer: "Central Processing Unit" },
        { question: "Which company developed Windows OS?", options: ["Apple","Microsoft","Google","IBM"], answer: "Microsoft" },
        { question: "HTML is used for?", options: ["Web Design","Database","Networking","Operating Systems"], answer: "Web Design" }
      ]
    }
  ];

  localStorage.setItem("quizzes", JSON.stringify(sampleQuizzes));
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

    // Show profile section immediately
    showSection("profileSection");
    document.getElementById("profileInfo").textContent =
      `Logged in as: ${user.email}`;

    // Show logout button
    document.getElementById("logoutBtn").style.display = "inline-block";
  } else {
    alert("Invalid credentials!");
  }
});

// ---------------- LOGOUT ----------------
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  alert("You have been logged out.");

  // Hide logout button again
  document.getElementById("logoutBtn").style.display = "none";

  // Redirect back to login section
  showSection("loginSection");
});

// ---------------- DELETE ACCOUNT ----------------
document.getElementById("deleteAccountBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  alert("Account deleted successfully!");

  // Hide logout button
  document.getElementById("logoutBtn").style.display = "none";

  // Redirect to register
  showSection("registerSection");
});


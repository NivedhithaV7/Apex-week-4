const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HyperTool Multi Language",
      "HighText Machine Language",
      "HomeText Management Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which method is used to fetch data from an API?",
    options: ["getData()", "fetch()", "retrieve()", "callAPI()"],
    answer: "fetch()"
  }
];

const quizContainer = document.getElementById("quiz");

// Clear quiz container before rendering
quizContainer.innerHTML = "";

quizData.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  const questionText = document.createElement("p");
  questionText.textContent = `${index + 1}. ${q.question}`;
  questionDiv.appendChild(questionText);

  q.options.forEach(option => {
    const label = document.createElement("label");
    label.style.display = "block"; // Ensure each option is on a new line
    label.innerHTML = `
      <input type="radio" name="q${index}" value="${option}" />
      ${option}
    `;
    questionDiv.appendChild(label);
  });

  quizContainer.appendChild(questionDiv);
});

document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("result").textContent = `You scored ${score} out of ${quizData.length}!`;

  // Fetch a fun fact (joke) from API
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json())
    .then(data => {
      document.getElementById("joke").textContent = `${data.setup} — ${data.punchline}`;
    })
    .catch(() => {
      document.getElementById("joke").textContent = "Oops! Couldn't fetch a joke.";
    });
});
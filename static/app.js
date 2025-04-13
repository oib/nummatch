let currentLevel = 1;
let score = 0;
let activeField = null;
const maxScorePerLevel = 10;

function saveProgress(level, score) {
  localStorage.setItem("nummatch_level", level);
  localStorage.setItem("nummatch_score", score);
  updateStatus();
}

function loadProgress() {
  const level = parseInt(localStorage.getItem("nummatch_level")) || 1;
  const score = parseInt(localStorage.getItem("nummatch_score")) || 0;
  return { level, score };
}

function updateStatus() {
  document.getElementById("level-info").textContent = `Level: ${currentLevel} – Punkte: ${score}`;
}

function generateTarget(min, max) {
  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;
  return a * b;
}

async function getLevelData(levelNumber) {
  try {
    const response = await fetch(`/get_level/${levelNumber}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to fetch level data: ${response.status}`);
      return { multiplier_range: [1, 10] };
    }
  } catch (error) {
    console.error("Error fetching level data:", error);
    return { multiplier_range: [1, 10] };
  }
}

async function startGame(levelNumber) {
  const level = await getLevelData(levelNumber);
  const [min, max] = level.multiplier_range;
  document.getElementById("target").textContent = generateTarget(min, max);

  const leftInput = document.getElementById("left");
  const rightInput = document.getElementById("right");
  const feedback = document.getElementById("feedback");

  leftInput.textContent = "";
  rightInput.textContent = "";
  leftInput.dataset.value = "";
  rightInput.dataset.value = "";
  leftInput.classList.remove("ok", "fail");
  rightInput.classList.remove("ok", "fail");

  feedback.textContent = "";
  feedback.classList.remove("feedback-ok", "feedback-fail");

  activeField = leftInput;
  activeField.classList.add("active");
  rightInput.classList.remove("active");
  leftInput.focus();

  updateStatus();
}

function checkAnswer() {
  const leftInput = document.getElementById("left");
  const rightInput = document.getElementById("right");
  const [left, right] = getValues("left", "right");
  const target = parseInt(document.getElementById("target").textContent);
  const feedback = document.getElementById("feedback");

  feedback.classList.remove("feedback-ok", "feedback-fail");
  leftInput.classList.remove("ok", "fail");
  rightInput.classList.remove("ok", "fail");

  if (left * right === target) {
    score++;
    feedback.textContent = "✅ Richtig!";
    feedback.classList.add("feedback-ok");
    leftInput.classList.add("ok");
    rightInput.classList.add("ok");

    submitScore(score, currentLevel);

    if (score >= maxScorePerLevel) {
      currentLevel++;
      score = 0;
    }

    saveProgress(currentLevel, score);
    setTimeout(() => {
      feedback.textContent = "";
      feedback.classList.remove("feedback-ok");
      startGame(currentLevel);
    }, 2000);
  } else {
    feedback.textContent = "❌ Versuch’s nochmal.";
    feedback.classList.add("feedback-fail");
    leftInput.classList.add("fail");
    rightInput.classList.add("fail");

    setTimeout(() => {
      feedback.textContent = "";
      feedback.classList.remove("feedback-fail");
      saveProgress(currentLevel, score);
      startGame(currentLevel);
    }, 2000);
  }
}

async function submitScore(score, level) {
  try {
    await fetch("/submit_score/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: "Anonymous",
        score: score,
        level_number: level,
        date: new Date().toISOString().split("T")[0],
      }),
    });
  } catch (error) {
    console.error("Error submitting score:", error);
  }
}

window.addEventListener("load", () => {
  const checkBtn = document.getElementById("check-btn");
  if (checkBtn) {
    checkBtn.addEventListener("click", checkAnswer);
  } else {
    console.error("Check button not found!");
  }

  const leftInput = document.getElementById("left");
  leftInput.classList.add("active");
  activeField = leftInput;
  leftInput.focus();
  createNumBlock("numpad-container");
  setupNumInputs("left", "right");
  insertButton("game-container-buttons", "restart-btn", "🔁 Neustart", () => {
    localStorage.removeItem("nummatch_level");
    localStorage.removeItem("nummatch_score");
    score = 0;
    currentLevel = 1;
    activeField = document.getElementById("left");
    activeField.classList.add("active");
    activeField.focus();
    saveProgress(currentLevel, score);
    startGame(currentLevel);
  });
  const progress = loadProgress();
  currentLevel = progress.level;
  score = progress.score;

  startGame(currentLevel);
});

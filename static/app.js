let targetValue = null;
let score = 0;
let activeField = null;

function generateTarget(min, max) {
  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;
  return a * b; // alle möglichen Kombinationen zulassen
}

async function startGame() {
  const min = 1;
  const max = 9;
  targetValue = generateTarget(min, max);
  document.getElementById("target").textContent = targetValue;

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

  // Set active field to left by default
  activeField = leftInput;
  leftInput.classList.add("active");
  rightInput.classList.remove("active");
  // Don't set focus here - let the calling function handle it
}

function checkAnswer() {
  const leftInput = document.getElementById("left");
  const rightInput = document.getElementById("right");
  const [rawLeft, rawRight] = getValues("left", "right");
  const left = parseInt(rawLeft, 10);
  const right = parseInt(rawRight, 10);
  const target = targetValue;
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

    submitScore(score)

    

    
    setTimeout(() => {
      feedback.textContent = "";
      feedback.classList.remove("feedback-ok");
      startGame();
      // Set focus to left field after restart
      setTimeout(() => {
        const leftInput = document.getElementById("left");
        leftInput.focus();
      }, 50);
    }, 3000);
  } else {
    feedback.textContent = "❌ Versuch’s nochmal.";
    feedback.classList.add("feedback-fail");
    leftInput.classList.add("fail");
    rightInput.classList.add("fail");

    setTimeout(() => {
      feedback.textContent = "";
      feedback.classList.remove("feedback-fail");
      startGame();
      // Set focus to left field after restart
      setTimeout(() => {
        const leftInput = document.getElementById("left");
        leftInput.focus();
      }, 50);
    }, 3000);
  }
}

async function submitScore(score) {
  try {
    await fetch("/submit_score/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: "Anonymous",
        score: score,
        level_number: 1,
        date: new Date().toISOString().split("T")[0],
      }),
    });
    
  } catch (error) {
    // Score submission failed - continue game
  }
}

window.addEventListener("load", () => {
  // Add restart button functionality
  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      score = 0;
      startGame();
      setTimeout(() => {
        const leftInput = document.getElementById("left");
        leftInput.focus();
      }, 50);
    });
  }

  createNumBlock("numpad-container");
  setupNumInputs("left", "right");

  score = 0;

  // Start the game first, then ensure focus
  startGame();
  
  // Ensure focus is set after a short delay
  setTimeout(() => {
    const leftInput = document.getElementById("left");
    leftInput.classList.add("active");
    activeField = leftInput;
    leftInput.focus();
  }, 100);
});

// Make functions globally available
window.checkAnswer = checkAnswer;
window.startGame = startGame;


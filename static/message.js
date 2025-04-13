// Einfache Feedback-Verwaltung

let feedbackTimer;

export function showFeedback(message, success = true) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.classList.remove("feedback-ok", "feedback-fail");
  feedback.classList.add(success ? "feedback-ok" : "feedback-fail");

  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    feedback.textContent = "";
    feedback.classList.remove("feedback-ok", "feedback-fail");
  }, 2000);
}

export function clearFeedback() {
  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  feedback.classList.remove("feedback-ok", "feedback-fail");
}


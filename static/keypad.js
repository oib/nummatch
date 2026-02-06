function createNumBlock(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const grid = document.createElement("div");
  grid.className = "num-grid";

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(n => {
    const btn = document.createElement("button");
    btn.textContent = n;
    btn.setAttribute("tabindex", "-1");
    btn.className = "num-key";
    btn.addEventListener("click", () => {
      if (activeField) {
        activeField.dataset.value = n;
        activeField.textContent = n;
        // Visual feedback
        activeField.style.transform = 'scale(1.1)';
        setTimeout(() => {
          activeField.style.transform = '';
        }, 100);
        autoCheckIfComplete();
      } else {
        console.log("No active field");
      }
    });
    grid.appendChild(btn);
  });

  container.appendChild(grid);
}

function setupNumInputs(leftId, rightId) {
  const left = document.getElementById(leftId);
  const right = document.getElementById(rightId);

  [left, right].forEach(el => {
    ["click", "focus", "mousedown"].forEach(eventType => {
      el.addEventListener(eventType, (e) => {
        e.preventDefault();
        activeField = el;
        left.classList.remove("active");
        right.classList.remove("active");
        el.classList.add("active");
        // Ensure focus
        el.focus();
      });
    });

    el.addEventListener("keydown", e => {
      const key = e.key;
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        el.textContent = key;
        el.dataset.value = key;
        autoCheckIfComplete();
      }
    });
  });
}

function getValues(leftId, rightId) {
  const left = document.getElementById(leftId).dataset.value || "";
  const right = document.getElementById(rightId).dataset.value || "";
  return [parseInt(left) || NaN, parseInt(right) || NaN];
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const leftEl = document.getElementById("left");
    const rightEl = document.getElementById("right");
    const [left, right] = getValues("left", "right");

    if (!isNaN(left) && !isNaN(right)) {
      checkAnswer();
    } else if (!isNaN(left) && isNaN(right)) {
      rightEl.focus();
    } else if (isNaN(left) && !isNaN(right)) {
      leftEl.focus();
    }
  }
});

function autoCheckIfComplete() {
  const [left, right] = getValues("left", "right");
  if (!isNaN(left) && !isNaN(right)) {
    setTimeout(() => checkAnswer(), 500);
  } else if (!isNaN(left) && isNaN(right)) {
    setTimeout(() => {
      const rightEl = document.getElementById("right");
      rightEl.focus();
      activeField = rightEl;
    }, 500);
  }
}

// make functions globally available
window.createNumBlock = createNumBlock;
window.setupNumInputs = setupNumInputs;
window.getValues = getValues;

// patch target generator to avoid double digit operands
if (window.generateTarget) {
  const original = window.generateTarget;
  window.generateTarget = function(min, max) {
    let result;
    do {
      result = original(min, max);
    } while (result >= 100); // ensures x*y < 100 → avoids operands ≥ 10
    return result;
  }
}


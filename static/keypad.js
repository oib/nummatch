function createNumBlock(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const grid = document.createElement("div");
  grid.className = "num-grid";

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(n => {
    const btn = document.createElement("button");
    btn.textContent = n;
    btn.className = "num-key";
    btn.addEventListener("click", () => {
      if (activeField) {
        activeField.textContent = n;
        activeField.dataset.value = n;
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
    el.addEventListener("click", () => {
      activeField = el;
      left.classList.remove("active");
      right.classList.remove("active");
      el.classList.add("active");
    });
  });
}

function getValues(leftId, rightId) {
  const left = document.getElementById(leftId).dataset.value;
  const right = document.getElementById(rightId).dataset.value;
  return [parseInt(left), parseInt(right)];
}

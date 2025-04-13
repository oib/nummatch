// button.js
// Modularer Button-Helper für dynamische UI-Erweiterung

function createButton(id, label, onClick) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function insertButton(containerId, id, label, onClick) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const btn = createButton(id, label, onClick);
  container.appendChild(btn);
}

"use strict";

const config = window.LANDING_CONFIG || {};
// Si la imagen no carga, se conserva el fondo oscuro.
if (config.background && typeof config.background.image === "string" && config.background.image.trim()) {
  const background = new Image();
  background.addEventListener("load", () => {
    const overlay = Number.isFinite(config.background.overlay)
      ? Math.min(1, Math.max(0, config.background.overlay)) : 0.75;
    document.body.style.setProperty("--background-overlay", overlay);
    document.body.style.setProperty("--background-image", `url(${JSON.stringify(background.src)})`);
  }, { once: true });
  background.src = config.background.image;
}

if (config.nickname) {
  document.querySelectorAll("[data-name]").forEach(element => { element.textContent = config.nickname; });
  document.title = `Para ${config.nickname} · Nuestra pequeña aventura`;
}
if (config.sender) document.getElementById("sender-name").textContent = config.sender;
if (Array.isArray(config.memories)) {
  config.memories.slice(0, 3).forEach((memory, index) => {
    const image = document.getElementById(`memory-image-${index}`);
    // Si una foto no existe, conserva una ilustración local como respaldo.
    image.addEventListener("error", () => {
      image.src = `./assets/memory-${index + 1}.svg`;
      image.alt = "Ilustración de ejemplo. Reemplaza la ruta de la foto en config.js.";
    }, { once: true });
    if (memory.image) image.src = memory.image;
    if (memory.alt) image.alt = memory.alt;
    ["date", "title", "text"].forEach(field => {
      if (typeof memory[field] === "string") document.getElementById(`memory-${field}-${index}`).textContent = memory[field];
    });
  });
}
if (Array.isArray(config.letter) && config.letter.length) {
  document.getElementById("letter-body").replaceChildren(...config.letter.map(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
}

const flowers = [...document.querySelectorAll(".collect-flower")];
const dialog = document.getElementById("bouquet-dialog");
const progress = document.getElementById("flower-progress");
const counter = document.getElementById("flower-count");
const message = document.getElementById("quest-message");
let collected = 0;

flowers.forEach((flower, index) => {
  flower.addEventListener("click", () => {
    if (flower.getAttribute("aria-disabled") === "true") return;
    flower.setAttribute("aria-disabled", "true");
    flower.setAttribute("aria-label", `Flor amarilla ${index + 1} recogida`);
    flower.classList.add("collected");
    collected += 1;
    counter.textContent = `${collected} / ${flowers.length}`;
    progress.value = collected;
    progress.textContent = `${collected} de ${flowers.length}`;
    message.textContent = collected === flowers.length
      ? "¡Ramo completo! Tu sorpresa está lista."
      : `¡Una flor más para ti! Faltan ${flowers.length - collected}.`;
    if (collected === flowers.length) dialog.showModal();
  });
});

document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
document.getElementById("read-letter").addEventListener("click", () => {
  dialog.close();
  const letter = document.getElementById("letter-details");
  letter.open = true;
  letter.querySelector("summary").focus({ preventScroll: true });
  letter.scrollIntoView({ block: "start" });
});
document.getElementById("play-again").addEventListener("click", () => {
  dialog.close();
  collected = 0;
  counter.textContent = `0 / ${flowers.length}`;
  progress.value = 0;
  progress.textContent = `0 de ${flowers.length}`;
  message.textContent = "Recoge 5 flores. Hay una sorpresa para ti.";
  flowers.forEach((flower, index) => {
    flower.removeAttribute("aria-disabled");
    flower.setAttribute("aria-label", `Recoger flor amarilla ${index + 1}`);
    flower.classList.remove("collected");
  });
  flowers[0].focus();
});

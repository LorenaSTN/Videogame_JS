const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

window.addEventListener("load", startGame);

function startGame() {
  let canvasSize;

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  const elementsSize = canvasSize / 10;

  context.font = elementsSize + "px Verdana";
  context.textAlign = "end";

  for (let i = 1; i <= 10; i++) {
    context.fillText(emojis["X"], elementsSize * i, elementsSize);
  }

  window.innerHeight;
  window.innerWidth;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onButtonChangeColorOfBody = e => {
  document.body.style.backgroundColor = getRandomHexColor;
};

refs.startBtn.addEventListener('click', onButtonChangeColorOfBody);

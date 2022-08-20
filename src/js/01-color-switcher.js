const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.setAttribute('disabled', '');
  const changeColorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.stopBtn.addEventListener('click', () => {
    clearInterval(changeColorInterval);
    refs.startBtn.removeAttribute('disabled');
  });
});

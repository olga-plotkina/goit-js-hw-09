import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', '');
let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const timer = {
  start() {
    setInterval(() => {
      const currenTime = Date.now;
      const deltaTime = selectedDate - currenTime;
      const timeComponents = convertMs(deltaTime);
      console.log(timeComponents);
    }, 1000);
  },
};

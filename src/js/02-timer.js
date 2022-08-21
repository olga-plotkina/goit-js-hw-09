import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedDate = 0;
let timerId = null;

refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
      console.log(selectedDate);
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

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const timer = {
  start() {
    timerId = setInterval(() => {
      const currenTime = new Date();
      const deltaTime = selectedDate - currenTime;
      if (selectedDate <= currenTime) {
        clearInterval(timerId);
        return;
      }

      const timeComponents = convertMs(deltaTime);

      refs.days.textContent = addLeadingZero(timeComponents.days);
      refs.hours.textContent = addLeadingZero(timeComponents.hours);
      refs.minutes.textContent = addLeadingZero(timeComponents.minutes);
      refs.seconds.textContent = addLeadingZero(timeComponents.seconds);
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', timer.start.bind(timer));

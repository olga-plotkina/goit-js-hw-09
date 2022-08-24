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

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      timer.selectedDate = selectedDates[0];

      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
      clearInterval(timerId);
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  selectedDate: 0,

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },

  start() {
    refs.startBtn.disabled = true;

    timerId = setInterval(() => {
      const currenTime = new Date();
      const deltaTime = this.selectedDate - currenTime;
      if (this.selectedDate <= currenTime) {
        clearInterval(timerId);
        Notiflix.Notify.info('Time gone!');
        return;
      } else {
        const timeComponents = this.convertMs(deltaTime);

        refs.days.textContent = this.addLeadingZero(timeComponents.days);
        refs.hours.textContent = this.addLeadingZero(timeComponents.hours);
        refs.minutes.textContent = this.addLeadingZero(timeComponents.minutes);
        refs.seconds.textContent = this.addLeadingZero(timeComponents.seconds);
      }
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', timer.start.bind(timer));

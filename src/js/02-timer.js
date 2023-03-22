import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
    //     console.log(selectedDates[0]);
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(input.value) - new Date();
    btnStart.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtml.style.color = 'red';
      clearInterval(timer);
    }
  }, 1000);
});

days.style.display = 'flex';
days.style.fontWeight = '900';
days.style.fontSize = '50px';
seconds.style.display = 'flex';
seconds.style.fontWeight = '900';
seconds.style.fontSize = '50px';
minutes.style.display = 'flex';
minutes.style.fontWeight = '900';
minutes.style.fontSize = '50px';
hours.style.display = 'flex';
hours.style.fontWeight = '900';
hours.style.fontSize = '50px';
timerHtml.style.display = 'flex';
timerHtml.style.gap = ' 40px';
timerHtml.style.marginTop = ' 20px';
timerHtml.style.fontSize = ' 20px';
timerHtml.style.fontWeight = '600';

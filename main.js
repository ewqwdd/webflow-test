const base = 'https://9z-crm-production.up.railway.app'

function MinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`;
  }

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

window.addEventListener('load', () => {
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = new Date().getUTCMonth()
let year = new Date().getUTCFullYear()

const $calendarMonth = document.querySelector(".js-calendar-month"),
    $calendar = document.querySelector(".js-calendar");
    $calendarMonth.classList.add("calendar-header");
      const $calendarHeaderWrapper = document.createElement("div");
  $calendarHeaderWrapper.classList.add("calendar-header-wrapper");
  $calendarMonth.after($calendarHeaderWrapper);
  $calendarHeaderWrapper.prepend($calendarMonth);

  const [b1, b2] = [document.createElement("button"), document.createElement("button")];
  b1.innerHTML = `<div class="calendar-header-button-left-icon" ></div>`;
  b2.innerHTML = `<div class="calendar-header-button-right-icon" ></div>`;
  const buttons = document.querySelector("#avaliable-times");
    const teacherInput = document.querySelector('[name="teacher"]');
  const dateInput = document.querySelector('[name="date"]');
const timeInput = document.querySelector('[name="plan"]');
  

const renderButtons = (data) => {
  buttons.innerHTML = "";

  data.forEach((elem) => {
    const button = document.createElement("button");
    button.classList.add("time");
    button.innerHTML = `${MinutesToTime(elem.timeTo)} - ${MinutesToTime(elem.timeFrom)}`;
    
    button.onclick = () => {
      timeInput.value = elem._id;
      console.log(elem);
      renderButtons(data);
    };
    button.type = "button";
    if (timeInput.value === elem._id) {
      button.classList.add("selected");
    }
    buttons.appendChild(button);
  });
};

const fetchTimes = () => {
  buttons.innerHTML = "";
  const teacherId = teacherInput.value;
  fetch(
    `${base}/api/avaliable?teacherId=${teacherId}&date=${new Date(dateInput.value)
      .toISOString()
      .slice(0, 10)}`,
    {
      headers: {
        Authorization: "$2a$10$Q7o/4wouWvwhr3j0NSdyc.fMx37gIF0URYYOQsyE9jSOcxb7rknoe",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const content = data.map(
        (elem) =>
          `<option value="${elem._id}">${MinutesToTime(elem.timeTo)} - ${MinutesToTime(
            elem.timeFrom
          )}</option>`
      );
      timeInput.innerHTML = content.join("");
      renderButtons(data);
    }).catch((err) => {
      console.log(err);
    });
};

const renderCalendar = (activeDate, month_, year_) => {
  const calendar = new CalendarBase.Calendar({
    siblingMonths: true,
    weekStart: true,
  });
  const today = new Date();
  
  $calendarMonth.innerHTML = months[month ?? today.getUTCMonth()];



  const goBack = () => {
    console.log(month);

    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    renderCalendar(activeDate);
  }
  const goForward = () => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    renderCalendar(activeDate);
  }
  
  b1.onclick = goBack;
  b2.onclick = goForward;
  $calendarHeaderWrapper.prepend(b1);
  $calendarHeaderWrapper.appendChild(b2);

  $calendar.innerHTML = `<li class="calendar-day -weekday">Mo</li>
  <li class="calendar-day -weekday">Tu</li>
  <li class="calendar-day -weekday">We</li>
  <li class="calendar-day -weekday">Th</li>
  <li class="calendar-day -weekday">Fr</li>
  <li class="calendar-day -weekday">Sa</li>
  <li class="calendar-day -weekday">Su</li>`;

  calendar.getCalendar((year ?? today.getUTCFullYear()), month ?? today.getUTCMonth()).forEach(function (date) {
    const div = document.createElement("li");
    if (date) {
      div.onclick = () => {
        $calendar.innerHTML = "";
        const d = new Date(`${date.year}-${date.month + 1}-${date.day}`);
        const inputDate = document.querySelector("input[type='date']");
        inputDate.value = d.toISOString().split("T")[0];
        fetchTimes();
        renderCalendar(d);
      };
      div.classList.add("calendar-day");
      if (date.siblingMonth) {
        div.classList.add("-sibling-month");
      }
      console.log(today.getUTCFullYear(), date.year);
      if (
        today.getUTCFullYear() > date.year ||
        (today.getUTCMonth() > date.month && today.getUTCFullYear() === date.year) ||
        (today.getUTCMonth() === date.month && today.getUTCDate() > date.day && today.getUTCFullYear() === date.year)
      ) {
        div.classList.add("disabled");
        div.onclick = null;
      } else if (today.getUTCMonth() === date.month && today.getUTCDate() === date.day) {
        div.classList.add("today");
      }

      if (
        activeDate &&
        activeDate.getUTCDate() === date.day &&
        activeDate.getUTCMonth() === date.month &&
        activeDate.getUTCFullYear() === date.year
      ) {
        div.classList.add("active");
      }

      div.innerHTML = date.day;
    }
    $calendar.appendChild(div);
  });
};

renderCalendar();
})
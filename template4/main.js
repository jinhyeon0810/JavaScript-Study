const get = (target) => document.querySelector(target);
const date = new Date();
let monthNow = date.getMonth() + 1;
let yearNow = date.getFullYear();
let leapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
};

const getFeb = (year) => {
  return leapYear(year) ? 29 : 28;
};

let $month = get(".month-year h2");
let $year = get(".month-year span");

// month array data
let monList = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$month.innerHTML = monList[monthNow - 1];
$year.innerHTML = yearNow;

const inputDate = document.getElementById("input_date");
inputDate.readOnly = true;

//create calendar days
const calendarCreate = (month, year) => {
  let $calendarDays = get(".calendar-days");
  $calendarDays.innerHTML = [];
  let daysOfMonth = [31, getFeb(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let firstDay = new Date(year, month);

  for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
    let $day = document.createElement("div");

    if (i % 7 == 0) {
      $day.style.color = "red";
    }
    if (i < firstDay.getDay()) {
      $day.innerHTML = daysOfMonth[month - 1] - (firstDay.getDay() - i - 1);
      $day.style.color = "lightgray";
      $day.style.fontWeight = "bold";
    }

    if (i >= firstDay.getDay()) {
      $day.innerHTML = i - firstDay.getDay() + 1;
      if (i - firstDay.getDay() + 1 === date.getDate() && year === date.getFullYear() && month === date.getMonth()) {
        $day.classList.add("current-date");
      }
    }
    let clickCount = 0;
    $day.onclick = (e) => {
      e.target.style.backgroundColor = "greenyellow";
      e.target.style.borderRadius = "70%";
      clickCount++;
      if (clickCount % 2 == 0) {
        e.target.style.backgroundColor = "rgba(236, 236, 236, 0.774)";
      }
      if (monthNow < 10 && monthNow[0] != 0) {
        monthNow = "0" + monthNow;
      }
      if ($day.innerHTML < 10 && $day.innerHTML[0] != 0) {
        $day.innerHTML2 = "0" + $day.innerHTML;
        console.log(`${yearNow}-${monthNow}-${$day.innerHTML2}`);
        inputDate.value = `${yearNow}-${monthNow}-${$day.innerHTML2}`;
      } else {
        console.log(`${yearNow}-${monthNow}-${$day.innerHTML}`);
        inputDate.value = `${yearNow}-${monthNow}-${$day.innerHTML}`;
      }
    };
    $calendarDays.appendChild($day);
  }

  let addNum = (daysOfMonth[month] + firstDay.getDay()) % 7;
  if (addNum != 0) {
    for (let i = 1; i <= 7 - addNum; i++) {
      let $day2 = document.createElement("div");
      $day2.innerHTML = i;
      $day2.style.color = "lightgray";
      $day2.style.fontWeight = "bold";
      $calendarDays.appendChild($day2);
    }
  }
};

calendarCreate(monthNow - 1, yearNow);
const $calendar = get(".calendar");
let appear = false;
inputDate.addEventListener("click", (e) => {
  $calendar.classList.toggle("visible");
  return (appear = true);
});

document.addEventListener("click", (e) => {
  if ((appear = true)) {
    if (e.target != inputDate) {
      let header = e.target.closest(".calendar");

      if (!header) {
        $calendar.classList.remove("visible");
        return (appear = false);
      }
    }
  }
});

//상단 날짜 prev, next 버튼 기능 구현
const caretRight = document.getElementsByClassName("bi bi-caret-right-fill")[0];
const caretLeft = document.getElementsByClassName("bi bi-caret-left-fill")[0];
// Question , querySelector 로 icon 의 class 를 불러오면 null 이라 뜸..

function changeMonth() {
  if (monthNow == 0) {
    yearNow = yearNow - 1;
    monthNow = 12;
  } else if (monthNow == 13) {
    yearNow = yearNow + 1;
    monthNow = 1;
  }
  loadCalendar();
}
function loadCalendar() {
  $year.innerHTML = yearNow;
  $month.innerHTML = monList[monthNow - 1];
  calendarCreate(monthNow - 1, yearNow);
}
caretRight.onclick = () => {
  monthNow++;
  changeMonth();
};
caretLeft.onclick = () => {
  monthNow--;
  changeMonth();
};

const $gridDiv = document.querySelectorAll(".calendar-grid");
const $daysDiv = document.querySelectorAll(".calendar-days div");

$gridDiv.forEach((element) => {
  element.style.setProperty("--calendar-width", "60px");
});

$daysDiv.forEach((e) => {
  e.style.setProperty("--calendar-width", "60px");
});

const button = document.querySelector(".enter-btn");
const form = document.getElementById("birthday-form");
const yearError = document.querySelector(".year-error");
const monthError = document.querySelector(".month-error");
const dayError = document.querySelector(".day-error");

const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");

const years = document.querySelector(".years");
const months = document.querySelector(".months");
const days = document.querySelector(".days");

function runError() {
  [...labels].forEach((label) => (label.style.color = "red"));
  [...inputs].forEach((input) => (input.style.borderColor = "red"));
}
function removeError() {
  [...labels].forEach((label) => (label.style.color = "black"));
  [...inputs].forEach(
    (input) => (input.style.borderColor = "hsl(259, 100%, 65%)")
  );
}

button.addEventListener("click", function (e) {
  const birthDay = document.getElementById("day").value;
  const birthMonth = document.getElementById("month").value;
  const birthYear = document.getElementById("year").value;

  e.preventDefault();

  function checkYear(birthYear) {
    if (birthYear === "" || birthYear > 2023 || birthYear < 1000) {
      yearError.textContent = "Enter a valid year";
      return false;
    }
    removeError();
    yearError.textContent = "";
    return true;
  }

  function checkMonth(birthMonth) {
    if (birthMonth === "" || birthMonth > 12) {
      monthError.textContent = "Enter a valid Month";
      return false;
    }
    removeError();
    monthError.textContent = "";
    return true;
  }
  if (birthDay === "" || birthDay > 31) {
    dayError.textContent = "Enter a valid day";
    runError();
  }

  // fUNCTION TO ADD yEARS TO THE PAGE
  const birthdate = [birthYear, birthMonth, birthDay];
  const age = calculateAge(birthdate.join(","));
  function addYears() {
    years.textContent = age.years;
    months.textContent = age.months;
    days.textContent = age.days;
  }

  if (checkMonth(birthMonth) && checkYear(birthYear)) {
    addYears();
  } else {
    runError();
  }
});

// Function to calculate age and return years, months and days as object
function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let years = today.getFullYear() - birthDateObj.getFullYear();
  let months = today.getMonth() - birthDateObj.getMonth();
  let days = today.getDate() - birthDateObj.getDate();

  // Check if the birthday has already occurred this year
  if (
    today.getMonth() < birthDateObj.getMonth() ||
    (today.getMonth() === birthDateObj.getMonth() &&
      today.getDate() < birthDateObj.getDate())
  ) {
    years--;
    months += 12;
  }

  // Check if the birth day has already occurred this month
  if (today.getDate() < birthDateObj.getDate()) {
    months--;
    let lastMonth = today.getMonth() > 0 ? today.getMonth() - 1 : 11;
    let daysInLastMonth = new Date(
      today.getFullYear(),
      lastMonth + 1,
      0
    ).getDate();

    // days += (
    //   today - new Date(today.getFullYear(), lastMonth, birthDateObj.getDate())
    // )(1000 * 60 * 60 * 24);
    days = Math.floor(days);
    days += daysInLastMonth;
    console.log(days);
  }

  console.log(days);

  // Format the age as an object
  const age = {
    years: years,
    months: months,
    days: days,
  };
  return age;
}

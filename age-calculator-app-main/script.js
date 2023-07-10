const button = document.querySelector(".enter-btn");
const userYear = document.querySelector(".entered-year");
const userMonth = document.querySelector(".entered-month");
const userDay = document.querySelector(".entered-day");

const years = document.querySelector(".years");
const months = document.querySelector(".months");
const days = document.querySelector(".days");

button.addEventListener("click", function (e) {
  e.preventDefault();
  const birthDay = document.getElementById("day").value;
  const birthMonth = document.getElementById("month").value;
  const birthYear = document.getElementById("year").value;
  const birthdate = [birthYear, birthMonth, birthDay];
  const age = calculateAge(birthdate.join(","));

  years.textContent = age.years;
  months.textContent = age.months;
  days.textContent = age.days;
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
  }

  // Format the age as an object
  const age = {
    years: years,
    months: months,
    days: days,
  };
  return age;
}

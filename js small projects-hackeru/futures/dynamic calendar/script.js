
const date = new Date();

const renderCalendar = () =>{
    date.setDate(1);

const firstDateIndex = date.getDay();
const monthDays = document.querySelector(".days");
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

document.querySelector('.date h1').innerHTML = months[date.getMonth()];
document.querySelector('.date p').innerHTML = date.toDateString();

let days = "";

// Generate previous month's days
for (let x = firstDateIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
}

// Generate current month's days
for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class="today">${i}</div>`;
    } else {
        days += `<div>${i}</div>`;
    }

}

// Generate next month's first dates
const nextMonthDays = 7 - lastDayIndex - 1; // Number of days from next month
for (let y = 1; y <= nextMonthDays; y++) {
    days += `<div class="next-date">${y}</div>`;
}

monthDays.innerHTML = days;
}



document.querySelector('.prev').addEventListener('click',
 () => {
    date.setMonth(date.getMonth() - 1)
    renderCalendar();
})
document.querySelector('.next').addEventListener('click',
 () => {
    date.setMonth(date.getMonth() + 1)
    renderCalendar();
})

renderCalendar();






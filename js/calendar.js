const calendars = document.querySelector('.calendars');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const todayBtn = document.querySelector('.today-btn');
const gotoBtn = document.querySelector('.goto-btn');
const dateInput = document.querySelector('.date-input');



let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"
];

//default events array
const eventsArr = [
    {
        day: 16,
        month: 11,
        year: 2023,
        events: [
            {
                title: "Event 1 lorem ipsum dolar sit genfa tersd dsad",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM",
            },
        ],
    },
    {
        day: 18,
        month: 11,
        year: 2023,
        events: [
            {
                title: "Event 1 lorem ipsum dolar sit genfa tersd dsad",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM",
            },
        ],
    },
];
//fuction to add days

function initCalendars(){
    // to get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //update top of calendars
    date.innerHTML = months[month] + " " + year;

    // adding days on dom
    let days = "";

    //prev month days
    for (let x = day; x > 0; x--){
        days += `<div class = "day prev-date">${prevDays - x + 1}</div>`;
    }

    //current month days
    for(let i = 1; i <= lastDate; i++){
        // check if event present on current day
        let event = false;
        eventsArr.forEach((eventObj) =>{
            if(
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            )
            {
                //if event found
                event = true;
            }
        })

        // if day is today add class today
        if(
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
            ) {
            // if event found also add event class
                if(event){
                    days += `<div class = "day today event">${i}</div>`;
                } else{
                    days += `<div class = "day today">${i}</div>`;
                }
        }
        //add remaing as it it
        else{
            if(event){
                days += `<div class = "day  event">${i}</div>`;
            } else{
                days += `<div class = "day ">${i}</div>`;
            }
        }
    }
    //next month days
    for(let j = 1; j <= nextDays; j++){
        days += `<div class = "day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    //add listner after calender initializer
    addListner();
}

initCalendars()

//prev month

function prevMonth(){
    month--;
    if (month < 0){
        month = 11;
        year--;
    }
    initCalendars();
}

//next month
function nextMonth(){
    month++;
    if (month > 11){
        month = 0;
        year++
    }
    initCalendars();
}

//add eventlistnner on prev and next

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//add goto date and goto today functionality

todayBtn.addEventListener("click", ()=>{
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendars();
});

dateInput.addEventListener("input", (e)=>{
    //allow only numbers remove anuthing else
    dateInput.value = dateInput.value.replace(/[^0-9]/g, "");
    if (dateInput.value.length >= 2 && dateInput.value.charAt(2) !== "/") {
        dateInput.value = dateInput.value.slice(0, 2) + "/" + dateInput.value.slice(2);
    }
    if(dateInput.value.length > 7){
        //dont allow more than 7 chatacter
        dateInput.value = dateInput.value.slice(0, 7);
    }
    // if backspace pressed
    if (e.inputType === "deleteContentBackward"){
        if(dateInput.value.length === 3){
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

//function to go to entered date
function gotoDate(){
    const dateArr = dateInput.value.split("/");
    //some date validation
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4 ){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendars();
            return;
        }
    }
    alert("invalid date")
}

const jsRightClose = document.querySelector('.js-right');
const addEventBtn = document.querySelector('.add-event');
const addEventContainer = document.querySelector('.add-event-wrapper');
const addEventCloseBtn = document.querySelector('.close');
const addEventTitle = document.querySelector('.event-name');
const addEventFrom = document.querySelector('.event-time-from');
const addEventTo = document.querySelector('.event-time-to');



addEventBtn.addEventListener("click", ()=>{
    addEventContainer.classList.toggle('active');
});

addEventCloseBtn.addEventListener("click", ()=>{
    addEventContainer.classList.remove('active');
});

jsRightClose.addEventListener("click", (e)=> {
    if(e.target !== addEventBtn && !addEventContainer.contains(e.target)){
        addEventContainer.classList.remove('active');
    }
})

//allow only 50 chars in title
addEventTitle.addEventListener('input', (e) =>{
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

//time format in from and time


addEventFrom.addEventListener('input', (e) =>{
    // remove anything else numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if( addEventFrom.value.length === 2){
        addEventFrom.value += ":";
    }
    //dont let user enter more than 5 chars
    if( addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

/**
 * *  Musim pak predelat na telefon */
addEventTo.addEventListener('input', (e) =>{
    // remove anything else numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if( addEventTo.value.length === 2){
        addEventTo.value += ":";
    }
    //dont let user enter more than 5 chars
    if( addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

//lets create function to 
function addListner(){
    const days = document.querySelectorAll('.day');
    days.forEach((day)=>{
        day.addEventListener("click", (e) =>{
            //set current day as active day
            activeDay = Number(e.target.innerHTML);

            //remove active from already active day
            days.forEach((day) =>{
                day.classList.remove("active");
            });

            //if prev month day clicked goto prev month and add active
            if(e.target.classList.contains("prev-date")){
                prevMonth();

                setTimeout(() =>{
                    //select all days off that month
                    const days = document.querySelectorAll('.day');

                    //after going to prev month aa ctive to clicked
                    days.forEach((day) =>{
                        if(!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
        });
    });
}
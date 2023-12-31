const calendars = document.querySelector('.calendars');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const todayBtn = document.querySelector('.today-btn');
const gotoBtn = document.querySelector('.goto-btn');
const dateInput = document.querySelector('.date-input');
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"
];
let scrollEnabled = true;

calendars.addEventListener('wheel', function(e) {
    e.stopPropagation();
});
calendars.removeEventListener('wheel', function(e) {
    e.stopPropagation();
});

let eventsArr = [];

//the call get
getEvents();


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
                activeDay = i;
                getActiveDay(i);
                updateEvents(i);
            // if event found also add event class
            //add active on today at startup
                if(event){
                    days += `<div class = "day today active event">${i}</div>`;
                } else{
                    days += `<div class = "day today active ">${i}</div>`;
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

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    
    if (dateArr.length === 2) {
        const monthValue = parseInt(dateArr[0], 10);
        const yearValue = parseInt(dateArr[1], 10);

        if (!isNaN(monthValue) && !isNaN(yearValue) && monthValue > 0 && monthValue < 13) {
            month = monthValue - 1;
            year = yearValue;
            initCalendars();
            return;
        }
    }
    alert("Neplatné datum");
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


addEventFrom.addEventListener('input', (e) => {
    // remove anything else numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    // dont let the user enter more than 5 chars
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }

    // if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (addEventFrom.value.length === 3) {
            addEventFrom.value = addEventFrom.value.slice(0, 2);
        }
    }

});

// Přesunout timeFromArr a timeToArr sem, aby byly dostupné v celém rozsahu kódu
let timeFromArr = [];
let timeToArr = [];

addEventTo.addEventListener('input', (e) => {
    // Odebrání všeho kromě čísel a mezer
    addEventTo.value = addEventTo.value.replace(/[^0-9 ]/g, "");

    // Pokud délka je 3 nebo 7, přidejte mezeru
    if (addEventTo.value.length === 3 || addEventTo.value.length === 7) {
        addEventTo.value += " ";
    }

    // Nepovolte uživateli zadávat více než 13 znaků
    if (addEventTo.value.length > 11) {
        addEventTo.value = addEventTo.value.slice(0, 11);
    }
});


//lets create function to
function addListner(){
    const days = document.querySelectorAll('.day');
    days.forEach((day)=>{
        day.addEventListener("click", (e) =>{
            //set current day as active day
            activeDay = Number(e.target.innerHTML);

            //call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

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
                //same with next month days
            } else if(e.target.classList.contains("next-date")){
                nextMonth();

                setTimeout(() =>{
                    //select all days off that month
                    const days = document.querySelectorAll('.day');

                    //after going to prev month aa ctive to clicked
                    days.forEach((day) =>{
                        if(!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                //remaing current month days
                e.target.classList.add("active");
            }
        });
    });
}

//lets show active day events and date at top
//predelat na cesky kalendar

function getActiveDay (date){
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function to show events of that day

function updateEvents(date){
    let events = " ";
    eventsArr.forEach((event)=>{
        //get events of active day only
        if( date === event.day && month + 1 === event.month && year === event.year){
            // then show event on document
            event.events.forEach((innerEvent)=>{
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${innerEvent.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${innerEvent.time}</span>
                    </div>
                    <div class="event-phone">
                        <span class="event-phone">${innerEvent.phoneNumber}</span>
                    </div>
                </div>`;
            });
        }
    });
    //if nothing found
    if ((events === " ")){
        events =
        `<div class="no-event">
        <h3>No Events</h3>
        </div>`
    }
    eventsContainer.innerHTML = events;
    // save events when update event called
    saveEvents()
}

//lets create function to add events
addEventSubmit.addEventListener("click", ()=>{
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    // some validations
    if(eventTitle === "" || eventTimeFrom === "" || eventTimeTo === ""){
        alert("Please Fill all the fields")
        return;
    }
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(/[ ]+/);

    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        parseInt(timeFromArr[0], 10) > 23 ||
        parseInt(timeFromArr[1]) > 59 ||
        parseInt(timeToArr[0], 10) > 23 ||
        parseInt(timeToArr[1]) > 59
    ) {
        //alert("Neplatný formát času");
    }

    const timeFrom = convertTime(eventTimeFrom);
    //const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom,
        phoneNumber: addEventTo.value,
    };

    let eventAdded = false;

    //check if eventsarr not empty
    if(eventsArr.length > 0){
        //check if eventsarr not empty
        eventsArr.forEach((item) =>{
            if( item.day === activeDay && item.month === month + 1 && item.year === year){
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    if(!eventAdded){
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        });
    }

    //remove active from add event form
    addEventContainer.classList.remove("active")
    // clear the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    // show current added event
    updateEvents(activeDay);

    //also add event class to newly added day if not already
    const activeDayElem = document.querySelector(".day.active");
    if(!activeDayElem.classList.contains("event")){
        activeDayElem.classList.add("event");
    }

});

function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = parseInt(timeArr[0], 10);
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

//lets create a function to remove events on click
eventsContainer.addEventListener("click", (e)=>{
    
    if(e.target.classList.contains(".event")){
        //tady je problem
        const eventTitle = e.target.children[0].children[1].innerHTML;
        console.log(eventTitle);
        // get the title of event than search in array by title and delete
        eventsArr.forEach((event)=>{
            if(event.day === activeDay && event.month + 1 && event.year === year){
                event.events.forEach((item, index) => {
                    if(item.title === eventTitle){
                        event.events.splice(index, 1);
                    }
                });
                // if no event remaing on that dat remove complete day
                if(event.events.length === 0){
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    // after remove complet day also remove active class of that day
                    const activeDayElem = document.querySelector(".day.active");
                    if (activeDayElem.classList.contains("event")){
                        activeDayElem.classList.remove("event");
                    }
                }
            }
        });
        //aftter removing form array update event
        updateEvents(activeDay);
    }
});

//lets store events in local storage get from there
function saveEvents(){
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents(){
    if (localStorage.getItem("events") === null){
        return;
    }
    eventsArr.push( ...JSON.parse(localStorage.getItem("events")));
}
//44:36
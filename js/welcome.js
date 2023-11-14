

/*scroll šipka  */
document.addEventListener("DOMContentLoaded", function() {
    const scrollUpArrow = document.getElementById("scrollUpArrow");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 150) {
        scrollUpArrow.style.display = "block";
        } else {
        scrollUpArrow.style.display = "none";
        }
    });

    scrollUpArrow.addEventListener("click", function() {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    });
});




function submitReservation(){
    const name = document.getElementById('name').value;
    const time = document.getElementById('time').value;

    fetch('http://localhost:3000/submit-reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, time }),
    })
    .then(response => response.json())
    .then(data => {
    alert(data.message);
    })
    .catch(error => {
    console.error('Chyba:', error);
    });
}
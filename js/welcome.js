

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

/***** wrapper po kliknuti *****/

document.addEventListener('DOMContentLoaded', function () {
    const showFormBtn = document.getElementById('showFormBtn');
    const reservationForm = document.getElementById('reservationForm');
    const overlay = document.querySelector('.overlay');
    const wrapper = document.querySelector('.wrapper');

    showFormBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Zabraňuje probublávání události až do kořenového elementu (body)

        reservationForm.style.display = 'block';
        showFormBtn.style.display = 'none';
        overlay.style.display = 'flex';
        wrapper.style.display = 'flex';
    });

    reservationForm.addEventListener('click', function (event) {
        event.stopPropagation(); // Zabraňuje probublávání události až do kořenového elementu (body)
    });

    document.addEventListener('click', function () {
        reservationForm.style.display = 'none';
        showFormBtn.style.display = 'block';
        overlay.style.display = 'none';
        wrapper.style.display = 'none';
    });
});
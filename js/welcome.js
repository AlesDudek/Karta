

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



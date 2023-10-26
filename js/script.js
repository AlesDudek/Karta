
const welcomes = document.querySelectorAll('.welcome');

welcomes.forEach(function(welcome) {
    welcome.addEventListener('mouseenter', function() {
        this.classList.add('active');
    });

    welcome.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });
});

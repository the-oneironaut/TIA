document.addEventListener('DOMContentLoaded', (event) => {
    let scrolled = false;
    const logo = document.querySelector('.logo-container');
    const title = document.querySelector('.title-container');
    const navbar = document.querySelector('.navbar');
    const pageTexts = document.querySelectorAll('.page-text');
    var button = document.querySelector('.connect-button');

    document.querySelector('label[for="duration"]').style.display = 'none';

    function scrollHandler(event) {
        if (!scrolled && window.pageYOffset > 0) {
            document.body.style.overflow = 'hidden';
            logo.classList.add('small-logo');
            title.classList.add('small-title');
            navbar.classList.add('navbar-right');
            pageTexts.forEach(p => {
                p.classList.add('show-text');
            });
            button.classList.add('show-text');
            setTimeout(function() {
                document.body.style.overflow = 'auto';
                scrolled = true;
            }, 1000);
        }

        let navItems = document.querySelectorAll('.nav-item');
        let pages = document.querySelectorAll('.page');

        let currentIndex = pages.length - 1;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].offsetTop > window.scrollY) {
                currentIndex = i - 1;
                break;
            }
        }

        navItems.forEach((navItem, i) => {
            if (i === currentIndex) {
                navItem.classList.add('active');
            } else {
                navItem.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', scrollHandler);

    let navItems = document.querySelectorAll('.nav-item');

    navItems.forEach((navItem, i) => {
        navItem.addEventListener('click', function() {
            navItems.forEach((navItem) => {
                navItem.classList.remove('active');
            });
            navItem.classList.add('active');
        });
    });

    document.getElementById('style').addEventListener('change', function() {
        let style = this.value;
        let durationSlider = document.getElementById('duration');
        let durationLabel = document.getElementById('duration-label');
        let durationLabelElement = document.querySelector('label[for="duration"]');

        if (style === 'complex') {
            durationSlider.style.display = 'block';
            durationLabel.style.display = 'inline';
            durationLabelElement.style.display = 'block';
        } else {
            durationSlider.style.display = 'none';
            durationLabel.style.display = 'none';
            durationLabelElement.style.display = 'none';
        }
    });

    document.getElementById('duration').addEventListener('input', function() {
        let duration = this.value;
        let durationLabel = document.getElementById('duration-label');
        
        if (duration < 60) {
            durationLabel.textContent = duration + 's';
        } else {
            durationLabel.textContent = '1min';
        }
    });


    document.getElementById('pricing-form').addEventListener('change', function() {
        let numVideos = document.getElementById('num-videos').value;
        let style = document.getElementById('style').value;
        let duration = document.getElementById('duration').value;

        let price = 0;

        if (style == 'simple'){
            price += 50;
        }
        else if (style == 'complex'){
            price += 100;
            if (duration <= 15) {
                price += 0;
            } 
            else if (duration <= 30) {
                price += 20;
            } else if (duration <= 45) {
                price += 40;
            } else if (duration <= 60) {
                price += 60;
            } else {
                price += 80;
            }
        }

        price *= numVideos;

        let priceElement = document.getElementById('price');
        priceElement.innerHTML = '$'+price;
    });
});

function calculatePrice() {
    let numVideos = document.getElementById('num-videos').value;
        let style = document.getElementById('style').value;
        let duration = document.getElementById('duration').value;

        let price = 0;

        if (style == 'simple'){
            price += 50;
        }
        else if (style == 'complex'){
            price += 100;
            if (duration <= 15) {
                price += 0;
            } 
            else if (duration <= 30) {
                price += 20;
            } else if (duration <= 45) {
                price += 40;
            } else if (duration <= 60) {
                price += 60;
            } else {
                price += 80;
            }
        }

        price *= numVideos;

    let priceElement = document.getElementById('price');
    priceElement.innerHTML = '$'+price;
}

document.getElementById('num-videos').addEventListener('change', calculatePrice);

function incrementValue() {
    var value = parseInt(document.getElementById('num-videos').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('num-videos').value = value;
    calculatePrice();
}

function decrementValue() {
    var value = parseInt(document.getElementById('num-videos').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('num-videos').value = value;
    calculatePrice()
}

// Client-side JavaScript

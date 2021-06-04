const hamburger = document.getElementById("hamburger");

const closeBurger = document.getElementById("close-burger");

const navBar = document.getElementById("nav-bar");

const fadeContent = document.getElementById("fade-out");

const windowSize = window.matchMedia("(max-width: 1024px)");



// Clicks

// Burger / Nav

// Opening Burger Menu

hamburger.addEventListener("click", () => {

    navBar.classList.toggle("show");

    if (navBar.classList.contains("show")) {
        hamburger.style.display = "none";
        closeBurger.style.display = "block";
        fadeContent.style.display = "block";
        
    } 

}); 

// Adding a closing functionality to the "X" in burger menu.

closeBurger.addEventListener("click", () => {

    navBar.classList.remove("show");
    hamburger.style.display = "block";
    closeBurger.style.display = "none";
    fadeContent.style.display = "none";


});

// Clicking Outside of Burger Closes the menu 

window.addEventListener('mouseup',(event) => {

if(event.target !== navBar && event.target.parentNode !== navBar && windowSize.matches) {

    navBar.classList.remove("show");
    hamburger.style.display = "block";
    closeBurger.style.display = "none";
    fadeContent.style.display = "none";

}
});  

const toTopButton = document.getElementById("btt-btn");

// Adding a back to top button when you scrolled 250 px down.

window.onscroll = function() {backTop()};

function backTop() {
  if (document.documentElement.scrollTop > 250) {

    toTopButton.style.display = "block";

  } else {

    toTopButton.style.display = "none";
  }
};

// Scroll back to top on click.

toTopButton.addEventListener("click", () => {

    document.documentElement.scrollTop = 0;

});




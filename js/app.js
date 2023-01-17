/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let navBarMenu = document.getElementById("navbar");
const burgerIcon = document.getElementById("icon");
const navBarList = document.querySelector("#navbar__list");
const navigationBarElement = document.getElementById('navbar__list');
const pageSections = [...document.querySelectorAll("section")];
const sectionTagname = "section";
const activeClassName = "your-active-class";
let fragment = document.createDocumentFragment();
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// scrollIntoView with smooth behavior
function smoothScrollToClickedSection(section) {
    section.preventDefault();
    if (section.target.href) {
        document.getElementById(`${section.target.dataset.nav}`).scrollIntoView({ behavior: "smooth" });
    }
}

//Show navigation menu
function showNavBar() {
    navBarMenu.style.display = "";
}

//Hide navigation menu
function hideNavBar() {
    navBarMenu.style.display = "none";
}

//Toggle/Untoggle menu bar
function expandMenu() {
    navigationBarElement.style.display = "";}

function collapseMenu(){
    navigationBarElement.style.display = "none";
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function createMenuList() {
    for (let section of pageSections) {
        let menuItem = document.createElement("li");
        menuItem.innerHTML = (`<a href = "${section.id}" data-nav = "${section.id}" class = "menu__link">${section.getAttribute('data-nav')}</a>`);
        fragment.appendChild(menuItem);
    }
    navBarList.appendChild(fragment);
}

/**
 * End Main Functions
 * Begin Events
 *
*/
// Scroll to anchor ID using scrollTO event
navBarList.addEventListener('click', smoothScrollToClickedSection);

// Create & Scroll to section on link click
createMenuList();

// Add class 'active' to section when near top of viewport
window.onscroll = function () {
    document.querySelectorAll(sectionTagname).forEach(function (active) {
        let sectionDim = active.getBoundingClientRect();
        if (sectionDim.top >= 0 &&
            sectionDim.top < 300) {
            active.classList.add(activeClassName);
        } else {
            active.classList.remove(activeClassName);

        }
    });
};

//Hide navigation bar when stop scrolling
var isScrolling;
window.addEventListener('scroll', function (event) {
    if (isScrolling != 'undefined') {
        window.clearTimeout(isScrolling);
    }
    showNavBar();
    isScrolling = setTimeout(() => {
        hideNavBar();
    }, 3500);
});

// Toggle burger icon when mouse over, and collapse when mouse leave of links list
burgerIcon.addEventListener('mouseover', expandMenu);
navigationBarElement.addEventListener('mouseleave', collapseMenu);
// Define Global Variables
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

// ScrollIntoView with smooth behavior
function smoothScrollToClickedSection(section) {
    section.preventDefault();
    if (section.target.href) {
        document.getElementById(`${section.target.dataset.nav}`).scrollIntoView({ behavior: "smooth" });
    }
}

// Show navigation menu
function showNavBar() {
    navigationBarElement.style.display = "";
}

// Hide navigation menu
function hideNavBar() {
    navigationBarElement.style.display = "none";
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav, set id to use in highlighting while scroll
function createMenuList() {
    for (let section of pageSections) {
        let menuItem = document.createElement("li");
        menuItem.innerHTML = (`<a href = "${section.id}" data-nav = "${section.id}" class = "menu__link" id = "nav-${section.id}">${section.getAttribute('data-nav')}</a>`);
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
        let navItemId = "nav-";
        let sectionDim = active.getBoundingClientRect();
        if (sectionDim.top >= 0 && sectionDim.top < 350) {
            navItemId = navItemId + active.getAttribute('id');
            active.classList.add(activeClassName);
            document.getElementById(navItemId).style.color = "white";
        } else {
            navItemId = navItemId + active.getAttribute('id');
            active.classList.remove(activeClassName);
            document.getElementById(navItemId).removeAttribute("style");
        }
    });
};

// Hide navigation bar when stop scrolling
let isScrolling;
window.addEventListener('scroll', function (event) {
    if (isScrolling != 'undefined') {
        window.clearTimeout(isScrolling);
    }
    showNavBar();
    isScrolling = setTimeout(() => {
        hideNavBar();
    }, 2000);
});
document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu Button
const toggleButton = document.querySelector('.navbar-menu-btn'),
navbarMenu = document.querySelector('.navitems');
let isToggle = false;

toggleButton.addEventListener('click', () => {
if (!isToggle) {
    navbarMenu.classList.add('show');
    isToggle = true;
}
 else {
    navbarMenu.classList.remove('show');
    isToggle = false;
 }

})


})
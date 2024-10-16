// Select all dropdown togglers
let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler');
let dropdownIsOpen = false;

// Handle dropdown menus
if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      let targetId = dropdown.getAttribute('data-dropdown');
      let target = document.getElementById(targetId);

      if (target) {
        // Toggle the 'show' class
        target.classList.toggle('show');
        dropdownIsOpen = target.classList.contains('show');
      }
    });
  });
}

// Handle closing dropdowns if a user clicks outside
window.addEventListener('mouseup', (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.getElementById(dropdownButton.getAttribute('data-dropdown'));
      
      if (dropdown && dropdown !== event.target && !dropdown.contains(event.target) && dropdownButton !== event.target) {
        dropdown.classList.remove('show');
        dropdownIsOpen = false;
      }
    });
  }
});

// Handle navbar toggling for small screens
function handleSmallScreens() {
  const toggler = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (toggler && navbarMenu) {
    toggler.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      
      // Update ARIA attribute
      const isActive = navbarMenu.classList.contains('active');
      toggler.setAttribute('aria-expanded', isActive);
    });
  }
}

handleSmallScreens();

// Dropdown toggle list icon animation
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    
    // Toggle class 'active' for the css animation to change and up and down icon
    dropdownToggle.classList.toggle('active');

    // Toggle the visibility of the dropdown menu
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' :'block';
});

// Close the dropdown menu when clicking outside of it
document.addEventListener('click', (event) => {
    dropdownMenu.style.display = 'none';
    dropdownToggle.classList.remove('active'); // Reset the toggle state
});
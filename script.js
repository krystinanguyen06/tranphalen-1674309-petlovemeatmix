// Dropdown toggle list icon animation
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Click event
dropdownToggle.addEventListener('click', () => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    dropdownMenu.classList.toggle('active'); // Toggle the active class to show/hide the dropdown menu
    const inVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block'; // Toggle the display property to show/hide the dropdown menu

// Close dropdown menu when clicking outside of it
    document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none'; // Hide the dropdown menu when clicking outside of it
    dropdownToggle.classList.remove('active'); // Remove the active class from the dropdown toggle button
    });
});
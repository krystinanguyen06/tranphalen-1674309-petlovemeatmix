// Dropdown toggle list icon animation
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    
    // Toggle class 'active' for the css animation to change and up and down icon
    dropdownToggle.classList.toggle('active');

    // Toggle the visibility of the dropdown menu
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// ALL PRODUCT PAGE 
const products = [
    {id: 1, name: "Duck Meat Mix", price: }
]
// Dropdown toggle list icon animation
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    
    // Toggle class 'active' for the css animation to change and up and down icon
    dropdownToggle.classList.toggle('active');

    // Toggle the visibility of the dropdown menu
    if (dropdownMenu.style.display = 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// PRODUCT LIST PAGE
// 1. Product data
const products = [
    {
        id: 1,
        name: "Duck Meat Mix",
        category: "meatmix", 
        tags: ["Gentle digestion"],
        stock: 20, //kg
        image: "assets/duck-2kg.jpeg",
        //price changes according to product weight
        options: {
            "200g": {price: 3.8, unitPrice: 1.9},
            "500g": {price: 9, unitPrice: 1.8},
            "1kg": {price: 16.5, unitPrice: 1.65},
            "2kg": {price: 32, unitPrice: 1.00},
        }
    }
    {
        id: 2,
        name: "Venison Meat Mix",
        category: "meatmix", 
        tags: ["Hypoallergenic"],
        stock: 20, //kg
        image: "assets/venison-1kg.jpeg",
        //price changes according to product weight
        options: {
            "200g": {price: 3.8, unitPrice: 1.9},
            "500g": {price: 9, unitPrice: 1.8},
            "1kg": {price: 16.5, unitPrice: 1.65},
            "2kg": {price: 32, unitPrice: 1.00},
        }
    }
    {
        id: 3,
        name: "Beef Meat Mix",
        category: "meatmix", 
        tags: ["high energy"],
        stock: 20, //kg
        image: "assets/beef-200g.jpeg",
        //price changes according to product weight
        options: {
            "200g": {price: 3.8, unitPrice: 1.9},
            "500g": {price: 9, unitPrice: 1.8},
            "1kg": {price: 16.5, unitPrice: 1.65},
            "2kg": {price: 32, unitPrice: 1.00},
        }
    }
    {
        id: 4,
        name: "Chicken Meat Mix",
        category: "meatmix", 
        tags: ["gentle digestion"],
        stock: 20, //kg
        image: "assets/chicken-500g.jpeg",
        //price changes according to product weight
        options: {
            "200g": {price: 3.8, unitPrice: 1.9},
            "500g": {price: 9, unitPrice: 1.8},
            "1kg": {price: 16.5, unitPrice: 1.65},
            "2kg": {price: 32, unitPrice: 1.00},
        }
    }
]

// Render function for product list in HTML template
function renderProduct(product) {
    return `
    `
}

// 2. Select DOM Elements
const productGrid = document.getElementById('product-grid');
const productCount = document.getElementById('product-count');
const tabButtons = document.querySelectorAll('.tab-btn');
const sortSelect = document.getElementById('sort-select');

/**
 * Renders the product cards into the HTML grid
 * @param {Array} list - The array of products to display
 */
function renderProducts(list) {
    // Clear the current grid
    productGrid.innerHTML = "";

    // Loop through the list and create HTML templates
    list.forEach(item => {
        const productHTML = `
            <div class="product-card">
                <div class="image-container">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <h3>${item.name}</h3>
                <p class="stock-info">${item.stock} this week</p>
                <div class="price-action">
                    <div class="price-tag">
                        <select class="size-select">
                            <option>200g</option>
                            <option>500g</option>
                        </select>
                        <span class="price">$${item.price.toFixed(2)}</span>
                    </div>
                    <button class="quick-add">Quick add</button>
                </div>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productHTML);
    });

    // Update the result count
    productCount.innerText = `Showing ${list.length} products`;
}

/**Filter products based on category tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update UI: Toggle active class
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter logic
        const category = button.getAttribute('data-category');
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);

        renderProducts(filteredProducts);
    });
});

// Initial render when page loads
renderProducts(products);


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
    },
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
    },
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
    },
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

    //Product price and unit price need to be changed according to the product size
    //Hence, I need to set up a default weight, then get its price from product.options and display that accordingly
    //Set up default weight
    const defaultWeight = "200g";
    const selectedOption = product.options[defaultWeight];

    //
    return `
    <div class="product-card" data-id="${product.id}">
        
        <div class="stock-boxes">
            <div class="stock-box">${product.stock}kg left</div>
        </div>

        <img src="${product.image}" alt="${product.name}">

        <div class="product-tags">
            ${product.tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join('')}
        </div>

        <h3>${product.name}</h3>

        <div class="purchase-area">
            <select class="weight-select" 
                onchange="updatePrice(this, ${product.id})">

                <option value="200g">200g</option>
                <option value="500g">500g</option>
                <option value="1kg">1kg</option>
                <option value="2kg">2kg</option>

            </select>

            <div class="price-display">
                <span class="main-price">
                    ${selectedOption.price}
                </span>

                <span class="unit-price">
                    ($${selectedOption.unitPrice}/100g)
                </span>
            </div>
        </div>

            <button class="quick-add">Quick add</button>

    </div>
    `;
}

//Function to display function that renders product data
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('product-grid');
    const countText = document.getElementById('product-count');

    //Update product results
    countText.innerText = `Showing ${productsToDisplay.length} products`;

    //Use .map to loop through the array of the product to turn all array items into one string then insert the HTML to the webpage
    grid.innerHTML = productsToDisplay
        .map(product => renderProduct(product))
        .join('');
}

 //Run the displayProducts function immediately when the page loads.
 displayProducts(products);

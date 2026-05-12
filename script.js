/**Dropdown toggle list icon animation
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
**/



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
            "200g": {price: 3.8, unitPrice: 1.90},
            "500g": {price: 9, unitPrice: 1.80},
            "1kg": {price: 16.5, unitPrice: 1.65},
            "2kg": {price: 32, unitPrice: 1.00},
        }
    }
]

// Update price according to weight 
window.updatePrice = function(selectElement, productId) {
    //find data based on id
    const product = products.find(p => p.id === productId);
    const selectedWeight = selectElement.value;
    const option = product.options[selectedWeight];

    //find card containing options
    const card = selectElement.closest('.product-card');

    //Update accordingly price
    const mainPriceEl = card.querySelector('.main-price');
    const unitPriceEl = card.querySelector('.unit-price');

    mainPriceEl.innerText = `$${option.price}`;
    unitPriceEl.innerText = `($${option.unitPrice}/100g)`;

};

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

        <img src="${product.image}" alt="${product.name}">

        <div class="stock-boxes">
            <div class="stock-box">${product.stock}kg left</div>
        </div>

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

        <div class="product-actions">
            <button>
                <a href="product-page.html?id=${product.id}" class="view-btn">View product</a>
            </button>
            <button class="quick-add">Quick add</button>
        </div>

    </div>
    `;
};

//Function to display function that renders product data
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('product-grid');
    const countText = document.getElementById('product-count');

    if (grid) {
        if (countText) countText.innerText = `Showing ${productsToDisplay.length} products`;
        grid.innerHTML = productsToDisplay.map(product => renderProduct(product)).join('');
    }
};

//Run the displayProducts function immediately when the page loads.
    displayProducts(products);

//PRODUCT DETAILS PAGE
//Check if users are in the product details page 
const detailName = document.getElementById('display-name');

if (detailName) {
    //Read product id from url link
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    //Find products in the string products
    const product = products.find(p => p.id === productId);

    if (product) {
        detailName.innerText = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('display-tag').innerText = product.tags[0];
        document.getElementById('display-stock').innerText = `${product.stock}kg left this week`;

        //Set up default price
        document.getElementById('display-price').innerText = `$${product.options["200g"].price}`;

        //Render weight option card
        const weightContainer = document.getElementById('weight-options-container');
        if (weightContainer) {
            weightContainer.innerHTML = Object.keys(product.options).map((weight, index) => `
                <div class="weight-card ${index === 0? 'active' : ''}"
                    onclick = "updateDetailPrice('${weight}', ${product.id}, this)">
                    <div class="weight-label">${weight}</div>
                    <div class="weight-unit">(${product.options[weight].unitPrice}/100g)</div>
                </div>
            `).join('');
        }
    }
};

//Product details page logic
//Quantity stepper
let currentQuantity = 1;
window.changeQty = function(amount) {
    currentQuantity += amount;
    if (currentQuantity < 1) currentQuantity = 1;
    const qtyDisplay = document.getElementById('current-qty');
    if (qtyDisplay) qtyDisplay.innerText = currentQuantity;
};

//Update price when choose the product weight in the product details page
window.updateDetailPrice = function(weight, productId, element) {
    const product = products.find(p => p.id === productId);
    const option = product.options[weight];

    //Update visible price
    document.getElementById('display-price').innerText = `$${option.price}`;

    //Change style for the weight card being chosen
    document.querySelectorAll('.weight-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
};


//SHOPPING CART PAGE

function renderCartP(){
    const cartContainer = document.getElementById('cart-items');
    const cart = loadCartData(); //To get real data from previous options from the users

    if (cart.length === 0) {
        cartContainer.innerHTML = `
        <div class="empty-cart">
            <p>Your cart is empty</p>
            <a href="product-list.html">Continue shopping</a>
        </div>`;
    updateCartTotal(0);
    return;
    }
}

//Render products on the cart
cartContainer.innerHTML = cart.map((item, index) => `
    <div `)

//Use local storage
window.addtoCart = function(productId) {
    //Get information of the current chosen product
    const product = products.find(p => p.id === productId);

    //Get information input of the chosen weight and quantity
    let selectedSize = "200g";
    const activeCard = document.querySelector('.weight-card.active');
    if(activeCard) {
        selectedSize = activeCard.querySelector('weight-label').innerText;
    }

    const quantity = parseInt(document.getElementById('current-qty')?.innerText || 1);

    //Structure chosen product to save to the shopping cart
    const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image, 
        size: selectedSize,
        qty: quantity,
        price: product.options[selectedSize].price
    };

    //Use localStorage to get the current shopping cart
    //JSON turns objects/array into strings
    let cart = JSON.parse(localStorage.getItem('petLoveCart')) || [];

    //Check if the product with the same id and same size is in the cart already, then just increase the quantity
    const existingIndex = cart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);
    if (existingIndex >-1) {
        cart[existingIndex].qty += quantity;
    } else {
        cart.push(cartItem);
    }

    //Save back to localStorage
    localStorage.setItem('petLoveCart', JSON.stringify(cart));
    alert("Added to cart!");
};

//Take the real input from the users' actions

function loadCartData() {
    const savedCart = localStorage.getItem('petLoveCart');
    return savedCart ? JSON.parse(savedCart) : [];
}



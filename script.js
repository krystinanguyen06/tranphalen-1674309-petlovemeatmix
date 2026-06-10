// PRODUCT LIST PAGE
// 1. Product data
const products = [
    {
        id: 1,
        name: "Beef Meat Mix",
        category: "meatmix", 
        tags: ["High energy"],
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
        id: 4,
        name: "Chicken Meat Mix",
        category: "meatmix", 
        tags: ["Gentle digestion"],
        stock: 20, //kg
        image: "assets/chicken-500g.jpeg",
        //price changes according to product weight
        options: {
            "200g": {price: 3.8, unitPrice: 1.90},
            "500g": {price: 9, unitPrice: 1.80},
            "1kg": {price: 16.5, unitPrice: 1.65},
            "2kg": {price: 32, unitPrice: 1.00},
        }
    },

    //Treats data
    {
        id: 5,
        name: "Small Dog Treat Pack",
        category: "treats", 
        tags: ["High energy"],
        stock: 15, //kg
        image: "assets/small-pack.jpeg",
        //no object options, create flat properties
        treatTypes: 14,
        price: 20,
    },

    {
        id: 6,
        name: "Large Dog Treat Pack",
        category: "treats", 
        tags: ["High energy"],
        stock: 15, //kg
        image: "assets/large-pack.jpeg",
        //no object options, create flat properties
        treatTypes: 22,
        price: 30,
    },
]

// Update price according to weight just for meat mix page
window.updatePrice = function(selectElement, productId) {
    //find data based on id
    const product = products.find(p => p.id === productId);
    if (!product || !product.options) return;
    //find card containing options
    const selectedWeight = selectElement.value;
    const option = product.options[selectedWeight];
    const card = selectElement.closest('.product-list-card');
    //Update accordingly price
    if (card) {
        const mainPriceEl = card.querySelector('.main-price');
        const unitPriceEl = card.querySelector('.unit-price');
        mainPriceEl.innerText = `$${option.price.toFixed(2)}`;
        unitPriceEl.innerText = `($${option.unitPrice.toFixed(2)}/100g)`;
    }
};

// Render function for product list in HTML template
function renderProduct(product) {
    let purchaseAreaHtml ="";
    let mainPrice = 0;
    let unitPriceHtml = "";
    let stockText = "";

        //render product price and information flexibly for different product categories
        // if else function to render either meat mix or treats
        if (product.category === "meatmix") {
            const defaultWeight = "200g";
            const selectedOption = product.options[defaultWeight];
            mainPrice = selectedOption.price;
            unitPriceHtml = `<span class="unit-price">($${selectedOption.unitPrice.toFixed(2)}/100g)</span>`;
            stockText = `${product.stock}kg left`;
        

        purchaseAreaHtml = `
            <select class="weight-select" onchange="updatePrice(this, ${product.id})">
                <option value="200g">200g</option>
                <option value="500g">500g</option>
                <option value="1kg">1kg</option>
                <option value="2kg">2kg</option>
            </select>
        `;

    } else if (product.category === "treats") {
        mainPrice = product.price;
        unitPriceHtml = "";
        stockText = `${product.stock} packs left`;
        purchaseAreaHtml = `
            <span class="fixed-weight-badge">${product.treatTypes} types of treats </span>
        `;
    }

    return `
    <div class="product-list-card" data-id="${product.id}">
        <div class="product-image-container">
            <a href="product-page.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <div class="product-tags">
                ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <h3>
            <a href="product-page.html?id=${product.id}" class="product-card-title-link">
            ${product.name}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7F6070" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
            </a>
        </h3>

        <div class="stock-boxes">${stockText}</div>
        
        <div class="purchase-area">
            ${purchaseAreaHtml}
            <div class="price-display">
                <span class="main-price">$${mainPrice.toFixed(2)}</span>
                ${unitPriceHtml}
            </div>
        </div>

        <div class="product-actions">
            <button class="quick-add" onclick="window.addtoCart(${product.id})">Quick add</button>
        </div>
    </div>
    `;
}

//Function to display function that renders product data
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('product-grid');
    const countText = document.getElementById('product-count');

    if (grid) {
        if (countText) countText.innerText = `Showing ${productsToDisplay.length} products`;
        grid.innerHTML = productsToDisplay.map(product => renderProduct(product)).join('');
    }
};

//Function to set up the change event in the tab folder
function setupTabEvents() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedCategory = tab.getAttribute('data-category');
            const filterProducts = products.filter(p => p.category === selectedCategory);
            displayProducts(filterProducts);
        });
    });
}

//Default options when load page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-grid')) {
        const initialProducts = products.filter(p => p.category === "meatmix");
        displayProducts(initialProducts);
        setupTabEvents(); 
    }

    //if user is in shopping cart page then render shopping cart
    if (document.getElementById('cart-items')) {
        renderCart();
    }

    if (document.getElementById('checkout-summary-list')) {
        displayOrderSummary();
    }
});

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
        //save current products to variable window so that the function add to cart can read it later
        window.currentProductId = product.id;

        detailName.innerText = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('display-tag').innerText = product.tags[0];

        //Set up default price
        if (product.category === "meatmix") {
            document.getElementById('display-stock').innerText = `${product.stock}kg left this week`;
            document.getElementById('display-price').innerText = `$${product.options["200g"].price.toFixed(2)}`;

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
        
        } else if (product.category === "treats") {
        //Treats in details page
        document.getElementById('display-stock').innerText = `${product.stock} packs left this week`;
        document.getElementById('display-price').innerText = `$${product.price.toFixed(2)}`;
        const weightContainer = document.getElementById('weight-options-container');
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

//Shopping cart
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cart = loadCartData(); //real data from localStorage

    //If the cart is blank then show annoucement and suggest continue shopping
    if (cart.length === 0) {
        cartContainer.innerHTML = `
        <div class="empty-cart">
            <p>Your cart is empty...</p>
            <a href="product-list.html">Continue Shopping</a>
        </div>`;

        //Set default total price to $0.00
        const totalDisplay = document.getElementById('cart-total-price');
        if (totalDisplay) totalDisplay.innerText = "$0.00";
        return; //Return function, stop running the below code to render chosen products
    }

    //JavaScript loop through shopping cart
    cartContainer.innerHTML = cart.map((item, index) => {

        const originalProduct = products.find(p => p.id === item.id);
        let sizeOptionsHTML = '';
        let unitPriceText = '';
        let currentItemPrice = item.price || 0;

        if (originalProduct && originalProduct.category === "meatmix") {
            sizeOptionsHTML = Object.keys(originalProduct.options).map(sizeKey => {
                const isSelected = sizeKey === item.size ? 'selected' : '';
                return `<option value="${sizeKey}" ${isSelected}>${sizeKey}</option>`;
            }).join('');

            const targetOption = originalProduct.options[item.size];
            if (targetOption) {
                unitPriceText = `($${targetOption.unitPrice}/100g)`;
                currentItemPrice = targetOption.price;
            }
        } else {
            sizeOptionsHTML = `<option value="${item.size}" selected>${item.size}</option>`;
        }
            
        return `
        <div class="cart-item-card">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">

            <div class="cart-item-details">
                <div class="cart-item-header">
                    <h3>${item.name}</h3>
                    <button class="trash-delete-btn" onclick="removeProductFromCart(${index})" aria-label="Delete product">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7F6070" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
                <div class="cart-size-row">
                    <div class="cart-weight-wrapper">
                        <select class="cart-weight-select" onchange="updateCartItemSize(${index}, this.value)">
                            ${sizeOptionsHTML}
                        </select>
                        <div class="cart-unit-price-label">${unitPriceText}</div>
                    </div>

                    <div class="cart-qty-row">
                        <div class="cart-stepper-container">
                            <button class="cart-stepper-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
                            <span class="cart-qty-value">${item.qty}</span>
                            <button class="cart-stepper-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
                        </div>
                        
                        <div class="cart-row-price-display">
                            $${(currentItemPrice * item.qty).toFixed(2)}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        `;

    }).join('');

    //Count total price for all products
    let grandTotal = 0;
    //Check cart
    cart.forEach(item => {
        grandTotal += (item.price * item.qty);

    });

    const totalPriceElement = document.getElementById('cart-total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = `$${grandTotal.toFixed(2)}`;
    }
}

//Function read data from the localStorage
function loadCartData(){
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart):[];
}

//render shopping cart from the product details page

window.addDetailtoCart = function() {
    //Check if the product details page has valid product id
    if (!window.currentProductId) return;

    const product = products.find(p => p.id === window.currentProductId);
    if (!product) return;

    let selectedSize = "200g";
    let productPrice = product.price || 0;

    //Take the chosen size based on the active class
    if (product.category === "meatmix"){
        const activeCard = document.querySelector('.weight-card.active');
        if (activeCard) {
            const labelEl = activeCard.querySelector('.weight-label');
            if (labelEl) selectedSize = labelEl.innerText.trim();
        }
        productPrice = product.options[selectedSize].price;
    } else {
        selectedSize = "Standard";
    }

    //Take quantity from the variable 'currentQuantity' of the quantity stepper 
    const quantity = currentQuantity;

    //Create product object for later local save
    const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        size: selectedSize, 
        qty: quantity,
        price: productPrice
    };

    //Read the current shopping cart, check for the repeated quantity 
    let cart = loadCartData();
    const existingIndex = cart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);

    if (existingIndex > -1) {
        cart[existingIndex].qty += quantity;
    } else {
        cart.push(cartItem);
    }

    //overwrite array to the localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    alert(`Added ${quantity}x ${product.name} (${selectedSize}) to cart successfully!`);

    window.location.href="cart.html";
};

//Quick add function
window.addtoCart = function(productId) {
    //find product based on id
    const product = products.find(p => p.id === productId);
    if (!product) return;

    //find product size
    const cardElement = document.querySelector(`.product-list-card[data-id="${productId}"]`);

    let selectedSize = "200g";
    let productPrice = product.price || 0;

    if (product.category === "meatmix") {
        if (cardElement) {
            const selectEl = cardElement.querySelector('weight-select');
            if (selectEl) selectedSize = selectEl.value;
        }
        productPrice = product.options[selectedSize].price;
    } else {
        selectedSize = "Standard";
    }

    //3. default one product
    const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        size: selectedSize,
        qty: 1,
        price: productPrice
    };
    
    //4. loadCartData()
    let cart = loadCartData();
    const existingIndex = cart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push(cartItem);
    }

    //5. save back to localStorage and take user to the shopping cart
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    alert(`Added 1x ${product.name} (${selectedSize}) to cart successfully!`);
    window.location.href = "cart.html";
};

// function actions in cart page
window.removeProductFromCart = function(index) {
    let cart = loadCartData();
    cart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
};

window.updateCartItemQty = function(index, change) {
    let cart = loadCartData();
    cart[index].qty += change;
    if (cart[index].qty <1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
};

window.updateCartItemSize = function(index, newSize) {
    let cart = loadCartData();
    const item = cart[index];
    const originalProduct = products.find(p => p.id === item.id);
    if (originalProduct && originalProduct.category === "meatmix") {
        item.size = newSize;
        item.price = originalProduct.options[newSize].price;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
};


// CHECKING OUT PAGE

let shippingFee = 0;

//1. Take data from shopping cart and render to the right-side summary list
function displayOrderSummary() {
    const listContainer = document.getElementById('checkout-summary-list');
    const cart = loadCartData(); 
    let subtotal=0;

//Loop throught cart items and generate HTML with product images
listContainer.innerHTML = cart.map(item => {
    let itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
        <div class="summary-product-card">
            <img src="${item.image}" alt="${item.name}" class="summary-product-img">
            <div class="summary-product-details">
                <h4 class="summary-product-name">${item.name}</h4>
                <p class="summary-product-meta">Size: ${item.size} | Qty: ${item.qty}</p>
                <div class="summary-product-price-row">
                    <span class="summary-product-price">$${itemTotal.toFixed(2)}</span>
                    <a href="cart.html" class="summary-product-edit">Edit</a>
                </div>
            </div>
        </div>
    `;
}).join('');

//Calculated prices are place in the summary box
document.getElementById('summary-subtotal').innerText = `$${subtotal.toFixed(2)}`;
document.getElementById('summary-shipping').innerText = `$${shippingFee.toFixed(2)}`;
document.getElementById('summary-total').innerText = `$${(subtotal + shippingFee).toFixed(2)}`;
}

//2. Toggle content between 3 steps (Accordion Effect)
function openStep(stepNumber) {
    //hide content sections of all 3 steps
    document.getElementById('content-1').classList.add('hidden');
    document.getElementById('content-2').classList.add('hidden');
    document.getElementById('content-3').classList.add('hidden');

    //Only show requested step
    document.getElementById(`content-${stepNumber}`).classList.remove('hidden');
}

//3. Delivery method selection & calculate shipping fee
function toggleDeliveryFields(){
    const isPickup = document.getElementById('radio-pickup').checked;
    const suburbInput = document.getElementById('suburb').value.trim().toLowerCase();

    if (isPickup) {
        document.getElementById('pickup-info').classList.remove('hidden');
        document.getElementById('ship-info').classList.add('hidden');
        shippingFee = 0;
    } else {
        document.getElementById('pickup-info').classList.add('hidden');
        document.getElementById('ship-info').classList.remove('hidden');

        //If suburb is "coburg" then shipping fee is $5, else standard $10
        if (suburbInput === 'coburg') {
            shippingFee = 5;
            document.getElementById('shipping-note').innerText = "Shipping fee for Coburg area is $5.00.";
        } else {
            shippingFee = 10;
            document.getElementById('shipping-note').innerText = "Standard Shipping Fee is $10.00.";}
    }
    //Update final total fee
    displayOrderSummary();
}

//4. Form Validation
function validateAndNext(currentStep){
    if (currentStep === 1) {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (firstName === "") {
            alert("Please fill in your First Name");
            return;
        }
        if (lastName === "") {
            alert("Please fill in your Last Name");
            return;
        }
        if (email === "") {
            alert("Please fill in your Email");
            return;
        }

        if (phone === "") {
            alert("Please fill in your Phone number");
            return;
        }


        //Update step 1 text summary
        document.getElementById('summary-1').innerHTML = `${firstName} ${lastName} <br> ${email} <br> ${phone}`;
        openStep(2); //open step 2 when valid
    }

    else if (currentStep === 2) {
        const isPickup = document.getElementById('radio-pickup').checked;
        if (isPickup) {
            document.getElementById('summary-2').innerHTML = `Store Pick-up (Free)`;
            openStep(3);
        } else {
            const address = document.getElementById('address').value.trim();
            const suburb = document.getElementById('suburb').value.trim();

            if (address === "") { 
                alert("Please fill in your address!");
                return;
            }
            if (suburb === "") { 
                alert("Please fill in your address!");
                return;
            }

            document.getElementById('summary-2').innerHTML = `Delivery ($${shippingFee.toFixed(2)})`;
            openStep(3);
        }
    }
}

//5. Hide/show billing address
function toggleBillingAddress(){
    const isSame = document.getElementById('same-as-delivery').checked;
    if (isSame) {
        document.getElementById('billing-custom-fields').classList.add('hidden');
    } else {
        document.getElementById('billing-custom-fields').classList.remove('hidden');
    }
}

//6. Place order
function finalPlaceOrder() {
    const isAgree = document.getElementById('agree-terms').checked;
    if (!isAgree) {
        alert("You must agree to the Terms & Conditions to place your order!");
        return;
    }

    localStorage.removeItem('shoppingCart');
    window.location.href="confirmation.html";

}
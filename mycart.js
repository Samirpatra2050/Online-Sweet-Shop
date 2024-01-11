let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let cartItemsContainer = document.getElementById('cartItems');
let totalPriceElement = document.getElementById('totalPrice');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        let row = document.createElement('tr');

        let itemImage = document.createElement('td');
        let image = document.createElement('img');
        image.src = `misti/${item.image}.jpeg`;
        image.alt = item.name;
        image.style.maxWidth = '200px';
        image.style.maxHeight = '200px';
        itemImage.appendChild(image);

        let itemName = document.createElement('td');
        itemName.textContent = item.name;

        let itemPrice = document.createElement('td');
        itemPrice.textContent = `Rs${item.price.toFixed(0)}`;

        let itemQuantity = document.createElement('td');
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = '0';
        quantityInput.addEventListener('change', (event) => {
            item.quantity = parseInt(event.target.value);
            if (item.quantity === 0) {
                cartItems = cartItems.filter(cartItem => cartItem.quantity > 0);
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCart();
        });
        itemQuantity.appendChild(quantityInput);

        let totalItemPrice = document.createElement('td');
        let totalPriceForItem = item.price * item.quantity;
        totalItemPrice.textContent = `Rs${totalPriceForItem.toFixed(0)}`;

        let removeButtonCell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn', 'btn-danger');
        removeButton.addEventListener('click', () => {
            cartItems = cartItems.filter(cartItem => cartItem !== item);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCart();
        });
        removeButtonCell.appendChild(removeButton);

        row.appendChild(itemImage);
        row.appendChild(itemName);
        row.appendChild(itemPrice);
        row.appendChild(itemQuantity);
        row.appendChild(totalItemPrice);
        row.appendChild(removeButtonCell);
        cartItemsContainer.appendChild(row);

        totalPrice += totalPriceForItem;
    });

    totalPriceElement.textContent = `Total Price: Rs${totalPrice.toFixed(2)}`;
}

updateCart();

function handleLogin() {
const email = document.getElementById('exampleDropdownFormEmail1').value;
const password = document.getElementById('exampleDropdownFormPassword1').value;

if (email && password) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userEmail', email);
} else {
    alert('Invalid credentials. Please try again.');
}
updateNavbar();
}

function handleLogout() {
localStorage.removeItem('loggedIn');
localStorage.removeItem('userEmail');
updateNavbar();
}

function updateNavbar() {
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
const userEmail = localStorage.getItem('userEmail');

const loginDropdown = document.querySelector('.dropdown-menu');
const loginDropdownHeading = document.querySelector('#navbarDropdownLogin');
const cartTable = document.querySelector('.table');
const totalPriceDiv = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton');
const pleaseLoginMessage = document.getElementById('pleaseLoginMessage');

const logoutItem = `<li class="dropdown-item" id="logoutBtn">Logout</li>`;

if (isLoggedIn) {
    loginDropdownHeading.textContent = userEmail;
    loginDropdown.innerHTML = `${logoutItem}`;
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    cartTable.style.display = 'table';
    totalPriceDiv.style.display = 'block';
    checkoutButton.style.display = 'inline-block';
    pleaseLoginMessage.style.display = 'none';
} else {
    loginDropdownHeading.textContent = 'Login';
    const loginForm = `<form id="loginForm" class="px-4 py-3">
        <div class="form-group">
            <label for="exampleDropdownFormEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
        </div>
        <div class="form-group">
            <label for="exampleDropdownFormPassword1">Password</label>
            <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
        </div>
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="dropdownCheck">
            <label class="form-check-label" for="dropdownCheck">
                Remember me
            </label>
        </div>
        <button type="submit" class="btn btn-primary" id="loginBtn">Sign in</button>
    </form>`;
    loginDropdown.innerHTML = loginForm;
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        handleLogin();
    });

    cartTable.style.display = 'none';
    totalPriceDiv.style.display = 'none';
    checkoutButton.style.display = 'none';
    pleaseLoginMessage.style.display = 'block';
}
}

updateNavbar();


document.addEventListener("DOMContentLoaded", function () {
    function showShippingOverlay() {
        document.getElementById("shippingOverlay").style.display = "block";
    }

    function hideShippingOverlay() {
        document.getElementById("shippingOverlay").style.display = "none";
    }

    document.getElementById("checkoutButton").addEventListener("click", function (event) {
        event.preventDefault();
        showShippingOverlay();
    });

    document.getElementById("shippingDetailsForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Simulating a successful order placement locally (no server interaction)
        // Hide the shipping overlay after a delay to simulate processing
        setTimeout(function() {
            alert("Order placed successfully!");
            hideShippingOverlay();
        }, 1000); // Change the delay time as needed (here, it's set to 2000 milliseconds or 2 seconds)
    });
});
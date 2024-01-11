function addToCart(itemName, itemPrice, imageName) {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  if (!isLoggedIn) {
      alert('Please log in to add items to your cart.');
      return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let found = cart.find(item => item.name === itemName);
  if (found) {
      found.quantity++;
  } else {
      cart.push({ name: itemName, price: itemPrice, quantity: 1, image: imageName });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Item added to cart!');
}

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

  const logoutItem = `<li class="dropdown-item" id="logoutBtn">Logout</li>`;

  if (isLoggedIn) {
      loginDropdownHeading.textContent = userEmail; 
      loginDropdown.innerHTML = `${logoutItem}`;
      document.getElementById('logoutBtn').addEventListener('click', handleLogout);
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
  }
  
  
}

updateNavbar();
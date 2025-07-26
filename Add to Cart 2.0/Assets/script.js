const cartCount = document.getElementById("cart-count");
const cart = [];

const cartPanel = document.getElementById("cart-panel");
const cartItemsList = document.getElementById("cart-items");
const closeCartBtn = document.getElementById("close-cart");
const cartIcon = document.querySelector(".cart-icon");

function updateCartCount() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;
}

function renderCartItems() {
  cartItemsList.innerHTML = ""; // Clear

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <div class="cart-name">${item.name}</div>
        <div class="cart-price">Rs.${item.price}</div>
        <input type="number" class="cart-quantity" value="${item.quantity}" min="1" data-index="${index}">
      </div>
      <button class="remove-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
    `;
    cartItemsList.appendChild(li);
  });

  const totalDisplay = document.createElement("div");
  totalDisplay.className = "cart-total";
  totalDisplay.innerText = `Total  Rs.${total.toFixed(2)}`;
  cartItemsList.appendChild(totalDisplay);

  const orderBtn = document.createElement("button");
  orderBtn.className = "place-order-btn";
  orderBtn.innerText = "Place Order";
  cartItemsList.appendChild(orderBtn);

  // Quantity change listener
  document.querySelectorAll(".cart-quantity").forEach((input) => {
    input.addEventListener("change", (e) => {
      const i = e.target.getAttribute("data-index");
      const newQty = parseInt(e.target.value);
      cart[i].quantity = newQty > 0 ? newQty : 1;
      updateCartCount();
      renderCartItems();
    });
  });

  // Remove button
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const i = e.target.closest("button").getAttribute("data-index");
      cart.splice(i, 1);
      updateCartCount();
      renderCartItems();
    });
  });
}

// Add to Cart buttons
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const name = card.querySelector(".name").textContent;
    const priceText = card.querySelector(".price").textContent;
    const price = parseFloat(priceText.replace("Rs.", ""));
    const image = card.querySelector("img").getAttribute("src");

    // Check if item is already in cart
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1, image });
    }

    updateCartCount();
    alert(`${name} added to cart!`);
  });
});

// Open cart panel when cart icon clicked
cartIcon.addEventListener("click", () => {
  renderCartItems();
  cartPanel.classList.add("open");
});

// Close cart panel when close button clicked
closeCartBtn.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

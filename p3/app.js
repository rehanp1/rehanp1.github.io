let cart = {};
const products = [
  { id: 1, name: "Product 1", price: 25 },
  { id: 2, name: "Product 2", price: 50 },
  { id: 3, name: "Product 3", price: 75 },
];

// Show products on page load
window.onload = () => {
  showProducts();
  showCart();
};

// Toggle cart and product view
function toggleCart(show) {
  document.getElementById("cartSection").style.display = show ? "block" : "none";
  document.getElementById("productList").style.display = show ? "none" : "block";
  if (show) showCart();
}

// Show all products
function showProducts() {
  const productList = document.getElementById("products");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ₹${product.price}`;

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add to Cart";
    addBtn.onclick = () => {
      addToCart(product.id);
      alert(`${product.name} added to cart`);
    };

    li.appendChild(addBtn);
    productList.appendChild(li);
  });
}

// Add product to cart
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
}

// Increase quantity
function increment(id) {
  cart[id]++;
  showCart();
}

// Decrease quantity
function decrement(id) {
  if (cart[id] > 1) {
    cart[id]--;
  } else {
    delete cart[id];
  }
  showCart();
}

// Show cart items
function showCart() {
  const cartList = document.getElementById("cartItems");
  const totalDisplay = document.getElementById("orderValue");
  cartList.innerHTML = "";
  let total = 0;

  products.forEach((product) => {
    const quantity = cart[product.id];
    if (quantity) {
      const li = document.createElement("li");
      const itemTotal = quantity * product.price;
      total += itemTotal;

      li.textContent = `${product.name} - ₹${product.price} × ${quantity} = ₹${itemTotal}`;

      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.onclick = () => increment(product.id);

      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.onclick = () => decrement(product.id);

      li.appendChild(plusBtn);
      li.appendChild(minusBtn);
      cartList.appendChild(li);
    }
  });

  totalDisplay.textContent = total;
}

const products = [
  { name: "Smartwatch", category: "tech", price: 199, rating: 4.5},
  { name: "Sneakers", category: "fashion", price: 89, rating: 4.2 },
  { name: "Laptop", category: "tech", price: 999, rating: 4.8 },
  { name: "Jacket", category: "fashion", price: 120, rating: 4.3 },
  { name: "Blender", category: "home", price: 59, rating: 4.1},
  { name: "Desk Lamp", category: "home", price: 39, rating: 4.0}
];

function renderProducts() {
  const container = document.getElementById("productContainer");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const sortOption = document.getElementById("sortOption").value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (category === "all" || p.category === category) &&
    p.price >= minPrice &&
    p.price <= maxPrice
  );

  if (sortOption === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  container.innerHTML = "";
  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <p>Rating: ⭐ ${p.rating}</p>
    `;
    container.appendChild(div);
  });
}

renderProducts();
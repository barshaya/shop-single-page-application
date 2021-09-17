let products = `[
    {
        "name":"product 1",
        "description": "description 1...",
        "imageSrc" : "Images/1.jpg",
        "price":14
    },
    {
        "name":"product 2",
        "description": "description 2...",
        "imageSrc" : "Images/2.jpg",
        "price":14
    },
    {
        "name":"product 4",
        "description": "description 4...",
        "imageSrc" : "Images/4.jpg",
        "price":14
    }
]`;

JSON.parse(products);
for (let i = 0; i < products.length; i++) {
  var productRow = document.createElement("div");
  productRow.classList.add("product-item");
  var productItems = document.getElementsByClassName("product-items")[0];

  var productRowContents = ` 
    <div class="product-item">
    <span class="product-item-name">${(products)[i].name}</span>
    <img class="product-item-image" src="${(products)[i].imageSrc}" width="200" height="200">
    <div class="product-item-details">
        <span class="product-item-description">${(products)[i].description}</span>
        <span class="product-item-price">${(products)[i].price}</span>
        <input class="product-quantity-input" type="number" value="1">
        <button class="btn btn-primary product-item-button" type="button">ADD TO CART</button>
    </div>`;
  productRow.innerHTML = productRowContents;
  productItems.append(productRow);
  productItem.getElementsByClassName("product-quantity-input")[0].value = "1";
  productRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
  productRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}

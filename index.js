if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    let jsonProducts = `[
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
            "price":28
        },
        {
            "name":"product 3",
            "description": "description 3...",
            "imageSrc" : "Images/3.jpg",
            "price":114
        },
        {
            "name":"product 4",
            "description": "description 4...",
            "imageSrc" : "Images/4.jpg",
            "price":292
        },
        {
            "name":"product 5",
            "description": "description 5...",
            "imageSrc" : "Images/5.jpg",
            "price":145
        },
        {
            "name":"product 6",
            "description": "description 6...",
            "imageSrc" : "Images/6.jpg",
            "price":286
        },
        {
            "name":"product 7",
            "description": "description 7...",
            "imageSrc" : "Images/7.jpg",
            "price":117
        },
        {
            "name":"product 8",
            "description": "description 8...",
            "imageSrc" : "Images/8.jpg",
            "price":298
        }
    ]`
    
    products=JSON.parse(jsonProducts);
    for (let i = 0; i < products.length; i++) {
      var productRow = document.createElement("div");
      productRow.classList.add("product-item");
      var productItems = document.getElementsByClassName("product-items")[0];
    
      var productRowContents = ` 
        <div class="product-item">    
        <img class="product-item-image" src="${(products)[i].imageSrc}" width="200" height="200">
        <div class="product-item-details">
            <div class="product-item-name">${'name: '+(products)[i].name}</div>
            <div class="product-item-description">${'description: '+(products)[i].description}</div>
            <div class="product-item-price">${(products)[i].price+'$'}</div>
            <input class="product-quantity-input" type="number" value="1">
            <button class="btn btn-primary product-item-button" type="button">ADD TO CART</button>
        </div>`;
      productRow.innerHTML = productRowContents;
      productItems.append(productRow);
    }
    
    var shopCart = document.getElementById('shop-cart-button')
    shopCart.addEventListener('click',showShopCart)

    var closeShopCart = document.getElementsByClassName('cart-close')[0]
    closeShopCart.addEventListener('click',hideShopCart)

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }   
    
    var quantityProductsInputs = document.getElementsByClassName('product-quantity-input')
    for (var i = 0; i < quantityProductsInputs.length; i++) {
        var input = quantityProductsInputs[i]
        input.addEventListener('change', quantityProductChanged)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('product-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    if(cartRows.length==0){
        cartIsEmpty()
        return;
    }
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    closeShopCart();
}

function showShopCart(){
    var shopCart = document.getElementsByClassName('cart-section')[0]
    shopCart.classList.remove("cart-section-hide")
}

function hideShopCart(){
    var shopCart = document.getElementsByClassName('cart-section')[0]
    shopCart.classList.add("cart-section-hide")
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
    cartIsEmpty()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    input.value= Math.round(input.value)
    updateCartTotal()
}

function quantityProductChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    input.value= Math.round(input.value)
}

function addToCartClicked(event) {
    var button = event.target
    var productItem = button.parentElement.parentElement
    var name = productItem.getElementsByClassName('product-item-name')[0].innerText
    var price = productItem.getElementsByClassName('product-item-price')[0].innerText
    var imageSrc = productItem.getElementsByClassName('product-item-image')[0].src
    var quantity = productItem.getElementsByClassName('product-quantity-input')[0].value
    addItemToCart(productItem,name, price, imageSrc,quantity)
    updateCartTotal()
    showShopCart()
}

function addItemToCart(productItem,name, price, imageSrc,quantity) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == name) {
            productItem.getElementsByClassName('product-quantity-input')[0].value=1;
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = ` 
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}" width="70" height="70">
            <div class="cart-details">
            <div class="cart-item-name">${name}</div>
            <div class="cart-price">${price}</div>
            <input class="cart-quantity-input" type="number" value="${quantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    productItem.getElementsByClassName('product-quantity-input')[0].value="1"
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function cartIsEmpty() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    if(cartRows.length==0){
        setTimeout(function () {
            alert('cart is empty');
        }, 10);        
    }

}
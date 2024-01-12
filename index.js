document.addEventListener('DOMContentLoaded', function () {
    // Elementos del carrito
    const cartIcon = document.querySelector('.icon-cart');
    const cartCount = document.getElementById('contador-productos');
    const cartContainer = document.querySelector('.container-cart-products');
    const cartTotal = document.querySelector('.total-pagar');

    // Productos en el carrito
    const cartProducts = [];


    function updateCartUI() {
        cartCount.innerText = cartProducts.length;

        //mostrar si hay o no
        if (cartProducts.length > 0) {
            cartContainer.classList.remove('hidden-cart');
        } else {
            cartContainer.classList.add('hidden-cart');
        }

        // Calcular el total de la compra
        const totalAmount = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
        cartTotal.innerText = `$${totalAmount.toFixed(2)}`;

        const cartProductContainer = document.querySelector('.cart-product');
        cartProductContainer.innerHTML = '';

        cartProducts.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('info-cart-product');

            productElement.innerHTML = `
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.name}</p>
                <span class="precio-producto-carrito">$${(product.price * product.quantity).toFixed(2)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-close">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;

            const deleteButton = productElement.querySelector('.icon-close');
            deleteButton.addEventListener('click', function () {
                removeFromCart(index);
            });

            cartProductContainer.appendChild(productElement);
        });

        // Devolver el total de la compra
        return totalAmount;
    }

    function addToCart(name, price) {
        const existingProduct = cartProducts.find((product) => product.name === name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartProducts.push({
                name: name,
                price: price,
                quantity: 1,
            });
        }

        updateCartUI();
    }

    function removeFromCart(index) {
        if (index >= 0 && index < cartProducts.length) {
            cartProducts.splice(index, 1);
            updateCartUI();
        }
    }

    const addToCartButtons = document.querySelectorAll('.info-product button');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const productName = document.querySelectorAll('.info-product h2')[index].innerText;
            const productPrice = parseFloat(document.querySelectorAll('.info-product .price')[index].innerText.slice(1));
            addToCart(productName, productPrice);
        });
    });

    cartIcon.addEventListener('click', function () {
        cartContainer.classList.toggle('hidden-cart');
    });
});

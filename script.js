// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'roma', price: 2000, img: 'roma malkis.jpeg' },
    { id: 2, name: 'pilus', price: 1000, img: 'pilus.jpg' },
    { id: 3, name: 'oreo mini', price: 2000, img: 'oreo mini.jpg' },
    { id: 4, name: 'minuman', price: 2000, img: 'minuman.png' },
    { id: 5, name: 'pucuk', price: 2000, img: 'teh pucuk.jpg' },
    { id: 5, name: 'kuli', price: 2000, img: 'yakult.jpg' },
];

// keranjang belanja
let cart = [];

// tampilkan produk
function displayproducts() {

    const productscontainer =
        document.getElementById('products');

    products.forEach(product => {

        const productsdiv =
            document.createElement('div');

        productsdiv.classList.add('product');

        productsdiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>

            <button onclick="addTocart(${product.id})">
                Tambah ke Keranjang
            </button>
        `;

        productscontainer.appendChild(productsdiv);
    });
}

// tambah ke keranjang
function addTocart(productid) {

    const product =
        products.find(p => p.id === productid);

    const cartitem =
        cart.find(item => item.id === productid);

    if (cartitem) {

        cartitem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updatecart();
}

// update keranjang
function updatecart() {

    const cartitemcontainer =
        document.getElementById('cart-items');

    cartitemcontainer.innerHTML = '';

    let totalprice = 0;

    cart.forEach(item => {

        const listitem =
            document.createElement('li');

        listitem.textContent =
            `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;

        cartitemcontainer.appendChild(listitem);

        totalprice += item.price * item.quantity;

    });

    document.getElementById('total-price')
        .textContent = totalprice;
}

// checkout
function checkout() {

    if (cart.length === 0) {

        alert('Keranjang anda kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const payment = parseInt(
        prompt(
            `Total belanja anda Rp ${total}\nMasukkan jumlah pembayaran:`
        )
    );

    if (payment >= total) {

        alert(
            `Pembayaran berhasil!\nKembalian anda: Rp ${payment - total}`
        );

        cart = [];

        updatecart();

    } else {

        alert('Uang Anda tidak mencukupi.');

    }
}

// tombol checkout
document
    .getElementById('checkout-btn')
    .addEventListener('click', checkout);

// tampilkan produk
displayproducts();

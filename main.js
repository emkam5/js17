document.addEventListener('DOMContentLoaded', async () => {
    const catalogContainer = document.getElementById('catalog');
    const productDetailContainer = document.getElementById('productDetail');

    // Функция для получения данных о товарах
    async function fetchProducts() {
        const response = await fetch('https://dummyjson.com/products?limit=15');
        const data = await response.json();
        return data.products;
    }

    // Функция для отображения каталога товаров
    function displayCatalog(products) {
        catalogContainer.innerHTML = ''; // Очистка каталога
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.title}</h3>
                <p>Цена: $${product.price}</p>
            `;
            productCard.addEventListener('click', () => showProductDetail(product));
            catalogContainer.appendChild(productCard);
        });
    }

    // Функция для отображения подробной информации о товаре
    function showProductDetail(product) {
        productDetailContainer.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p>Цена: $${product.price}</p>
            <p>${product.description}</p>
            <button class="back-button" onclick="goBack()">Назад</button>
        `;
        catalogContainer.style.display = 'none';
        productDetailContainer.style.display = 'block';
    }

    // Функция для возврата к каталогу
    window.goBack = function() {
        productDetailContainer.style.display = 'none';
        catalogContainer.style.display = 'flex';
    };

    // Получение и отображение товаров
    const products = await fetchProducts();
    displayCatalog(products);
});

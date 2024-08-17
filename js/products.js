
document.addEventListener('DOMContentLoaded', async  () => {
    const inventoryListDiv = document.getElementById('product-list-div');

    let url = 'https://shopmo.ng/api/inventory';
    // let url = 'http://127.0.0.1:8000/api/inventory';

    const response = await fetch(url, {
        method: 'GET'
    });

    const body = await response.json();

    body.forEach(inventory => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-4');

        const productImg = document.createElement('img');
        productImg.src = inventory.image;
        productImg.alt = inventory.name;
        productImg.style.width = '100%';

        const productUrl = document.createElement('a');  
        productUrl.href = `products-details.html?id=${inventory.id}`;;
        productUrl.appendChild(productImg);
        productDiv.appendChild(productUrl);
        
        const productName = document.createElement('h4');
        productName.textContent = inventory.name;
        productDiv.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.textContent = "₦" + inventory.price;
        productDiv.appendChild(productPrice);

        inventoryListDiv.appendChild(productDiv);

        //console.log(productImg.src);
    })

});

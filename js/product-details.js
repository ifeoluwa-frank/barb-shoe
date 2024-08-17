document.addEventListener('DOMContentLoaded', async () => {
    const imgSection = document.querySelector('.image-row');
    const productId = new URLSearchParams(window.location.search).get('id');
    //console.log(productId);

    let url = `https://shopmo.ng/api/getProduct/${productId}`;
    // let url = `http://127.0.0.1:8000/api/getProduct/${productId}`;
    const body = await fetch(url, {
        method: 'GET'
    });

    const response = await body.json();
    const product = response.product
    console.log(product.image);


    // IMAGE SECTION

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('col-2');
    imgSection.appendChild(imageDiv);

    const mainImg = document.createElement('img');
    mainImg.src = product.image;
    mainImg.style.width = "100%";
    mainImg.id = "productImg"
    imageDiv.appendChild(mainImg);

    const colorImgRowDiv = document.createElement('div');
    colorImgRowDiv.classList.add('small-img-row');

    for(let i = 0; i<=3; i++){
        const colorImgColDiv = document.createElement('div');
        colorImgColDiv.classList.add('small-img-col');

        const smallImg = document.createElement('img');
        smallImg.src = product.image;
        smallImg.style.width = "100%";
        smallImg.classList.add('small-img');
        colorImgColDiv.appendChild(smallImg);
        colorImgRowDiv.appendChild(colorImgColDiv);
    }

    imageDiv.appendChild(colorImgRowDiv);

    // DETAILS SECTION
    const productInfoDiv = document.createElement('div');
    productInfoDiv.classList.add('col-2');
    imgSection.appendChild(productInfoDiv);

    const homeShoes = document.createElement('p');
    homeShoes.textContent = "Home / Shoes";
    productInfoDiv.appendChild(homeShoes);

    const productTitle = document.createElement('h1');
    productTitle.textContent = product.name;
    productInfoDiv.appendChild(productTitle);

    const productPrice = document.createElement('h4');
    productPrice.textContent = "₦" + product.price;
    productInfoDiv.appendChild(productPrice);

    // TODO: SIZES

    const productDetailTitle = document.createElement('h3');
    productDetailTitle.textContent = "Product Details";
    productInfoDiv.appendChild(productDetailTitle);

    const productDetailParagraph = document.createElement('p');
    productDetailParagraph.textContent = product.description;
    productInfoDiv.appendChild(productDetailParagraph);

    // INPUT
    const quantityInput = document.createElement('input');
    quantityInput.type = "number";
    quantityInput.value = "1";
    productInfoDiv.appendChild(quantityInput);

    const cartAnchor = document.createElement('button');
    // cartAnchor.href = `cart.html`;
    cartAnchor.classList.add('btn');
    cartAnchor.textContent = "Add to Cart";
    cartAnchor.style.border = "none";
    cartAnchor.style.pointer = "cursor";
    productInfoDiv.appendChild(cartAnchor);

    cartAnchor.addEventListener('click', async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');

        let apiBody = new FormData();
        apiBody.append("user_id", userId);
        apiBody.append("product_id", product.id);
        apiBody.append("quantity", quantityInput.value);

        // let curl = 'http://127.0.0.1:8000/api/addCartItems';
        let curl = 'https://shopmo.ng/api/addCartItems';

        // console.log(apiBody);

        // for (var pair of apiBody.entries()) {
        //     console.log(pair[0] + " - " + pair[1]);
        // }

        const body = await fetch(curl, {
            method: 'POST',
            body: apiBody
        });

        const response = await body.json();
        console.log(response);
        if(response.status){
            alert(response.message);
            window.location.href = 'cart.html';
        }
    });

});
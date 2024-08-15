document.addEventListener('DOMContentLoaded', async () => {
    const imgSection = document.querySelector('.image-row');
    const productId = new URLSearchParams(window.location.search).get('id');
    //console.log(productId);

    const body = await fetch(`https://shopmo.ng/api/getProduct/${productId}`, {
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

    cartAnchor.addEventListener('click', (e) => {
        e.preventDefault();

    })

});
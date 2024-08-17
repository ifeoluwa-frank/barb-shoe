document.addEventListener('DOMContentLoaded', async () =>{
    const currentLoggedInUserId = localStorage.getItem('user_id');
    //console.log(currentLoggedInUserId);
    // let url = `http://127.0.0.1:8000/api/cartItems/${currentLoggedInUserId}`;
    let url = `https://shopmo.ng/api/cartItems/${currentLoggedInUserId}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    const body = await response.json();
    // console.log(body);
    // console.log(body[0].cartItemProduct);

    const cartItemTable = document.querySelector('.cart-item-table');

    body.forEach(cartItem => {
        const tableRow = document.createElement('tr');
        cartItemTable.appendChild(tableRow);

        const tableData = document.createElement('td');
        tableRow.appendChild(tableData);

        const tableDataDiv = document.createElement('div');
        tableDataDiv.classList.add('cart-info');
        tableData.appendChild(tableDataDiv);

        const itemImg = document.createElement('img');
        itemImg.src = cartItem.cartItemProduct.image;
        tableDataDiv.appendChild(itemImg);

        const innerDiv = document.createElement('div');
        tableDataDiv.appendChild(innerDiv);

        const itemName = document.createElement('p');
        itemName.textContent = cartItem.cartItemProduct.name;
        innerDiv.appendChild(itemName);

        const itemPrice = document.createElement('small');
        itemPrice.textContent = "Price: ₦" + cartItem.cartItemProduct.price;
        innerDiv.appendChild(itemPrice);

        const createBreak = document.createElement('br');
        innerDiv.appendChild(createBreak);

        const itemRemove = document.createElement('a');
        //TODO: ADD HREF
        itemRemove.textContent = 'Remove';
        innerDiv.appendChild(itemRemove);


        const tableData2 = document.createElement('td');
        tableRow.appendChild(tableData2);

        const tableDataInput = document.createElement('input');
        tableDataInput.type = 'number';
        tableDataInput.value = cartItem.cartItem.quantity;
        tableData2.appendChild(tableDataInput);

        const tableData3 = document.createElement('td');
        let amount = Number(cartItem.cartItemProduct.price) * Number(cartItem.cartItem.quantity);
        tableData3.textContent = "₦" + amount;
        tableRow.appendChild(tableData3);

    });

    // const totalPrice = [];
    const subTotal = document.querySelector('.sub-total-price');
    const vat = document.querySelector('.vat');
    const total = document.querySelector('.final-total');

    // subTotal.textContent = totalPrice;

    let price = 0;
    body.forEach(item => {
        // const id = item.cartItem.id;
        price = price + (Number(item.cartItemProduct.price) * Number(item.cartItem.quantity));
    });
    subTotal.textContent = "₦" + price.toFixed(2);

    let priceVat = price * 0.075;
    vat.textContent = "₦" + priceVat.toFixed(2);

    let totalPrice = price + priceVat;
    total.textContent = "₦" + totalPrice.toFixed(2);
});
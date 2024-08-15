document.addEventListener('DOMContentLoaded', async () =>{
    const currentLoggedInUserId = localStorage.getItem('user_id');
    //console.log(currentLoggedInUserId);
    const response = await fetch(`https://shopmo.ng/api/cartItems/${currentLoggedInUserId}`,{
        method: 'GET'
    });

    const body = await response.json();
    console.log(body);
    console.log(body[0].cartItemProduct);

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
        tableDataInput.value = cartItem.cartItemProduct.quantity;
        tableData2.appendChild(tableDataInput);

        const tableData3 = document.createElement('td');
        tableData3.textContent = "₦" + cartItem.cartItemProduct.price;
        tableRow.appendChild(tableData3);

        
        //totalPrice.push(cartItem.cartItemProduct.price);
    });

    // const totalPrice = [];
    const subTotal = document.querySelector('.sub-total-price');
    const vat = document.querySelector('.vat');
    const total = document.querySelector('.final-total');

    // subTotal.textContent = totalPrice;

    let price = 0;
    body.forEach(item => {
        // const id = item.cartItem.id;
        price += Number(item.cartItemProduct.price);
    });
    subTotal.textContent = "₦" + price.toFixed(2);

    let priceVat = price * 0.075;
    vat.textContent = "₦" + priceVat.toFixed(2);

    let totalPrice = price + priceVat;
    total.textContent = "₦" + totalPrice.toFixed(2);
});
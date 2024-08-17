document.addEventListener('DOMContentLoaded', function() {
    // Mock data - Replace with real data fetching
    const salesData = {
        totalSales: 12000,
        bestSellingProduct: 'Custom Sneakers',
        monthlySales: {
            January: 1000,
            February: 1200,
            March: 900,
            April: 1400,
            May: 1600,
            June: 1700,
            July: 1800,
            August: 1300,
            September: 1100,
            October: 1200,
            November: 1500,
            December: 1300
        }
    };

    // Update total sales
    document.getElementById('total-sales').textContent = `$${salesData.totalSales}`;

    // Update best selling product
    document.getElementById('best-selling-product').textContent = salesData.bestSellingProduct;

    // Prepare data for the chart
    const labels = Object.keys(salesData.monthlySales);
    const data = Object.values(salesData.monthlySales);

    // Create the chart
    const ctx = document.getElementById('sales-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales Per Month',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});


function showContent(contentId) {
    // Hide all content
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Show the selected content
    const selectedContent = document.getElementById(contentId);
    selectedContent.classList.add('active');
}

// Show the first content when the page loads
document.addEventListener('DOMContentLoaded', () => {
    showContent('content1');
});



// DASHBOARD PRODUCT UPLOAD

// let productForm = document.getElementById('product-upload');
let token = localStorage.getItem('access_token');
let userRole = localStorage.getItem('user_role');
let userString = localStorage.getItem('user_details');

// console.log(productForm);
// return;

document.getElementById('product-upload').addEventListener('submit', async (e) => {
    e.preventDefault();
    // console.log(e);
    const form = e.target;
    const formData = new FormData(form);

    console.log(formData);

    let url;

    const id = formData.get("id");
    if(id){
        url = `https://shopmo.ng/api/updateProduct/${id}`;
        // url = `http://127.0.0.1:8000/api/updateProduct/${id}`;
    } else {
        url = 'https://shopmo.ng/api/addProduct';
        // url = 'http://127.0.0.1:8000/api/addProduct';
    }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    const body = await response.json();
    console.log(body);
    const responseMessage = document.querySelector('.response-message');
    if(body.status){
        responseMessage.textContent = body.message;
        responseMessage.style.color = "green";
        clearForm();
    }

    if(!body.status){
        responseMessage.textContent = 'Product not uploaded successfully';
        responseMessage.style.color = "red";
    }
});

function clearForm(){
    document.getElementById('product-upload').reset();
}

function validateImageSize(input) {
    const file = input.files[0];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file && file.size > maxSize) {
        alert("Error: File size exceeds 2MB.");
        input.value = ''; // Clear the file input
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', async () => {
    const inventoryTable = document.getElementById('inventory-list')
    // let url = 'http://127.0.0.1:8000/api/inventory';
    let url = 'https://shopmo.ng/api/inventory'
    const response = await fetch(url, {
        method: 'GET'
    });

    const body = await response.json();
    // console.log(body);

    body.forEach(inventory => {
        const tableRow = document.createElement('tr');

        const tdInventoryName = document.createElement('td');
        tdInventoryName.textContent = inventory.name;
        tableRow.appendChild(tdInventoryName);

        const tdInventoryPrice = document.createElement('td');
        tdInventoryPrice.textContent = inventory.price;
        tableRow.appendChild(tdInventoryPrice);

        const tdInventoryStock = document.createElement('td');
        tdInventoryStock.textContent = inventory.quantity;
        tableRow.appendChild(tdInventoryStock);

        const tdInventoryColors = document.createElement('td');
        tdInventoryColors.textContent = inventory.color;
        tableRow.appendChild(tdInventoryColors);

        const tdInventorySize = document.createElement('td');
        tdInventorySize.textContent = inventory.size;
        tableRow.appendChild(tdInventorySize);

        const tdAction = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'delete';
        editButton.classList.add('btn-action');
        deleteButton.classList.add('btn-action');
        editButton.classList.add('btn-edit');
        deleteButton.classList.add('btn-delete');
        tdAction.appendChild(editButton);
        tdAction.appendChild(deleteButton);
        tableRow.appendChild(tdAction);

        inventoryTable.appendChild(tableRow);

        deleteButton.addEventListener('click', async () => {
            // e.preventDefault();
            // let curl = `http://127.0.0.1:8000/api/api/deleteProduct/${inventory.id}`;
            let curl = `https://shopmo.ng/api/deleteProduct/${inventory.id}`;
            const body = await fetch(curl, {
                method: 'DELETE'
            });
            const response = await body.json();
            console.log(response);

            alert(`Product ${inventory.name} has been successfuly deleted`);
            window.location.reload();
        });

        editButton.addEventListener('click', () => {

            // CHANGE TO ADD INVENTORY VIEW OF THE DASHBOARD
            showContent('content2');

            // POPULATE THE FORM WITH THE DETAILS OF THE PRODUCT TO EDIT
            formName.value = inventory.name;
            formDescription.value = inventory.description;
            formPrice.value = inventory.price;
            formStock.value = inventory.quantity;
            formColor.value = inventory.color;
            formSize.value = inventory.size;
            formId.value = inventory.id;
            formBtn.textContent = 'Update';
 
        });
    });
});

const formName = document.querySelector('.form-product-name');
const formDescription = document.querySelector('.form-product-description');
const formPrice = document.querySelector('.form-product-price');
const formStock = document.querySelector('.form-product-stock');
const formColor = document.querySelector('.form-product-color');
const formSize = document.querySelector('.form-product-size');
const formId = document.querySelector('.form-product-id');
const formBtn = document.querySelector('.form-product-btn');
const formAction = document.querySelector('.product-upload');
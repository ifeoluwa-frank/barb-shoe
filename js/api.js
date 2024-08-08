
async function register(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch('https://shopmo.ng/api/register', {
        method: 'POST',
        body: formData
    });

    // console.log(typeof(response));
    // console.log(response);
    // return;

    const body = await response.json();
    //console.log(typeof(body.errors));

    if(body.errors){
        let errorMsg = body.errors[Object.keys(body.errors)[0]];
        document.querySelector('.errorMsg').innerHTML = errorMsg;
    }

    // const responseObject = JSON.parse(body);

    // if(responseObject.errors){
    //     const responseArray = responseObject.errors;
    //     // console.log(responseArray.email[0])
    //     document.querySelector('.errorMsg').innerHTML = responseArray.email[0];
    // }

    // if(!responseObject.errors){
    //     // window.location.href = '/login.html'
    // }
}


// let loginForm = document.getElementById('LoginForm');


document.getElementById('LoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(e);

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch('https://shopmo.ng/api/login', {
        method: 'POST',
        body: formData
    });

       
    const body = await response.json();

    if(body.status){
        // Handle login
        document.querySelector('.errorMsg').innerHTML = '';
        localStorage.setItem('access_token', body.token);

        localStorage.setItem('user_details', JSON.stringify(body.user));
        localStorage.setItem('user_role', body.user.role)
        // console.log(body.user.role);
        window.location.href = './index.html'
    }

    if(!body.status){
        if(body.type == 'validation'){
            let errorMsg = body.errors[Object.keys(body.errors)[0]];
            document.querySelector('.errorMsg').innerHTML = errorMsg;
        }
        if(body.type == 'credentials'){
            let errorMsg = body.message;
            document.querySelector('.errorMsg').innerHTML = errorMsg;
        }
    }
});
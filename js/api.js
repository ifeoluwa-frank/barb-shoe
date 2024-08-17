
async function register(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // let url = 'http://127.0.0.1:8000/api/register';
    let url = 'https://shopmo.ng/api/register';

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });

    const body = await response.json();
    //console.log(typeof(body.errors));

    if(body.errors){
        let errorMsg = body.errors[Object.keys(body.errors)[0]];
        document.querySelector('.errorMsg').innerHTML = errorMsg;
    }
}


// let loginForm = document.getElementById('LoginForm');


document.getElementById('LoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    //console.log(e);

    const form = e.target;
    const formData = new FormData(form);

    // let url = 'http://127.0.0.1:8000/api/login';
    let url = 'https://shopmo.ng/api/login';

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });

       
    const body = await response.json();

    if(body.status){
        // Handle login
        document.querySelector('.errorMsg').innerHTML = '';
        localStorage.setItem('access_token', body.token);

        localStorage.setItem('user_details', JSON.stringify(body.user));
        localStorage.setItem('user_role', body.user.role);
        localStorage.setItem('user_id', body.user.id);
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
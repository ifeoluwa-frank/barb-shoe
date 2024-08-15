const account = document.querySelector('.listToHide');
const logoutSvg = document.querySelector('.logoutSvg');

document.addEventListener('DOMContentLoaded', () => {
    let token = localStorage.getItem('access_token');
    let userRole = localStorage.getItem('user_role');
    let userString = localStorage.getItem('user_details');
    
    if(token){
        if(userRole === 'user'){
            account.style.display = "none";
            logoutSvg.style.display = "inline";
        }
        if(userRole === 'admin'){
            account.style.display = "none";
            logoutSvg.style.display = "inline";

            const url = document.querySelector('.cartToAdmin');
            const imgUrl = document.querySelector('.imgChange');

            url.setAttribute('href', './dashboard.html');
            imgUrl.setAttribute('src', './images/admin.svg');
        }
       
    }
   // console.log(userString);
});

logoutSvg.addEventListener('click', () => {
    // e.preventDefault();
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_details');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    window.location.href = './index.html'
});
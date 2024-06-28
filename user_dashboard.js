document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    const usernameSpan = document.getElementById('username');
    const logoutButton = document.getElementById('logout');

    if (!username) {
        alert('Por favor, inicie sesión primero');
        window.location.href = 'index.html';
    } else {
        usernameSpan.textContent = username;
    }

    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});

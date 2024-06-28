document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.indicator');
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.createElement('div');
    const registerMessage = document.createElement('div');
    
    loginMessage.classList.add('message');
    registerMessage.classList.add('message');
    loginForm.appendChild(loginMessage);
    registerForm.appendChild(registerMessage);

    let index = 0;

    function showImage(i) {
        index = (i + images.length) % images.length;
        carouselImages.style.transform = `translateX(${-index * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    prevButton.addEventListener('click', () => {
        showImage(index - 1);
    });

    nextButton.addEventListener('click', () => {
        showImage(index + 1);
    });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            showImage(i);
        });
    });

    // Auto-play functionality
    setInterval(() => {
        showImage(index + 1);
    }, 5000); // Cambia la imagen cada 5 segundos

    // Login form toggle
    loginToggle.addEventListener('click', () => {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
        registerForm.style.display = 'none';
    });

    // Register form toggle
    registerToggle.addEventListener('click', () => {
        registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
        loginForm.style.display = 'none';
    });

    // Enlarging carousel images on hover
    images.forEach((image) => {
        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.2)';
        });
        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1)';
        });
    });

    // Función para guardar usuarios en el almacenamiento local
    function saveUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            return false; // Usuario ya existe
        }
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    // Función para validar usuarios
    function validateUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        return users[username] && users[username] === password;
    }

    // Manejar el registro de usuarios
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;
        if (saveUser(newUsername, newPassword)) {
            registerMessage.textContent = 'Registro exitoso';
            registerMessage.classList.remove('error');
            registerMessage.classList.add('success');
            registerMessage.style.display = 'block';
        } else {
            registerMessage.textContent = 'El usuario ya existe';
            registerMessage.classList.remove('success');
            registerMessage.classList.add('error');
            registerMessage.style.display = 'block';
        }
    });

    // Manejar el inicio de sesión de usuarios
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (validateUser(username, password)) {
            loginMessage.textContent = 'Inicio de sesión exitoso';
            loginMessage.classList.remove('error');
            loginMessage.classList.add('success');
            loginMessage.style.display = 'block';
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            window.location.href = "user_dashboard.html";
        } else {
            loginMessage.textContent = 'Nombre de usuario o contraseña incorrectos';
            loginMessage.classList.remove('success');
            loginMessage.classList.add('error');
            loginMessage.style.display = 'block';
        }
    });
});

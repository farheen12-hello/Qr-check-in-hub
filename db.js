const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;
// Handle Login
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!data.success) {
        document.getElementById('loginError').innerText = data.message;
        showNotification(data.message, true);
    } else {
        showNotification('Login successful!');
        sessionStorage.setItem('token', data.token); // Save the JWT token
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }
});

// Handle Registration
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!data.success) {
        document.getElementById('registerError').innerText = data.message;
        showNotification(data.message, true);
    } else {
        showNotification('Registration successful!');
        formBox.classList.remove('active'); // Switch to login form
    }
});
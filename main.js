const form = document.getElementById('form');
const cards = document.getElementById('cards');
const totalPrice = document.getElementById('total-price');

// Получение данных из локального хранилища
let orders = JSON.parse(localStorage.getItem('orders')) || [];
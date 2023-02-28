const cardsContainer = document.getElementById('cards');
const totalEl = document.getElementById('total');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const orders = JSON.parse(localStorage.getItem('orders') || '[]');

function renderCards() {
  cardsContainer.innerHTML = '';
  orders.forEach((order, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const name = document.createElement('h3');
    name.innerText = order.name;
    const price = document.createElement('p');
    price.setAttribute('class','hide')
    price.innerText = `${order.price} USD`;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Удалить';
    deleteBtn.addEventListener('click', () => {
      orders.splice(index, 1);
      localStorage.setItem('orders', JSON.stringify(orders));
      renderCards();
      updateTotal();
    });
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(deleteBtn);
    cardsContainer.appendChild(card);
  });
}

function updateTotal() {
  const total = orders.reduce((sum, order) => sum + order.price, 0);

  let converted = total * 40;
  totalEl.innerHTML = `<div class="msg">
                          <span class="total__title">
                              Итоговая сумма:
                          </span>
                              <div class="hide"> 
                                  ${total} USD 
                              </div>
                              <div class="hide uah">
                                  ${converted} 
                                  UAH
                              </div>
                      </div>`;
}

addBtn.addEventListener('click', () => {
  const name = nameInput.value;
  const price = parseInt(priceInput.value);
  if (!name || !price) {
    return;
  }
  orders.push({ name, price });
  localStorage.setItem('orders', JSON.stringify(orders));
  renderCards();
  updateTotal();
  nameInput.value = '';
  priceInput.value = '';
});

renderCards();
updateTotal();




function toggleTextVisibility() {
const hideElements = document.querySelectorAll('.hide');
let eye = document.querySelector('.showed');

hideElements.forEach((element) => {
  const originalText = element.innerText;
  let isHidden = false;

  document.getElementById('toggle').addEventListener('click', () => {
  if (isHidden) {
      element.innerText = originalText;
      eye.style.backgroundImage = 'url(./assets/Icon/Solid/eye-off.svg)'
      isHidden = false;
  } else {
      element.innerText = '*'.repeat(originalText.length);
      eye.style.backgroundImage = 'url(./assets/Icon/Solid/eye.svg)'
      isHidden = true;
  }
      });
  });
}
toggleTextVisibility()


document.querySelectorAll('.btn').forEach(item => {
      item.addEventListener('click' ,() => {
      document.querySelector('.sidebar').classList.toggle('active');

      console.log('test');
  })
})


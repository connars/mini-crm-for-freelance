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

const inputAmount = document.getElementById('input-amount');
const btnAdd = document.getElementById('btn-add');
const progressBar = document.querySelector('.progress-bar');
const progressArc = progressBar.querySelector('.arc');
const progressText = progressBar.querySelector('#progress-text');
const totalAmount = document.getElementById('total-amount');

let currentAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
let currentProgress = parseFloat(localStorage.getItem('progress')) || 0;

updateTotalAmount(currentAmount);
updateProgressBar(currentProgress);

btnAdd.addEventListener('click', () => {
    const newAmount = parseFloat(inputAmount.value) || 0;
    currentAmount += newAmount;
    localStorage.setItem('totalAmount', currentAmount);
    updateTotalAmount(currentAmount);

    const maxAmount = 10000;
    const progress = Math.min(currentAmount / maxAmount, 1);
    const animationDuration = 500;
    animateProgressBar(currentProgress, progress, animationDuration, progressArc);

    currentProgress = progress;
    localStorage.setItem('progress', currentProgress);
});

function updateTotalAmount(amount) {
    totalAmount.textContent = `${amount.toFixed(2)} USD`;
}

function animateProgressBar(from, to, duration, arc) {
    let start = null;
    const progress = Math.min(to - from, 1);
    const maxAngle = progress * 360;
    function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const angle = (elapsed / duration) * maxAngle;
        arc.style.transform = `rotate(${from + angle}deg)`;
        progressText.textContent = `${Math.round((from + angle) / 360 * 100)}%`;

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

function updateProgressBar(progress) {
    const maxAmount = 10000;
    const progressAngle = progress * 360;
    progressArc.style.transform = `rotate(${progressAngle}deg)`;
    progressText.textContent = `${Math.round(progress * 100)}%`;

    const green = '#47a447';
    const yellow = '#ffc107';
    const red = '#d9534f';
    let color;
    if (progress >= 0.7) {
        color = red;
    } else if (progress >= 0.3) {
        color = yellow;
    } else {
        color = green;
    }
    progressArc.style.stroke = color;
}

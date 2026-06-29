console.log("pets_page.js запустился!");
import pets from "./pets.js";


// burger
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const navMenu = document.querySelectorAll(".nav__menu");
const overlay = document.querySelector(".overlay");

burger.addEventListener("click", () => {
  nav.classList.toggle("burger__click");
  burger.classList.toggle("burger__rotate");
  document.body.classList.toggle("lock");
});

navMenu.forEach((item) => {
  item.addEventListener("click", () => {
    nav.classList.remove("burger__click");
    burger.classList.remove("burger__rotate");
    document.body.classList.remove("lock");
  });
});

overlay.addEventListener("click", () => {
  nav.classList.remove("burger__click");
  burger.classList.remove("burger__rotate");
  document.body.classList.remove("lock");
});


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////


const petsContainer = document.querySelector(".pets__cards");
const btnFirst = document.querySelector(".pets__arrow-1");
const btnPrev = document.querySelector(".pets__arrow-2");
const pageIndicator = document.querySelector(".pets__arrow-3");
const btnNext = document.querySelector(".pets__arrow-4");
const btnLast = document.querySelector(".pets__arrow-5");

let allCards = [];
let currentPage = 1;
let cardsPerPage = getCardsPerView();

// Генерация массива из 48 карточек
function generateCards(data) {
  const result = [];

  // каждый питомец повторяется одинаковое количество раз
  const repeatCount = 48 / data.length;
  data.forEach((pet) => {
    for (let i = 0; i < repeatCount; i++) {
      result.push(pet);
    }
  });

  // перемешиваем весь массив
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// функция для получения уникальных карточек на странице
function getPageCards(allCards, page, cardsPerPage) {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageCards = allCards.slice(start, end);

  // убираем дубликаты
  const unique = [];
  const usedNames = new Set();

  pageCards.forEach((pet) => {
    if (!usedNames.has(pet.name)) {
      unique.push(pet);
      usedNames.add(pet.name);
    }
  });

  // если карточек меньше чем нужно (например, убрали дубликаты),
  // добавляем недостающие из общего массива
  let i = 0;
  while (unique.length < cardsPerPage && i < allCards.length) {
    const candidate = allCards[i];
    if (!usedNames.has(candidate.name)) {
      unique.push(candidate);
      usedNames.add(candidate.name);
    }
    i++;
  }

  return unique;
}

// Отрисовка страницы
function renderPage(page) {
  petsContainer.classList.add("fade");
  setTimeout(() => {
    petsContainer.innerHTML = "";
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const pageCards = getPageCards(allCards, page, cardsPerPage);
    pageCards.forEach((pet) => {
      const card = document.createElement("div");
      card.classList.add("pets__card");
      card.innerHTML = `
        <img src="${pet.img}" alt="${pet.name}" class="pets__card-img">
        <p class="pets__card-name">${pet.name}</p>
        <button class="pets__card-button">Learn more</button>
      `;
      petsContainer.appendChild(card);
    });

    petsContainer.classList.remove("fade");
    pageIndicator.textContent = page;
    updateButtons();
  }, 500);
}

// Обновление кнопок
function updateButtons() {
  if (currentPage === 1) {
    // левая часть выключена
    btnFirst.classList.add("disabled");
    btnPrev.classList.add("disabled");

    btnFirst.style.borderColor = "var(--color-dark-s)";
    btnPrev.style.borderColor = "var(--color-dark-s)";

      btnFirst.querySelector("img").src = "assets/icons/arrow_2.svg"; // бледная
      btnFirst.classList.add("rotate");
      btnPrev.querySelector("img").src = "assets/icons/arrow_1.svg"; // бледная
      btnPrev.classList.add("rotate");
  } else {
    // левая часть активна
    btnFirst.classList.remove("disabled");
    btnPrev.classList.remove("disabled");

    btnFirst.style.borderColor = "var(--primary-color)";
    btnPrev.style.borderColor = "var(--primary-color)";

      btnFirst.querySelector("img").src = "assets/icons/arrow_2.svg"; // яркая
      btnFirst.classList.add("rotate");
      btnPrev.querySelector("img").src = "assets/icons/arrow_1.svg"; // яркая
      btnPrev.classList.add("rotate");
  }

  if (currentPage === getTotalPages()) {
    // правая часть выключена
    btnNext.classList.add("disabled");
    btnLast.classList.add("disabled");

    btnNext.style.borderColor = "var(--color-dark-s)";
    btnLast.style.borderColor = "var(--color-dark-s)";

    btnNext.querySelector("img").src = "assets/icons/arrow_1.svg"; // бледная версия
    btnLast.querySelector("img").src = "assets/icons/arrow_2.svg"; // бледная версия
  } else {
    // правая часть активна
    btnNext.classList.remove("disabled");
    btnLast.classList.remove("disabled");

    btnNext.style.borderColor = "var(--primary-color)";
    btnLast.style.borderColor = "var(--primary-color)";

    btnNext.querySelector("img").src = "assets/icons/arrow_1.svg"; // яркая
    btnLast.querySelector("img").src = "assets/icons/arrow_2.svg"; // яркая
  }
}




function getTotalPages() {
  return Math.ceil(allCards.length / cardsPerPage);
}

// Навигация
btnFirst.addEventListener("click", () => {
  currentPage = 1;
  renderPage(currentPage);
});
btnPrev.addEventListener("click", () => {
  if (currentPage > 1) currentPage--;
  renderPage(currentPage);
});
btnNext.addEventListener("click", () => {
  if (currentPage < getTotalPages()) currentPage++;
  renderPage(currentPage);
});
btnLast.addEventListener("click", () => {
  currentPage = getTotalPages();
  renderPage(currentPage);
});

// Пересчёт при ресайзе
window.addEventListener("resize", () => {
  cardsPerPage = getCardsPerView();
  renderPage(currentPage);
});

function getCardsPerView() {
  const width = window.innerWidth;
  if (width >= 1280) return 8;
  if (width >= 768) return 6;
  return 3;
}

// 🔹 Запуск логики
allCards = generateCards(pets);
renderPage(currentPage);


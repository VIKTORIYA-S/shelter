console.log("index.js запустился!");
import data from "./pets.js";

console.log("Импортированные данные:", data);

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

// ///////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
// функция для выбора актуального контейнера и стрелок
function getSliderElements() {
  if (window.innerWidth <= 400) {
    return {
      sliderWrapper: document.querySelector(
        ".pets-small__wrapper .pets__cards",
      ),
      arrowLeft: document.querySelector(
        ".pets-small__wrapper .pets__arrow-left",
      ),
      arrowRight: document.querySelector(
        ".pets-small__wrapper .pets__arrow-right",
      ),
    };
  } else {
    return {
      sliderWrapper: document.querySelector(".pets__wrapper .pets__cards"),
      arrowLeft: document.querySelector(".pets__wrapper .pets__arrow-left"),
      arrowRight: document.querySelector(".pets__wrapper .pets__arrow-right"),
    };
  }
}

// глобальные переменные
let { sliderWrapper, arrowLeft, arrowRight } = getSliderElements();
let arrRandomId = [];
let currentElements = [];

// инициализация
initSlider();
bindEvents();

// при ресайзе пересоздаём ссылки и заново инициализируем
window.addEventListener("resize", () => {
  ({ sliderWrapper, arrowLeft, arrowRight } = getSliderElements());
  bindEvents();
  initSlider();
});

function bindEvents() {
  // снимаем старые обработчики, если были
  arrowLeft?.replaceWith(arrowLeft.cloneNode(true));
  arrowRight?.replaceWith(arrowRight.cloneNode(true));

  // обновляем ссылки после cloneNode
  arrowLeft = document.querySelector(
    window.innerWidth <= 400
      ? ".pets-small__wrapper .pets__arrow-left"
      : ".pets__wrapper .pets__arrow-left",
  );
  arrowRight = document.querySelector(
    window.innerWidth <= 400
      ? ".pets-small__wrapper .pets__arrow-right"
      : ".pets__wrapper .pets__arrow-right",
  );

  arrowLeft?.addEventListener("click", () => moveSlider(arrowLeft));
  arrowRight?.addEventListener("click", () => moveSlider(arrowRight));
  sliderWrapper?.addEventListener("animationend", changeItems);
}

function moveSlider(item) {
  const cardsPerView = getCardsPerView();
  const newGroup = generateNewGroup(currentElements, cardsPerView);

  sliderWrapper.classList.add(
    item.classList.contains("pets__arrow-right")
      ? "move-to-right"
      : "move-to-left",
  );

  arrRandomId = newGroup;
}

function changeItems() {
  sliderWrapper.classList.remove("move-to-left", "move-to-right");
  sliderWrapper.innerHTML = "";

  currentElements = arrRandomId;
  currentElements.forEach((id) => addElement(id));

  arrRandomId = [];
}

function addElement(idOfElement) {
  if (!data[idOfElement]) return;
  const card = document.createElement("div");
  card.classList.add("pets__card");
  card.innerHTML = `
    <img src="${data[idOfElement].img}" alt="${data[idOfElement].name}" class="pets__card-img">
    <p class="pets__card-name">${data[idOfElement].name}</p>
    <button class="pets__card-button">Learn more</button>
  `;

card.addEventListener("click", () => openOverlay(idOfElement));
  sliderWrapper.append(card);
}

function initSlider() {
  sliderWrapper.innerHTML = "";
  const cardsPerView = getCardsPerView();
  currentElements = generateNewGroup([], cardsPerView);
  currentElements.forEach((id) => addElement(id));
}

function getCardsPerView() {
  const width = window.innerWidth;
  if (width >= 980) return 3;
  if (width >= 500) return 2;
  return 1;
}

function generateNewGroup(prevGroup, count) {
  const newGroup = [];
  while (newGroup.length < count) {
    const randomId = Math.floor(Math.random() * data.length);
    if (!prevGroup.includes(randomId) && !newGroup.includes(randomId)) {
      newGroup.push(randomId);
    }
  }
  return newGroup;
}

// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
// карточка питомца

const overlayCard = document.getElementById("overlay");
const overlayContent = document.getElementById("overlay-content");

function openOverlay(idOfElement) {
  overlayContent.innerHTML = `
    <div class="overlay__card">
      <img src="${data[idOfElement].img}" alt="${data[idOfElement].name}" class="overlay__img">
      <div class="overlay__content">
      <h3 class="overlay__title">${data[idOfElement].name}</h3>
      <p class="overlay__description">${data[idOfElement].description}</p>
      </div>
      <button class="overlay__close">x</button>
    </div>
  `;
  overlayCard.style.display = "flex";

  const closeBtn = overlayContent.querySelector(".overlay__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlayCard.style.display = "none";
    });
  }
}

// закрытие по клику на фон
overlayCard.addEventListener("click", (e) => {
  if (e.target === overlayCard) {
    overlayCard.style.display = "none";
  }
});
// //////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////

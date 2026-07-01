import data from "./pets.js";

// const overlayCard = document.getElementById("overlay");
// const overlayContent = document.getElementById("overlay-content");

// // функция открытия
// function openOverlay(idOfElement) {
//   overlayContent.innerHTML = `
//     <div class="overlay__container">
//       <div class="overlay__img_wrapper">
//         <img class="overlay__img" src="${data[idOfElement].img}" alt="${data[idOfElement].name}">
//       </div>
//       <div class="overlay__content">
//         <h2 class="overlay__title">${data[idOfElement].name}</h2>
//         <h3 class="overlay__subtitle">${data[idOfElement].type} - ${data[idOfElement].breed}</h3>
//         <p class="overlay__description">${data[idOfElement].description}</p>
//         <p>Age: ${data[idOfElement].age}</p>
//         <p>Inoculations: ${data[idOfElement].inoculations}</p>
//         <p>Diseases: ${data[idOfElement].diseases}</p>
//         <p>Parasites: ${data[idOfElement].parasites}</p>
//       </div>
//       <button id="overlay-close">×</button>
//     </div>
//   `;

//   overlayCard.style.display = "flex";

//   // закрытие по крестику
//   const closeBtn = document.getElementById("overlay-close");
//   closeBtn.addEventListener("click", () => {
//     overlayCard.style.display = "none";
//   });
// }

// // закрытие по клику на фон
// overlayCard.addEventListener("click", (e) => {
//   if (e.target === overlayCard) {
//     overlayCard.style.display = "none";
//   }
// });

// // генерация карточек
// const cardsContainer = document.querySelector(".pets__cards");
// data.forEach((pet, index) => {
//   const card = document.createElement("div");
//   card.classList.add("pets__card");
//   card.innerHTML = `
//     <img src="${pet.img}" alt="${pet.name}" class="pets__card-img">
//     <p class="pets__card-name">${pet.name}</p>
//     <button class="pets__card-button">Learn more</button>
//   `;
//   card.addEventListener("click", () => openOverlay(index));
//   cardsContainer.append(card);
// });










// const overlayCard = document.getElementById("overlay");
// const overlayContent = document.getElementById("overlay-content");

// function openOverlay(id) {
//   overlayContent.innerHTML = `
//     <div class="overlay__container">
//       <div class="overlay__img_wrapper">
//         <img class="overlay__img" src="${data[id].img}" alt="${data[id].name}">
//       </div>
//       <div class="overlay__content">
//         <h2 class="overlay__title">${data[id].name}</h2>
//         <h3 class="overlay__subtitle">${data[id].type} - ${data[id].breed}</h3>
//         <p class="overlay__description">${data[id].description}</p>
//         <p>Age: ${data[id].age}</p>
//         <p>Inoculations: ${data[id].inoculations}</p>
//         <p>Diseases: ${data[id].diseases}</p>
//         <p>Parasites: ${data[id].parasites}</p>
//       </div>
//       <button id="overlay-close">×</button>
//     </div>
//   `;
//   overlayCard.style.display = "flex";

//   // закрытие по крестику
//   document.getElementById("overlay-close").addEventListener("click", () => {
//     overlayCard.style.display = "none";
//   });
// }

// // закрытие по клику на фон
// overlayCard.addEventListener("click", (e) => {
//   if (e.target === overlayCard) {
//     overlayCard.style.display = "none";
//   }
// });


// // например, по клику на кнопку "Показать карточки"
// renderCards();

















// const cardsContainer = document.querySelector(".pets__cards");
// const overlayCard = document.getElementById("overlay");
// const overlayContent = document.getElementById("overlay-content");


// cardsContainer.addEventListener("click", (event) => {
//     overlayCard.style.display = "flex";
// });


// контейнер для карточек и модалки
// контейнер для карточек и модалки
const cardsContainer = document.querySelector(".pets__cards");
const overlayCard = document.getElementById("overlay");
const overlayContent = document.getElementById("overlay-content");

// открытие модалки по имени
function openOverlayByName(name) {
  const pet = data.find((p) => p.name === name); // ищем питомца по имени
  if (!pet) {
    console.error("Нет питомца с таким именем:", name);
    return;
  }

  overlayContent.innerHTML = `
  <div class="overlay__card" id="overlay">
            <div class="overlay__container" id="overlay-content">
                <div class="overlay__img_wrapper">
                    <img class="overlay__img" src="${pet.img}" alt="${pet.name}">
                </div>
                <div class="overlay__content">
                    <h2 class="overlay__title">${pet.name}</h2>
                    <h3 class="overlay__subtitle">${pet.type} - ${pet.breed}</h3>
                    <p class="overlay__description">${pet.description}</p>
                    <p class="overlay__age-title">Age: <span class="overlay__age-title-span">${pet.age}</span></p>
                    <p class="overlay__inoculations-title">Inoculations: <span class="overlay__inoculations-title-span">${pet.inoculations}</span></p>
                    <p class="overlay__diseases-title">Diseases: <span class="overlay__diseases-title-span">${pet.diseases}</span></p>
                    <p class="overlay__parasites-title">Parasites: <span class="overlay__parasites-title-span">${pet.parasites}</span></p>
                </div>
                <button id="overlay__close">x</button>
            </div>
        </div>

    
  `;

  overlayCard.style.display = "flex";
  document.body.style.overflow = "hidden"; // ← блокируем скролл
  document.getElementById("overlay__close").addEventListener("click", () => {
    overlayCard.style.display = "none";
    document.body.style.overflow = ""; // ← возвращаем скролл
  });
}

// закрытие по клику на фон
overlayCard.addEventListener("click", (e) => {
  if (e.target === overlayCard) {
    overlayCard.style.display = "none";
    document.body.style.overflow = ""; // ← возвращаем скролл
  }
});

// делегирование клика на карточку
cardsContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".pets__card");
  if (!card) return;

  // берём имя из карточки
  const nameElement = card.querySelector(".pets__card-name");
  if (!nameElement) return;

  const name = nameElement.textContent.trim();
  console.log("Клик по карточке, имя =", name);

  openOverlayByName(name);
});



const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModal = profileEditModal.querySelector(
  "#profile-close-modal"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleForm = document.querySelector("#profile-title-form");
const profileDescriptionForm = document.querySelector(
  "#profile-description-form"
);

const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseModal = addCardModal.querySelector("#add-card-close-modal");
const addCardForm = addCardModal.querySelector(".modal__form");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardTitleForm = addCardForm.querySelector("#add-card-title-form");
const cardLinkForm = addCardForm.querySelector("#add-card-link-form");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageCloseModal = document.querySelector(
  "#preview-image-close-modal"
);
const previewImageEl = previewImageModal.querySelector(".preview-image-card");
const previewTitleEl = previewImageModal.querySelector(".preview-image-title");

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  modal.addEventListener("keydown", () => closePopup(modal));
}

// Function to handle the Esc key
function closePopupByEscape(event) {
  if (event.key === "Escape") {
    // Search for an opened modal
    const openedModal = document.querySelector(".modal_opened");

    // Close it if found
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  // Add the event listener by reference
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");

  // Remove the event listener
  document.removeEventListener("keydown", closePopupByEscape);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  //find delete button
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  //add click listener to the cardImage element
  //openModal with previewImageModal
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = cardData.link;
    previewImageEl.alt = cardData.name;
    previewTitleEl.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  //set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  //set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  //return the ready HTML element with the filled-in data
  return cardElement;
}

previewImageCloseModal.addEventListener("click", () =>
  closePopup(previewImageModal)
);

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleForm.value;
  profileDescription.textContent = profileDescriptionForm.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleForm.value;
  const link = cardLinkForm.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  closePopup(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  profileTitleForm.value = profileTitle.textContent;
  profileDescriptionForm.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileCloseModal.addEventListener("click", () => closePopup(profileEditModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardCloseModal.addEventListener("click", () => closePopup(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

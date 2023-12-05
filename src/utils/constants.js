import PopupWithForm from "../components/PopupWithForm.js";

export const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditFormSubmit
);

export const initialCards = [
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

export const profileEditButton = document.querySelector("#profile-edit-button");

export const profileEditCloseButton = profileEditModal.getCloseButton();
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

export const addCardModal = document.querySelector("#add-card-modal");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const addCardModalCloseButton =
  addCardModal.querySelector(".modal__close");
export const addCardForm = addCardModal.querySelector(".modal__form");

export const cardTitleInput = document.querySelector("#card-title-input");
export const cardUrlInput = document.querySelector("#card-url-input");
export const deleteButton = document.querySelector(".card__delete-card");
export const closeButtons = document.querySelectorAll(".modal__close");

export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImageCloseButton = previewImageModal.querySelector(
  ".modal__close_preview"
);
export const modalImage = previewImageModal.querySelector(
  ".modal__image_preview"
);
export const modalTitle = previewImageModal.querySelector(
  ".modal__title_preview"
);

export const modals = document.querySelectorAll(".modal");

export const profileEditForm = profileEditModal.getForm();

export const cardListEL = document.querySelector(".cards__list");

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function handleProfileEditFormSubmit(formData) {
  // Handle the profile edit form submission right here
}

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";
import "./index.css";
import {
  initialCards,
  profileEditModal,
  addCardModal,
  addNewCardButton,
  cardListEL,
  config,
  profileEditForm,
  handleEscape,
  profileEditButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  modalImage,
  modalTitle,
  previewImageModal,
} from "../utils/constants.js";

const addCardForm = addCardModal.querySelector(".modal__form");

const addCardFormValidator = new FormValidator(addCardForm, config);
addCardFormValidator.enableValidation();

const profileEditModalFormValidator = new FormValidator(
  profileEditForm,
  config
);

function closePopup(popup) {
  document.removeEventListener("keydown", handleEscape);
  popup.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

function openModal(modal) {
  document.addEventListener("keydown", handleEscape);
  modal.classList.add("modal_opened");
}

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  openModal(addCardModal);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name, link };
  const card = createCard(cardData);
  cardListEL.prepend(card);
  addCardForm.reset();
  closePopup(addCardModal);
  addCardFormValidator.toggleButtonState();
}
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });
  return card.getView();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEL.prepend(card);
});

profileEditModalFormValidator.enableValidation();

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/userInfo.js";
import "./index.css";
import {
  initialCards,
  profileEditModal,
  cardListEl,
  profileAddModal,
  profileEditFormElement,
  profileAddFormElement,
  profileEditButton,
  profileAddButton,
  profileAddCloseButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditSubmitButton,
  cardTitleInput,
  cardUrlInput,
  previewImageModal,
  previewImageCloseModal,
  modalImage,
  modalText,
  config,
  addCardForm,
  profileEditForm,
  addNewCardButton,
  cardListEL,
  modal,
  forEach,
  addCardModal,
  openedModal,
  modalTitle,
  popup,
  popupWithForm,
  popupWithImage,
} from "../utils/constants.js";

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
  const card = new Card(cardData, "#card-template", (name, link) => {
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

//combining close button and overlay listeners together

profileEditModalFormValidator.enableValidation();

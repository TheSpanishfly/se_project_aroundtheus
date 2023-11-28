import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");

const addCardFormValidator = new FormValidator(addCardForm, config);
addCardFormValidator.enableValidation();

const profileEditModalFormValidator = new FormValidator(
  profileEditForm,
  config
);

const userInfo = new UserInfo("#profile-title", "#profile-description");

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profileEditModal.open();
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = profileTitleInput.value;
  const job = profileDescriptionInput.value;
  userInfo.setUserInfo(name, job);
  profileEditModal.close();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardModal.open();
});

function handleAddCardFormSubmit(formData) {
  const card = createCard(formData);
  cardListEL.prepend(card);
  addCardForm.reset();
  addCardModal.close();
  addCardFormValidator.toggleButtonState();
}

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalTitle.textContent = cardData.name;
    previewImageModal.open();
  });
  return card.getView();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEL.prepend(card);
});

profileEditModalFormValidator.enableValidation();

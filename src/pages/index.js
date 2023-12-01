import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";
import {
  initialCards,
  profileEditModal,
  addCardModal,
  addNewCardButton,
  cardListEL,
  config,
  profileEditForm,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
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

// Instantiate addCardPopup here
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});

function handleAddCardFormSubmit(formData) {
  const card = createCard(formData);
  cardListEL.prepend(card);
  addCardPopup.close();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.name, cardData.link);
  });
  return card.getView();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEL.prepend(card);
});

profileEditModalFormValidator.enableValidation();

// Instantiating PopupWithImage
const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

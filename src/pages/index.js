import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js"; // Added import statement
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

const profileEditFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditFormSubmit
);
profileEditFormPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profileEditFormPopup.open();
});

function handleProfileEditFormSubmit(formData) {
  userInfo.setUserInfo(formData.title, formData.description);
  profileEditFormPopup.close();
}

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});

function handleAddCardFormSubmit(formData) {
  const card = createCard(formData);
  cardListEL.prepend(card);
  addCardForm.reset();
  addCardPopup.close();
  addCardFormValidator.toggleButtonState();
}

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.name, cardData.link); // Updated this line
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

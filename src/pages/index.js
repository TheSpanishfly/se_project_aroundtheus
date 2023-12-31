import index from "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards,
  addCardModal,
  profileEditModal,
  cardListEL,
  config,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";

const addCardForm = addCardModal.querySelector(".modal__form");

const addCardFormValidator = new FormValidator(addCardForm, config);
addCardFormValidator.enableValidation();

const editProfileForm = profileEditModal.querySelector(".modal__form");
const profileEditModalFormValidator = new FormValidator(
  editProfileForm,
  config
);

const userInfo = new UserInfo("#profile-title", "#profile-description");

const profileEditFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditFormSubmit
);
profileEditFormPopup.setEventListeners();

const profileEditButton = document.querySelector("#profile-edit-button");

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  profileEditFormPopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});

function handleAddCardFormSubmit(formData) {
  const card = createCard({ name: formData.title, link: formData.url });
  cardSection.addItem(card);
  addCardPopup.close();
}

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function createCard(cardData) {
  return new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.name, cardData.link);
  }).getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardEl = createCard(cardData);
      cardSection.addItem(cardEl);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

profileEditModalFormValidator.enableValidation();

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function handleProfileEditFormSubmit(formData) {
  userInfo.setUserInfo(formData.title, formData.description);
  profileEditFormPopup.close();
}

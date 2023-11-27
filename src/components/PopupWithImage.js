import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector: popupSelector });
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._modalTitle = this._popupElement.querySelector(".modal__title");
  }

  open({ name, link }) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalTitle.textContent = name;
    super.open();
  }
}

export { PopupWithImage };

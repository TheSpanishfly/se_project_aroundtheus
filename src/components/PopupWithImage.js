import Popup from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      "modal__image modal__image_preview"
    );
    this._titleElement = this._popupElement.querySelector(
      "modal__title modal__title_preview"
    );
  }

  open(cardData) {
    this._imageElement.src = imageUrl;
    this._imageElement.alt = imageAlt;
    this._titleElement.textContent = title;
    super.open();
  }
}

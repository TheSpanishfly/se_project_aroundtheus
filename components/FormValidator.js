export default class FormValidator {
  constructor(formEl, options) {
    this._formEl = formEl;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _showInputError(input) {
    const errorMessageEl = this._formEl.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = input.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorMessageEl = this._formEl.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButtons = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      this._submitButtons.classList.add(this._inactiveButtonClass);
      this._submitButtons.disabled = true;
      return;
    }
    this._submitButtons.classList.remove(this._inactiveButtonClass);
    this._submitButtons.disabled = false;
  }

  enableValidation() {
    this._setEventListeners();
  }
}

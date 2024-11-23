class Popup {
    constructor({ popupSelector }) {
      this._popupElement = document.querySelector(popupSelector);
      this._popupCloseBtn = this._popupElement.querySelector(".popup__close");

      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleOverlayClick = this._handleOverlayClick.bind(this);
    }
  
    open() {
      this._popupElement.classList.add("popup_visible");
      document.addEventListener("keydown", this._handleEscClose);
      document.addEventListener("click", this._handleOverlayClick);
    }
  
    close() {
      this._popupElement.classList.remove("popup_visible");
      document.removeEventListener("keydown", this._handleEscClose);
      document.removeEventListener("click", this._handleOverlayClick);
    }
  
    setEventListeners() {
      this._popupCloseBtn.addEventListener("click", () => this.close());
    }
  
    _handleEscClose(event) {
      if (event.key === "Escape") {
        this.close();
      }
    }
  
    _handleOverlayClick(event) {
      if (event.target === this._popupElement) {
        this.close();
      }
    }
  }
  
  export default Popup;
  
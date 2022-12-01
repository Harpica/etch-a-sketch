import { Popup } from "./Popup";

export class PopupWithImage extends Popup{
  private _closeButton:  HTMLElement;
  private _container: HTMLElement;
  private _keydownHandler: (event: KeyboardEvent) => void;
  private _picture: HTMLCanvasElement | string;

  constructor(popupSelector: string) {
    super(popupSelector);
    this._closeButton = this._popupElement.querySelector('.button__close') as HTMLElement;
    this._container = this._popupElement.firstElementChild as HTMLElement;
    // Чтобы можно было воспользоваться removeEventLisneter
    this._keydownHandler = this._handleEscClose.bind(this);
    this._setEventListeners();
    this._picture = '';
  }
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._keydownHandler);
  }
  close() {
    document.removeEventListener('keydown', this._keydownHandler);
    this._popupElement.classList.remove('popup_opened');
    this._clearPicture();
  }
  _handleEscClose(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }
  addPicture(picture: HTMLCanvasElement): void {
    this._container.appendChild(picture);
    this._picture = picture;
  }
  _clearPicture() {
    if (!(typeof(this._picture) === 'string'))
    this._picture.remove();
  }
  _setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('click', (event: MouseEvent) => {
      if (!this._container.contains(event.target as Node)) {
        this.close();
      }
    });
  }
}

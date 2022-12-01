import { Grid, ActionType } from './draw';
import html2canvas from 'html2canvas';
import { PopupWithImage } from './PopupWithImage';

export class Settings {
  private _popupElement: HTMLElement;
  private _openSettingsButton: HTMLElement;
  private _takePictureButton: HTMLElement;
  private _rainbowButton: HTMLElement;
  private _clearButton: HTMLElement;
  private _gridSizeCounter: HTMLElement;
  private _gridSizeForm: HTMLFormElement;
  private _gridSizeInput: HTMLInputElement;
  private _colorInput: HTMLInputElement;
  private _grid: Grid;
  private _imagePopup: PopupWithImage;
  constructor(settingsSelector: string, grid: Grid, imagePopup: PopupWithImage) {
    this._popupElement = document.querySelector(settingsSelector) as HTMLElement;
    this._openSettingsButton = document.querySelector(
      '.button__open-popup'
    ) as HTMLElement;
    this._takePictureButton = this._popupElement.querySelector(
      '.button__picture'
    ) as HTMLElement;
    this._rainbowButton = this._popupElement.querySelector(
      '.button__rainbow'
    ) as HTMLElement;
    this._gridSizeCounter = this._popupElement.querySelector(
      '.content__label_type_value'
    ) as HTMLElement;
    this._clearButton = this._popupElement.querySelector(
      '.button__clear'
    ) as HTMLElement;
    this._gridSizeForm = this._popupElement.querySelector(
      '.content__form'
    ) as HTMLFormElement;
    this._gridSizeInput = this._popupElement.querySelector(
      '.content__range'
    ) as HTMLInputElement;
    this._colorInput = this._popupElement.querySelector(
      '.content__color'
    ) as HTMLInputElement;
    this._grid = grid;
    this._imagePopup = imagePopup;
    this._setEventListeners();
  }
  open() {
    this._popupElement.classList.add('settings_opened');
  }
  close() {
    this._popupElement.classList.remove('settings_opened');
  }
  toggle() {
    this._popupElement.classList.toggle('settings_opened');
  }

  protected _setEventListeners(): void {
    // Changing number in the label of range input
    this._gridSizeInput.addEventListener('input', () => {
      this._gridSizeCounter.textContent = this._gridSizeInput.value;
    });
    // Changing size of grid
    this._gridSizeForm.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      this._grid.resize(parseInt(this._gridSizeInput.value));
    });
    // Set rainbow style of drawing
    this._rainbowButton.addEventListener('click', () => {
      this._grid.switchDrawing(ActionType.DRAW_RAINBOW);
    });
    // Cleaning all paper
    this._clearButton.addEventListener('click', () => {
      this._grid.clear();
    });
    // Changing color of drawing
    this._colorInput.addEventListener('input', () => {
      this._grid.changeColor(this._colorInput.value);
    });
    // Opening and closing settings
    this._openSettingsButton.addEventListener('click', () => {
      this.toggle();
    });
    // Taking screenshot and opening it in popup
    this._takePictureButton.addEventListener('click', () => {
      html2canvas(this._grid.getGridElement).then(canvas => {
        this._imagePopup.open();
        this._imagePopup.addPicture(canvas);
      })
    });
  }
}

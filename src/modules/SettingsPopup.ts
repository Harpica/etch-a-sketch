import { Popup } from "./Popup";

// View
export class SettingsPopup extends Popup {
  openSettingsButton: HTMLElement;
  takePictureButton: HTMLElement;
  rainbowButton: HTMLElement;
  clearButton: HTMLElement;
  gridSizeCounter: HTMLElement;
  gridSizeForm: HTMLFormElement;
  gridSizeInput: HTMLInputElement;
  colorInput: HTMLInputElement;
  constructor(settingsSelector: string) {
    super(settingsSelector);
    this.openSettingsButton = document.querySelector(
      '.button__open-popup'
    ) as HTMLElement;
    this.takePictureButton = this._popupElement.querySelector(
      '.button__picture'
    ) as HTMLElement;
    this.rainbowButton = this._popupElement.querySelector(
      '.button__rainbow'
    ) as HTMLElement;
    this.gridSizeCounter = this._popupElement.querySelector(
      '.content__label_type_value'
    ) as HTMLElement;
    this.clearButton = this._popupElement.querySelector(
      '.button__clear'
    ) as HTMLElement;
    this.gridSizeForm = this._popupElement.querySelector(
      '.content__form'
    ) as HTMLFormElement;
    this.gridSizeInput = this._popupElement.querySelector(
      '.content__range'
    ) as HTMLInputElement;
    this.colorInput = this._popupElement.querySelector(
      '.content__color'
    ) as HTMLInputElement;
  }
  open(): void {
    this._popupElement.classList.add('settings_opened');
  }
  close() {
    this._popupElement.classList.remove('settings_opened');
  }
  toggle() {
    this._popupElement.classList.toggle('settings_opened');
  }
}

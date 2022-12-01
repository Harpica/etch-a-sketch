export abstract class Popup {
  protected _popupElement: HTMLElement;
  constructor(popupSelector: string) {
    this._popupElement = document.querySelector(popupSelector) as HTMLElement;
  }
  public abstract open(): void;
  public abstract close(): void;
}

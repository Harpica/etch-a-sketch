export class Pixel {
  private _pixelElement: HTMLElement;

  constructor(color: string = 'white') {
    this._pixelElement = this._createPixelElement(color);
  }

  private _createPixelElement(color: string): HTMLElement {
    const pixelElement = document.createElement('div');
    pixelElement.style.backgroundColor = color;
    pixelElement.classList.add('content__grid-element');
    return pixelElement;
  }
  get getPixelElement(): HTMLElement {
    return this._pixelElement;
  }
}

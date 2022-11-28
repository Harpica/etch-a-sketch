class Grid {
  private _size: number;
  private _gridElement: HTMLElement;
  private _pixelArray: Array<Pixel>;
  private _drawer: Drawer;

  constructor(gridSize: number, gridElement: HTMLElement) {
    this._gridElement = gridElement;
    this._pixelArray = [];
    this._drawer = new Drawer();
    this.resize(gridSize);
    this.startDrawing();
  }
  private _createPixelArray(): void {
    this._pixelArray = [];
    // Deleting all previous children
    this._gridElement.textContent = '';
    for (let i = 0; i < this._size * this._size; i++) {
      const pixel = new Pixel();
      const pixelElement = pixel.getPixelElement;
      pixelElement.addEventListener('mousedown', () => {
        if (this._drawer.isDrawing) {
          this._drawer.action(pixelElement);
        }
      });
      pixelElement.addEventListener('mouseover', () => {
        if (this._drawer.isDrawing) {
          this._drawer.action(pixelElement);
        }
      });
      this._pixelArray.push(pixel);
      this._addPixelToGrid(pixelElement);
    }
  }
  // Start drawing on mouseclick. Drawing style depends on actionType
  startDrawing(): void {
    this._gridElement.addEventListener('click', () => {
      this._drawer.toggleDrawing();

    });
  }
  switchDrawing(action: ActionType): void {
    this._drawer.switchAction(action);
  }
  changeColor(color: string):void {
    this._drawer.setColor = color;
  }
  clear(): void {
    this._pixelArray.forEach((pixel) => {
      this._drawer.erase(pixel.getPixelElement);
    });
  }
  private _addPixelToGrid(pixelElement: HTMLElement): void {
    this._gridElement.append(pixelElement);
  }

  resize(gridSize: number): void {
    this._size = gridSize;
    this._gridElement.style.gridTemplateColumns = `repeat(${this._size.toString()}, 1fr)`;
    this._gridElement.style.gridTemplateRows = `repeat(${this._size.toString()}, 1fr)`;
    this._createPixelArray();
  }
}

class Pixel {
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

class Drawer {
  private _color: string;
  public isDrawing: boolean;
  action: Function;

  constructor(color: string = 'black') {
    this.setColor = color;
    this.isDrawing = false;
    this.action = this.draw;
  }
  draw(pixelElement: HTMLElement): void {
    pixelElement.style.backgroundColor = this._color;
  }
  drawRanbow(pixelElement: HTMLElement): void {
    pixelElement.style.setProperty(
      'background-color',
      `hsl(${randomBetween(0, 255)}, 50%, 50%)`
    );
  }
  erase(pixelElement: HTMLElement): void {
    pixelElement.style.backgroundColor = 'white';
  }
  set setColor(color: string) {
    this._color = color;
  }
  toggleDrawing() {
    this.isDrawing = !this.isDrawing;
  }
  switchAction(action: ActionType) {
    switch (action) {
      case ActionType.DRAW:
        this.action = this.draw;
        break;
      case ActionType.DRAW_RAINBOW:
        this.action = this.drawRanbow;
        break;
      case ActionType.ERASE:
        this.action = this.erase;
        break;
    }
  }
}

export enum ActionType {
  NONE,
  DRAW,
  DRAW_RAINBOW,
  ERASE,
}

export { Grid, Pixel, Drawer };

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

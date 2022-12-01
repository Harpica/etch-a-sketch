import { Grid } from "./Grid";
import { Pixel } from "./Pixel";

export class DrawManager {
  private _color: string;
  private _pixelArray: Array<Pixel>;
  private _grid: Grid;
  private _isDrawing: boolean;
  public action: Function;

  constructor(color: string = 'black', grid: Grid) {
    this._color = color;
    this._grid = grid;
    this._pixelArray = [];
    this._isDrawing = false;
    this.action = this._draw;
  }
  private _draw(pixelElement: HTMLElement): void {
    pixelElement.style.backgroundColor = this._color;
  }
  private _drawRanbow(pixelElement: HTMLElement): void {
    pixelElement.style.setProperty(
      'background-color',
      `hsl(${randomBetween(0, 255)}, 50%, 50%)`
    );
  }
  private _erase(pixelElement: HTMLElement): void {
    pixelElement.style.backgroundColor = 'white';
  }
  private _toggleDrawing() {
    this._isDrawing = !this._isDrawing;
  }
  private _switchAction(action: ActionType) {
    switch (action) {
      case ActionType.DRAW:
        this.action = this._draw;
        break;
      case ActionType.DRAW_RAINBOW:
        this.action = this._drawRanbow;
        break;
      case ActionType.ERASE:
        this.action = this._erase;
        break;
    }
  }
  public createPixelArray(): void {
    this._pixelArray = [];
    // Deleting all previous children
    this._grid.getElement.textContent = '';
    for (let i = 0; i < this._grid.getSize * this._grid.getSize; i++) {
      const pixel = new Pixel();
      const pixelElement = pixel.getPixelElement;
      pixelElement.addEventListener('mousedown', () => {
        if (this._isDrawing) {
          this.action(pixelElement);
        }
      });
      pixelElement.addEventListener('mouseover', () => {
        if (this._isDrawing) {
          this.action(pixelElement);
        }
      });
      this._pixelArray.push(pixel);
      this._addPixelToGrid(pixelElement);
    }
  }
  private _addPixelToGrid(pixelElement: HTMLElement): void {
    this._grid.getElement.append(pixelElement);
  }

  // Start drawing on mouseclick. Drawing style depends on actionType
  public startDrawing(): void {
    this._grid.getElement.addEventListener('click', () => {
      this._toggleDrawing();

    });
  }
  public switchDrawing(action: ActionType): void {
    this._switchAction(action);
  }
  public changeColor(color: string):void {
    this._color = color;
  }
  public clear(): void {
    this._pixelArray.forEach((pixel) => {
      this._erase(pixel.getPixelElement);
    });
  }
}

export enum ActionType {
  NONE,
  DRAW,
  DRAW_RAINBOW,
  ERASE,
}

export { Grid, Pixel };

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

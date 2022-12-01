export class Grid {
  private _size: number;
  private _gridElement: HTMLElement;

  constructor( gridElement: HTMLElement) {
    this._size = 0;
    this._gridElement = gridElement;
  }
  resize(gridSize: number): void {
    this._size = gridSize;
    this._gridElement.style.gridTemplateColumns = `repeat(${this._size.toString()}, 1fr)`;
    this._gridElement.style.gridTemplateRows = `repeat(${this._size.toString()}, 1fr)`;
  }
  get getElement(): HTMLElement {
    return this._gridElement;
  }
  get getSize(): number {
    return this._size;
  }
}

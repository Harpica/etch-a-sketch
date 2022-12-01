import { Grid, ActionType } from './DrawManager';
import html2canvas from 'html2canvas';
import { PopupWithImage } from './PopupWithImage';
import { SettingsPopup } from './SettingsPopup';
import { DrawManager } from './DrawManager';


// Controller
export class SettingsManager {
  private _settingsPopup: SettingsPopup;
  private _grid: Grid;
  private _imagePopup: PopupWithImage;
  private _drawManager: DrawManager;
  constructor( grid: Grid, drawManager: DrawManager, settingsPopup: SettingsPopup,imagePopup: PopupWithImage) {
    this._settingsPopup = settingsPopup;
    this._drawManager = drawManager;
    this._grid = grid;
    this._imagePopup = imagePopup;
    this._setEventListeners();
  }

  public setDrawing():void {
    this._grid.resize(parseInt(this._settingsPopup.gridSizeInput.value))
    this._drawManager.createPixelArray();
  }

  private _setEventListeners(): void {
    // Changing number in the label of range input
    this._settingsPopup.gridSizeInput.addEventListener('input', () => {
      this._settingsPopup.gridSizeCounter.textContent = this._settingsPopup.gridSizeInput.value;
    });
    // Changing size of grid
    this._settingsPopup.gridSizeForm.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      this._grid.resize(parseInt(this._settingsPopup.gridSizeInput.value))
      this._drawManager.createPixelArray();
    });
    // Set rainbow style of drawing
    this._settingsPopup.rainbowButton.addEventListener('click', () => {
      this._drawManager.switchDrawing(ActionType.DRAW_RAINBOW);
    });
    // Cleaning all paper
    this._settingsPopup.clearButton.addEventListener('click', () => {
      this._drawManager.clear();
    });
    // Changing color of drawing
    this._settingsPopup.colorInput.addEventListener('input', () => {
      this._drawManager.changeColor(this._settingsPopup.colorInput.value);
    });
    // Opening and closing settings
    this._settingsPopup.openSettingsButton.addEventListener('click', () => {
      this._settingsPopup.toggle();
    });
    // Taking screenshot and opening it in popup
    this._settingsPopup.takePictureButton.addEventListener('click', () => {
      html2canvas(this._grid.getElement).then(canvas => {
        this._imagePopup.open();
        this._imagePopup.addPicture(canvas);
      })
    });
  }
}

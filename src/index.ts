import './index.css';

import { DrawManager, Grid} from './modules/DrawManager';
import { SettingsManager } from './modules/Settings';
import { PopupWithImage } from './modules/PopupWithImage';
import { SettingsPopup } from './modules/SettingsPopup';

const gridElement = document.querySelector('.content__grid') as HTMLElement;
const grid = new Grid(gridElement);
const settingsPopup = new SettingsPopup('.settings');
const imagePopup = new PopupWithImage('.popup');
const drawManager = new DrawManager('black', grid);
const settings = new SettingsManager(grid, drawManager, settingsPopup, imagePopup);

// Start drawing
settings.setDrawing();
drawManager.startDrawing();





import './index.css';

import { Grid} from './modules/draw';
import { Settings } from './modules/Settings';
import { PopupWithImage } from './modules/PopupWithImage';

const INITIAL_SIZE = 40;
const gridElement = document.querySelector('.content__grid') as HTMLElement;

const grid = new Grid(INITIAL_SIZE, gridElement);
const imagePopup = new PopupWithImage('.popup');
const settings = new Settings('.settings', grid, imagePopup);
console.log(settings);




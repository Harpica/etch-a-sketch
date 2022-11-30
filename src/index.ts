import './index.css';

import { Grid, ActionType } from './modules/draw';
import { togglePopup } from './modules/utils';
import html2canvas from 'html2canvas';

const gridSizeElement = document.querySelector(
  '.content__range'
) as HTMLInputElement;
const gridElement = document.querySelector('.content__grid') as HTMLElement;

const grid = new Grid(parseInt(gridSizeElement.value), gridElement);

const gridSizeForm = document.querySelector('.content__form') as HTMLFormElement;

const gridSizeCounter = document.querySelector(
  '.content__label_type_value'
) as HTMLElement;

const rainbowButton = document.querySelector('.button__rainbow') as HTMLElement;

const clearButton = document.querySelector('.button__clear') as HTMLElement;

const colorInput = document.querySelector(
  '.content__color'
) as HTMLInputElement;

const popup = document.querySelector('.popup') as HTMLElement;

const openPopupButton = document.querySelector(
  '.button__open-popup'
) as HTMLElement;

const takePictureButton = document.querySelector('.button__picture') as HTMLElement;

// Changing size of grid
gridSizeForm.addEventListener('submit', (evt: Event) => {
  evt.preventDefault();
  grid.resize(parseInt(gridSizeElement.value));
});

// Changing number in the label of range input
gridSizeElement.addEventListener('input', () => {
  gridSizeCounter.textContent = gridSizeElement.value;
});

// Set rainbow style of drawing
rainbowButton.addEventListener('click', () => {
  grid.switchDrawing(ActionType.DRAW_RAINBOW);
});

// Cleaning all paper
clearButton.addEventListener('click', () => {
  grid.clear();
});

// Changing color of drawing
colorInput.addEventListener('input', () => {
  grid.changeColor(colorInput.value);
});

// Opening popup
openPopupButton.addEventListener('click', () => {
  togglePopup(popup);
});

takePictureButton.addEventListener('click', () => {
  html2canvas(gridElement);
  console.log('hello');
});


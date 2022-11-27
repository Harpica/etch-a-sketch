function openPopup(popup: HTMLElement): void {
  document.addEventListener('keydown', closePopupWithEsc);
  popup.classList.add('popup_opened');
}

function closePopup(popup: HTMLElement): void {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened') as HTMLElement;
    closePopup(popup);
  }
}

function togglePopup(popup: HTMLElement): void {
  if (popup.classList.contains('popup_opened')) {
    closePopup(popup);
  } else {
    openPopup(popup);
  }
}

export {openPopup, closePopup, togglePopup};

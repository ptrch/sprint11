import "./pages/index.css";

import Api from "./modules/Api.js";
import Card from "./modules/Card.js";
import CardList from "./modules/CardList.js";
import FormValidator from "./modules/FormValidator.js";
import Popup from "./modules/Popup.js";
import CardPopup from "./modules/CardPopup.js";
import AvatarPopup from "./modules/AvatarPopup.js";
import PopupZoom from "./modules/PopupZoom.js";
import UserInfo from "./modules/UserInfo.js";


(function () {
    const errorMessages = {
      valueMissing: 'Это обязательное поле',
      tooShort: 'Должно быть от 2 до 30 символов',
      tooLong: 'Должно быть от 2 до 30 символов',
      typeMismatch: 'Здесь должна быть ссылка',
      wrongPattern: 'Введите данные в верном формате',};
      
    const root = document.querySelector('.root');
    const nameUser = document.querySelector('.user-info__name');
    const jobUser = document.querySelector('.user-info__job');
    const avatarUser = document.querySelector('.user-info__photo');
    const userId = document.querySelector('.user-info__id');
    const placeList = document.querySelector('.places-list');
    const popupAddPicture = document.querySelector('#popup_add_picture');
    const popupUser = document.querySelector('#popup_user');
    const popupZoom = document.querySelector('#popup-image');
    const popupAvatar = document.querySelector('#popup-avatar');
    const formAvatar = popupAvatar.querySelector('.popup__form');
    const formPicture = popupAddPicture.querySelector('.popup__form');
    const formName = popupUser.querySelector('.popup__form');
    const buttonUser = document.querySelector('.user-info__button_edit');
    const buttonOpenPicture = document.querySelector('.user-info__button');
    const buttonCloseName = popupUser.querySelector('.popup__close');
    const buttonClosePicture = popupAddPicture.querySelector(".popup__close");
    const popupCloseZoom = popupZoom.querySelector(".popup__close");
    const zoomImg = popupZoom.querySelector(".popup__image");
    const buttonCloseAvatar = popupAvatar.querySelector('.popup__close');
    const spinner = document.querySelector('.spinner')
   
    const api = new Api({
      baseUrl: (process.env.NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11/':'http://praktikum.tk/cohort11/'),
      headers: {
        authorization: '02faf49e-8665-4362-b0d5-360572450839',
        'Content-Type': 'application/json'
      }
    });
  
    api.getUser()
      .then(res => {
        spinner.classList.add("spinner_visible");
        nameUser.textContent = res.name;
        jobUser.textContent = res.about;
        userId.setAttribute('user-id', res._id);
        avatarUser.style.backgroundImage = `url(${res.avatar})`;      
      })
      .catch((err) => alert(err));
  
    api.getCards()
      .then(res => {
        placeList.classList.add("places-list_hidden");
        const createCard = (...arg) => new Card(...arg, openZoom, api, userId);
        const cardList = new CardList(placeList, res.map(item => ({
          name: item.name,
          link: item.link,
          likes: item.likes,
          idCard: item._id,
          idUser: item.owner._id
        })), createCard);
        const newCard = new CardPopup(buttonOpenPicture, buttonClosePicture, popupAddPicture, root, formPicture, cardList, createCard, api)
        newCard.setEventListeners();
        
        const validatorNewCard = new FormValidator(formPicture, errorMessages, newCard);
        validatorNewCard.setEventListeners();
        cardList.render();
      })
      .catch(err => alert(err))
      .finally(() => {
        spinner.classList.remove("spinner_visible");
        placeList.classList.remove("places-list_hidden");
      });
    
    const openZoom = new PopupZoom({
      open: placeList, 
      close: popupCloseZoom,
      zoomImg: zoomImg,
      namePopup: popupZoom,
      container: document
    });
  
    const popupUserClass = new Popup(buttonUser, buttonCloseName, popupUser, root);
    
    popupUserClass.setEventListeners();
  
    const user = new UserInfo(nameUser, jobUser, formName, popupUserClass, api)
    user.setEventListeners();
  
    const chAvatar = new AvatarPopup(avatarUser, buttonCloseAvatar, popupAvatar, document, formAvatar, api);
    chAvatar.setEventListeners();
  
    openZoom.setEventListeners();
  
    const validator = new FormValidator(formName, errorMessages, popupUserClass);
    validator.setEventListeners();
  
    const validatorAvatar = new FormValidator(formAvatar, errorMessages, chAvatar);
    validatorAvatar.setEventListeners(); 
  })();
  

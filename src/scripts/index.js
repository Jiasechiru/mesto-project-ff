import '../pages/index.css';
import {openModal, closeModal} from './components/modal';
import {createCard} from './components/card';
import {cardLike, deleteCard} from './components/card';
import {enableValidation, clearValidation} from './components/validation';
import { getUserInfo, getCards, patchUserInfo, postNewCard, patchAvatar } from './components/api';


const cardsList = document.querySelector(".places__list");


const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");

const editProfileButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');

const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

editProfileButton.addEventListener("click", editProfileHandler)
profileAddButton.addEventListener("click", addCardHandler)
profileImage.addEventListener("click", changeAvatarHandler)

document.forms['edit-profile'].addEventListener('submit', submitEditProfileHandler);
document.forms['new-place'].addEventListener("submit", submitAddCardHandler);
document.forms['change-avatar'].addEventListener("submit", submitChangeAvatarHandler);


function changeAvatarHandler (e) {
    e.preventDefault()
    openModal(popupTypeAvatar);
}

function submitChangeAvatarHandler (e) {
    e.preventDefault()
    e.target.querySelector(".popup__button").textContent = "Сохранение...";
    const avatarLink = e.target.elements.link.value;
    patchAvatar(avatarLink).then(() => {
        closeModal(popupTypeAvatar)
        e.target.querySelector(".popup__button").textContent = "Сохранить";
        clearValidation(e.target, validationConfig);
        e.target.reset();
    })
    .catch((err) => {
        console.log(err);
    }); 
    profileImage.style.backgroundImage = `url(${avatarLink})`;
}

function editProfileHandler (e) {
    openModal(popupTypeEdit)
    const form = document.forms['edit-profile'];
    form.elements.name.value = profileTitle.textContent;
    form.elements.description.value = profileDescription.textContent;
    clearValidation(form, validationConfig)
}

function submitEditProfileHandler (e){
    e.target.querySelector(".popup__button").textContent = "Сохранение...";
    e.preventDefault();
    patchUserInfo(e.target.elements.name.value, e.target.elements.description.value).then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        e.target.querySelector(".popup__button").textContent = "Сохранить";
        closeModal(popupTypeEdit);
    })
    .catch((err) => {
        console.log(err);
    });
}


function addCardHandler(e){
    openModal(popupTypeNewCard)
}

function submitAddCardHandler (e) {
    e.preventDefault();
    e.target.querySelector(".popup__button").textContent = "Сохранение...";
    postNewCard(e.target.elements['place-name'].value, e.target.elements.link.value).then((card) => {
        renderCard(card)
        e.target.querySelector(".popup__button").textContent = "Сохранить";
        closeModal(popupTypeNewCard);
    })
    .catch((err) => {
        console.log(err);
    }); 
    e.target.reset();
    clearValidation(e.target, validationConfig)
}


function cardImgHandler (e) {
    popupImage.setAttribute("src", e.target.src);
    popupImage.setAttribute("alt", e.target.alt);
    popupCaption.textContent = e.target.alt;
    openModal(popupTypeImage)
}


popupCloseButtons.forEach((button) => { 
    const popup = button.closest('.popup');
    button.addEventListener('click', (e) => closeModal(popup));
});

function renderCard(item, method = "prepend") {
    const cardElement = createCard(item, {cardLike, cardImgHandler, deleteCard});
    cardsList[ method ](cardElement);
}

enableValidation(validationConfig); 

export let userId = "";

Promise.all([getUserInfo(), getCards()])
.then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    cards.forEach(item => {
        renderCard(item, "append");
    });
})
.catch((err) => {
    console.log(err);
});

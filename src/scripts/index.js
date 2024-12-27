import '../pages/index.css';
import avatar from '../images/avatar.jpg';
import {initialCards} from './components/cards';
import {openModal, closeModal} from './components/modal';
import {createCard} from './components/card';
import {cardLike, deleteCard} from './components/card';

document.querySelector(".profile__image").style.backgroundImage = `url(${avatar})`;

const cardsList = document.querySelector(".places__list");


const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const editProfileButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

editProfileButton.addEventListener("click", editProfileHandler)
profileAddButton.addEventListener("click", addCardHandler)

document.forms['edit-profile'].addEventListener('submit', submitEditProfileHandler);
document.forms['new-place'].addEventListener("submit", submitAddCardHandler);


function editProfileHandler (e) {
    openModal(popupTypeEdit)
    const form = document.forms['edit-profile'];
    form.elements.name.value = profileTitle.textContent;
    form.elements.description.value = profileDescription.textContent;
}

function submitEditProfileHandler (e){
    e.preventDefault();
    profileTitle.textContent = e.target.elements.name.value;
    profileDescription.textContent = e.target.elements.description.value;
    closeModal(popupTypeEdit);
}


function addCardHandler(e){
    openModal(popupTypeNewCard)
}

function submitAddCardHandler (e) {
    e.preventDefault();
    renderCard({link: e.target.elements.link.value, name: e.target.elements['place-name'].value})
    e.target.reset();
    closeModal(popupTypeNewCard);
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


initialCards.map((item) => {
    renderCard(item, "append");
})

function renderCard(item, method = "prepend") {
    const cardElement = createCard(item, {cardLike, cardImgHandler, deleteCard});
    cardsList[ method ](cardElement);
}
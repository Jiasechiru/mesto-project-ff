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

const popupCloseButton = document.querySelectorAll(".popup__close");

editProfileButton.addEventListener("click", editProfileHendler)
profileAddButton.addEventListener("click", addCardHendler)

function editProfileHendler (e) {
    openModal(popupTypeEdit)
    const form = document.forms['edit-profile'];
    form.elements.name.value = document.querySelector('.profile__title').textContent;
    form.elements.description.value = document.querySelector('.profile__description').textContent;
    form.addEventListener('submit', submitEditProfileHendler); 
}

function submitEditProfileHendler (e){
    e.preventDefault();
    document.querySelector('.profile__title').textContent = e.target.elements.name.value;
    document.querySelector('.profile__description').textContent = e.target.elements.description.value;
    e.target.removeEventListener("submit", submitEditProfileHendler)
    closeModal(popupTypeEdit);
}


function addCardHendler(e){
    openModal(popupTypeNewCard)
    const addForm = document.forms['new-place'];
    addForm.addEventListener("submit", submitAddCardHendler)
}

function submitAddCardHendler (e) {
    e.preventDefault();
    document.querySelector(".places__list").prepend(createCard({link: e.target.elements.link.value, name: e.target.elements['place-name'].value}, cardLike, cardImgHendler, deleteCard));
    e.target.removeEventListener("submit", submitAddCardHendler)
    e.target.reset();
    closeModal(popupTypeNewCard);
}


export function cardImgHendler (e) {
    document.querySelector('.popup__image').setAttribute("src", e.target.src);
    document.querySelector('.popup__caption').textContent = e.target.alt;
    openModal(popupTypeImage)
}


popupCloseButton.forEach(button => {
    button.addEventListener("click", (e) => {
        closeModal(document.querySelector(".popup_is-opened"))
    });
});


initialCards.map((item) => {
    cardsList.append(createCard(item, cardLike, cardImgHendler, deleteCard));
})

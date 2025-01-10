import {userId} from '../index';
import { deleteCardServer, deleteLike, putLike } from './api';

const cardTemplate = document.querySelector("#card-template").content;

export function createCard (cardData, handlers) {

    const newCard = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = newCard.querySelector(".card__image");
    const likeButton = newCard.querySelector(".card__like-button");
    const cardLikeCount = newCard.querySelector(".card__like-count");
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    newCard.querySelector(".card__title").textContent = cardData.name;
    newCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
        deleteCardServer(cardData._id).catch((err) => {
            console.log(err);
        });
        deleteCard(e);
    });
    cardImg.addEventListener("click", handlers.cardImgHandler)
    likeButton.addEventListener("click", (e) => {
        e.preventDefault();
        handlers.cardLike(e);
        if(cardData.likes.find(user => user._id === userId)){
            deleteLike(cardData._id).then((result) => {
                cardLikeCount.textContent = result.likes.length
                cardData.likes = result.likes;
            })
            .catch((err) => {
                console.log(err);
            }); 
        }else{
            putLike(cardData._id).then((result) => {
                cardLikeCount.textContent = result.likes.length
                cardData.likes = result.likes;
            })
            .catch((err) => {
                console.log(err);
            }); 
        }
    })
    if(cardData.likes.find(user => user._id === userId)){
        likeButton.classList.add("card__like-button_is-active");
    }
    cardLikeCount.textContent = cardData.likes.length;
    const deleteButton = newCard.querySelector(".card__delete-button");
    if(cardData.owner._id !== userId){
        newCard.removeChild(deleteButton);
    }
    
    return newCard;
} 
  
export function cardLike(e) {
    e.target.classList.toggle("card__like-button_is-active");
}
  
export function deleteCard (e) {
    e.target.closest(".card").remove();
}
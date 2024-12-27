const cardTemplate = document.querySelector("#card-template").content;

export function createCard (cardData, cardLike, cardImgHendler, deleteCard) {

    const newCard = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = newCard.querySelector(".card__image");
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    newCard.querySelector(".card__title").textContent = cardData.name;
  
    newCard.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    newCard.querySelector(".card__image").addEventListener("click", cardImgHendler)
    newCard.querySelector(".card__like-button").addEventListener("click", cardLike)
    
    return newCard;
} 
  
export function cardLike(e) {
    e.target.classList.toggle("card__like-button_is-active");
}
  
export function deleteCard (e) {
    e.target.closest(".card").remove();
}
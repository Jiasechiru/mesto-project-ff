const cardTemplate = document.querySelector("#card-template").content;

const cardsList = document.querySelector(".places__list");

function createCard (cardData, deleteCard) {
    const newCard = cardTemplate.querySelector(".card").cloneNode(true);
    newCard.querySelector(".card__image").src = cardData.link;
    newCard.querySelector(".card__title").textContent = cardData.name;
    const cardButton = newCard.querySelector(".card__delete-button");
    cardButton.addEventListener("click", deleteCard);
    return newCard;
} 

function deleteCard (e) {
    e.target.closest(".card").remove();
}

initialCards.map((item) => {
    cardsList.append(createCard(item, deleteCard));
})

const key = '09bd2be3-701c-436b-a468-5ff8e0c4960c';
const baseUrl = 'https://nomoreparties.co/v1/cohort-mag-4/';

export function getUserInfo () {
    return fetch(`${baseUrl}users/me`, {
        headers: {
            authorization: key
        }
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function getCards() {
    return fetch(`${baseUrl}cards`, {
        headers: {
            authorization: key
        }
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function patchUserInfo (userName, userAbout) {
    return fetch(`${baseUrl}users/me`, {
        method: 'PATCH',
        headers: {
            authorization: key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            about: userAbout
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function postNewCard (cardName, cardLink) {
    return fetch(`${baseUrl}cards`, {
        method: 'POST',
        headers: {
            authorization: key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function deleteCardServer (cardId) {
    return fetch(`${baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: key
        }
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

export function putLike (cardId) {
    return fetch(`${baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: key
        }
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function deleteLike (cardId) {
    return fetch(`${baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: key
        }
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function patchAvatar (avatarLink){
    return fetch(`${baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink,
        })
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

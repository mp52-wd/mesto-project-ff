const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: 'd28c2bc0-f999-4f04-8141-69136ef663a6',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

// Загрузка информации о пользователе
function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// Загрузка карточек
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// Редактирование профиля
function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(checkResponse)
}

// Добавление новой карточки
function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(checkResponse)
}

// Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
}

// Постановка лайка
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse)
}

// Снятие лайка
function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
}

// Обновление аватара
function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then(checkResponse)
}

export {
  getUserInfo,
  getInitialCards,
  editProfile,
  addCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar
}

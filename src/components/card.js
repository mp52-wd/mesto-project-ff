import { likeCard, unlikeCard, deleteCard } from './api'

const templateNode = document.querySelector('#card-template').content

function getCardTemplate() {
	return templateNode.querySelector('.card').cloneNode(true)
}

function createCard(cardData, userId, handleImageClick, handleLike, handleDelete) {
	const cardElement = getCardTemplate()
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const likeButton = cardElement.querySelector('.card__like-button')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	const likeCount = cardElement.querySelector('.card__like-count')

	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardTitle.textContent = cardData.name

	// Лайки
	if (cardData.likes.some(like => like._id === userId)) {
		likeButton.classList.add('card__like-button_is-active')
	}
	likeCount.textContent = cardData.likes.length
	likeButton.addEventListener('click', (evt) => handleLike(evt, cardData, likeButton, likeCount))

	// Удаление
	if (cardData.owner._id === userId) {
		deleteButton.addEventListener('click', (evt) => handleDelete(evt, cardData, cardElement))
	} else {
		deleteButton.remove()
	}

	cardImage.addEventListener('click', () => handleImageClick(cardData))

	return cardElement
}

function removeCard(node) {
	if (node) {
		node.remove()
	}
}

function toggleLike(event) {
	if (event.target.classList.contains('card__like-button')) {
		event.target.classList.toggle('card__like-button_is-active')
	}
}

export { createCard, removeCard, toggleLike }

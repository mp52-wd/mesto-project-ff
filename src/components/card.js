import { likeCard, unlikeCard, deleteCard } from './api'

const templateNode = document.querySelector('#card-template').content

function createCard(cardData, handleImageClick, userId) {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const likeButton = cardElement.querySelector('.card__like-button')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	const likeCount = cardElement.querySelector('.card__like-count')

	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardTitle.textContent = cardData.name

	// Обработка лайков
	const isLiked = cardData.likes.some(like => like._id === userId)
	if (isLiked) {
		likeButton.classList.add('card__like-button_is-active')
	}

	likeCount.textContent = cardData.likes.length

	likeButton.addEventListener('click', () => {
		const isLiked = likeButton.classList.contains('card__like-button_is-active')
		const likeMethod = isLiked ? unlikeCard : likeCard

		likeMethod(cardData._id)
			.then((updatedCard) => {
				likeButton.classList.toggle('card__like-button_is-active')
				likeCount.textContent = updatedCard.likes.length
			})
			.catch((err) => {
				console.log(err)
			})
	})

	// Обработка удаления
	if (cardData.owner._id === userId) {
		deleteButton.addEventListener('click', () => {
			const confirmPopup = document.querySelector('.popup_type_confirm')
			const confirmForm = confirmPopup.querySelector('.popup__form')

			const handleConfirm = (evt) => {
				evt.preventDefault()
				deleteCard(cardData._id)
					.then(() => {
						cardElement.remove()
						hideModal(confirmPopup)
						confirmForm.removeEventListener('submit', handleConfirm)
					})
					.catch((err) => {
						console.log(err)
					})
			}

			confirmForm.addEventListener('submit', handleConfirm)
			showModal(confirmPopup)
		})
	} else {
		deleteButton.remove()
	}

	cardImage.addEventListener('click', () => {
		handleImageClick(cardData)
	})

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

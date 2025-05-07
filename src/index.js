import './pages/index.css'
import { createCard } from './components/card'
import { showModal, hideModal } from './components/modal'
import { enableValidation, clearValidation, validationConfig } from './components/validation'
import {
	getUserInfo,
	getInitialCards,
	editProfile,
	addCard,
	updateAvatar
} from './components/api'

// Включаем валидацию всех форм
enableValidation(validationConfig)

const cardContainer = document.querySelector('.places__list')
const profileImage = document.querySelector('.profile__image')
const profileNameEl = document.querySelector('.profile__title')
const profileDescEl = document.querySelector('.profile__description')

let userId = null

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
	.then(([userData, cards]) => {
		userId = userData._id
		profileNameEl.textContent = userData.name
		profileDescEl.textContent = userData.about
		profileImage.style.backgroundImage = `url(${userData.avatar})`

		cards.forEach(card => {
			const cardElement = createCard(card, handleImageClick, userId)
			cardContainer.append(cardElement)
		})
	})
	.catch((err) => {
		console.log(err)
	})

const modalImageView = document.querySelector('.popup_type_image')
const modalImage = modalImageView.querySelector('.popup__image')
const modalCaption = modalImageView.querySelector('.popup__caption')

function handleImageClick(data) {
	modalImage.src = data.link
	modalImage.alt = data.name
	modalCaption.textContent = data.name
	showModal(modalImageView)
}

// Редактирование профиля
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileEditModal = document.querySelector('.popup_type_edit')
const profileEditForm = document.forms['edit-profile']
const inputJob = profileEditForm.elements['description']
const inputName = profileEditForm.elements['name']

function submitProfileEdit(evt) {
	evt.preventDefault()
	const submitButton = profileEditForm.querySelector('.popup__button')
	submitButton.textContent = 'Сохранение...'

	editProfile(inputName.value, inputJob.value)
		.then((userData) => {
			profileNameEl.textContent = userData.name
			profileDescEl.textContent = userData.about
			hideModal(profileEditModal)
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

profileEditBtn.addEventListener('click', () => {
	inputName.value = profileNameEl.textContent
	inputJob.value = profileDescEl.textContent
	clearValidation(profileEditForm, validationConfig)
	showModal(profileEditModal)
})

profileEditForm.addEventListener('submit', submitProfileEdit)

// Редактирование аватара
const avatarEditModal = document.querySelector('.popup_type_avatar')
const avatarEditForm = document.forms['edit-avatar']
const inputAvatar = avatarEditForm.elements['avatar']

function submitAvatarEdit(evt) {
	evt.preventDefault()
	const submitButton = avatarEditForm.querySelector('.popup__button')
	submitButton.textContent = 'Сохранение...'

	updateAvatar(inputAvatar.value)
		.then((userData) => {
			profileImage.style.backgroundImage = `url(${userData.avatar})`
			hideModal(avatarEditModal)
			avatarEditForm.reset()
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

profileImage.addEventListener('click', () => {
	clearValidation(avatarEditForm, validationConfig)
	showModal(avatarEditModal)
})

avatarEditForm.addEventListener('submit', submitAvatarEdit)

// Добавление карточки
const addCardBtn = document.querySelector('.profile__add-button')
const cardForm = document.forms['new-place']
const cardModal = document.querySelector('.popup_type_new-card')
const inputPlaceName = cardForm.elements['place-name']
const inputLink = cardForm.elements['link']

function submitCardForm(evt) {
	evt.preventDefault()
	const submitButton = cardForm.querySelector('.popup__button')
	submitButton.textContent = 'Сохранение...'

	addCard(inputPlaceName.value, inputLink.value)
		.then((cardData) => {
			const cardElement = createCard(cardData, handleImageClick, userId)
			cardContainer.prepend(cardElement)
			cardForm.reset()
			hideModal(cardModal)
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

cardForm.addEventListener('submit', submitCardForm)
addCardBtn.addEventListener('click', () => {
	cardForm.reset()
	clearValidation(cardForm, validationConfig)
	showModal(cardModal)
})

// Обработка модальных окон
const allModals = document.querySelectorAll('.popup')

function enableModalAnimations() {
	allModals.forEach(modal => {
		modal.classList.add('popup_is-animated')
	})
}

allModals.forEach(modal => {
	modal.addEventListener('mousedown', evt => {
		if (evt.target === modal || evt.target.classList.contains('popup__close')) {
			hideModal(modal)
		}
	})
})

document.addEventListener('DOMContentLoaded', enableModalAnimations)

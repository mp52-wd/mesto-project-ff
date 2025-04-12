import './pages/index.css'
import { initialCards } from './components/cards'
import { generateCard, removeCard, toggleLike } from './components/card'
import { showModal, hideModal } from './components/modal'

const cardContainer = document.querySelector('.places__list')

initialCards.forEach(item => {
	const card = generateCard(item, removeCard, toggleLike, handleImageClick)
	cardContainer.append(card)
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

const profileEditBtn = document.querySelector('.profile__edit-button')
const profileEditModal = document.querySelector('.popup_type_edit')
const profileEditForm = document.forms['edit-profile']
const inputJob = profileEditForm.elements['description']
const inputName = profileEditForm.elements['name']
const profileNameEl = document.querySelector('.profile__title')
const profileDescEl = document.querySelector('.profile__description')

function submitProfileEdit(evt) {
	evt.preventDefault()

	profileNameEl.textContent = inputName.value
	profileDescEl.textContent = inputJob.value

	hideModal(profileEditModal)
}

profileEditBtn.addEventListener('click', () => {
	inputName.value = profileNameEl.textContent
	inputJob.value = profileDescEl.textContent
	showModal(profileEditModal)
})

profileEditForm.addEventListener('submit', submitProfileEdit)

const addCardBtn = document.querySelector('.profile__add-button')
const cardForm = document.forms['new-place']
const cardModal = document.querySelector('.popup_type_new-card')
const inputPlaceName = cardForm.elements['place-name']
const inputLink = cardForm.elements['link']

function submitCardForm(evt) {
	evt.preventDefault()

	const cardData = { name: inputPlaceName.value, link: inputLink.value }
	cardContainer.prepend(
		generateCard(cardData, removeCard, toggleLike, handleImageClick)
	)
	cardForm.reset()
	hideModal(cardModal)
}

cardForm.addEventListener('submit', submitCardForm)
addCardBtn.addEventListener('click', () => {
	showModal(cardModal)
})

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

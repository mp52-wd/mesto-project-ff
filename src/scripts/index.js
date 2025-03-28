const template = document.querySelector('#card-template')
const listContainer = document.querySelector('.places__list')

initialCards.forEach(item => {
	listContainer.append(generateCard(item, removeCard))
})

function generateCard(data, removeHandler) {
	const cardElement = document.importNode(template.content, true).querySelector('.card')
	const imageElement = cardElement.querySelector('.card__image')
	const titleElement = cardElement.querySelector('.card__title')
	const deleteBtn = cardElement.querySelector('.card__delete-button')

	imageElement.src = data.link
	imageElement.alt = `Изображение: ${data.name}`
	titleElement.textContent = data.name

	deleteBtn.addEventListener('click', () => removeHandler(cardElement))

	return cardElement
}

function removeCard(card) {
	card.remove()
}

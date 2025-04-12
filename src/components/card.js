const templateNode = document.querySelector('#card-template').content

function generateCard(data, handleDelete, handleLike, handlePreview) {
	const card = templateNode.querySelector('.card').cloneNode(true)
	const title = card.querySelector('.card__title')
	const image = card.querySelector('.card__image')
	const deleteBtn = card.querySelector('.card__delete-button')
	const likeBtn = card.querySelector('.card__like-button')

	title.textContent = data.name
	image.src = data.link
	image.alt = data.name

	deleteBtn.addEventListener('click', () => handleDelete(card))
	likeBtn.addEventListener('click', handleLike)
	image.addEventListener('click', () => handlePreview(data))

	return card
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

export { generateCard, removeCard, toggleLike }

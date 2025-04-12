function showModal(modalElement) {
	modalElement.classList.add('popup_is-opened')
	document.addEventListener('keydown', onEscapeClose)
}

function hideModal(modalElement) {
	modalElement.classList.remove('popup_is-opened')
	document.removeEventListener('keydown', onEscapeClose)
}

function onEscapeClose(event) {
	if (event.key === 'Escape') {
		const openedModal = document.querySelector('.popup_is-opened')
		if (openedModal) {
			hideModal(openedModal)
		}
	}
}

export { showModal, hideModal }

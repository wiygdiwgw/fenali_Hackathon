export const getLocalStorage = () => {
	const viewed = JSON.parse(localStorage.getItem('viewed'))
	return viewed
}

export const calcTotalPrice = products => {
	const totalPrice = products.reduce((acc, curr) => (acc += curr.subPrice), 0)
	return totalPrice
}

export const calcSubPrice = product => {
	return +product.item.price * product.count
}

export const getProductsCountInViewed = () => {
	let viewed = getLocalStorage()
	return viewed && viewed.products ? viewed.products.length : viewed
}

export const getProductsInFavorite = () => {
	let favorite = getLocalStorage()
	return favorite && favorite.products ? favorite.products.length : 0
}
export const getLocalStorageFav = () => {
	const favorite = JSON.parse(localStorage.getItem('favorite'))
	return favorite
}

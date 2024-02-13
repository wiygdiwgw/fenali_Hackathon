import React, { createContext, useContext, useReducer } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, API } from '../../helpers/const'

const productContext = createContext()
export const useProducts = () => useContext(productContext)

const INIT_STATE = {
	products: [],
	oneProduct: {},
	genres: [],
	pages: 1,
}

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ACTIONS.GET_PRODUCTS:
			return { ...state, products: action.payload.results }
		case ACTIONS.GET_ONE_PRODUCT:
			return { ...state, oneProduct: action.payload }
		case ACTIONS.GET_GENRE:
			return { ...state, genre: action.payload }
		default:
			return state
	}
}

const ProductContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE)
	const navigate = useNavigate()

	// //! Config
	const getConfig = () => {
		const tokens = JSON.parse(localStorage.getItem('tokens'))
		if (!tokens || !tokens.access) {
			return null
		}
		const Authorization = `Bearer ${tokens.access}`
		const config = {
			headers: { Authorization },
		}
		return config
	}

	//! CREATE
	const createProduct = async newProduct => {
		try {
			await axios.post(`${API}/movie/`, newProduct, getConfig())
			getProducts()
		} catch (error) {
			console.log(error)
		}
	}

	//! GENRE
	const getGenres = async () => {
		const res = await axios(`${API}/genre/`, getConfig())
		dispatch({
			type: ACTIONS.GET_GENRE,
			payload: res.data.results,
		})
	}

	//! Add Genres
	const addGenres = async newGenre => {
		await axios.post(`${API}/genre/`, newGenre, getConfig())
	}

	//! GET
	const getProducts = async () => {
		try {
			const { data } = await axios(
				`${API}/movie/${window.location.search}`,
				getConfig()
			)
			dispatch({
				type: ACTIONS.GET_PRODUCTS,
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	//! DELETE
	const deleteProducts = async id => {
		try {
			await axios.delete(`${API}/movie/${id}/`, getConfig())
			getProducts()
		} catch (error) {
			console.log(error)
		}
	}

	//! GET ONE PRODUCT
	const getOneProduct = async id => {
		try {
			const { data } = await axios(`${API}/movie/${id}/`, getConfig())
			dispatch({
				type: ACTIONS.GET_ONE_PRODUCT,
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	//! EDIT
	const editItem = async (id, newProduct) => {
		try {
			await axios.patch(`${API}/movie/${id} /`, newProduct)
			navigate('/products')
		} catch (error) {
			console.log(error)
		}
	}

	const values = {
		genres: state.genres,
		getGenres,
		createProduct,
		getProducts,
		products: state.products,
		pages: state.pages,
		deleteProducts,
		getOneProduct,
		oneProduct: state.oneProduct,
		editItem,
		addGenres,
	}
	return (
		<productContext.Provider value={values}>{children}</productContext.Provider>
	)
}

export default ProductContextProvider

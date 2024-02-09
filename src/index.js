import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './components/context/AuthContextProvider'
import ProductContextProvider from './components/context/ProductContextProvider'
import ViewedContextProvider from './components/context/ViewedContextProvider'
import FavoriteContextProvider from './components/context/FavoriteContextProvider'
import CommentContextProvider from './components/context/CommentContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<ProductContextProvider>
			<AuthContextProvider>
				<ViewedContextProvider>
					<FavoriteContextProvider>
						<CommentContextProvider>
							<App />
						</CommentContextProvider>
					</FavoriteContextProvider>
				</ViewedContextProvider>
			</AuthContextProvider>
		</ProductContextProvider>
	</BrowserRouter>
)

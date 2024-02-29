import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from "../appHeader/Layout.jsx";
import { MainPage, ComicsPage, SingleComicPage } from '../pages'
import Page404 from "../pages/404.jsx";

const App = () => {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout/>}>
					<Route index element={<MainPage/>}/>
					<Route path="comics" element={<ComicsPage/>}/>
					<Route path="comics/:comicId" element={<SingleComicPage/>}/>
					<Route path="*" element={<Page404/>}/>
				</Route>
			</Routes>
		</Router>
	)
}

export default App;
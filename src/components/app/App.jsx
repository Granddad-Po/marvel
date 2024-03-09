import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from "../appHeader/Layout.jsx";
import Spinner from "../spinner/Spinner.jsx";

const Page404 = lazy(() => import('../pages/404.jsx'))
const ComicsPage = lazy(() => import('../pages/ComicsPage.jsx'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage.jsx'))
const SingleCharPage = lazy(() => import('../pages/SingleCharPage.jsx'))
const MainPage = lazy(() => import('../pages/MainPage.jsx'))

const App = () => {

	return (
		<Router>
			<Suspense fallback={<Spinner/>}>
				<Routes>
					<Route path="/" element={<Layout/>}>
						<Route index element={<MainPage/>}/>
						<Route path="comics" element={<ComicsPage/>}/>
						<Route path="comics/:comicId" element={<SingleComicPage/>}/>
						<Route path="character/:charId" element={<SingleCharPage/>} />
						<Route path="*" element={<Page404/>}/>
					</Route>
				</Routes>
			</Suspense>
		</Router>
	)
}

export default App;
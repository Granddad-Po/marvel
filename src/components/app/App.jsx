import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from "../appHeader/Layout.jsx";
import Spinner from "../spinner/Spinner.jsx";
import { ComicsPage, MainPage, SinglePage, SingleComicLayout, SingleCharLayout } from "../pages/index.js";

const Page404 = lazy(() => import('../pages/404.jsx'))
// const MainPage = lazy(() => import('../pages/MainPage.jsx'))
// const ComicsPage = lazy(() => import('../pages/ComicsPage.jsx'))
// const SinglePage = lazy(() => import('../pages/SinglePage.jsx'))
// const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout.jsx'))
// const SingleCharLayout = lazy(() => import('../pages/singleCharLayout/SingleCharLayout.jsx'))

const App = () => {

	return (
		<Router>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path="comics" element={<ComicsPage />} />
						<Route path="comics/:id"
							   element={<SinglePage Component={SingleComicLayout} dataType="comic" />} />
						<Route path="character/:id"
							   element={<SinglePage Component={SingleCharLayout} dataType="character" />} />
						<Route path="*" element={<Page404 />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	)
}

export default App;
import AppBanner from "../appBanner/AppBanner.jsx";
import ComicsList from "../comicsList/ComicsList.jsx";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Page with list to our comics"
				/>
				<title>Our Comics</title>
			</Helmet>
			<AppBanner/>
			<ComicsList/>
		</>
	);
};

export default ComicsPage;
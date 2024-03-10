import ErrorMessage from "../error/ErrorMessage.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Page404 = () => {
	return (
		<div>
			<Helmet>
				<meta
					name="description"
					content="Page not found"
				/>
				<title>Page not found</title>
			</Helmet>
			<ErrorMessage/>
			<h2>Sorry, this page is not found.</h2>
			<Link to="/">Back to Main page</Link>
		</div>
	);
};

export default Page404;
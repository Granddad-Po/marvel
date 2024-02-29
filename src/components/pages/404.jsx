import ErrorMessage from "../error/ErrorMessage.jsx";
import { Link } from "react-router-dom";

const Page404 = () => {
	return (
		<div>
			<ErrorMessage/>
			<h2>Sorry, this page is not found.</h2>
			<Link to="/">Back to Main page</Link>
		</div>
	);
};

export default Page404;
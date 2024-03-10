import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService.js";

import AppBanner from "../appBanner/AppBanner.jsx";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";

const SinglePage = ({Component, dataType}) => {
	const {id} = useParams()
	const [data, setData] = useState(null)
	const {loading, error, clearError, getCharacter, getComic} = useMarvelService()

	useEffect(() => {
		updateData()
	}, [id]);

	const updateData = () => {
		clearError()

		switch (dataType) {
			case 'comic':
				getComic(id).then(onDataLoaded)
				break
			case 'character':
				getCharacter(id).then(onDataLoaded)
		}
	}

	const onDataLoaded = (data) => {
		setData(data)
	}

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || error || !data) ? <Component data={data} /> : null

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

export default SinglePage;
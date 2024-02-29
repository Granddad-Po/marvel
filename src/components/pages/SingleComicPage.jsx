import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService.js";

import AppBanner from "../appBanner/AppBanner.jsx";

import './singleComic.scss';
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";

const SingleComicPage = () => {

	const {comicId} = useParams()
	const [comic, setComic] = useState(null)
	const {loading, error, getComic, clearError} = useMarvelService()

	useEffect(() => {
		return () => {
			updateComic(comicId)
		}
	}, [comicId]);
	const updateComic = (id) => {
		clearError()
		getComic(id)
			.then(comicLoaded)
	}

	const comicLoaded = (data) => {
		setComic(data)
	}

	const spinner = loading ? <Spinner/> : null
	const errorMessage = error ? <ErrorMessage/> : null
	const content = !error && !loading && comic ? <View comic={comic}/> : null

	return (
		<>
			<AppBanner/>
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

const View = ({comic}) => {
	const {title, description, pageCount, language, price, thumbnail} = comic

	return (
		<div className="single-comic">
			<img src={thumbnail} alt={title} className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}$</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</div>
	)
}

export default SingleComicPage;
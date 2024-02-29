import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService.js";

import AppBanner from "../appBanner/AppBanner.jsx";

import './singleComic.scss';
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";

const SingleComicPage = () => {

	const {comicId} = useParams()
	const [comic, setComic] = useState({})
	const {loading, error, getComic} = useMarvelService()

	useEffect(() => {
		return () => {
			onRequest(comicId)
		}
	}, [comicId]);
	const onRequest = (id) => {
		const comic = getComic(id)
			.then(comicLoaded)
	}

	const comicLoaded = (data) => {
		setComic(data)
	}

	const spinner = loading ? <Spinner/> : null
	const errorMessage = error ? <ErrorMessage/> : null

	return (
		<>
			<AppBanner/>
			{spinner}
			{errorMessage}
			{!(spinner && errorMessage) &&
				<div className="single-comic">
					<img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
					<div className="single-comic__info">
						<h2 className="single-comic__name">{comic.title}</h2>
						<p className="single-comic__descr">{comic.description}</p>
						<p className="single-comic__descr">{comic.pageCount}</p>
						<p className="single-comic__descr">Language: en-us</p>
						<div className="single-comic__price">{comic.price}$</div>
					</div>
					<Link to="/comics" className="single-comic__back">Back to all</Link>
				</div>
			}
		</>
	);
};

export default SingleComicPage;
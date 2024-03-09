import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";

import './charPage.scss'


const CharPage = () => {
	const {charId} = useParams()
	const [char, setChar] = useState({})
	const {loading, error, getCharacter} = useMarvelService()

	useEffect(() => {
		getCharacter(charId)
			.then(onCharLoaded)
	}, []);

	const onCharLoaded = (char) => {
		setChar(char)
	}

	const spinner = loading ? <Spinner /> : null
	const errorMessage = error ? <ErrorMessage /> : null
	const content = !(loading && error) ? <View char={char} /> : null

	return (
		<>
			{spinner}
			{errorMessage}
			{content}
		</>
	);
};

const View = ({char}) => {
	const {name, description, thumbnail} = char

	return (
		<div className="single-char">
			<img src={thumbnail} alt={name} className="single-char__img" />
			<div className="single-char__info">
				<h2 className="single-char__name">{name}</h2>
				<p className="single-char__descr">{description}</p>
			</div>
			<Link to="/" className="single-char__back">Back to all</Link>
		</div>
	)
}

export default CharPage;
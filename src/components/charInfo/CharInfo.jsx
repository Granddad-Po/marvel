import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService.js";

import ErrorMessage from "../error/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";

import './charInfo.scss';

const CharInfo = ({charId}) => {
	const {loading, error, getCharacter, clearError} = useMarvelService()
	const [char, setChar] = useState(null)

	useEffect(() => {
		updateChar()
	}, []);

	useEffect(() => {
		updateChar(charId)
	}, [charId]);

	const updateChar = () => {
		if (!charId) {
			return
		}

		clearError()
		getCharacter(charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(char)
	}

	const skeleton = !(error || loading || char) ? <Skeleton/> : null
	const errorMessage = error ? <ErrorMessage/> : null
	const spinner = loading ? <Spinner/> : null
	const content = !(error || loading || !char) ? <View char={char}/> : null

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char

	let imgStyle = {'objectFit': 'cover'}
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = {'objectFit': 'contain'}
	}

	let comicItems
	if (comics.length === 0) {
		comicItems = 'There are currently no comics for this character found.'
	} else {
		comicItems = comics.slice(0, 10).map((item, i) => {
			return (
				<li key={i} className="char__comics-item">
					<Link to={`comics/${item.resourceURI.match(/\/(\d+)$/)[1]}`}>
						{item.name}
					</Link>
				</li>
			)
		})
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicItems}
			</ul>
		</>
	)
}

export default CharInfo;
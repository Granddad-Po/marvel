import { useEffect, useState } from "react";

import Error from "../error/Error.jsx";
import Spinner from "../spinner/Spinner.jsx";
import MarvelService from "../../services/MarvelService.js";

import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton.jsx";

const CharInfo = ({charId}) => {
	const [state, setState] = useState({
		char: null,
		loading: false,
		error: false
	})

	useEffect(() => {
		updateChar()
	}, []);

	useEffect(() => {
		updateChar(charId)
	}, [charId]);

	const marvelService = new MarvelService()

	const updateChar = () => {
		if (!charId) {
			return
		}

		onCharLoading()

		marvelService
			.getCharacter(charId)
			.then(onCharLoaded)
			.catch(onError)
	}

	const onCharLoaded = (char) => {
		setState({
			char,
			loading: false,
			error: false
		})
	}

	const onCharLoading = () => {
		setState(state => ({
			...state,
			loading: true
		}))
	}

	const onError = () => {
		setState(state => ({
			...state,
			error: true,
			loading: false
		}))
	}

	const {char, loading, error} = state

	const skeleton = !(error || loading || char) ? <Skeleton/> : null
	const errorMessage = error ? <Error/> : null
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

	const descriptionPlaceholder = description ? description : 'This character doesn\'t have a description yet.'
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
					{item.name}
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
				{descriptionPlaceholder}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicItems}
			</ul>
		</>
	)
}

export default CharInfo;
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService.js";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from "../spinner/Spinner.jsx";
import Error from "../error/Error.jsx";


const RandomChar = () => {

	const [char, setChar] = useState({})
	const {loading, error, getCharacter, clearError} = useMarvelService()

	useEffect(() => {
		updateChar()
	}, []);

	const updateChar = () => {
		clearError()
		const id = Math.round(Math.random() * (1011400 - 1011000) + 1011000)
		getCharacter(id)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(char)
	}

	const spinner = loading ? <Spinner/> : null
	const errorMessage = error ? <Error/> : null
	const content = !(loading || error) ? <View char={char}/> : null

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br/>
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button className="button button__main" onClick={updateChar}>
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	)
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki} = char
	const imgSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	const heroImg = thumbnail === imgSrc ? {objectFit: 'contain'} : null
	const descriptionPlaceholder = description ? description : 'This character doesn\'t have a description yet.'

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" style={heroImg}/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{descriptionPlaceholder}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;
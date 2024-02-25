import { useEffect, useRef, useState } from "react";

import useMarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import Error from "../error/Error.jsx";

import './charList.scss';

const CharList = ({onCharSelected}) => {
	const {loading, error, getAllCharacters} = useMarvelService()
	const [chars, setChars] = useState([])
	const [offset, setOffset] = useState(210)
	const [newItemLoading, setNewItemLoading] = useState(false)
	const [charEnded, setCharEnded] = useState(false)

	useEffect(() => {
		return () => {
			onRequest(offset, true)
		}
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true)
		getAllCharacters(offset)
			.then(onCharListLoaded)
	}

	const onCharListLoaded = (newChars) => {
		let ended = false
		if (newChars.length < 9) {
			ended = true
		}

		setChars(chars => [...chars, ...newChars])
		setNewItemLoading(false)
		setOffset(offset => offset + 9)
		setCharEnded(ended)
	}

	const charRefs = useRef([])

	const onFocusChar = (i) => {
		charRefs.current.forEach(item => {
			item.classList.remove('char__item_selected')
		})
		charRefs.current[i].classList.add('char__item_selected')
		charRefs.current[i].focus()
	}

	const renderItems = (charList) => {
		const items = charList.map(({id, name, thumbnail}, i) => {
			let imgStyle = {'objectFit': 'cover'}
			if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit': 'contain'}
			}

			return (
				<li
					className="char__item"
					key={id}
					ref={el => charRefs.current[i] = el}
					tabIndex={0}
					onClick={() => {
						onCharSelected(id)
						onFocusChar(i)
					}}
					onKeyDown={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							e.preventDefault()
							onFocusChar(i)
							onCharSelected(id)
						}
					}}
				>
					<img src={thumbnail} alt={name} style={imgStyle}/>
					<div className="char__name">{name}</div>
				</li>
			)
		})

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}

	const items = renderItems(chars)

	const errorMessage = error ? <Error/> : null
	const spinner = loading && !newItemLoading ? <Spinner/> : null

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				className='button button__main button__long'
				style={{'display': charEnded ? 'none' : 'block'}}
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default CharList;
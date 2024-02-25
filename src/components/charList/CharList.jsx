import { useEffect, useRef, useState } from "react";

import MarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import Error from "../error/Error.jsx";

import './charList.scss';

const CharList = ({onCharSelected}) => {
	const [state, setState] = useState({
		chars: [],
		loading: true,
		error: false,
		offset: 210,
		newItemLoading: false,
		charEnded: false
	})

	useEffect(() => {
		return () => {
			onRequest()
		}
	}, []);


	const marvelService = new MarvelService()

	// componentWillUnmount()
	// {
	// 	this.onRequest()
	// }
	//
	// componentDidMount()
	// {
	// 	this.onRequest()
	// }

	const onRequest = (offset) => {
		onCharListLoading()
		marvelService
			.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError)
	}

	const onCharListLoading = () => {
		setState(state => ({
			...state,
			newItemLoading: true
		}))
	}

	const onCharListLoaded = (newChars) => {
		let ended = false
		if (newChars.length < 9) {
			ended = true
		}

		setState(state => ({
			...state,
			chars: [...state.chars, ...newChars],
			loading: false,
			newItemLoading: false,
			offset: state.offset + 9,
			charEnded: ended
		}))
	}

	const onError = () => {
		setState(state => ({
			...state,
			loading: false,
			error: true
		}))
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

	const {chars, loading, error, newItemLoading, offset, charEnded} = state

	const items = renderItems(chars)

	const errorMessage = error ? <Error/> : null
	const spinner = loading ? <Spinner/> : null
	const content = !(loading || error) ? items : null

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{content}
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
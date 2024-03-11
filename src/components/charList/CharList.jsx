import { useEffect, useMemo, useRef, useState } from "react";

import useMarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />
		case 'loading':
			return newItemLoading ? <Component /> : <Spinner />
		case 'confirmed':
			return <Component />
		case 'error':
			return <ErrorMessage />
		default:
			throw Error('Unexpected process state')
	}
}

const CharList = ({onCharSelected}) => {
	const {process, setProcess, getAllCharacters} = useMarvelService()
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
			.then(() => setProcess('confirmed'))
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
				<CSSTransition timeout={500} classNames="char__item" key={id}>
					<li
						className="char__item"
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
						<img src={thumbnail} alt={name} style={imgStyle} />
						<div className="char__name">{name}</div>
					</li>
				</CSSTransition>
			)
		})

		return (
			<ul className="char__grid">
				<TransitionGroup component={null}>
					{items}
				</TransitionGroup>
			</ul>
		)
	}

	const elements = useMemo(() => {
		return setContent(process, () => renderItems(chars), newItemLoading)
	}, [process])

	return (
		<div className="char__list">
			{elements}
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
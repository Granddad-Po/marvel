import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService.js";

import './comicsList.scss';
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ComicsList = () => {

	const [comics, setComics] = useState([])
	const [offset, setOffset] = useState(1200)
	const [loadingNewComics, setLoadingNewComics] = useState(false)
	const {loading, error, getAllComics} = useMarvelService()

	useEffect(() => {
		return () => {
			onRequestNewComics(offset, true)
		}
	}, []);

	const onComicListLoaded = (newComicsArray) => {
		setComics(comics => [...comics, ...newComicsArray])
		setOffset(offset => offset + 8)
		setLoadingNewComics(false)
	}

	const onRequestNewComics = (offset, initial) => {
		initial ? setLoadingNewComics(false) : setLoadingNewComics(true)
		getAllComics(offset)
			.then(onComicListLoaded)
	}

	const renderItems = (comics) => {
		const items = comics.map(({id, title, thumbnail, price}) => {
			return (
				<CSSTransition key={id} timeout={500} classNames="comics__item">
					<li className="comics__item">
						<Link to={`/comics/${id}`}>
							<img src={thumbnail} alt={title} className="comics__item-img"/>
							<div className="comics__item-name">{title}</div>
							<div className="comics__item-price">{price}</div>
						</Link>
					</li>
				</CSSTransition>
			)
		})

		return (
			<ul className="comics__grid">
				<TransitionGroup component={null}>
					{items}
				</TransitionGroup>
			</ul>
		)
	}

	const items = renderItems(comics)

	const spinner = (loading && !loadingNewComics) ? <Spinner/> : null
	const errorMessage = error ? <ErrorMessage/> : null

	return (
		<div className="comics__list">
			{spinner}
			{errorMessage}
			{items}
			<button onClick={() => onRequestNewComics(offset)} className="button button__main button__long"
					disabled={loadingNewComics}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { useHttp } from "../../hooks/http.hook.jsx";
import useMarvelService from "../../services/MarvelService.js";
import { useEffect, useState } from "react";

const ComicsList = () => {

	const [comics, setComics] = useState([])
	const {loading, error, getAllComics} = useMarvelService()

	useEffect(() => {
		return () => {
			getAllComics()
				.then(onComicListLoaded)
		}
	}, []);

	const onComicListLoaded = (comics) => {
		setComics(comics)
		console.log(comics)
	}

	const renderItems = (comics) => {
		const items = comics.map(({id, title, thumbnail, price}) => {
			return (
				<li key={id} className="comics__item">
					<a href="#">
						<img src={thumbnail} alt={title} className="comics__item-img"/>
						<div className="comics__item-name">{title}</div>
						<div className="comics__item-price">{price}$</div>
					</a>
				</li>
			)
		})

		return (
			<ul className="comics__grid">
				{items}
			</ul>
		)
	}

	const items = renderItems(comics)

	return (
		<div className="comics__list">
			{items}
			<button className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;
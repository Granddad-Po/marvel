import { Component } from "react";
import MarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import Error from "../error/Error.jsx";

import './charList.scss';

class CharList extends Component {

	state = {
		chars: [],
		loading: true,
		error: false
	}

	marvelService = new MarvelService()

	componentDidMount() {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoaded = (chars) => {
		this.setState({
			chars,
			loading: false,
			error: false
		})
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	renderItems(charList) {
		const items = charList.map(({id, name, thumbnail}) => {
			let imgStyle = {'objectFit': 'cover'}
			if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit': 'contain'}
			}

			return (
				<li
					className="char__item"
					key={id}>
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

	render() {
		const {chars, loading, error} = this.state

		const items = this.renderItems(chars)

		const errorMessage = error ? <Error/> : null
		const spinner = loading ? <Spinner/> : null
		const content = !(loading || error) ? items : null

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;
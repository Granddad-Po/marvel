import { useState } from "react";

import AppHeader from "../appHeader/AppHeader.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";

import decoration from '../../resources/img/vision.png';

const App = () => {

	const [selectedChar, setSelectedChar] = useState(0)

	const onCharSelected = (id) => {
		setSelectedChar(id)
	}

	return (
		<div className="app">
			<AppHeader/>
			<main>
				<RandomChar/>
				<div className="char__content">
					<CharList onCharSelected={onCharSelected}/>
					<CharInfo charId={selectedChar}/>
				</div>
				<img className="bg-decoration" src={decoration} alt="vision"/>
			</main>
		</div>
	)
}

export default App;
import { useState } from "react";

import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";

import decoration from "../../resources/img/vision.png";
import SearchChar from "../searchChar/SearchChar.jsx";
import { Helmet } from "react-helmet";

const MainPage = () => {

	const [selectedChar, setSelectedChar] = useState(0)

	const onCharSelected = (id) => {
		setSelectedChar(id)
	}

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Marvel information portal"
				/>
				<title>Marvel Information</title>
			</Helmet>
			<RandomChar/>
			<div className="char__content">
				<CharList onCharSelected={onCharSelected}/>
				<div>
					<CharInfo charId={selectedChar}/>
					<SearchChar/>
				</div>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision"/>
		</>
	);
};

export default MainPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService.js";
import AppBanner from "../appBanner/AppBanner.jsx";
import setContent from "../../utils/setContent.jsx";

const SinglePage = ({Component, dataType}) => {
	const {id} = useParams()
	const [data, setData] = useState(null)
	const {clearError, getCharacter, getComic, process, setProcess} = useMarvelService()

	useEffect(() => {
		updateData()
	}, [id]);

	const updateData = () => {
		clearError()

		switch (dataType) {
			case 'comic':
				getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'))
				break
			case 'character':
				getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
		}
	}

	const onDataLoaded = (data) => {
		setData(data)
	}

	return (
		<>
			<AppBanner />
			{setContent(process, Component, data)}
		</>
	);
};

export default SinglePage;
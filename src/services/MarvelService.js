import { useHttp } from "../hooks/http.hook.jsx";

const useMarvelService = () => {
	const {loading, error, request, clearError} = useHttp()

	const _apiUrl = 'https://gateway.marvel.com:443/v1/public/'
	const _apiKey = 'apikey=c2c4077b584be9bcf06d6d6f03d8c46f'
	const _offset = 210


	const getAllCharacters = async (offset = _offset) => {
		const res = await request(`${_apiUrl}characters?limit=9&offset=${offset}&${_apiKey}`)
		return res.data.results.map(_transformChar)
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiUrl}characters/${id}?${_apiKey}`)
		return _transformChar(res.data.results[0])
	}

	const _transformChar = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}

	return {loading, error, getCharacter, getAllCharacters, clearError}
}

export default useMarvelService
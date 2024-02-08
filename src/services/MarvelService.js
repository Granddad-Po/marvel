class MarvelService {
	_apiUrl = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=c2c4077b584be9bcf06d6d6f03d8c46f'
	getResources = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json()
	}

	getAllCharacters = async () => {
		const res = await this.getResources(`${this._apiUrl}characters?limit=9&offset=666&${this._apiKey}`)
		return res.data.results.map(this._transformChar)
	}

	getCharacter = async (id) => {
		const res = await this.getResources(`${this._apiUrl}characters/${id}?${this._apiKey}`)
		return this._transformChar(res.data.results[0])
	}

	_transformChar = (char) => {
		return {
			name: char.name,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
		}
	}
}

export default MarvelService
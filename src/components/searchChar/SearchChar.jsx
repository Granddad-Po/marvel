import { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from 'yup'
import useMarvelService from "../../services/MarvelService.js";

import ErrorMessage from "../error/ErrorMessage.jsx";

import './searchChar.scss'

const setContent = (process, data) => {
	switch (process) {
		case 'waiting':
			return <></>
		case 'loading':
			return null
		case 'not-found':
			return <div className="error">The character was not found. Check the name and try again</div>
		case 'confirmed':
			return (
				<div className="search__wrapper">
					<div className="success">
						{`There is! Visit ${data[0].name} page?`}
					</div>
					<Link to={`character/${data[0].id}`} className="button button__secondary">
						<div className="inner">To page</div>
					</Link>
				</div>
			)
		case 'error':
			return <ErrorMessage />
		default:
			throw Error('Unexpected process state')
	}
}

const SearchChar = () => {
	const {process, setProcess, getCharacterByName, clearError} = useMarvelService()
	const [char, setChar] = useState(null)

	const updateChar = (charName) => {
		clearError()

		getCharacterByName(charName)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		if (char.length > 0) {
			setChar(char)
			setProcess('confirmed')
		} else {
			setChar(char)
			setProcess('not-found')
		}
	}

	return (
		<div className="search">
			<Formik
				initialValues={{charName: ''}}
				validationSchema={
					Yup.object({
						charName: Yup.string().required('This field is required')
					})
				}
				onSubmit={({charName}) => updateChar(charName)}
			>
				<Form>
					<div className="search__title">Or find a character by name:</div>
					<div className="search__wrapper">
						<Field name="charName" type="text" placeholder="Enter name" />
						<button
							className='button button__main'
							disabled={process === 'loading'}
						>
							<div className="inner">Find</div>
						</button>
					</div>
					<FormikErrorMessage name="charName" className="error" style={{marginTop: '25px'}} component="div" />
				</Form>
			</Formik>
			{setContent(process, char)}
		</div>
	);
};

export default SearchChar;
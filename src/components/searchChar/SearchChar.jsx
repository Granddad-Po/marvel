import { useState } from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from 'yup'
import useMarvelService from "../../services/MarvelService.js";

import ErrorMessage from "../error/ErrorMessage.jsx";

import './searchChar.scss'

const SearchChar = () => {
	const {loading, error, getCharacterByName, clearError} = useMarvelService()
	const [char, setChar] = useState(null)

	const onCharLoaded = (char) => {
		setChar(char)
	}

	const updateChar = (charName) => {
		clearError()

		getCharacterByName(charName)
			.then(onCharLoaded)
	}

	const errorMessage = error ? <ErrorMessage /> : null
	const result = !char ? null : char.length > 0
		?
		<div className="search__wrapper">
			<div className="success">
				{`There is! Visit ${char[0].name} page?`}
			</div>
			<Link to={`character/${char[0].id}`} className="button button__secondary">
				<div className="inner">To page</div>
			</Link>
		</div>
		:
		<div className="error">The character was not found. Check the name and try again</div>

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
							disabled={loading}
						>
							<div className="inner">Find</div>
						</button>
					</div>
					<FormikErrorMessage name="charName" className="error" style={{marginTop: '25px'}} component="div" />
				</Form>
			</Formik>
			{errorMessage}
			{result}
		</div>
	);
};

export default SearchChar;
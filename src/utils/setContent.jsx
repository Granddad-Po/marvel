import Skeleton from "../components/skeleton/Skeleton.jsx";
import Spinner from "../components/spinner/Spinner.jsx";
import ErrorMessage from "../components/error/ErrorMessage.jsx";

const setContent = (process, Component, data) => {
	switch (process) {
		case 'waiting':
			return <Skeleton/>
		case 'loading':
			return <Spinner/>
		case 'confirmed':
			return <Component data={data}/>
		case 'error':
			return <ErrorMessage/>
		default:
			throw Error('Unexpected process state')
	}
}

export default setContent
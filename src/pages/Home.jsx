import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div>
			<Navbar />
			<div className="text-center vh-100 d-flex flex-column justify-content-center">
				<h1>Bienvenido a invelecar!!</h1>
				<p>
					Esta sección está en construcción para ver nuestras cifra dirigete a la sección de cifras del sector
				</p>
			</div>
		</div>
	);
}; 
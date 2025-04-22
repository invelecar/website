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
					Losem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
		</div>
	);
}; 
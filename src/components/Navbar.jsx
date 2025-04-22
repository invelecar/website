import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-success">
			<div className="container">
				<h3 className="navbar-brand mb-0 h1 text-white">Invelecar</h3>
				<div className="ml-auto d-flex justify-content-center align-items-center">
					<Link style={{textDecoration: "none"}} className="me-3 text-white" to="/">
						Inicio
					</Link>
					<Link style={{textDecoration: "none"}} className="me-3 text-white" to="/nosotros">
						Nosotros
					</Link>
					<Link style={{textDecoration: "none"}} to="/cifras-del-sector" className="me-3 text-white">Cifras del sector</Link>
					<Link style={{textDecoration: "none"}} to="/informes" className="me-3 text-white">Informes Semanales</Link>
					<Link to="/login" className="btn btn-light text-success me-3">Iniciar sesión</Link>
					<Link to="/login" className="btn btn-light text-success me-3">Registrarme</Link>
				</div>
			</div>
		</nav>
	);
};
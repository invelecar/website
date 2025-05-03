import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-success">
			<div className="container">
				<h3 className="navbar-brand mb-0 h1 text-white">Invelecar</h3>
				<div className="ml-auto d-flex justify-content-center align-items-center">
					<Link style={{ textDecoration: "none" }} className="me-3 text-white" to="/">
						Inicio
					</Link>
					<Link style={{ textDecoration: "none" }} className="me-3 text-white" to="/nosotros">
						Nosotros
					</Link>
					<div className="dropdown">
						<div style={{cursor: "pointer"}} className="dropdown-toggle text-white me-3" data-bs-toggle="dropdown" aria-expanded="false">
							Cifras del sector
						</div>
						<ul className="dropdown-menu">
							<li className="text-center mb-2">
								<Link style={{ textDecoration: "none" }} className="text-black" to="/cifras-del-sector">Por indicador</Link>
							</li>
							<li className="text-center mb-2">
								<Link style={{ textDecoration: "none" }} className="text-black" to="/cifras-del-sector-por-fecha">Por año</Link>
							</li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</div>
					<Link style={{ textDecoration: "none" }} to="/informes" className="me-3 text-white">Informes Semanales</Link>
					<Link to="/login" className="btn btn-light text-success me-3">Iniciar sesión</Link>
					<Link to="/signup" className="btn btn-light text-success me-3">Registrarme</Link>
				</div>
			</div>
		</nav>
	);
};
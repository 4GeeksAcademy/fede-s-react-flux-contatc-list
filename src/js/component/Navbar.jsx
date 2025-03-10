import { Link } from "react-router-dom";
import React from "react";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">Contacts Fede</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
							<Link to="/contacts" className="nav-link" href="#">Contacts</Link>
						</div>
					</div>
				</div>
			</nav>
		</nav>
	);
};
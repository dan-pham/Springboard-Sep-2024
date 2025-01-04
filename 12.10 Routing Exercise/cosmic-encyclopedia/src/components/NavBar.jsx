import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = ({ tabs }) => {
	return (
		<nav className="nav-container">
			<Link to="/" className="link">
				Home
			</Link>

			{tabs.map((tab) => (
				<Link key={tab.id} to={`/content/${tab.id}`} className="link">
					{tab.title}
				</Link>
			))}
		</nav>
	);
};

export default NavBar;

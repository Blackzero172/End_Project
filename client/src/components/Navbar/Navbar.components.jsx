import "./Navbar.styles.css";
import React from "react";
import CustomLink from "../CustomLink/CustomLink.components";
const Navbar = () => {
	return (
		<nav>
			<ul>
				<div className="left-btns">
					<li>
						<CustomLink text="Home" path="/" />
					</li>
					<li>
						<CustomLink text="Dashboard" path="/dashboard" />
					</li>
				</div>
				<div className="right-btns">
					<li>
						<CustomLink text="Login" path="/login" />
					</li>
					<li>
						<CustomLink text="Signup" path="/signup" />
					</li>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;

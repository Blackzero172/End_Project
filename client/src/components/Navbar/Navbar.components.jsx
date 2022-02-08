import "./Navbar.styles.css";
import React from "react";
import CustomLink from "../CustomLink/CustomLink.components";
import CustomButton from "../CustomButton/CustomButton.components";
const Navbar = ({ loggedIn, username, onLogout }) => {
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
					{!loggedIn && (
						<li>
							<CustomLink text="Login" path="/login" />
						</li>
					)}
					{!loggedIn && (
						<li>
							<CustomLink text="Signup" path="/signup" />
						</li>
					)}
					{loggedIn && (
						<li>
							<p>Welcome, {username}</p>
						</li>
					)}
					{loggedIn && <CustomLink text="Profile" path="/profile" />}
					{loggedIn && (
						<li>
							<CustomButton text="Logout" onClick={onLogout} />
						</li>
					)}
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;

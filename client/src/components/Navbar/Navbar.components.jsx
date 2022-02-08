import "./Navbar.styles.css";
import React from "react";
import CustomLink from "../CustomLink/CustomLink.components";
import CustomButton from "../CustomButton/CustomButton.components";
const Navbar = ({ isLoggedIn, username, onLogout }) => {
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
					{!isLoggedIn && (
						<li>
							<CustomLink text="Login" path="/login" />
						</li>
					)}
					{!isLoggedIn && (
						<li>
							<CustomLink text="Signup" path="/signup" />
						</li>
					)}
					{isLoggedIn && (
						<li>
							<p>Welcome, {username}</p>
						</li>
					)}
					{isLoggedIn && <CustomLink text="Profile" path="/profile" />}
					{isLoggedIn && (
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

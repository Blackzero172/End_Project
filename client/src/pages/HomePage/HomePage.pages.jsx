import "./HomePage.styles.css";
import CustomLink from "../../components/CustomLink/CustomLink.components";
const HomePage = ({ loggedIn }) => {
	return (
		<main>
			<div className="background"></div>
			<h2>Welcome to TeamZ</h2>
			<p>
				if you are looking for a website that's easy to use and can help you schedule your team you came to
				the right place
			</p>
			<CustomLink text="Start Now" path={loggedIn ? "/dashboard" : "/login"} />
		</main>
	);
};
export default HomePage;

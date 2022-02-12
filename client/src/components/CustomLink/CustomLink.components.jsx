import { Link } from "react-router-dom";
import "./CustomLink.styles.css";
const CustomLink = ({ path, text, classes = "", children, onClick }) => {
	return (
		<Link to={path} className={classes} onClick={onClick}>
			{children}
			{text}
		</Link>
	);
};
export default CustomLink;

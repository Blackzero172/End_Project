import { Link } from "react-router-dom";
import "./CustomLink.styles.css";
const CustomLink = ({ path, text, classes = "" }) => {
	return (
		<Link to={path} className={classes}>
			{text}
		</Link>
	);
};
export default CustomLink;

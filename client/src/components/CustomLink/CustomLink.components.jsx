import { Link } from "react-router-dom";
import "./CustomLink.styles.css";
const CustomLink = ({ path, text }) => {
	return <Link to={path}>{text}</Link>;
};
export default CustomLink;

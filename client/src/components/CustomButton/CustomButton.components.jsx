import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onClick, type = "button" }) => {
	return (
		<button type="button" onClick={onClick} type={type}>
			{children}
			{text}
		</button>
	);
};
export default CustomButton;

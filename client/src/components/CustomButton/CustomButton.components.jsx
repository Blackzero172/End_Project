import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onClick }) => {
	return (
		<button type="button" onClick={onClick}>
			{children}
			{text}
		</button>
	);
};
export default CustomButton;

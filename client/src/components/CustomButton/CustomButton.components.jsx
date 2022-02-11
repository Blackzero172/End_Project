import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onClick, type = "button", classes = "" }) => {
	return (
		<button type="button" onClick={onClick} type={type} className={classes}>
			{children}
			{text}
		</button>
	);
};
export default CustomButton;

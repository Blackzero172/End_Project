import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onClick, type = "button", classes = "", disabled = false }) => {
	return (
		<button type="button" onClick={onClick} type={type} className={classes} disabled={disabled}>
			{children}
			{text}
		</button>
	);
};
export default CustomButton;

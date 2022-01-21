import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onClick, userid, label }) => {
	return (
		<div>
			<label>{label}</label>
			<button type="button" onClick={onClick} userid={userid}>
				{children}
				{text}
			</button>
		</div>
	);
};
export default CustomButton;

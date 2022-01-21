import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onActivate, userid, label }) => {
	return (
		<div>
			<label>{label}</label>
			<button type="button" onClick={onActivate} userid={userid}>
				{children}
				{text}
			</button>
		</div>
	);
};
export default CustomButton;

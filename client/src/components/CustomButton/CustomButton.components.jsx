import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onClick, userid, label, type, action }) => {
	return (
		<div className={type}>
			<label>{label}</label>
			<button type="button" onClick={onClick} userid={userid} action={action}>
				{children}
				{text}
			</button>
		</div>
	);
};
export default CustomButton;

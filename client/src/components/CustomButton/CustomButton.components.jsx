import React from "react";
import "./CustomButton.styles.css";
const CustomButton = ({ text, children, onClick, userid, sortType, label }) => {
	return (
		<div>
			<label>{label}</label>
			<button type="button" onClick={onClick} userid={userid} sortType={sortType}>
				{children}
				{text}
			</button>
		</div>
	);
};
export default CustomButton;

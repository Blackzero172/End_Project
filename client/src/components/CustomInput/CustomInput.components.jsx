import React from "react";
import "./CustomInput.styles.css";
const CustomInput = ({ type, onChange, placeHolder, label, name, inputRef, required }) => {
	return (
		<div className="input">
			<label htmlFor={name}>
				{label} <span className="red">{required ? "*" : ""}</span>
			</label>
			<input
				type={type}
				onChange={onChange}
				placeholder={placeHolder}
				id={name}
				onClick={(e) => e.stopPropagation()}
				ref={inputRef}
			/>
		</div>
	);
};
export default CustomInput;

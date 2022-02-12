import React from "react";
import "./CustomInput.styles.css";
const CustomInput = ({
	type,
	onChange,
	placeHolder,
	label,
	name,
	inputRef,
	required,
	autocomplete,
	value,
	checked,
}) => {
	return (
		<div className="input-container flex-column flex-items">
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				onChange={onChange}
				placeholder={placeHolder}
				id={name}
				onClick={(e) => e.stopPropagation()}
				ref={inputRef}
				required={required}
				autoComplete={autocomplete}
				defaultValue={value}
				defaultChecked={checked}
			/>
		</div>
	);
};
export default CustomInput;

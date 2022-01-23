const Property = ({ label, text }) => {
	return (
		<div className="property">
			<label>{label}</label>
			<p>
				{text}
				{typeof text === "number" ? <>&#8362;</> : ""}
			</p>
		</div>
	);
};
export default Property;

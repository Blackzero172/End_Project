const Property = ({ label, text }) => {
	return (
		<div className="property">
			<label>{label}</label>
			<p>{text}</p>
		</div>
	);
};
export default Property;

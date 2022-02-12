import "./Daycell.styles.css";
const Daycell = ({ onClick, weekDay }) => {
	return (
		<div
			className="day-cell flex-column flex-evenly"
			onClick={() => {
				onClick(weekDay);
			}}
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
export default Daycell;

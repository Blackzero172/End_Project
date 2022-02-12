import "./Daycell.styles.css";
const Daycell = ({ onClick, weekDay, day, users = [] }) => {
	let morningWorkers = [];
	let middleWorkers = [];
	let eveningWorkers = [];
	if (users.length > 0) {
		morningWorkers = day.morningWorkers.map((workerEmail) => {
			return users.find((user) => user.email === workerEmail.toLowerCase());
		});
		middleWorkers = day.middleWorkers.map((workerEmail) => {
			return users.find((user) => user.email === workerEmail.toLowerCase());
		});
		eveningWorkers = day.eveningWorkers.map((workerEmail) => {
			return users.find((user) => user.email === workerEmail.toLowerCase());
		});
	}
	return (
		<div
			className="day-cell flex-column flex-evenly"
			onClick={() => {
				onClick(weekDay);
			}}
		>
			<div>
				{morningWorkers.map((worker) => {
					return <p>{`${worker.firstName} ${worker.lastName}`}</p>;
				})}
			</div>
			<div>
				{middleWorkers.map((worker) => {
					return <p>{`${worker.firstName} ${worker.lastName}`}</p>;
				})}
			</div>
			<div>
				{eveningWorkers.map((worker) => {
					return <p>{`${worker.firstName} ${worker.lastName}`}</p>;
				})}
			</div>
		</div>
	);
};
export default Daycell;

import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import "./EditDayPage.styles.css";
const EditDayPage = ({ day, users, menuRef }) => {
	const morningWorkers = day.morningWorkers.map((workerEmail) => {
		return users.find((user) => user.email === workerEmail.toLowerCase());
	});
	const middleWorkers = day.middleWorkers.map((workerEmail) => {
		return users.find((user) => user.email === workerEmail.toLowerCase());
	});
	const eveningWorkers = day.eveningWorkers.map((workerEmail) => {
		return users.find((user) => user.email === workerEmail.toLowerCase());
	});
	return (
		<div className="edit-day-page flex-both hidden" ref={menuRef}>
			<div className="window flex-items flex-column">
				<h2>{moment(day.date).format("dddd DD/MM")}</h2>
				<div className="morning-container flex-items flex-column">
					<div className="btns-container flex">
						<CustomInput label="Morning" placeHolder="Enter Name..." />
						<CustomButton text="Add" />
					</div>
					<div className="results-container">
						{morningWorkers.map((worker) => {
							return <p key={worker._id}>{`${worker.firstName} ${worker.lastName}`}</p>;
						})}
					</div>
				</div>
				<div className="middle-container flex-items flex-column">
					<div className="btns-container flex">
						<CustomInput label="Middle" placeHolder="Enter Name..." />
						<CustomButton text="Add" />
					</div>
					<div className="results-container">
						{middleWorkers.map((worker) => {
							return <p key={worker._id}>{`${worker.firstName} ${worker.lastName}`}</p>;
						})}
					</div>
				</div>
				<div className="evening-container flex-items flex-column">
					<div className="btns-container flex">
						<CustomInput label="Evening" placeHolder="Enter Name..." />
						<CustomButton text="Add" />
					</div>
					<div className="results-container flex-column flex-both">
						{eveningWorkers.map((worker) => {
							return <p key={worker._id}>{`${worker.firstName} ${worker.lastName}`}</p>;
						})}
					</div>
				</div>
				<div className="btns-container">
					<CustomButton text="Confirm" />
					<CustomButton text="Cancel" />
				</div>
			</div>
		</div>
	);
};
export default EditDayPage;

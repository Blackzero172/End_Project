import moment from "moment";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import NameContainer from "../../components/NameContainer/NameContainer.components";
import "./EditDayPage.styles.css";
const EditDayPage = ({ day, users, menuRef, onCancel, onConfirm }) => {
	const [dayState, setDay] = useState({});
	let morningWorkers = [];
	let middleWorkers = [];
	let eveningWorkers = [];
	if (dayState.hasOwnProperty("morningWorkers")) {
		morningWorkers = dayState.morningWorkers.map((workerEmail) => {
			return users.find((user) => user.email === workerEmail.toLowerCase());
		});
		middleWorkers = dayState.middleWorkers.map((workerEmail) => {
			return users.find((user) => user.email === workerEmail.toLowerCase());
		});
		eveningWorkers = dayState.eveningWorkers.map((workerEmail) => {
			return users.find((user) => user.email === workerEmail.toLowerCase());
		});
	}
	const onDelete = async (email, shiftType) => {
		const obj = dayState;
		obj[`${shiftType}Workers`] = obj[`${shiftType}Workers`].filter((worker) => {
			return worker.toLowerCase() !== email;
		});

		setDay({ ...obj });
	};
	useEffect(() => {
		setDay({ ...day });
	}, [day]);
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
							return <NameContainer user={worker} key={worker._id} shiftType="morning" onDelete={onDelete} />;
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
							return <NameContainer user={worker} key={worker._id} shiftType="middle" onDelete={onDelete} />;
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
							return <NameContainer user={worker} key={worker._id} shiftType="evening" onDelete={onDelete} />;
						})}
					</div>
				</div>
				<div className="btns-container">
					<CustomButton text="Confirm" onClick={onConfirm} />
					<CustomButton
						text="Cancel"
						onClick={() => {
							setDay(day);
							onCancel();
						}}
					/>
				</div>
			</div>
		</div>
	);
};
export default EditDayPage;

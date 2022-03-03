import moment from "moment";
import { useEffect, useRef, useState } from "react";

import CustomButton from "../../components/CustomButton/CustomButton.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import NameContainer from "../../components/NameContainer/NameContainer.components";

import "./EditDayPage.styles.css";

let timerID;
const EditDayPage = ({ day, users, menuRef, onCancel, onConfirm }) => {
	const [dayState, setDay] = useState({});
	const [filteredUsers, filterUsers] = useState([]);
	const morningInputRef = useRef();
	const middleInputRef = useRef();
	const eveningInputRef = useRef();

	let morningWorkers = [];
	let middleWorkers = [];
	let eveningWorkers = [];
	let allWorkers = [];

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
		allWorkers = [
			...dayState.morningWorkers.join("~").toLowerCase().split("~"),
			...dayState.middleWorkers.join("~").toLowerCase().split("~"),
			...dayState.eveningWorkers.join("~").toLowerCase().split("~"),
		];
	}

	const onDelete = async (email, shiftType) => {
		const obj = dayState;
		obj[`${shiftType}Workers`] = obj[`${shiftType}Workers`].filter((worker) => {
			return worker.toLowerCase() !== email;
		});

		setDay({ ...obj });
	};
	const onAdd = async (email, shiftType) => {
		const obj = dayState;
		obj[`${shiftType}Workers`].push(email);
		[morningInputRef, middleInputRef, eveningInputRef].forEach((input) => {
			input.current.value = "";
		});
		setDay({ ...obj });
	};
	const search = (e) => {
		if (e.target.value === "") {
			return filterUsers([]);
		}
		clearTimeout(timerID);
		timerID = setTimeout(() => {
			filterUsers(
				users.filter((user) =>
					`${user.firstName}${user.lastName}`.toLowerCase().includes(e.target.value.toLowerCase())
				)
			);
		}, 500);
	};

	useEffect(() => {
		setDay({ ...day });
	}, [day]);

	return (
		<div className="edit-day-page flex-both hidden" ref={menuRef}>
			<div className="window flex-items flex-column">
				<h2 className="flex-content">{moment(day.date).format("dddd DD/MM")}</h2>
				<div className="times-container flex-both">
				<div className="morning-container flex-items flex-column">
					<div className="btns-container flex">
						<CustomInput
							label="Morning"
							placeHolder="Enter Name..."
							onChange={search}
							inputRef={morningInputRef}
						/>

						<div className="results-container flex-items flex-column">
							{filteredUsers.map((user) => {
								if (!allWorkers.includes(user.email) && morningInputRef.current.value !== "")
									return (
										<CustomButton
											key={user._id}
											text={`${user.firstName} ${user.lastName}`}
											classes="alt"
											onClick={() => {
												onAdd(user.email, "morning");
											}}
										/>
									);
								else return <></>;
							})}
						</div>
					</div>
					<div className="workers-container">
						{morningWorkers.map((worker) => {
							return <NameContainer user={worker} key={worker._id} shiftType="morning" onDelete={onDelete} />;
						})}
					</div>
				</div>
				<div className="middle-container flex-items flex-column">
					<div className="btns-container flex">
						<CustomInput
							label="Middle"
							placeHolder="Enter Name..."
							inputRef={middleInputRef}
							onChange={search}
						/>

						<div className="results-container flex-items flex-column">
							{filteredUsers.map((user) => {
								if (!allWorkers.includes(user.email) && middleInputRef.current.value !== "")
									return (
										<CustomButton
											key={user._id}
											text={`${user.firstName} ${user.lastName}`}
											classes="alt"
											onClick={() => {
												onAdd(user.email, "middle");
											}}
										/>
									);
								else return <></>;
							})}
						</div>
					</div>
					<div className="workers-container">
						{middleWorkers.map((worker) => {
							return <NameContainer user={worker} key={worker._id} shiftType="middle" onDelete={onDelete} />;
						})}
					</div>
				</div>
				<div className="evening-container flex-items flex-column">
					<div className="btns-container flex">
						<CustomInput
							label="Evening"
							onChange={search}
							placeHolder="Enter Name..."
							inputRef={eveningInputRef}
						/>

						<div className="results-container flex-items flex-column">
							{filteredUsers.map((user) => {
								if (!allWorkers.includes(user.email) && eveningInputRef.current.value !== "")
									return (
										<CustomButton
											key={user._id}
											text={`${user.firstName} ${user.lastName}`}
											classes="alt"
											onClick={() => {
												onAdd(user.email, "evening");
											}}
										/>
									);
								else return <></>;
							})}
						</div>
					</div>
					<div className="workers-container">
						{eveningWorkers.map((worker) => {
							return <NameContainer user={worker} key={worker._id} shiftType="evening" onDelete={onDelete} />;
						})}
					</div>
				</div>
				</div>
				<div className="btns-container flex-content">
					<CustomButton
						text="Confirm"
						onClick={() => {
							onConfirm(dayState);
						}}
					/>
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

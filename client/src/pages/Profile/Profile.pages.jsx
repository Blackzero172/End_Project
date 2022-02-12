import moment from "moment";
import { useRef } from "react";
import { useRouteMatch, Route } from "react-router-dom";

import profileIcon from "../../assets/img/blank_profile.png";
import CustomLink from "../../components/CustomLink/CustomLink.components";
import Property from "../../components/Property/Property.components";
import ShiftContainer from "../../components/ShiftContainer/ShiftContainer.components";
import CreateUserPage from "../CreateUserPage/CreateUserPage.pages";

import "./Profile.styles.css";

const Profile = ({ loggedInUser, inputRefs, onEditProfile }) => {
	const { path, url } = useRouteMatch();
	const errorTextRef = useRef();

	const { firstName, lastName, birthDate, IdNumber, email, shifts } = loggedInUser;

	const birthDateText = moment(birthDate).format("DD MMMM YYYY");

	const pastShifts = [];
	const upcomingShifts = [];

	const onConfirmEdit = async () => {
		await onEditProfile();
	};
	shifts.forEach((shift) => {
		const shiftDate = moment(shift.shiftDate);
		const today = moment();
		if (shiftDate.isBefore(today)) pastShifts.push(shift);
		else upcomingShifts.push(shift);
	});

	return (
		<div className="profile-page">
			<Route path={`${path}`} exact>
				<div className="profile-window flex-column">
					<div className="profile-icon flex-items">
						<img src={profileIcon} alt="Profile" />
						<div className="name-container">
							<Property text={`${firstName} ${lastName}`} />
						</div>
					</div>
					<div className="info-container">
						<Property label="Email: " text={<span className="email-text">{email}</span>} />

						<Property label="Date of Birth: " text={birthDateText} />
						<Property label="ID Number: " text={IdNumber} />
					</div>
					<hr width="100%" />
					<div className="shifts-container flex-content">
						<div className="past-shifts">
							<Property text="Past Shifts: " />
							{pastShifts.map((shift) => {
								return <ShiftContainer shift={shift} />;
							})}
						</div>
						<div className="upcoming-shifts">
							<Property text="Upcoming Shifts: " />

							{upcomingShifts.map((shift) => {
								return <ShiftContainer shift={shift} />;
							})}
						</div>
					</div>
					<CustomLink path={`${url}/edit`} text="Edit Profile" classes="dash edit-btn" />
				</div>
			</Route>
			<Route path={`${path}/edit`}>
				<CreateUserPage
					inputRefs={inputRefs}
					onEditUser={onConfirmEdit}
					selectedUser={loggedInUser}
					errorTextRef={errorTextRef}
				/>
			</Route>
		</div>
	);
};

export default Profile;

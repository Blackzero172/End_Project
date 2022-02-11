import profileIcon from "../../assets/img/blank_profile.png";
import "./Profile.styles.css";
import Property from "../../components/Property/Property.components";
import ShiftContainer from "../../components/ShiftContainer/ShiftContainer.components";
import moment from "moment";
const Profile = ({ loggedInUser }) => {
	const { firstName, lastName, birthDate, IdNumber, email, shifts } = loggedInUser;
	const birthDateText = moment(birthDate).format("DD MMMM YYYY");
	const pastShifts = [];
	const upcomingShifts = [];
	shifts.forEach((shift) => {
		const shiftDate = moment(shift.shiftDate);
		const today = moment();
		if (shiftDate.isBefore(today)) pastShifts.push(shift);
		else upcomingShifts.push(shift);
	});
	return (
		<div className="profile-page">
			<div className="window flex-column">
				<div className="profile-icon flex-items">
					<img src={profileIcon} />
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
			</div>
		</div>
	);
};
export default Profile;

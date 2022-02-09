import profileIcon from "../../assets/img/blank_profile.png";
import "./Profile.styles.css";
import Property from "../../components/Property/Property.components";
import ShiftContainer from "../../components/ShiftContainer/ShiftContainer.components";
const Profile = ({ loggedInUser }) => {
	const { firstName, lastName, birthDate, IdNumber, email, shifts } = loggedInUser;
	const birthDateFormat = new Date(birthDate);
	const birthDateText = `${birthDateFormat.getDate()}/${
		birthDateFormat.getMonth() + 1
	}/${birthDateFormat.getFullYear()}`;
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
				<div className="shifts-container">
					<Property label="Shifts: " />
					<div className="shifts-grid">
						{shifts.map((shift) => {
							return <ShiftContainer shift={shift} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Profile;

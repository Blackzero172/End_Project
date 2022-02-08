import profileIcon from "../../assets/img/blank_profile.png";
import "./Profile.styles.css";
const Profile = ({ loggedInUser }) => {
	return (
		<div className="profile-page">
			<div className="window">
				<div className="profile-icon">
					<img src={profileIcon} />
					<p>Name: {loggedInUser.name}</p>
				</div>
				<p>Email: {loggedInUser.email}</p>
				<p>
					Shifts:
					{loggedInUser.hasOwnProperty("shifts") &&
						loggedInUser.shifts.map((shift) => {
							return (
								<ul>
									<br />
									<li>Date: {shift.shiftDate}</li>
									<li>Type: {shift.shiftType}</li>
									<br />
								</ul>
							);
						})}
				</p>
			</div>
		</div>
	);
};
export default Profile;

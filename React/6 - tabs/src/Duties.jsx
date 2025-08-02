import { CgEditBlackPoint } from "react-icons/cg";
const Duties = ({ duties }) => {
	return (
		<div>
			{duties.map((duty, index) => {
				return (
					<div key={index} className="job-desc">
						<CgEditBlackPoint className="job-icon" />
						<p>{duty}</p>
					</div>
				);
			})}
		</div>
	);
};
export default Duties;

import Duties from "./Duties";

const Job = ({ jobs, curr }) => {
	const { company, dates, duties, title } = jobs[curr];

	return (
		<article className="job-info">
			<h3>{title}</h3>
			<span className="job-company">{company}</span>
			<p className="job-date">{dates}</p>
			<Duties duties={duties} />
		</article>
	);
};
export default Job;

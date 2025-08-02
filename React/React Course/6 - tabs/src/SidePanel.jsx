const SidePanel = ({ jobs, curr, setCurr }) => {
	return (
		<div className="btn-container">
			{jobs.map((job, index) => {
				return (
					<button
						key={job.id}
						className={index === curr ? "job-btn active-btn" : "job-btn"}
						onClick={() => setCurr(index)}
					>
						{job.company}
					</button>
				);
			})}
		</div>
	);
};
export default SidePanel;

import { useState } from "react";
import type { UploadFiles } from "./types";
import "./App.css";

function App() {
	const [files, setFiles] = useState<UploadFiles[]>([]);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const checkDuplicateFiles = (filesToFilter: UploadFiles[]): UploadFiles[] => {
		const existing = new Set(files.map((f) => `${f.name}-${f.size}`));
		return filesToFilter.filter(
			(file) => !existing.has(`${file.name}-${file.size}`)
		);
	};

	const uploadFiles = (incomingFiles: File[]): void => {
		const filesToUpload: UploadFiles[] = incomingFiles.map(
			({ name, size, type }) => ({ name, size, type })
		);
		const uniqueFiles = checkDuplicateFiles(filesToUpload);
		setFiles((prev) => [...prev, ...uniqueFiles]);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		uploadFiles(Array.from(e.target.files ?? []));
	};

	const handleRemove = (idx: number) => {
		setFiles((prev) => {
			const newVal = prev.filter((_, id) => id !== idx);
			return newVal;
		});
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node))
			setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		uploadFiles(Array.from(e.dataTransfer.files));
		setIsDragging(false);
	};

	return (
		<div className="container">
			<div
				className={`file-upload-container ${isDragging ? "dragging" : ""}`}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleDrop}
			>
				<p>Drag and Drop files here</p>
				<div className="dropzone">
					<input
						type="file"
						multiple
						id="file-upload"
						className="hidden-input"
						onChange={handleChange}
					/>
					<label className="upload-btn" htmlFor="file-upload">
						Browse Files
					</label>
				</div>
			</div>
			<div className="content-section">
				{files.map((file, idx) => {
					const { name, size, type } = file;
					return (
						<div className="uploaded-files" key={`${name}-${size}`}>
							<div className="file-details">{`${name} ${Math.floor(size / 1024)}kb`}</div>
							<button className="remove-btn" onClick={() => handleRemove(idx)}>
								❌
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;

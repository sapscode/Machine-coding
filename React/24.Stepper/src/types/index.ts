import type { Dispatch, SetStateAction } from "react";

export interface PageDetails {
	id: number;
	data: string;
}

export interface StepperProp {
	totalPages: number;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
}

export interface ContentProp extends StepperProp {
	content: PageDetails;
}

import type { Dispatch, SetStateAction } from "react";

// Shape of each item in data.json
export interface Options {
	id: number;
	name: string;
	label: string;
}

export interface DropdownValProp {
	val: Options;
	selectedVals: Options[];
	setSelectedVals: (vals: Options[]) => void;
}

export interface SelectBarProp {
	selectedVals: Options[];
	removeSelectVal: (id: number) => void;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface TagsProp {
	val: Options;
	removeSelectVal: (id: number) => void;
}

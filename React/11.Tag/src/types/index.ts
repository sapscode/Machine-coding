export interface Tag {
	id: number;
	name: string;
}

export type TagInputProp = {
	tags: Tag[];
	setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

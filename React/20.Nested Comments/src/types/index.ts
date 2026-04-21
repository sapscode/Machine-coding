export interface IComment {
	id: number;
	message: string;
	replies?: IComment[];
}

export interface ICommnetProp {
	comment: IComment;
	addComment: (message: string, parentId: number) => void;
	deleteComment: (commentId: number) => void;
}

export interface OpenRContext {
	openReplyId: number | null;
	setOpenReplyId: (id: number | null) => void;
}

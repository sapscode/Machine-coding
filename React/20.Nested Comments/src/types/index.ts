export interface IComment {
	id: number;
	message: string;
	userId: number;
	replies?: IComment[];
}

export interface IUser {
	id: number;
	name: string;
	avatar?: string;
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

export interface UserRContext {
	users: IUser[];
}

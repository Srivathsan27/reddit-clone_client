export type CommentItemType = {
  __typename?: "Comment" | undefined;
  postId: number;
  text: string;
  createdAt: string;
  postTitle: string;
  isOwnComment: boolean;
};

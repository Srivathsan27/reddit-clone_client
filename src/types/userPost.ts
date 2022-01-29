export type UserPost = {
  __typename?: "Post";
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  contentSnip: string;
  numberOfHits: number;
  numberOfComments: number;
  hitStatus: number;
  creatorId: number;
  creator: { __typename?: "User"; id: number; username: string };
};

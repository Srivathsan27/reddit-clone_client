export type ProfileType = {
  __typename?: "User" | undefined;
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  isTagged: boolean;
  profile: {
    __typename?: "UserProfile" | undefined;
    isOwnProfile: boolean;
    name: string;
    bio: string;
    sex: string;
  };
};

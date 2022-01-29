import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  isOwnComment: Scalars['Boolean'];
  postId: Scalars['Int'];
  postTitle: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  error?: Maybe<FieldError>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: CommentResponse;
  changePassword?: Maybe<UserResponse>;
  delete: BooleanResponse;
  deleteComment: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  hitPost: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  newPost: PostResponse;
  register: UserResponse;
  resetPassword: BooleanResponse;
  tagUser: Scalars['Boolean'];
  untagUser: Scalars['Boolean'];
  updateComment: Scalars['String'];
  updatePost: PostResponse;
  updateProfile: ProfileResponse;
};


export type MutationAddCommentArgs = {
  comment: Scalars['String'];
  post: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  post: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationHitPostArgs = {
  post: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: UserPassInput;
};


export type MutationNewPostArgs = {
  input: PostInput;
};


export type MutationRegisterArgs = {
  input: UserPassInput;
};


export type MutationResetPasswordArgs = {
  current: Scalars['String'];
  new: Scalars['String'];
};


export type MutationTagUserArgs = {
  friendId: Scalars['Int'];
};


export type MutationUntagUserArgs = {
  friendId: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  post: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  input: PostInput;
};


export type MutationUpdateProfileArgs = {
  id: Scalars['Int'];
  input: ProfileInput;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  content: Scalars['String'];
  contentSnip: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  hitStatus: Scalars['Int'];
  id: Scalars['Float'];
  isOwnPost: Scalars['Boolean'];
  numberOfComments: Scalars['Int'];
  numberOfHits: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostError = {
  __typename?: 'PostError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<PostError>;
  post?: Maybe<Post>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  hasMorePosts: Scalars['Boolean'];
  posts?: Maybe<Array<Post>>;
};

export type ProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Scalars['String']>;
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  error?: Maybe<FieldError>;
  profile?: Maybe<UserProfile>;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  me?: Maybe<User>;
  myComments: Array<Comment>;
  myPosts: PostsResponse;
  post: PostResponse;
  posts: PostsResponse;
  profile: UserResponse;
  tagged: TaggedResponse;
  userComments: Array<Comment>;
  userPosts: PostsResponse;
  users: Array<User>;
};


export type QueryMyPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Float'];
};


export type QueryProfileArgs = {
  id: Scalars['Int'];
};


export type QueryTaggedArgs = {
  id: Scalars['Int'];
};


export type QueryUserCommentsArgs = {
  id: Scalars['Int'];
};


export type QueryUserPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  limit: Scalars['Int'];
};

export type TaggedResponse = {
  __typename?: 'TaggedResponse';
  error?: Maybe<FieldError>;
  taggedUsers?: Maybe<Array<TaggedUser>>;
};

export type TaggedUser = {
  __typename?: 'TaggedUser';
  id: Scalars['Float'];
  isOwnAccount: Scalars['Boolean'];
  isTagged: Scalars['Boolean'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  isTagged: Scalars['Boolean'];
  profile: UserProfile;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserPassInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  bio: Scalars['String'];
  isOwnProfile: Scalars['Boolean'];
  name: Scalars['String'];
  sex: Scalars['String'];
  userId: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Comment_DetailsFragment = { __typename?: 'Comment', postId: number, text: string, createdAt: string, postTitle: string, isOwnComment: boolean };

export type Post_AllFragment = { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, contentSnip: string, numberOfHits: number, numberOfComments: number, hitStatus: number, creatorId: number, creator: { __typename?: 'User', id: number, username: string } };

export type Single_PostFragment = { __typename?: 'Post', id: number, hitStatus: number, isOwnPost: boolean, title: string, content: string, numberOfHits: number, comments: Array<{ __typename?: 'Comment', userId: number, postId: number, isOwnComment: boolean, text: string, createdAt: string, user: { __typename?: 'User', username: string } }>, creator: { __typename?: 'User', id: number, username: string } };

export type User_AllFragment = { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string };

export type CommentPostMutationVariables = Exact<{
  post: Scalars['Int'];
  comment: Scalars['String'];
}>;


export type CommentPostMutation = { __typename?: 'Mutation', addComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', userId: number, postId: number, text: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } | null | undefined };

export type CreateNewPostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreateNewPostMutation = { __typename?: 'Mutation', newPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, contentSnip: string, numberOfHits: number, numberOfComments: number, hitStatus: number, creatorId: number, creator: { __typename?: 'User', id: number, username: string } } | null | undefined, errors?: { __typename?: 'PostError', field: string, message: string } | null | undefined } };

export type DeleteCommentMutationVariables = Exact<{
  post: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', delete: { __typename?: 'BooleanResponse', status?: boolean | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type HitPostMutationVariables = Exact<{
  post: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type HitPostMutation = { __typename?: 'Mutation', hitPost: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } | null | undefined } };

export type ResetPasswordMutationVariables = Exact<{
  current: Scalars['String'];
  new: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'BooleanResponse', status?: boolean | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type TagUserMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type TagUserMutation = { __typename?: 'Mutation', tagUser: boolean };

export type UntagUserMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type UntagUserMutation = { __typename?: 'Mutation', untagUser: boolean };

export type UpdateCommentMutationVariables = Exact<{
  post: Scalars['Int'];
  text: Scalars['String'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: string };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, content: string, title: string } | null | undefined, errors?: { __typename?: 'PostError', field: string, message: string } | null | undefined } };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  values: ProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'ProfileResponse', profile?: { __typename?: 'UserProfile', userId: number, name: string, bio: string, sex: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };

export type TaggedUsersQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TaggedUsersQuery = { __typename?: 'Query', tagged: { __typename?: 'TaggedResponse', taggedUsers?: Array<{ __typename?: 'TaggedUser', id: number, isOwnAccount: boolean, username: string, isTagged: boolean }> | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };

export type GetProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, isTagged: boolean, profile: { __typename?: 'UserProfile', userId: number, isOwnProfile: boolean, name: string, bio: string, sex: string } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string } | null | undefined };

export type MyCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCommentsQuery = { __typename?: 'Query', myComments: Array<{ __typename?: 'Comment', postId: number, text: string, createdAt: string, postTitle: string, isOwnComment: boolean }> };

export type MyPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type MyPostsQuery = { __typename?: 'Query', myPosts: { __typename?: 'PostsResponse', hasMorePosts: boolean, posts?: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, contentSnip: string, numberOfHits: number, numberOfComments: number, hitStatus: number, creatorId: number, creator: { __typename?: 'User', id: number, username: string } }> | null | undefined } };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, hitStatus: number, isOwnPost: boolean, title: string, content: string, numberOfHits: number, comments: Array<{ __typename?: 'Comment', userId: number, postId: number, isOwnComment: boolean, text: string, createdAt: string, user: { __typename?: 'User', username: string } }>, creator: { __typename?: 'User', id: number, username: string } } | null | undefined, errors?: { __typename?: 'PostError', field: string, message: string } | null | undefined } };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostsResponse', hasMorePosts: boolean, posts?: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, contentSnip: string, numberOfHits: number, numberOfComments: number, hitStatus: number, creatorId: number, creator: { __typename?: 'User', id: number, username: string } }> | null | undefined } };

export type GetCommentsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', userComments: Array<{ __typename?: 'Comment', postId: number, text: string, createdAt: string, postTitle: string, isOwnComment: boolean }> };

export type GetUserPostsQueryVariables = Exact<{
  id: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetUserPostsQuery = { __typename?: 'Query', userPosts: { __typename?: 'PostsResponse', hasMorePosts: boolean, posts?: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, contentSnip: string, numberOfHits: number, numberOfComments: number, hitStatus: number, creatorId: number, creator: { __typename?: 'User', id: number, username: string } }> | null | undefined } };

export const Comment_DetailsFragmentDoc = gql`
    fragment comment_details on Comment {
  postId
  text
  createdAt
  postTitle
  isOwnComment
}
    `;
export const Post_AllFragmentDoc = gql`
    fragment post_all on Post {
  id
  createdAt
  updatedAt
  title
  contentSnip
  numberOfHits
  numberOfComments
  hitStatus
  creatorId
  creator {
    id
    username
  }
}
    `;
export const Single_PostFragmentDoc = gql`
    fragment single_post on Post {
  id
  hitStatus
  isOwnPost
  title
  content
  numberOfHits
  comments {
    userId
    postId
    isOwnComment
    text
    createdAt
    user {
      username
    }
  }
  creator {
    id
    username
  }
}
    `;
export const User_AllFragmentDoc = gql`
    fragment user_all on User {
  id
  createdAt
  updatedAt
  username
  email
}
    `;
export const CommentPostDocument = gql`
    mutation CommentPost($post: Int!, $comment: String!) {
  addComment(post: $post, comment: $comment) {
    comment {
      userId
      postId
      text
    }
    error {
      field
      message
    }
  }
}
    `;

export function useCommentPostMutation() {
  return Urql.useMutation<CommentPostMutation, CommentPostMutationVariables>(CommentPostDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, password: $password) {
    user {
      ...user_all
    }
    errors {
      field
      message
    }
  }
}
    ${User_AllFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateNewPostDocument = gql`
    mutation CreateNewPost($input: PostInput!) {
  newPost(input: $input) {
    post {
      ...post_all
    }
    errors {
      field
      message
    }
  }
}
    ${Post_AllFragmentDoc}`;

export function useCreateNewPostMutation() {
  return Urql.useMutation<CreateNewPostMutation, CreateNewPostMutationVariables>(CreateNewPostDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($post: Int!) {
  deleteComment(post: $post)
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  delete(id: $id) {
    status
    errors {
      field
      message
    }
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const HitPostDocument = gql`
    mutation HitPost($post: Int!, $value: Int!) {
  hitPost(post: $post, value: $value)
}
    `;

export function useHitPostMutation() {
  return Urql.useMutation<HitPostMutation, HitPostMutationVariables>(HitPostDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...user_all
    }
  }
}
    ${User_AllFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String) {
  register(input: {username: $username, password: $password, email: $email}) {
    errors {
      field
      message
    }
    user {
      ...user_all
    }
  }
}
    ${User_AllFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($current: String!, $new: String!) {
  resetPassword(current: $current, new: $new) {
    status
    errors {
      field
      message
    }
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const TagUserDocument = gql`
    mutation TagUser($friendId: Int!) {
  tagUser(friendId: $friendId)
}
    `;

export function useTagUserMutation() {
  return Urql.useMutation<TagUserMutation, TagUserMutationVariables>(TagUserDocument);
};
export const UntagUserDocument = gql`
    mutation UntagUser($friendId: Int!) {
  untagUser(friendId: $friendId)
}
    `;

export function useUntagUserMutation() {
  return Urql.useMutation<UntagUserMutation, UntagUserMutationVariables>(UntagUserDocument);
};
export const UpdateCommentDocument = gql`
    mutation UpdateComment($post: Int!, $text: String!) {
  updateComment(post: $post, text: $text)
}
    `;

export function useUpdateCommentMutation() {
  return Urql.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $input: PostInput!) {
  updatePost(input: $input, id: $id) {
    post {
      id
      content
      title
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($id: Int!, $values: ProfileInput!) {
  updateProfile(id: $id, input: $values) {
    profile {
      userId
      name
      bio
      sex
    }
    error {
      field
      message
    }
  }
}
    `;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};
export const TaggedUsersDocument = gql`
    query TaggedUsers($id: Int!) {
  tagged(id: $id) {
    taggedUsers {
      id
      isOwnAccount
      username
      isTagged
    }
    error {
      field
      message
    }
  }
}
    `;

export function useTaggedUsersQuery(options: Omit<Urql.UseQueryArgs<TaggedUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TaggedUsersQuery>({ query: TaggedUsersDocument, ...options });
};
export const GetProfileDocument = gql`
    query GetProfile($id: Int!) {
  profile(id: $id) {
    user {
      id
      createdAt
      updatedAt
      username
      isTagged
      profile {
        userId
        isOwnProfile
        name
        bio
        sex
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useGetProfileQuery(options: Omit<Urql.UseQueryArgs<GetProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileQuery>({ query: GetProfileDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...user_all
  }
}
    ${User_AllFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyCommentsDocument = gql`
    query MyComments {
  myComments {
    ...comment_details
  }
}
    ${Comment_DetailsFragmentDoc}`;

export function useMyCommentsQuery(options: Omit<Urql.UseQueryArgs<MyCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyCommentsQuery>({ query: MyCommentsDocument, ...options });
};
export const MyPostsDocument = gql`
    query MyPosts($limit: Int!, $cursor: String) {
  myPosts(limit: $limit, cursor: $cursor) {
    posts {
      ...post_all
    }
    hasMorePosts
  }
}
    ${Post_AllFragmentDoc}`;

export function useMyPostsQuery(options: Omit<Urql.UseQueryArgs<MyPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyPostsQuery>({ query: MyPostsDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    post {
      ...single_post
    }
    errors {
      field
      message
    }
  }
}
    ${Single_PostFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Float!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    posts {
      ...post_all
    }
    hasMorePosts
  }
}
    ${Post_AllFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const GetCommentsDocument = gql`
    query GetComments($id: Int!) {
  userComments(id: $id) {
    ...comment_details
  }
}
    ${Comment_DetailsFragmentDoc}`;

export function useGetCommentsQuery(options: Omit<Urql.UseQueryArgs<GetCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommentsQuery>({ query: GetCommentsDocument, ...options });
};
export const GetUserPostsDocument = gql`
    query GetUserPosts($id: Int!, $limit: Int!, $cursor: String) {
  userPosts(id: $id, limit: $limit, cursor: $cursor) {
    posts {
      ...post_all
    }
    hasMorePosts
  }
}
    ${Post_AllFragmentDoc}`;

export function useGetUserPostsQuery(options: Omit<Urql.UseQueryArgs<GetUserPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserPostsQuery>({ query: GetUserPostsDocument, ...options });
};
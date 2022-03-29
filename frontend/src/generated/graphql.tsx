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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ErrorObj = {
  __typename?: 'ErrorObj';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  loginType: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: UserResponse;
  deletePost: Scalars['Boolean'];
  login: User;
  updatePost: Post;
  validToken: TokenValidationResponse;
};


export type MutationCreatePostArgs = {
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: RegisterInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationValidTokenArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  savedUsers?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type TokenValidationResponse = {
  __typename?: 'TokenValidationResponse';
  errorArr?: Maybe<Array<ErrorObj>>;
  token?: Maybe<UserToken>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errorArr?: Maybe<Array<ErrorObj>>;
  user?: Maybe<User>;
};

export type UserToken = {
  __typename?: 'UserToken';
  id: Scalars['ID'];
  token: Scalars['String'];
};

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', username: string } | null, errorArr?: Array<{ __typename?: 'ErrorObj', field: string, message: string }> | null } };

export type ValidateMutationVariables = Exact<{
  userToken: Scalars['String'];
  email: Scalars['String'];
}>;


export type ValidateMutation = { __typename?: 'Mutation', validToken: { __typename?: 'TokenValidationResponse', token?: { __typename?: 'UserToken', id: string } | null, errorArr?: Array<{ __typename?: 'ErrorObj', field: string, message: string }> | null } };


export const RegisterUserDocument = gql`
    mutation RegisterUser($username: String!, $email: String!, $password: String!) {
  createUser(input: {username: $username, email: $email, password: $password}) {
    user {
      username
    }
    errorArr {
      field
      message
    }
  }
}
    `;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};
export const ValidateDocument = gql`
    mutation Validate($userToken: String!, $email: String!) {
  validToken(token: $userToken, email: $email) {
    token {
      id
    }
    errorArr {
      field
      message
    }
  }
}
    `;

export function useValidateMutation() {
  return Urql.useMutation<ValidateMutation, ValidateMutationVariables>(ValidateDocument);
};
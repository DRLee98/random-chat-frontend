/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type CreateRandomRoomOutput = {
  __typename?: 'CreateRandomRoomOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  room?: Maybe<UserRoomObjectType>;
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  nickname: Scalars['String']['input'];
  profile?: InputMaybe<Scalars['Upload']['input']>;
  socialId: Scalars['String']['input'];
  socialPlatform: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<UserObjectType>;
};

export type DeleteUserOutput = {
  __typename?: 'DeleteUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export enum Language {
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Id = 'id',
  It = 'it',
  Ja = 'ja',
  Ko = 'ko',
  Ru = 'ru',
  Th = 'th',
  Vi = 'vi',
  ZhCn = 'zhCN',
  ZhTw = 'zhTW'
}

export type LoginInput = {
  socialId: Scalars['String']['input'];
  socialPlatform: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Me = {
  __typename?: 'Me';
  allowMessage: Scalars['Boolean']['output'];
  autoTranslation: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  language: Language;
  nickname: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
};

export type MeOutput = {
  __typename?: 'MeOutput';
  error?: Maybe<Scalars['String']['output']>;
  me?: Maybe<Me>;
  ok: Scalars['Boolean']['output'];
};

export type MessageObjectType = {
  __typename?: 'MessageObjectType';
  contents: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  readUsersId: Array<Scalars['Float']['output']>;
  room: Room;
  type: MessageType;
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
};

export enum MessageType {
  Image = 'IMAGE',
  System = 'SYSTEM',
  Text = 'TEXT'
}

export type Messages = {
  __typename?: 'Messages';
  id: Scalars['ID']['output'];
  readUsersId: Array<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyUser: Scalars['Boolean']['output'];
  createRandomRoom: CreateRandomRoomOutput;
  createUser: CreateUserOutput;
  deleteUser: DeleteUserOutput;
  sendMessage: SendMessageOutput;
  toggleBlockUser: ToggleBlockUserOutput;
  updateRoom: UpdateRoomOutput;
  updateUser: UpdateUserOutput;
};


export type MutationCreateManyUserArgs = {
  number: Scalars['Float']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationToggleBlockUserArgs = {
  input: ToggleBlockUserInput;
};


export type MutationUpdateRoomArgs = {
  input: UpdateRoomInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MyRoom = {
  __typename?: 'MyRoom';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastMessage: Scalars['String']['output'];
  name: Scalars['String']['output'];
  newMessage: Scalars['Float']['output'];
  noti: Scalars['Boolean']['output'];
  pinned: Scalars['Boolean']['output'];
  room: Room;
  updatedAt: Scalars['DateTime']['output'];
};

export type MyRoomsInput = {
  page?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type MyRoomsOutput = {
  __typename?: 'MyRoomsOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  ok: Scalars['Boolean']['output'];
  rooms?: Maybe<Array<MyRoom>>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type NewMessageInput = {
  roomId: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  login: LoginOutput;
  me: MeOutput;
  myRooms: MyRoomsOutput;
  randomNickname: RandomNicknameOutput;
  userProfile: UserProfileOutput;
  viewMessages: ViewMessagesOutput;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryMyRoomsArgs = {
  input: MyRoomsInput;
};


export type QueryUserProfileArgs = {
  input: UserProfileInput;
};


export type QueryViewMessagesArgs = {
  input: ViewMessagesInput;
};

export type RandomNicknameOutput = {
  __typename?: 'RandomNicknameOutput';
  error?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ReadMessage = {
  __typename?: 'ReadMessage';
  messages: Array<Messages>;
  roomId: Scalars['Float']['output'];
  userId: Scalars['Float']['output'];
};

export type ReadMessageInput = {
  roomId: Scalars['Float']['input'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  messages: Array<MessageObjectType>;
  updatedAt: Scalars['DateTime']['output'];
  userRooms: Array<UserRoomObjectType>;
};

export type SendMessageInput = {
  contents: Scalars['String']['input'];
  roomId: Scalars['Float']['input'];
  type: MessageType;
};

export type SendMessageOutput = {
  __typename?: 'SendMessageOutput';
  error?: Maybe<Scalars['String']['output']>;
  messageId: Scalars['Float']['output'];
  ok: Scalars['Boolean']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: MessageObjectType;
  newRoom: UserRoomObjectType;
  readMessage: ReadMessage;
  updateNewMessageInUserRoom: UpdateNewMessageInUserRoom;
};


export type SubscriptionNewMessageArgs = {
  input: NewMessageInput;
};


export type SubscriptionReadMessageArgs = {
  input: ReadMessageInput;
};

export type ToggleBlockUserInput = {
  id: Scalars['ID']['input'];
};

export type ToggleBlockUserOutput = {
  __typename?: 'ToggleBlockUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  updateBlockUsers?: Maybe<Array<UserObjectType>>;
};

export type UpdateNewMessageInUserRoom = {
  __typename?: 'UpdateNewMessageInUserRoom';
  id: Scalars['ID']['output'];
  lastMessage: Scalars['String']['output'];
  newMessage: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type UpdateRoomInput = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  noti?: InputMaybe<Scalars['Boolean']['input']>;
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateRoomOutput = {
  __typename?: 'UpdateRoomOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateUserInput = {
  allowMessage?: InputMaybe<Scalars['Boolean']['input']>;
  autoTranslation?: InputMaybe<Scalars['Boolean']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Language>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  profileUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserOutput = {
  __typename?: 'UpdateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language: Language;
  nickname: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
};

export type UserObjectType = {
  __typename?: 'UserObjectType';
  allowMessage: Scalars['Boolean']['output'];
  autoTranslation: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  blockUsers: Array<UserObjectType>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  language: Language;
  messages: Array<MessageObjectType>;
  nickname: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
  rooms: Array<UserRoomObjectType>;
  socialId: Scalars['String']['output'];
  socialPlatform: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserProfileInput = {
  id: Scalars['ID']['input'];
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UserRoomObjectType = {
  __typename?: 'UserRoomObjectType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  newMessage: Scalars['Float']['output'];
  noti: Scalars['Boolean']['output'];
  pinned: Scalars['Boolean']['output'];
  room: Room;
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
};

export type ViewMessagesInput = {
  page?: Scalars['Float']['input'];
  roomId: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type ViewMessagesOutput = {
  __typename?: 'ViewMessagesOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  messages?: Maybe<Array<MessageObjectType>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserOutput', ok: boolean, error?: string | null, user?: { __typename?: 'UserObjectType', id: string } | null } };

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null } };

export type RandomNicknameQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomNicknameQuery = { __typename?: 'Query', randomNickname: { __typename?: 'RandomNicknameOutput', ok: boolean, error?: string | null, nickname?: string | null } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const RandomNicknameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"randomNickname"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomNickname"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<RandomNicknameQuery, RandomNicknameQueryVariables>;
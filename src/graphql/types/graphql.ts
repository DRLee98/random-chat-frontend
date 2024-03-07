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
  room?: Maybe<MyRoom>;
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

export type DeleteRoomInput = {
  roomId: Scalars['Float']['input'];
};

export type DeleteRoomOutput = {
  __typename?: 'DeleteRoomOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
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
  blockUserIds: Array<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
};

export type MeDetail = {
  __typename?: 'MeDetail';
  allowMessage: Scalars['Boolean']['output'];
  autoTranslation: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  blockUsers: Array<UserObjectType>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  language: Language;
  nickname: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
  socialPlatform: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MeDetailOutput = {
  __typename?: 'MeDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  me?: Maybe<MeDetail>;
  ok: Scalars['Boolean']['output'];
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
  deleteRoom: DeleteRoomOutput;
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


export type MutationDeleteRoomArgs = {
  input: DeleteRoomInput;
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
  pinnedAt?: Maybe<Scalars['DateTime']['output']>;
  room: Room;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<SimpleUser>;
};

export type MyRoomsInput = {
  skip?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type MyRoomsOutput = {
  __typename?: 'MyRoomsOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  ok: Scalars['Boolean']['output'];
  rooms?: Maybe<Array<MyRoom>>;
};

export type NewMessageInput = {
  roomId: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  login: LoginOutput;
  me: MeOutput;
  meDetail: MeDetailOutput;
  myRooms: MyRoomsOutput;
  randomNickname: RandomNicknameOutput;
  roomDetail: RoomDetailOutput;
  userProfile: UserProfileOutput;
  viewMessages: ViewMessagesOutput;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryMyRoomsArgs = {
  input: MyRoomsInput;
};


export type QueryRoomDetailArgs = {
  input: RoomDetailInput;
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

export type RoomDetail = {
  __typename?: 'RoomDetail';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  newMessage: Scalars['Float']['output'];
  noti: Scalars['Boolean']['output'];
  pinnedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<UserObjectType>;
};

export type RoomDetailInput = {
  roomId: Scalars['Float']['input'];
};

export type RoomDetailOutput = {
  __typename?: 'RoomDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  room?: Maybe<RoomDetail>;
};

export type SendMessageInput = {
  contents: Scalars['String']['input'];
  roomId: Scalars['Float']['input'];
  type: MessageType;
};

export type SendMessageOutput = {
  __typename?: 'SendMessageOutput';
  error?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['Float']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type SimpleUser = {
  __typename?: 'SimpleUser';
  id: Scalars['ID']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: MessageObjectType;
  newRoom: MyRoom;
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
  name?: InputMaybe<Scalars['String']['input']>;
  noti?: InputMaybe<Scalars['Boolean']['input']>;
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  userRoomId: Scalars['Float']['input'];
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
  pinnedAt?: Maybe<Scalars['DateTime']['output']>;
  room: Room;
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
};

export type ViewMessagesInput = {
  roomId: Scalars['Float']['input'];
  skip?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type ViewMessagesOutput = {
  __typename?: 'ViewMessagesOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  messages?: Maybe<Array<MessageObjectType>>;
  ok: Scalars['Boolean']['output'];
};

export type MessageBaseFragment = { __typename?: 'MessageObjectType', id: string, contents: string, type: MessageType, readUsersId: Array<number>, user: { __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null } };

export type UserRoomBaseFragment = { __typename?: 'UserRoomObjectType', id: string, name: string, noti: boolean, pinnedAt?: any | null, newMessage: number, room: { __typename?: 'Room', id: string } };

export type MyRoomBaseFragment = { __typename?: 'MyRoom', id: string, name: string, noti: boolean, pinnedAt?: any | null, newMessage: number, lastMessage: string, updatedAt: any, room: { __typename?: 'Room', id: string }, users: Array<{ __typename?: 'SimpleUser', profileUrl?: string | null }> };

export type NewMessageSubscriptionVariables = Exact<{
  input: NewMessageInput;
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'MessageObjectType', id: string, contents: string, type: MessageType, readUsersId: Array<number>, user: { __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null } } };

export type ReadMessageSubscriptionVariables = Exact<{
  input: ReadMessageInput;
}>;


export type ReadMessageSubscription = { __typename?: 'Subscription', readMessage: { __typename?: 'ReadMessage', messages: Array<{ __typename?: 'Messages', id: string, readUsersId: Array<number> }> } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessageOutput', ok: boolean, error?: string | null, messageId?: number | null } };

export type UpdateNewMessageInUserRoomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateNewMessageInUserRoomSubscription = { __typename?: 'Subscription', updateNewMessageInUserRoom: { __typename?: 'UpdateNewMessageInUserRoom', id: string, newMessage: number, lastMessage: string, userId: string } };

export type ViewMessagesQueryVariables = Exact<{
  input: ViewMessagesInput;
}>;


export type ViewMessagesQuery = { __typename?: 'Query', viewMessages: { __typename?: 'ViewMessagesOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, messages?: Array<{ __typename?: 'MessageObjectType', id: string, contents: string, type: MessageType, readUsersId: Array<number>, user: { __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null } }> | null } };

export type CreateRandomRoomMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRandomRoomMutation = { __typename?: 'Mutation', createRandomRoom: { __typename?: 'CreateRandomRoomOutput', ok: boolean, error?: string | null, room?: { __typename?: 'MyRoom', id: string, name: string, noti: boolean, pinnedAt?: any | null, newMessage: number, lastMessage: string, updatedAt: any, room: { __typename?: 'Room', id: string }, users: Array<{ __typename?: 'SimpleUser', profileUrl?: string | null }> } | null } };

export type DeleteRoomMutationVariables = Exact<{
  input: DeleteRoomInput;
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: { __typename?: 'DeleteRoomOutput', ok: boolean, error?: string | null } };

export type MyRoomsQueryVariables = Exact<{
  input: MyRoomsInput;
}>;


export type MyRoomsQuery = { __typename?: 'Query', myRooms: { __typename?: 'MyRoomsOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, rooms?: Array<{ __typename?: 'MyRoom', id: string, name: string, noti: boolean, pinnedAt?: any | null, newMessage: number, lastMessage: string, updatedAt: any, room: { __typename?: 'Room', id: string }, users: Array<{ __typename?: 'SimpleUser', profileUrl?: string | null }> }> | null } };

export type NewRoomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewRoomSubscription = { __typename?: 'Subscription', newRoom: { __typename?: 'MyRoom', id: string, name: string, noti: boolean, pinnedAt?: any | null, newMessage: number, lastMessage: string, updatedAt: any, room: { __typename?: 'Room', id: string }, users: Array<{ __typename?: 'SimpleUser', profileUrl?: string | null }> } };

export type RoomDetailQueryVariables = Exact<{
  input: RoomDetailInput;
}>;


export type RoomDetailQuery = { __typename?: 'Query', roomDetail: { __typename?: 'RoomDetailOutput', ok: boolean, error?: string | null, room?: { __typename?: 'RoomDetail', id: string, name: string, noti: boolean, pinnedAt?: any | null, newMessage: number, users: Array<{ __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null, bio?: string | null, language: Language }> } | null } };

export type UpdateRoomMutationVariables = Exact<{
  input: UpdateRoomInput;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoom: { __typename?: 'UpdateRoomOutput', ok: boolean, error?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserOutput', ok: boolean, error?: string | null, user?: { __typename?: 'UserObjectType', id: string } | null } };

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', ok: boolean, error?: string | null, me?: { __typename?: 'Me', id: string, nickname: string, profileUrl?: string | null, blockUserIds: Array<number> } | null } };

export type MeDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type MeDetailQuery = { __typename?: 'Query', meDetail: { __typename?: 'MeDetailOutput', ok: boolean, error?: string | null, me?: { __typename?: 'MeDetail', id: string, nickname: string, profileUrl?: string | null, bio?: string | null, socialPlatform: string, allowMessage: boolean, language: Language, autoTranslation: boolean, blockUsers: Array<{ __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null }> } | null } };

export type RandomNicknameQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomNicknameQuery = { __typename?: 'Query', randomNickname: { __typename?: 'RandomNicknameOutput', ok: boolean, error?: string | null, nickname?: string | null } };

export type ToggleBlockUserMutationVariables = Exact<{
  input: ToggleBlockUserInput;
}>;


export type ToggleBlockUserMutation = { __typename?: 'Mutation', toggleBlockUser: { __typename?: 'ToggleBlockUserOutput', ok: boolean, error?: string | null, updateBlockUsers?: Array<{ __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null }> | null } };

export type UserProfileQueryVariables = Exact<{
  input: UserProfileInput;
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'UserProfileOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: string, nickname: string, profileUrl?: string | null, bio?: string | null } | null } };

export const MessageBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]} as unknown as DocumentNode<MessageBaseFragment, unknown>;
export const UserRoomBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserRoomObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UserRoomBaseFragment, unknown>;
export const MyRoomBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyRoomBaseFragment, unknown>;
export const NewMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageBase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]} as unknown as DocumentNode<NewMessageSubscription, NewMessageSubscriptionVariables>;
export const ReadMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"readMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReadMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}}]}}]}}]}}]} as unknown as DocumentNode<ReadMessageSubscription, ReadMessageSubscriptionVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateNewMessageInUserRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"updateNewMessageInUserRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNewMessageInUserRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UpdateNewMessageInUserRoomSubscription, UpdateNewMessageInUserRoomSubscriptionVariables>;
export const ViewMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"viewMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ViewMessagesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]} as unknown as DocumentNode<ViewMessagesQuery, ViewMessagesQueryVariables>;
export const CreateRandomRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRandomRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRandomRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyRoomBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateRandomRoomMutation, CreateRandomRoomMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const MyRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myRooms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoomsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myRooms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyRoomBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyRoomsQuery, MyRoomsQueryVariables>;
export const NewRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyRoomBase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<NewRoomSubscription, NewRoomSubscriptionVariables>;
export const RoomDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"roomDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoomDetailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomDetailQuery, RoomDetailQueryVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"blockUserIds"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MeDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"meDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"socialPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"allowMessage"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"autoTranslation"}},{"kind":"Field","name":{"kind":"Name","value":"blockUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeDetailQuery, MeDetailQueryVariables>;
export const RandomNicknameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"randomNickname"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomNickname"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<RandomNicknameQuery, RandomNicknameQueryVariables>;
export const ToggleBlockUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleBlockUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ToggleBlockUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleBlockUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"updateBlockUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleBlockUserMutation, ToggleBlockUserMutationVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
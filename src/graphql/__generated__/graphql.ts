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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type CommentCountInput = {
  postId: Scalars['ID']['input'];
};

export type CommentCountOutput = {
  __typename?: 'CommentCountOutput';
  count?: Maybe<Scalars['Float']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CommentObjectType = {
  __typename?: 'CommentObjectType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  postId: Scalars['ID']['output'];
  replies: Array<ReplyObjectType>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
};

export type CreateCommentInput = {
  postId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateCommentOutput = {
  __typename?: 'CreateCommentOutput';
  comment?: Maybe<CommentObjectType>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateNoticeInput = {
  category: NoticeCategory;
  content: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type CreateNoticeOutput = {
  __typename?: 'CreateNoticeOutput';
  error?: Maybe<Scalars['String']['output']>;
  notice?: Maybe<NoticeObjectType>;
  ok: Scalars['Boolean']['output'];
};

export type CreateNotificationInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: NotificationType;
};

export type CreateNotificationOutput = {
  __typename?: 'CreateNotificationOutput';
  error?: Maybe<Scalars['String']['output']>;
  notification?: Maybe<NotificationObjectType>;
  ok: Scalars['Boolean']['output'];
};

export type CreateOpinionInput = {
  category: OpinionCategory;
  content: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['Upload']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateOpinionOutput = {
  __typename?: 'CreateOpinionOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  opinion?: Maybe<OpinionObjectType>;
};

export type CreateRandomRoomOutput = {
  __typename?: 'CreateRandomRoomOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  room?: Maybe<MyRoom>;
};

export type CreateReplyInput = {
  commentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateReplyOutput = {
  __typename?: 'CreateReplyOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  reply?: Maybe<ReplyObjectType>;
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  nickname: Scalars['String']['input'];
  profile?: InputMaybe<Scalars['Upload']['input']>;
  profileBgColor: Scalars['String']['input'];
  profileTextColor: Scalars['String']['input'];
  socialId: Scalars['String']['input'];
  socialPlatform: SocialPlatform;
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<UserObjectType>;
};

export type DeleteCommentInput = {
  id: Scalars['ID']['input'];
};

export type DeleteCommentOutput = {
  __typename?: 'DeleteCommentOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteNoticeInput = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};

export type DeleteNoticeOutput = {
  __typename?: 'DeleteNoticeOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteNotificationInput = {
  id: Scalars['ID']['input'];
};

export type DeleteNotificationOutput = {
  __typename?: 'DeleteNotificationOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteOpinionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteOpinionOutput = {
  __typename?: 'DeleteOpinionOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteReadNotificationsOutput = {
  __typename?: 'DeleteReadNotificationsOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteReplyInput = {
  id: Scalars['ID']['input'];
};

export type DeleteReplyOutput = {
  __typename?: 'DeleteReplyOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteRoomInput = {
  roomId: Scalars['ID']['input'];
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

export type EditCommentInput = {
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type EditCommentOutput = {
  __typename?: 'EditCommentOutput';
  comment?: Maybe<CommentObjectType>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type EditNoticeInput = {
  category?: InputMaybe<NoticeCategory>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditNoticeOutput = {
  __typename?: 'EditNoticeOutput';
  error?: Maybe<Scalars['String']['output']>;
  notice?: Maybe<NoticeObjectType>;
  ok: Scalars['Boolean']['output'];
};

export type EditOpinionInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<Scalars['Upload']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditOpinionOutput = {
  __typename?: 'EditOpinionOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  opinion?: Maybe<OpinionObjectType>;
};

export type EditReplyInput = {
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type EditReplyOutput = {
  __typename?: 'EditReplyOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  reply?: Maybe<ReplyObjectType>;
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
  socialPlatform: SocialPlatform;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Me = {
  __typename?: 'Me';
  blockUserIds: Array<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  profileBgColor: Scalars['String']['output'];
  profileTextColor: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
};

export type MeDetail = {
  __typename?: 'MeDetail';
  allowMessage: Scalars['Boolean']['output'];
  autoTranslation: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  blockUsers: Array<UserObjectType>;
  comments: Array<CommentObjectType>;
  createdAt: Scalars['DateTime']['output'];
  fcmToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language: Language;
  nickname: Scalars['String']['output'];
  noti: Scalars['Boolean']['output'];
  notifications: Array<NotificationObjectType>;
  opinions: Array<OpinionObjectType>;
  profileBgColor: Scalars['String']['output'];
  profileTextColor: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
  replies: Array<ReplyObjectType>;
  socialPlatform: SocialPlatform;
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
  readUsersId: Array<Scalars['ID']['output']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CreateCommentOutput;
  createNotice: CreateNoticeOutput;
  createNotification: CreateNotificationOutput;
  createOpinion: CreateOpinionOutput;
  createRandomRoom: CreateRandomRoomOutput;
  createReply: CreateReplyOutput;
  createUser: CreateUserOutput;
  deleteComment: DeleteCommentOutput;
  deleteNotice: DeleteNoticeOutput;
  deleteNotification: DeleteNotificationOutput;
  deleteOpinion: DeleteOpinionOutput;
  deleteReadNotifications: DeleteReadNotificationsOutput;
  deleteReply: DeleteReplyOutput;
  deleteRoom: DeleteRoomOutput;
  deleteUser: DeleteUserOutput;
  editComment: EditCommentOutput;
  editNotice: EditNoticeOutput;
  editOpinion: EditOpinionOutput;
  editReply: EditReplyOutput;
  readAllNotifications: ReadAllNotificationsOutput;
  readNotification: ReadNotificationOutput;
  sendMessage: SendMessageOutput;
  toggleBlockUser: ToggleBlockUserOutput;
  updateOpinionStatus: UpdateOpinionStatusOutput;
  updateRoom: UpdateRoomOutput;
  updateUser: UpdateUserOutput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateNoticeArgs = {
  input: CreateNoticeInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreateOpinionArgs = {
  input: CreateOpinionInput;
};


export type MutationCreateReplyArgs = {
  input: CreateReplyInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteNoticeArgs = {
  input: DeleteNoticeInput;
};


export type MutationDeleteNotificationArgs = {
  input: DeleteNotificationInput;
};


export type MutationDeleteOpinionArgs = {
  input: DeleteOpinionInput;
};


export type MutationDeleteReplyArgs = {
  input: DeleteReplyInput;
};


export type MutationDeleteRoomArgs = {
  input: DeleteRoomInput;
};


export type MutationEditCommentArgs = {
  input: EditCommentInput;
};


export type MutationEditNoticeArgs = {
  input: EditNoticeInput;
};


export type MutationEditOpinionArgs = {
  input: EditOpinionInput;
};


export type MutationEditReplyArgs = {
  input: EditReplyInput;
};


export type MutationReadNotificationArgs = {
  input: ReadNotificationInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationToggleBlockUserArgs = {
  input: ToggleBlockUserInput;
};


export type MutationUpdateOpinionStatusArgs = {
  input: UpdateOpinionStatusInput;
};


export type MutationUpdateRoomArgs = {
  input: UpdateRoomInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MyOpinionsInput = {
  skip?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type MyOpinionsOutput = {
  __typename?: 'MyOpinionsOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  ok: Scalars['Boolean']['output'];
  opinions?: Maybe<Array<OpinionObjectType>>;
};

export type MyRoom = {
  __typename?: 'MyRoom';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastMessage: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
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

export type NewCommentInput = {
  postId: Scalars['ID']['input'];
};

export type NewMessageInput = {
  roomId: Scalars['ID']['input'];
};

export enum NoticeCategory {
  Event = 'EVENT',
  Info = 'INFO',
  Inspection = 'INSPECTION',
  Update = 'UPDATE'
}

export type NoticeInput = {
  id: Scalars['ID']['input'];
};

export type NoticeListInput = {
  category?: InputMaybe<NoticeCategory>;
  skip?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type NoticeListOutput = {
  __typename?: 'NoticeListOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  noticeList?: Maybe<Array<NoticeObjectType>>;
  ok: Scalars['Boolean']['output'];
};

export type NoticeObjectType = {
  __typename?: 'NoticeObjectType';
  category: NoticeCategory;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  pinned?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NoticeOutput = {
  __typename?: 'NoticeOutput';
  error?: Maybe<Scalars['String']['output']>;
  notice?: Maybe<NoticeObjectType>;
  ok: Scalars['Boolean']['output'];
};

export type NotificationObjectType = {
  __typename?: 'NotificationObjectType';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
};

export enum NotificationType {
  Event = 'EVENT',
  Message = 'MESSAGE',
  Opinion = 'OPINION',
  Room = 'ROOM',
  System = 'SYSTEM'
}

export enum OpinionCategory {
  Bug = 'BUG',
  Etc = 'ETC',
  Imporve = 'IMPORVE',
  Inquiry = 'INQUIRY'
}

export type OpinionDetailInput = {
  id: Scalars['ID']['input'];
};

export type OpinionDetailOutput = {
  __typename?: 'OpinionDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  opinion?: Maybe<OpinionObjectType>;
};

export type OpinionObjectType = {
  __typename?: 'OpinionObjectType';
  category: OpinionCategory;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imageUrls?: Maybe<Array<Scalars['String']['output']>>;
  status: OpinionStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
};

export enum OpinionStatus {
  Answered = 'ANSWERED',
  Read = 'READ',
  Waiting = 'WAITING'
}

export type Query = {
  __typename?: 'Query';
  commentCount: CommentCountOutput;
  login: LoginOutput;
  me: MeOutput;
  meDetail: MeDetailOutput;
  myOpinions: MyOpinionsOutput;
  myRooms: MyRoomsOutput;
  notice: NoticeOutput;
  noticeList: NoticeListOutput;
  opinionDetail: OpinionDetailOutput;
  randomNickname: RandomNicknameOutput;
  replyCount: ReplyCountOutput;
  roomDetail: RoomDetailOutput;
  unReadNotificationCount: UnReadNotificationCountOutput;
  userProfile: UserProfileOutput;
  viewComments: ViewCommentsOutput;
  viewMessages: ViewMessagesOutput;
  viewNotifications: ViewNotificationsOutput;
  viewReplies: ViewRepliesOutput;
};


export type QueryCommentCountArgs = {
  input: CommentCountInput;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryMyOpinionsArgs = {
  input: MyOpinionsInput;
};


export type QueryMyRoomsArgs = {
  input: MyRoomsInput;
};


export type QueryNoticeArgs = {
  input: NoticeInput;
};


export type QueryNoticeListArgs = {
  input: NoticeListInput;
};


export type QueryOpinionDetailArgs = {
  input: OpinionDetailInput;
};


export type QueryReplyCountArgs = {
  input: ReplyCountInput;
};


export type QueryRoomDetailArgs = {
  input: RoomDetailInput;
};


export type QueryUserProfileArgs = {
  input: UserProfileInput;
};


export type QueryViewCommentsArgs = {
  input: ViewCommentsInput;
};


export type QueryViewMessagesArgs = {
  input: ViewMessagesInput;
};


export type QueryViewNotificationsArgs = {
  input: ViewNotificationsInput;
};


export type QueryViewRepliesArgs = {
  input: ViewRepliesInput;
};

export type RandomNicknameOutput = {
  __typename?: 'RandomNicknameOutput';
  error?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ReadAllNotificationsOutput = {
  __typename?: 'ReadAllNotificationsOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ReadMessage = {
  __typename?: 'ReadMessage';
  messages: Array<MessageObjectType>;
  roomId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type ReadMessageInput = {
  roomId: Scalars['ID']['input'];
};

export type ReadNotificationInput = {
  id: Scalars['ID']['input'];
};

export type ReadNotificationOutput = {
  __typename?: 'ReadNotificationOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ReplyCountInput = {
  commentId: Scalars['ID']['input'];
};

export type ReplyCountOutput = {
  __typename?: 'ReplyCountOutput';
  count?: Maybe<Scalars['Float']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ReplyObjectType = {
  __typename?: 'ReplyObjectType';
  comment: CommentObjectType;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
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
  userRoom: SimpleUserRoom;
  users: Array<UserObjectType>;
};

export type RoomDetailInput = {
  roomId: Scalars['ID']['input'];
};

export type RoomDetailOutput = {
  __typename?: 'RoomDetailOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  room?: Maybe<RoomDetail>;
};

export type SendMessageInput = {
  contents: Scalars['String']['input'];
  roomId: Scalars['ID']['input'];
  type: MessageType;
};

export type SendMessageOutput = {
  __typename?: 'SendMessageOutput';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<MessageObjectType>;
  ok: Scalars['Boolean']['output'];
};

export type SimpleUser = {
  __typename?: 'SimpleUser';
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  profileBgColor: Scalars['String']['output'];
  profileTextColor: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
};

export type SimpleUserRoom = {
  __typename?: 'SimpleUserRoom';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  newMessage: Scalars['Float']['output'];
  noti: Scalars['Boolean']['output'];
  pinnedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum SocialPlatform {
  Apple = 'APPLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER'
}

export type Subscription = {
  __typename?: 'Subscription';
  newComment: CommentObjectType;
  newMessage: MessageObjectType;
  newNotification: NotificationObjectType;
  newRoom: MyRoom;
  readMessage: ReadMessage;
  updateNewMessageInUserRoom: UpdateNewMessageInUserRoom;
};


export type SubscriptionNewCommentArgs = {
  input: NewCommentInput;
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

export type UnReadNotificationCountOutput = {
  __typename?: 'UnReadNotificationCountOutput';
  count?: Maybe<Scalars['Float']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateNewMessageInUserRoom = {
  __typename?: 'UpdateNewMessageInUserRoom';
  id: Scalars['ID']['output'];
  lastMessage: Scalars['String']['output'];
  newMessage: Scalars['Float']['output'];
  roomId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type UpdateOpinionStatusInput = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
  status: OpinionStatus;
};

export type UpdateOpinionStatusOutput = {
  __typename?: 'UpdateOpinionStatusOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateRoomInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  noti?: InputMaybe<Scalars['Boolean']['input']>;
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  userRoomId: Scalars['ID']['input'];
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
  fcmToken?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Language>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  noti?: InputMaybe<Scalars['Boolean']['input']>;
  profile?: InputMaybe<Scalars['Upload']['input']>;
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
  profileBgColor: Scalars['String']['output'];
  profileTextColor: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
};

export type UserObjectType = {
  __typename?: 'UserObjectType';
  allowMessage: Scalars['Boolean']['output'];
  autoTranslation: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  blockUsers: Array<UserObjectType>;
  comments: Array<CommentObjectType>;
  createdAt: Scalars['DateTime']['output'];
  fcmToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language: Language;
  messages: Array<MessageObjectType>;
  nickname: Scalars['String']['output'];
  noti: Scalars['Boolean']['output'];
  notifications: Array<NotificationObjectType>;
  opinions: Array<OpinionObjectType>;
  profileBgColor: Scalars['String']['output'];
  profileTextColor: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
  replies: Array<ReplyObjectType>;
  rooms: Array<UserRoomObjectType>;
  socialId: Scalars['String']['output'];
  socialPlatform: SocialPlatform;
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
  name?: Maybe<Scalars['String']['output']>;
  newMessage: Scalars['Float']['output'];
  noti: Scalars['Boolean']['output'];
  pinnedAt?: Maybe<Scalars['DateTime']['output']>;
  room: Room;
  updatedAt: Scalars['DateTime']['output'];
  user: UserObjectType;
};

export type ViewCommentsInput = {
  postId: Scalars['ID']['input'];
  skip?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type ViewCommentsOutput = {
  __typename?: 'ViewCommentsOutput';
  comments?: Maybe<Array<CommentObjectType>>;
  error?: Maybe<Scalars['String']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ViewMessagesInput = {
  roomId: Scalars['ID']['input'];
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

export type ViewNotificationsInput = {
  skip?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type ViewNotificationsOutput = {
  __typename?: 'ViewNotificationsOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  notifications?: Maybe<Array<NotificationObjectType>>;
  ok: Scalars['Boolean']['output'];
};

export type ViewRepliesInput = {
  commentId: Scalars['ID']['input'];
  skip?: Scalars['Float']['input'];
  take?: Scalars['Float']['input'];
};

export type ViewRepliesOutput = {
  __typename?: 'ViewRepliesOutput';
  error?: Maybe<Scalars['String']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  ok: Scalars['Boolean']['output'];
  replies?: Maybe<Array<ReplyObjectType>>;
};

export type CommentBaseFragment = { __typename?: 'CommentObjectType', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string } } & { ' $fragmentName'?: 'CommentBaseFragment' };

export type MessageBaseFragment = { __typename?: 'MessageObjectType', id: string, contents: string, type: MessageType, readUsersId: Array<string>, createdAt: any, user: { __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string } } & { ' $fragmentName'?: 'MessageBaseFragment' };

export type NotificationBaseFragment = { __typename?: 'NotificationObjectType', id: string, title: string, message: string, read: boolean, type: NotificationType, data?: any | null, createdAt: any } & { ' $fragmentName'?: 'NotificationBaseFragment' };

export type OpinionBaseFragment = { __typename?: 'OpinionObjectType', id: string, title: string, content: string, imageUrls?: Array<string> | null, category: OpinionCategory, status: OpinionStatus, createdAt: any, updatedAt: any } & { ' $fragmentName'?: 'OpinionBaseFragment' };

export type ReplyBaseFragment = { __typename?: 'ReplyObjectType', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null } } & { ' $fragmentName'?: 'ReplyBaseFragment' };

export type UserRoomBaseFragment = { __typename?: 'UserRoomObjectType', id: string, name?: string | null, noti: boolean, pinnedAt?: any | null, newMessage: number, room: { __typename?: 'Room', id: string } } & { ' $fragmentName'?: 'UserRoomBaseFragment' };

export type MyRoomBaseFragment = { __typename?: 'MyRoom', id: string, name?: string | null, noti: boolean, pinnedAt?: any | null, newMessage: number, lastMessage: string, updatedAt: any, room: { __typename?: 'Room', id: string, updatedAt: any }, users: Array<{ __typename?: 'SimpleUser', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string }> } & { ' $fragmentName'?: 'MyRoomBaseFragment' };

export type BlockUserFragment = { __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string, bio?: string | null } & { ' $fragmentName'?: 'BlockUserFragment' };

export type CommentCountQueryVariables = Exact<{
  input: CommentCountInput;
}>;


export type CommentCountQuery = { __typename?: 'Query', commentCount: { __typename?: 'CommentCountOutput', ok: boolean, error?: string | null, count?: number | null } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentOutput', ok: boolean, error?: string | null, comment?: (
      { __typename?: 'CommentObjectType' }
      & { ' $fragmentRefs'?: { 'CommentBaseFragment': CommentBaseFragment } }
    ) | null } };

export type DeleteCommentMutationVariables = Exact<{
  input: DeleteCommentInput;
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteCommentOutput', ok: boolean, error?: string | null } };

export type EditCommentMutationVariables = Exact<{
  input: EditCommentInput;
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'EditCommentOutput', ok: boolean, error?: string | null, comment?: (
      { __typename?: 'CommentObjectType' }
      & { ' $fragmentRefs'?: { 'CommentBaseFragment': CommentBaseFragment } }
    ) | null } };

export type NewCommentSubscriptionVariables = Exact<{
  input: NewCommentInput;
}>;


export type NewCommentSubscription = { __typename?: 'Subscription', newComment: (
    { __typename?: 'CommentObjectType' }
    & { ' $fragmentRefs'?: { 'CommentBaseFragment': CommentBaseFragment } }
  ) };

export type ViewCommentsQueryVariables = Exact<{
  input: ViewCommentsInput;
}>;


export type ViewCommentsQuery = { __typename?: 'Query', viewComments: { __typename?: 'ViewCommentsOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, comments?: Array<(
      { __typename?: 'CommentObjectType' }
      & { ' $fragmentRefs'?: { 'CommentBaseFragment': CommentBaseFragment } }
    )> | null } };

export type NewMessageSubscriptionVariables = Exact<{
  input: NewMessageInput;
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: (
    { __typename?: 'MessageObjectType' }
    & { ' $fragmentRefs'?: { 'MessageBaseFragment': MessageBaseFragment } }
  ) };

export type ReadMessageSubscriptionVariables = Exact<{
  input: ReadMessageInput;
}>;


export type ReadMessageSubscription = { __typename?: 'Subscription', readMessage: { __typename?: 'ReadMessage', messages: Array<{ __typename?: 'MessageObjectType', id: string, readUsersId: Array<string> }> } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessageOutput', ok: boolean, error?: string | null, message?: (
      { __typename?: 'MessageObjectType' }
      & { ' $fragmentRefs'?: { 'MessageBaseFragment': MessageBaseFragment } }
    ) | null } };

export type UpdateNewMessageInUserRoomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateNewMessageInUserRoomSubscription = { __typename?: 'Subscription', updateNewMessageInUserRoom: { __typename?: 'UpdateNewMessageInUserRoom', id: string, newMessage: number, lastMessage: string, userId: string, roomId: string } };

export type ViewMessagesQueryVariables = Exact<{
  input: ViewMessagesInput;
}>;


export type ViewMessagesQuery = { __typename?: 'Query', viewMessages: { __typename?: 'ViewMessagesOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, messages?: Array<(
      { __typename?: 'MessageObjectType' }
      & { ' $fragmentRefs'?: { 'MessageBaseFragment': MessageBaseFragment } }
    )> | null } };

export type NoticeQueryVariables = Exact<{
  input: NoticeInput;
}>;


export type NoticeQuery = { __typename?: 'Query', notice: { __typename?: 'NoticeOutput', ok: boolean, error?: string | null, notice?: { __typename?: 'NoticeObjectType', id: string, title: string, content: string, pinned?: boolean | null, createdAt: any } | null } };

export type NoticeListQueryVariables = Exact<{
  input: NoticeListInput;
}>;


export type NoticeListQuery = { __typename?: 'Query', noticeList: { __typename?: 'NoticeListOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, noticeList?: Array<{ __typename?: 'NoticeObjectType', id: string, title: string, pinned?: boolean | null, createdAt: any }> | null } };

export type DeleteNotificationMutationVariables = Exact<{
  input: DeleteNotificationInput;
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: { __typename?: 'DeleteNotificationOutput', ok: boolean, error?: string | null } };

export type DeleteReadNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteReadNotificationsMutation = { __typename?: 'Mutation', deleteReadNotifications: { __typename?: 'DeleteReadNotificationsOutput', ok: boolean, error?: string | null } };

export type NewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: (
    { __typename?: 'NotificationObjectType' }
    & { ' $fragmentRefs'?: { 'NotificationBaseFragment': NotificationBaseFragment } }
  ) };

export type ReadAllNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadAllNotificationsMutation = { __typename?: 'Mutation', readAllNotifications: { __typename?: 'ReadAllNotificationsOutput', ok: boolean, error?: string | null } };

export type ReadNotificationMutationVariables = Exact<{
  input: ReadNotificationInput;
}>;


export type ReadNotificationMutation = { __typename?: 'Mutation', readNotification: { __typename?: 'ReadNotificationOutput', ok: boolean, error?: string | null } };

export type UnReadNotificationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UnReadNotificationCountQuery = { __typename?: 'Query', unReadNotificationCount: { __typename?: 'UnReadNotificationCountOutput', ok: boolean, error?: string | null, count?: number | null } };

export type ViewNotificationsQueryVariables = Exact<{
  input: ViewNotificationsInput;
}>;


export type ViewNotificationsQuery = { __typename?: 'Query', viewNotifications: { __typename?: 'ViewNotificationsOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, notifications?: Array<(
      { __typename?: 'NotificationObjectType' }
      & { ' $fragmentRefs'?: { 'NotificationBaseFragment': NotificationBaseFragment } }
    )> | null } };

export type CreateOpinionMutationVariables = Exact<{
  input: CreateOpinionInput;
}>;


export type CreateOpinionMutation = { __typename?: 'Mutation', createOpinion: { __typename?: 'CreateOpinionOutput', ok: boolean, error?: string | null, opinion?: (
      { __typename?: 'OpinionObjectType' }
      & { ' $fragmentRefs'?: { 'OpinionBaseFragment': OpinionBaseFragment } }
    ) | null } };

export type DeleteOpinionMutationVariables = Exact<{
  input: DeleteOpinionInput;
}>;


export type DeleteOpinionMutation = { __typename?: 'Mutation', deleteOpinion: { __typename?: 'DeleteOpinionOutput', ok: boolean, error?: string | null } };

export type EditOpinionMutationVariables = Exact<{
  input: EditOpinionInput;
}>;


export type EditOpinionMutation = { __typename?: 'Mutation', editOpinion: { __typename?: 'EditOpinionOutput', ok: boolean, error?: string | null, opinion?: (
      { __typename?: 'OpinionObjectType' }
      & { ' $fragmentRefs'?: { 'OpinionBaseFragment': OpinionBaseFragment } }
    ) | null } };

export type MyOpinionsQueryVariables = Exact<{
  input: MyOpinionsInput;
}>;


export type MyOpinionsQuery = { __typename?: 'Query', myOpinions: { __typename?: 'MyOpinionsOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, opinions?: Array<{ __typename?: 'OpinionObjectType', id: string, title: string, category: OpinionCategory, status: OpinionStatus, createdAt: any, updatedAt: any }> | null } };

export type OpinionDetailQueryVariables = Exact<{
  input: OpinionDetailInput;
}>;


export type OpinionDetailQuery = { __typename?: 'Query', opinionDetail: { __typename?: 'OpinionDetailOutput', ok: boolean, error?: string | null, opinion?: (
      { __typename?: 'OpinionObjectType' }
      & { ' $fragmentRefs'?: { 'OpinionBaseFragment': OpinionBaseFragment } }
    ) | null } };

export type CreateReplyMutationVariables = Exact<{
  input: CreateReplyInput;
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'CreateReplyOutput', ok: boolean, error?: string | null, reply?: (
      { __typename?: 'ReplyObjectType' }
      & { ' $fragmentRefs'?: { 'ReplyBaseFragment': ReplyBaseFragment } }
    ) | null } };

export type DeleteReplyMutationVariables = Exact<{
  input: DeleteReplyInput;
}>;


export type DeleteReplyMutation = { __typename?: 'Mutation', deleteReply: { __typename?: 'DeleteReplyOutput', ok: boolean, error?: string | null } };

export type EditReplyMutationVariables = Exact<{
  input: EditReplyInput;
}>;


export type EditReplyMutation = { __typename?: 'Mutation', editReply: { __typename?: 'EditReplyOutput', ok: boolean, error?: string | null, reply?: (
      { __typename?: 'ReplyObjectType' }
      & { ' $fragmentRefs'?: { 'ReplyBaseFragment': ReplyBaseFragment } }
    ) | null } };

export type ReplyCountQueryVariables = Exact<{
  input: ReplyCountInput;
}>;


export type ReplyCountQuery = { __typename?: 'Query', replyCount: { __typename?: 'ReplyCountOutput', ok: boolean, error?: string | null, count?: number | null } };

export type ViewRepliesQueryVariables = Exact<{
  input: ViewRepliesInput;
}>;


export type ViewRepliesQuery = { __typename?: 'Query', viewReplies: { __typename?: 'ViewRepliesOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, replies?: Array<(
      { __typename?: 'ReplyObjectType' }
      & { ' $fragmentRefs'?: { 'ReplyBaseFragment': ReplyBaseFragment } }
    )> | null } };

export type CreateRandomRoomMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRandomRoomMutation = { __typename?: 'Mutation', createRandomRoom: { __typename?: 'CreateRandomRoomOutput', ok: boolean, error?: string | null, room?: (
      { __typename?: 'MyRoom' }
      & { ' $fragmentRefs'?: { 'MyRoomBaseFragment': MyRoomBaseFragment } }
    ) | null } };

export type DeleteRoomMutationVariables = Exact<{
  input: DeleteRoomInput;
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: { __typename?: 'DeleteRoomOutput', ok: boolean, error?: string | null } };

export type MyRoomsQueryVariables = Exact<{
  input: MyRoomsInput;
}>;


export type MyRoomsQuery = { __typename?: 'Query', myRooms: { __typename?: 'MyRoomsOutput', ok: boolean, error?: string | null, hasNext?: boolean | null, rooms?: Array<(
      { __typename?: 'MyRoom' }
      & { ' $fragmentRefs'?: { 'MyRoomBaseFragment': MyRoomBaseFragment } }
    )> | null } };

export type NewRoomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewRoomSubscription = { __typename?: 'Subscription', newRoom: (
    { __typename?: 'MyRoom' }
    & { ' $fragmentRefs'?: { 'MyRoomBaseFragment': MyRoomBaseFragment } }
  ) };

export type RoomDetailQueryVariables = Exact<{
  input: RoomDetailInput;
}>;


export type RoomDetailQuery = { __typename?: 'Query', roomDetail: { __typename?: 'RoomDetailOutput', ok: boolean, error?: string | null, room?: { __typename?: 'RoomDetail', userRoom: { __typename?: 'SimpleUserRoom', id: string, name?: string | null, noti: boolean, pinnedAt?: any | null, newMessage: number }, users: Array<{ __typename?: 'UserObjectType', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string, bio?: string | null, language: Language }> } | null } };

export type UpdateRoomMutationVariables = Exact<{
  input: UpdateRoomInput;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoom: { __typename?: 'UpdateRoomOutput', ok: boolean, error?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserOutput', ok: boolean, error?: string | null, user?: { __typename?: 'UserObjectType', id: string } | null } };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'DeleteUserOutput', ok: boolean, error?: string | null } };

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', ok: boolean, error?: string | null, me?: { __typename?: 'Me', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string, blockUserIds: Array<string> } | null } };

export type MeDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type MeDetailQuery = { __typename?: 'Query', meDetail: { __typename?: 'MeDetailOutput', ok: boolean, error?: string | null, me?: { __typename?: 'MeDetail', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string, bio?: string | null, socialPlatform: SocialPlatform, noti: boolean, allowMessage: boolean, language: Language, autoTranslation: boolean, blockUsers: Array<(
        { __typename?: 'UserObjectType' }
        & { ' $fragmentRefs'?: { 'BlockUserFragment': BlockUserFragment } }
      )> } | null } };

export type RandomNicknameQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomNicknameQuery = { __typename?: 'Query', randomNickname: { __typename?: 'RandomNicknameOutput', ok: boolean, error?: string | null, nickname?: string | null } };

export type ToggleBlockUserMutationVariables = Exact<{
  input: ToggleBlockUserInput;
}>;


export type ToggleBlockUserMutation = { __typename?: 'Mutation', toggleBlockUser: { __typename?: 'ToggleBlockUserOutput', ok: boolean, error?: string | null, updateBlockUsers?: Array<(
      { __typename?: 'UserObjectType' }
      & { ' $fragmentRefs'?: { 'BlockUserFragment': BlockUserFragment } }
    )> | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserOutput', ok: boolean, error?: string | null } };

export type UserProfileQueryVariables = Exact<{
  input: UserProfileInput;
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'UserProfileOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: string, nickname: string, profileUrl?: string | null, profileBgColor: string, profileTextColor: string, bio?: string | null } | null } };

export const CommentBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}}]}}]} as unknown as DocumentNode<CommentBaseFragment, unknown>;
export const MessageBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<MessageBaseFragment, unknown>;
export const NotificationBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<NotificationBaseFragment, unknown>;
export const OpinionBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OpinionBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpinionObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<OpinionBaseFragment, unknown>;
export const ReplyBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]} as unknown as DocumentNode<ReplyBaseFragment, unknown>;
export const UserRoomBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserRoomObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UserRoomBaseFragment, unknown>;
export const MyRoomBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyRoomBaseFragment, unknown>;
export const BlockUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlockUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]} as unknown as DocumentNode<BlockUserFragment, unknown>;
export const CommentCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"commentCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentCountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CommentCountQuery, CommentCountQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const EditCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}}]}}]} as unknown as DocumentNode<EditCommentMutation, EditCommentMutationVariables>;
export const NewCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}}]}}]} as unknown as DocumentNode<NewCommentSubscription, NewCommentSubscriptionVariables>;
export const ViewCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"viewComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ViewCommentsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}}]}}]} as unknown as DocumentNode<ViewCommentsQuery, ViewCommentsQueryVariables>;
export const NewMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageBase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<NewMessageSubscription, NewMessageSubscriptionVariables>;
export const ReadMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"readMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReadMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}}]}}]}}]}}]} as unknown as DocumentNode<ReadMessageSubscription, ReadMessageSubscriptionVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateNewMessageInUserRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"updateNewMessageInUserRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNewMessageInUserRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]} as unknown as DocumentNode<UpdateNewMessageInUserRoomSubscription, UpdateNewMessageInUserRoomSubscriptionVariables>;
export const ViewMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"viewMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ViewMessagesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"readUsersId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ViewMessagesQuery, ViewMessagesQueryVariables>;
export const NoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"notice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NoticeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"notice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"pinned"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<NoticeQuery, NoticeQueryVariables>;
export const NoticeListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"noticeList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NoticeListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noticeList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"noticeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"pinned"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<NoticeListQuery, NoticeListQueryVariables>;
export const DeleteNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteNotificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const DeleteReadNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteReadNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReadNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteReadNotificationsMutation, DeleteReadNotificationsMutationVariables>;
export const NewNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationBase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<NewNotificationSubscription, NewNotificationSubscriptionVariables>;
export const ReadAllNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"readAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ReadAllNotificationsMutation, ReadAllNotificationsMutationVariables>;
export const ReadNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"readNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReadNotificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const UnReadNotificationCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"unReadNotificationCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unReadNotificationCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<UnReadNotificationCountQuery, UnReadNotificationCountQueryVariables>;
export const ViewNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"viewNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ViewNotificationsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ViewNotificationsQuery, ViewNotificationsQueryVariables>;
export const CreateOpinionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOpinion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOpinionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOpinion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"opinion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OpinionBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OpinionBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpinionObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateOpinionMutation, CreateOpinionMutationVariables>;
export const DeleteOpinionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteOpinion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteOpinionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOpinion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteOpinionMutation, DeleteOpinionMutationVariables>;
export const EditOpinionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editOpinion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditOpinionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editOpinion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"opinion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OpinionBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OpinionBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpinionObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<EditOpinionMutation, EditOpinionMutationVariables>;
export const MyOpinionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myOpinions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyOpinionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myOpinions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"opinions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<MyOpinionsQuery, MyOpinionsQueryVariables>;
export const OpinionDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"opinionDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OpinionDetailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"opinionDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"opinion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OpinionBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OpinionBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OpinionObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<OpinionDetailQuery, OpinionDetailQueryVariables>;
export const CreateReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReplyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]} as unknown as DocumentNode<CreateReplyMutation, CreateReplyMutationVariables>;
export const DeleteReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteReplyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteReplyMutation, DeleteReplyMutationVariables>;
export const EditReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditReplyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]} as unknown as DocumentNode<EditReplyMutation, EditReplyMutationVariables>;
export const ReplyCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"replyCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyCountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replyCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<ReplyCountQuery, ReplyCountQueryVariables>;
export const ViewRepliesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"viewReplies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ViewRepliesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewReplies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReplyObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}}]}}]}}]} as unknown as DocumentNode<ViewRepliesQuery, ViewRepliesQueryVariables>;
export const CreateRandomRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRandomRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRandomRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyRoomBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateRandomRoomMutation, CreateRandomRoomMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const MyRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myRooms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoomsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myRooms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyRoomBase"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyRoomsQuery, MyRoomsQueryVariables>;
export const NewRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyRoomBase"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyRoomBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyRoom"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<NewRoomSubscription, NewRoomSubscriptionVariables>;
export const RoomDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"roomDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoomDetailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newMessage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomDetailQuery, RoomDetailQueryVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}},{"kind":"Field","name":{"kind":"Name","value":"blockUserIds"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MeDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"meDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"socialPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"noti"}},{"kind":"Field","name":{"kind":"Name","value":"allowMessage"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"autoTranslation"}},{"kind":"Field","name":{"kind":"Name","value":"blockUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlockUser"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlockUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]} as unknown as DocumentNode<MeDetailQuery, MeDetailQueryVariables>;
export const RandomNicknameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"randomNickname"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomNickname"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<RandomNicknameQuery, RandomNicknameQueryVariables>;
export const ToggleBlockUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleBlockUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ToggleBlockUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleBlockUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"updateBlockUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlockUser"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlockUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserObjectType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]} as unknown as DocumentNode<ToggleBlockUserMutation, ToggleBlockUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"profileBgColor"}},{"kind":"Field","name":{"kind":"Name","value":"profileTextColor"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
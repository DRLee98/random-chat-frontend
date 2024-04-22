/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment MessageBase on MessageObjectType {\n    id\n    contents\n    type\n    readUsersId\n    user {\n      id\n      nickname\n      profileUrl\n    }\n    createdAt\n  }\n": types.MessageBaseFragmentDoc,
    "\n  fragment NotificationBase on NotificationObjectType {\n    id\n    title\n    message\n    read\n    type\n    data\n    createdAt\n  }\n": types.NotificationBaseFragmentDoc,
    "\n  fragment UserRoomBase on UserRoomObjectType {\n    id\n    name\n    noti\n    pinnedAt\n    newMessage\n    room {\n      id\n    }\n  }\n": types.UserRoomBaseFragmentDoc,
    "\n  fragment MyRoomBase on MyRoom {\n    id\n    name\n    noti\n    pinnedAt\n    newMessage\n    lastMessage\n    room {\n      id\n      updatedAt\n    }\n    users {\n      id\n      nickname\n      profileUrl\n    }\n    updatedAt\n  }\n": types.MyRoomBaseFragmentDoc,
    "\n  fragment BlockUser on UserObjectType {\n    id\n    nickname\n    profileUrl\n    bio\n  }\n": types.BlockUserFragmentDoc,
    "\n  subscription newMessage($input: NewMessageInput!) {\n    newMessage(input: $input) {\n      ...MessageBase\n    }\n  }\n": types.NewMessageDocument,
    "\n  subscription readMessage($input: ReadMessageInput!) {\n    readMessage(input: $input) {\n      messages {\n        id\n        readUsersId\n      }\n    }\n  }\n": types.ReadMessageDocument,
    "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      ok\n      error\n      message {\n        ...MessageBase\n      }\n    }\n  }\n": types.SendMessageDocument,
    "\n  subscription updateNewMessageInUserRoom {\n    updateNewMessageInUserRoom {\n      id\n      newMessage\n      lastMessage\n      userId\n      roomId\n    }\n  }\n": types.UpdateNewMessageInUserRoomDocument,
    "\n  query viewMessages($input: ViewMessagesInput!) {\n    viewMessages(input: $input) {\n      ok\n      error\n      hasNext\n      messages {\n        ...MessageBase\n      }\n    }\n  }\n": types.ViewMessagesDocument,
    "\n  query notice($input: NoticeInput!) {\n    notice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        content\n        pinned\n        createdAt\n      }\n    }\n  }\n": types.NoticeDocument,
    "\n  query noticeList($input: NoticeListInput!) {\n    noticeList(input: $input) {\n      ok\n      error\n      hasNext\n      noticeList {\n        id\n        title\n        pinned\n        createdAt\n      }\n    }\n  }\n": types.NoticeListDocument,
    "\n  mutation deleteNotification($input: DeleteNotificationInput!) {\n    deleteNotification(input: $input) {\n      ok\n      error\n    }\n  }\n": types.DeleteNotificationDocument,
    "\n  mutation deleteReadNotifications {\n    deleteReadNotifications {\n      ok\n      error\n    }\n  }\n": types.DeleteReadNotificationsDocument,
    "\n  subscription newNotification {\n    newNotification {\n      ...NotificationBase\n    }\n  }\n": types.NewNotificationDocument,
    "\n  mutation readAllNotifications {\n    readAllNotifications {\n      ok\n      error\n    }\n  }\n": types.ReadAllNotificationsDocument,
    "\n  mutation readNotification($input: ReadNotificationInput!) {\n    readNotification(input: $input) {\n      ok\n      error\n    }\n  }\n": types.ReadNotificationDocument,
    "\n  query unReadNotificationCount {\n    unReadNotificationCount {\n      ok\n      error\n      count\n    }\n  }\n": types.UnReadNotificationCountDocument,
    "\n  query viewNotifications($input: ViewNotificationsInput!) {\n    viewNotifications(input: $input) {\n      ok\n      error\n      hasNext\n      notifications {\n        ...NotificationBase\n      }\n    }\n  }\n": types.ViewNotificationsDocument,
    "\n  mutation createRandomRoom {\n    createRandomRoom {\n      ok\n      error\n      room {\n        ...MyRoomBase\n      }\n    }\n  }\n": types.CreateRandomRoomDocument,
    "\n  mutation deleteRoom($input: DeleteRoomInput!) {\n    deleteRoom(input: $input) {\n      ok\n      error\n    }\n  }\n": types.DeleteRoomDocument,
    "\n  query myRooms($input: MyRoomsInput!) {\n    myRooms(input: $input) {\n      ok\n      error\n      hasNext\n      rooms {\n        ...MyRoomBase\n      }\n    }\n  }\n": types.MyRoomsDocument,
    "\n  subscription newRoom {\n    newRoom {\n      ...MyRoomBase\n    }\n  }\n": types.NewRoomDocument,
    "\n  query roomDetail($input: RoomDetailInput!) {\n    roomDetail(input: $input) {\n      ok\n      error\n      room {\n        userRoom {\n          id\n          name\n          noti\n          pinnedAt\n          newMessage\n        }\n        users {\n          id\n          nickname\n          profileUrl\n          bio\n          language\n        }\n      }\n    }\n  }\n": types.RoomDetailDocument,
    "\n  mutation updateRoom($input: UpdateRoomInput!) {\n    updateRoom(input: $input) {\n      ok\n      error\n    }\n  }\n": types.UpdateRoomDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n      user {\n        id\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation deleteUser {\n    deleteUser {\n      ok\n      error\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        blockUserIds\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query meDetail {\n    meDetail {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        bio\n        socialPlatform\n        noti\n        allowMessage\n        language\n        autoTranslation\n        blockUsers {\n          ...BlockUser\n        }\n      }\n    }\n  }\n": types.MeDetailDocument,
    "\n  query randomNickname {\n    randomNickname {\n      ok\n      error\n      nickname\n    }\n  }\n": types.RandomNicknameDocument,
    "\n  mutation toggleBlockUser($input: ToggleBlockUserInput!) {\n    toggleBlockUser(input: $input) {\n      ok\n      error\n      updateBlockUsers {\n        ...BlockUser\n      }\n    }\n  }\n": types.ToggleBlockUserDocument,
    "\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      ok\n      error\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query userProfile($input: UserProfileInput!) {\n    userProfile(input: $input) {\n      ok\n      error\n      user {\n        id\n        nickname\n        profileUrl\n        bio\n      }\n    }\n  }\n": types.UserProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageBase on MessageObjectType {\n    id\n    contents\n    type\n    readUsersId\n    user {\n      id\n      nickname\n      profileUrl\n    }\n    createdAt\n  }\n"): (typeof documents)["\n  fragment MessageBase on MessageObjectType {\n    id\n    contents\n    type\n    readUsersId\n    user {\n      id\n      nickname\n      profileUrl\n    }\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationBase on NotificationObjectType {\n    id\n    title\n    message\n    read\n    type\n    data\n    createdAt\n  }\n"): (typeof documents)["\n  fragment NotificationBase on NotificationObjectType {\n    id\n    title\n    message\n    read\n    type\n    data\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserRoomBase on UserRoomObjectType {\n    id\n    name\n    noti\n    pinnedAt\n    newMessage\n    room {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment UserRoomBase on UserRoomObjectType {\n    id\n    name\n    noti\n    pinnedAt\n    newMessage\n    room {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MyRoomBase on MyRoom {\n    id\n    name\n    noti\n    pinnedAt\n    newMessage\n    lastMessage\n    room {\n      id\n      updatedAt\n    }\n    users {\n      id\n      nickname\n      profileUrl\n    }\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment MyRoomBase on MyRoom {\n    id\n    name\n    noti\n    pinnedAt\n    newMessage\n    lastMessage\n    room {\n      id\n      updatedAt\n    }\n    users {\n      id\n      nickname\n      profileUrl\n    }\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BlockUser on UserObjectType {\n    id\n    nickname\n    profileUrl\n    bio\n  }\n"): (typeof documents)["\n  fragment BlockUser on UserObjectType {\n    id\n    nickname\n    profileUrl\n    bio\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription newMessage($input: NewMessageInput!) {\n    newMessage(input: $input) {\n      ...MessageBase\n    }\n  }\n"): (typeof documents)["\n  subscription newMessage($input: NewMessageInput!) {\n    newMessage(input: $input) {\n      ...MessageBase\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription readMessage($input: ReadMessageInput!) {\n    readMessage(input: $input) {\n      messages {\n        id\n        readUsersId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription readMessage($input: ReadMessageInput!) {\n    readMessage(input: $input) {\n      messages {\n        id\n        readUsersId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      ok\n      error\n      message {\n        ...MessageBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      ok\n      error\n      message {\n        ...MessageBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription updateNewMessageInUserRoom {\n    updateNewMessageInUserRoom {\n      id\n      newMessage\n      lastMessage\n      userId\n      roomId\n    }\n  }\n"): (typeof documents)["\n  subscription updateNewMessageInUserRoom {\n    updateNewMessageInUserRoom {\n      id\n      newMessage\n      lastMessage\n      userId\n      roomId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viewMessages($input: ViewMessagesInput!) {\n    viewMessages(input: $input) {\n      ok\n      error\n      hasNext\n      messages {\n        ...MessageBase\n      }\n    }\n  }\n"): (typeof documents)["\n  query viewMessages($input: ViewMessagesInput!) {\n    viewMessages(input: $input) {\n      ok\n      error\n      hasNext\n      messages {\n        ...MessageBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query notice($input: NoticeInput!) {\n    notice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        content\n        pinned\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query notice($input: NoticeInput!) {\n    notice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        content\n        pinned\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query noticeList($input: NoticeListInput!) {\n    noticeList(input: $input) {\n      ok\n      error\n      hasNext\n      noticeList {\n        id\n        title\n        pinned\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query noticeList($input: NoticeListInput!) {\n    noticeList(input: $input) {\n      ok\n      error\n      hasNext\n      noticeList {\n        id\n        title\n        pinned\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteNotification($input: DeleteNotificationInput!) {\n    deleteNotification(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteNotification($input: DeleteNotificationInput!) {\n    deleteNotification(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteReadNotifications {\n    deleteReadNotifications {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteReadNotifications {\n    deleteReadNotifications {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription newNotification {\n    newNotification {\n      ...NotificationBase\n    }\n  }\n"): (typeof documents)["\n  subscription newNotification {\n    newNotification {\n      ...NotificationBase\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation readAllNotifications {\n    readAllNotifications {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation readAllNotifications {\n    readAllNotifications {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation readNotification($input: ReadNotificationInput!) {\n    readNotification(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation readNotification($input: ReadNotificationInput!) {\n    readNotification(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query unReadNotificationCount {\n    unReadNotificationCount {\n      ok\n      error\n      count\n    }\n  }\n"): (typeof documents)["\n  query unReadNotificationCount {\n    unReadNotificationCount {\n      ok\n      error\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viewNotifications($input: ViewNotificationsInput!) {\n    viewNotifications(input: $input) {\n      ok\n      error\n      hasNext\n      notifications {\n        ...NotificationBase\n      }\n    }\n  }\n"): (typeof documents)["\n  query viewNotifications($input: ViewNotificationsInput!) {\n    viewNotifications(input: $input) {\n      ok\n      error\n      hasNext\n      notifications {\n        ...NotificationBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createRandomRoom {\n    createRandomRoom {\n      ok\n      error\n      room {\n        ...MyRoomBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createRandomRoom {\n    createRandomRoom {\n      ok\n      error\n      room {\n        ...MyRoomBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteRoom($input: DeleteRoomInput!) {\n    deleteRoom(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteRoom($input: DeleteRoomInput!) {\n    deleteRoom(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query myRooms($input: MyRoomsInput!) {\n    myRooms(input: $input) {\n      ok\n      error\n      hasNext\n      rooms {\n        ...MyRoomBase\n      }\n    }\n  }\n"): (typeof documents)["\n  query myRooms($input: MyRoomsInput!) {\n    myRooms(input: $input) {\n      ok\n      error\n      hasNext\n      rooms {\n        ...MyRoomBase\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription newRoom {\n    newRoom {\n      ...MyRoomBase\n    }\n  }\n"): (typeof documents)["\n  subscription newRoom {\n    newRoom {\n      ...MyRoomBase\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query roomDetail($input: RoomDetailInput!) {\n    roomDetail(input: $input) {\n      ok\n      error\n      room {\n        userRoom {\n          id\n          name\n          noti\n          pinnedAt\n          newMessage\n        }\n        users {\n          id\n          nickname\n          profileUrl\n          bio\n          language\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query roomDetail($input: RoomDetailInput!) {\n    roomDetail(input: $input) {\n      ok\n      error\n      room {\n        userRoom {\n          id\n          name\n          noti\n          pinnedAt\n          newMessage\n        }\n        users {\n          id\n          nickname\n          profileUrl\n          bio\n          language\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateRoom($input: UpdateRoomInput!) {\n    updateRoom(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation updateRoom($input: UpdateRoomInput!) {\n    updateRoom(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteUser {\n    deleteUser {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteUser {\n    deleteUser {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"): (typeof documents)["\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        blockUserIds\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        blockUserIds\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query meDetail {\n    meDetail {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        bio\n        socialPlatform\n        noti\n        allowMessage\n        language\n        autoTranslation\n        blockUsers {\n          ...BlockUser\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query meDetail {\n    meDetail {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        bio\n        socialPlatform\n        noti\n        allowMessage\n        language\n        autoTranslation\n        blockUsers {\n          ...BlockUser\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query randomNickname {\n    randomNickname {\n      ok\n      error\n      nickname\n    }\n  }\n"): (typeof documents)["\n  query randomNickname {\n    randomNickname {\n      ok\n      error\n      nickname\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleBlockUser($input: ToggleBlockUserInput!) {\n    toggleBlockUser(input: $input) {\n      ok\n      error\n      updateBlockUsers {\n        ...BlockUser\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation toggleBlockUser($input: ToggleBlockUserInput!) {\n    toggleBlockUser(input: $input) {\n      ok\n      error\n      updateBlockUsers {\n        ...BlockUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userProfile($input: UserProfileInput!) {\n    userProfile(input: $input) {\n      ok\n      error\n      user {\n        id\n        nickname\n        profileUrl\n        bio\n      }\n    }\n  }\n"): (typeof documents)["\n  query userProfile($input: UserProfileInput!) {\n    userProfile(input: $input) {\n      ok\n      error\n      user {\n        id\n        nickname\n        profileUrl\n        bio\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
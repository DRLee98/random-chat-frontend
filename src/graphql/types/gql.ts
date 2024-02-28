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
    "\n  fragment MessageBase on MessageObjectType {\n    id\n    contents\n    type\n    readUsersId\n    user {\n      id\n      nickname\n      profileUrl\n    }\n  }\n": types.MessageBaseFragmentDoc,
    "\n  fragment UserRoomBase on UserRoomObjectType {\n    id\n    name\n    noti\n    pinned\n    newMessage\n    room {\n      id\n    }\n  }\n": types.UserRoomBaseFragmentDoc,
    "\n  fragment MyRoomBase on MyRoom {\n    id\n    name\n    noti\n    pinned\n    newMessage\n    lastMessage\n    room {\n      id\n    }\n    users {\n      profileUrl\n    }\n  }\n": types.MyRoomBaseFragmentDoc,
    "\n  subscription newMessage($input: NewMessageInput!) {\n    newMessage(input: $input) {\n      ...MessageBase\n    }\n  }\n  \n": types.NewMessageDocument,
    "\n  subscription readMessage($input: ReadMessageInput!) {\n    readMessage(input: $input) {\n      messages {\n        id\n        readUsersId\n      }\n    }\n  }\n": types.ReadMessageDocument,
    "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      ok\n      error\n      messageId\n    }\n  }\n": types.SendMessageDocument,
    "\n  subscription updateNewMessageInUserRoom {\n    updateNewMessageInUserRoom {\n      id\n      newMessage\n      lastMessage\n      userId\n    }\n  }\n": types.UpdateNewMessageInUserRoomDocument,
    "\n  query viewMessages($input: ViewMessagesInput!) {\n    viewMessages(input: $input) {\n      ok\n      error\n      totalPages\n      hasNextPage\n      messages {\n        ...MessageBase\n      }\n    }\n  }\n  \n": types.ViewMessagesDocument,
    "\n  mutation createRandomRoom {\n    createRandomRoom {\n      ok\n      error\n      room {\n        ...MyRoomBase\n      }\n    }\n  }\n  \n": types.CreateRandomRoomDocument,
    "\n  query myRooms($input: MyRoomsInput!) {\n    myRooms(input: $input) {\n      ok\n      error\n      totalPages\n      hasNextPage\n      rooms {\n        ...MyRoomBase\n      }\n    }\n  }\n  \n": types.MyRoomsDocument,
    "\n  subscription newRoom {\n    newRoom {\n      ...MyRoomBase\n    }\n  }\n  \n": types.NewRoomDocument,
    "\n  query roomDetail($input: RoomDetailInput!) {\n    roomDetail(input: $input) {\n      ok\n      error\n      room {\n        id\n        name\n        noti\n        pinned\n        newMessage\n        users {\n          id\n          nickname\n          profileUrl\n          bio\n          language\n        }\n      }\n    }\n  }\n": types.RoomDetailDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n      user {\n        id\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        bio\n        allowMessage\n        language\n        autoTranslation\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query randomNickname {\n    randomNickname {\n      ok\n      error\n      nickname\n    }\n  }\n": types.RandomNicknameDocument,
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
export function graphql(source: "\n  fragment MessageBase on MessageObjectType {\n    id\n    contents\n    type\n    readUsersId\n    user {\n      id\n      nickname\n      profileUrl\n    }\n  }\n"): (typeof documents)["\n  fragment MessageBase on MessageObjectType {\n    id\n    contents\n    type\n    readUsersId\n    user {\n      id\n      nickname\n      profileUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserRoomBase on UserRoomObjectType {\n    id\n    name\n    noti\n    pinned\n    newMessage\n    room {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment UserRoomBase on UserRoomObjectType {\n    id\n    name\n    noti\n    pinned\n    newMessage\n    room {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MyRoomBase on MyRoom {\n    id\n    name\n    noti\n    pinned\n    newMessage\n    lastMessage\n    room {\n      id\n    }\n    users {\n      profileUrl\n    }\n  }\n"): (typeof documents)["\n  fragment MyRoomBase on MyRoom {\n    id\n    name\n    noti\n    pinned\n    newMessage\n    lastMessage\n    room {\n      id\n    }\n    users {\n      profileUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription newMessage($input: NewMessageInput!) {\n    newMessage(input: $input) {\n      ...MessageBase\n    }\n  }\n  \n"): (typeof documents)["\n  subscription newMessage($input: NewMessageInput!) {\n    newMessage(input: $input) {\n      ...MessageBase\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription readMessage($input: ReadMessageInput!) {\n    readMessage(input: $input) {\n      messages {\n        id\n        readUsersId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription readMessage($input: ReadMessageInput!) {\n    readMessage(input: $input) {\n      messages {\n        id\n        readUsersId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      ok\n      error\n      messageId\n    }\n  }\n"): (typeof documents)["\n  mutation sendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      ok\n      error\n      messageId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription updateNewMessageInUserRoom {\n    updateNewMessageInUserRoom {\n      id\n      newMessage\n      lastMessage\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription updateNewMessageInUserRoom {\n    updateNewMessageInUserRoom {\n      id\n      newMessage\n      lastMessage\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query viewMessages($input: ViewMessagesInput!) {\n    viewMessages(input: $input) {\n      ok\n      error\n      totalPages\n      hasNextPage\n      messages {\n        ...MessageBase\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query viewMessages($input: ViewMessagesInput!) {\n    viewMessages(input: $input) {\n      ok\n      error\n      totalPages\n      hasNextPage\n      messages {\n        ...MessageBase\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createRandomRoom {\n    createRandomRoom {\n      ok\n      error\n      room {\n        ...MyRoomBase\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation createRandomRoom {\n    createRandomRoom {\n      ok\n      error\n      room {\n        ...MyRoomBase\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query myRooms($input: MyRoomsInput!) {\n    myRooms(input: $input) {\n      ok\n      error\n      totalPages\n      hasNextPage\n      rooms {\n        ...MyRoomBase\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query myRooms($input: MyRoomsInput!) {\n    myRooms(input: $input) {\n      ok\n      error\n      totalPages\n      hasNextPage\n      rooms {\n        ...MyRoomBase\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription newRoom {\n    newRoom {\n      ...MyRoomBase\n    }\n  }\n  \n"): (typeof documents)["\n  subscription newRoom {\n    newRoom {\n      ...MyRoomBase\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query roomDetail($input: RoomDetailInput!) {\n    roomDetail(input: $input) {\n      ok\n      error\n      room {\n        id\n        name\n        noti\n        pinned\n        newMessage\n        users {\n          id\n          nickname\n          profileUrl\n          bio\n          language\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query roomDetail($input: RoomDetailInput!) {\n    roomDetail(input: $input) {\n      ok\n      error\n      room {\n        id\n        name\n        noti\n        pinned\n        newMessage\n        users {\n          id\n          nickname\n          profileUrl\n          bio\n          language\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"): (typeof documents)["\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        bio\n        allowMessage\n        language\n        autoTranslation\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      ok\n      error\n      me {\n        id\n        nickname\n        profileUrl\n        bio\n        allowMessage\n        language\n        autoTranslation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query randomNickname {\n    randomNickname {\n      ok\n      error\n      nickname\n    }\n  }\n"): (typeof documents)["\n  query randomNickname {\n    randomNickname {\n      ok\n      error\n      nickname\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
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
    "\n  mutation createUser(\n    $socialId: String!\n    $socialPlatform: String!\n    $nickname: String!\n    $profile: Upload\n  ) {\n    createUser(\n      input: {\n        socialId: $socialId\n        socialPlatform: $socialPlatform\n        nickname: $nickname\n        profile: $profile\n      }\n    ) {\n      ok\n      error\n    }\n  }\n": types.CreateUserDocument,
    "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
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
export function graphql(source: "\n  mutation createUser(\n    $socialId: String!\n    $socialPlatform: String!\n    $nickname: String!\n    $profile: Upload\n  ) {\n    createUser(\n      input: {\n        socialId: $socialId\n        socialPlatform: $socialPlatform\n        nickname: $nickname\n        profile: $profile\n      }\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createUser(\n    $socialId: String!\n    $socialPlatform: String!\n    $nickname: String!\n    $profile: Upload\n  ) {\n    createUser(\n      input: {\n        socialId: $socialId\n        socialPlatform: $socialPlatform\n        nickname: $nickname\n        profile: $profile\n      }\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"): (typeof documents)["\n  query login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
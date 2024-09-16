import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Category { 'name' : string, 'description' : string }
export interface Post {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'date' : string,
  'author' : string,
  'category' : string,
}
export interface _SERVICE {
  'addPost' : ActorMethod<[string, string, string, string, string], bigint>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getPosts' : ActorMethod<[string], Array<Post>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

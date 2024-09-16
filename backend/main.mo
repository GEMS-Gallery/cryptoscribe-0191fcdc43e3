import Func "mo:base/Func";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

actor {
  // Define the Post type
  public type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  // Stable variable to store posts
  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  // Function to add a new post
  public func addPost(title: Text, body: Text, author: Text) : async Nat {
    let post : Post = {
      id = nextId;
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    nextId - 1
  };

  // Function to get all posts, sorted by most recent
  public query func getPosts() : async [Post] {
    Array.sort(posts, func(a: Post, b: Post) : {#less; #equal; #greater} {
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    })
  };
}

import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

actor {
  public type Category = {
    name: Text;
    description: Text;
  };

  public type Post = {
    id: Nat;
    title: Text;
    content: Text;
    author: Text;
    date: Text;
    category: Text;
  };

  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  public func addPost(title: Text, content: Text, author: Text, date: Text, category: Text) : async Nat {
    let post : Post = {
      id = nextId;
      title = title;
      content = content;
      author = author;
      date = date;
      category = category;
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    nextId - 1
  };

  public query func getPosts(category: Text) : async [Post] {
    Array.filter(posts, func(p: Post) : Bool { p.category == category })
  };

  public query func getCategories() : async [Category] {
    [
      { name = "Red Team"; description = "Offensive security tactics and strategies" },
      { name = "Pen Testing"; description = "Penetration testing methodologies and tools" },
      { name = "Exploit Dev"; description = "Vulnerability research and exploit development" },
      { name = "Cryptography"; description = "Encryption, decryption, and cipher discussions" },
      { name = "Social Engineering"; description = "Human-focused attack techniques" },
      { name = "CTF"; description = "Capture The Flag challenges and writeups" }
    ]
  };
}

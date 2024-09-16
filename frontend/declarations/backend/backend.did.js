export const idlFactory = ({ IDL }) => {
  const Category = IDL.Record({ 'name' : IDL.Text, 'description' : IDL.Text });
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'date' : IDL.Text,
    'author' : IDL.Text,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addPost' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getPosts' : IDL.Func([IDL.Text], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

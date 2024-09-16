import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', async () => {
  const newPostBtn = document.getElementById('newPostBtn');
  const newPostForm = document.getElementById('newPostForm');
  const postForm = document.getElementById('postForm');
  const postsContainer = document.getElementById('posts');

  newPostBtn.addEventListener('click', () => {
    newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
  });

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const author = document.getElementById('postAuthor').value;
    const body = document.getElementById('postBody').innerHTML;

    await backend.addPost(title, body, author);
    postForm.reset();
    document.getElementById('postBody').innerHTML = '';
    newPostForm.style.display = 'none';
    await displayPosts();
  });

  // Rich text editor functionality
  const buttons = document.querySelectorAll('.formatting-tools button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const command = button.dataset.command;
      document.execCommand(command, false, null);
    });
  });

  async function displayPosts() {
    const posts = await backend.getPosts();
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p class="author">By ${post.author}</p>
        <div class="post-body">${post.body}</div>
        <p class="timestamp">${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  }

  await displayPosts();
});

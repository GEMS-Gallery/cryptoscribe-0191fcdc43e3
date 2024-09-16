import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./declarations/backend/backend.did.js";

const agent = new HttpAgent();
const backend = Actor.createActor(idlFactory, { agent, canisterId: process.env.BACKEND_CANISTER_ID });

let currentCategory = '';

async function showPosts(category, clickedElement) {
    currentCategory = category;
    // Remove 'active' class from all categories
    document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
    
    // Add 'active' class to the clicked category
    clickedElement.classList.add('active');

    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = `<h2>${category} Posts</h2>`;
    
    try {
        const posts = await backend.getPosts(category);
        posts.forEach(post => {
            postsContainer.innerHTML += `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <div class="post-meta">Posted by ${post.author} on ${post.date}</div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        postsContainer.innerHTML += `<p>Error fetching posts. Please try again later.</p>`;
    }
}

function toggleNewPostForm() {
    const form = document.getElementById('newPostForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function createNewPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const author = document.getElementById('postAuthor').value;
    const category = document.getElementById('postCategory').value;
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    if (!title || !content || !author) {
        alert("Please fill in all fields");
        return;
    }

    try {
        await backend.addPost(title, content, author, date, category);
        alert("Post created successfully!");
        toggleNewPostForm();
        if (category === currentCategory) {
            showPosts(category, document.querySelector(`.category:contains('${category}')`));
        }
    } catch (error) {
        console.error("Error creating post:", error);
        alert("Error creating post. Please try again.");
    }
}

// Initialize the page with Red Team posts
document.addEventListener('DOMContentLoaded', () => {
    showPosts('Red Team', document.querySelector('.category'));
});

// Make functions globally available
window.showPosts = showPosts;
window.toggleNewPostForm = toggleNewPostForm;
window.createNewPost = createNewPost;

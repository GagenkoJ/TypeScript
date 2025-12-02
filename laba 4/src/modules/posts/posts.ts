import type { Post } from "../../types/post";

const postsList = document.querySelector<HTMLUListElement>(".posts-list");

export async function loadPosts(): Promise<void> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts: Post[] = await response.json();
    renderPosts(posts);
}

function renderPosts(posts: Post[]): void {
    if (!postsList) return;

    posts.forEach(post => {
        const li = document.createElement("li");
        li.textContent = `${post.id}. ${post.title}`;
        postsList.appendChild(li);
    });
}


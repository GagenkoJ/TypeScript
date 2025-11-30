// ===== PRIMITIVE TYPES =====
const siteTitle: string = "Eventually (TypeScript Edition)";
const scrollThreshold: number = 50;
const debug: boolean = true;

// ===== INTERFACES =====
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// ===== DOM ELEMENTS =====
const openModalBtn: HTMLButtonElement | null =
  document.querySelector("#open-modal");
const closeModalBtn: HTMLButtonElement | null =
  document.querySelector("#close-modal");
const modal: HTMLDivElement | null =
  document.querySelector("#modal");
const header: HTMLElement | null =
  document.querySelector("#header");
const loadPostsBtn: HTMLButtonElement | null =
  document.querySelector("#load-posts");
const postsList: HTMLUListElement | null =
  document.querySelector("#posts-list");

// ===== HELPERS =====
function log(message: string): void {
  if (debug) console.log("[DEBUG]", message);
}

// ===== MODAL =====
function openModal(): void {
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("modal-open");
  log("Modal opened");
}

function closeModal(): void {
  if (!modal) return;
  modal.classList.remove("modal-open");
  setTimeout((): void => {
    modal.classList.add("hidden");
  }, 300);
  log("Modal closed");
}

// ===== SCROLL EFFECT =====
function handleScroll(): void {
  if (!header) return;

  const currentScroll: number = window.scrollY;

  if (currentScroll > scrollThreshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// ===== FETCH POSTS =====
async function loadPosts(): Promise<void> {
  if (!postsList) return;

  postsList.innerHTML = "<li>Завантаження...</li>";

  try {
    const response: Response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const posts: Post[] = await response.json();

    postsList.innerHTML = "";
    posts.forEach((post: Post): void => {
      const li: HTMLLIElement = document.createElement("li");
      li.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
      postsList.appendChild(li);
    });

    log("Posts loaded");
  } catch (error) {
    postsList.innerHTML = "<li>Помилка завантаження постів</li>";
    console.error(error);
  }
}

// ===== INIT =====
function init(): void {
  document.title = siteTitle;

  // click listeners
  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }
  if (loadPostsBtn) {
    loadPostsBtn.addEventListener("click", loadPosts);
  }

  // scroll listener
  window.addEventListener("scroll", handleScroll);

  log("App initialized");
}

document.addEventListener("DOMContentLoaded", init);

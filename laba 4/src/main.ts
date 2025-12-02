

import {
  openModalBtn,
  closeModalBtn,
  loadPostsBtn
} from "./modules/dom/domElements";
import { openModal, closeModal } from "./modules/modal/modal";
import { handleScroll } from "./modules/scroll/scroll";
import { loadPosts } from "./modules/posts/posts";
import { log } from "./modules/logger/logger";
import { describeUser, userName, userAge, isStudent } from "./modules/user/user";

const siteTitle: string = "Eventually (TypeScript Edition)";

function init(): void {
  document.title = siteTitle;


  const userDescription: string = describeUser(userName, userAge, isStudent);
  console.log(userDescription);


  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }
  if (loadPostsBtn) {
    loadPostsBtn.addEventListener("click", loadPosts);
  }


  window.addEventListener("scroll", handleScroll);

  log("App initialized");
}

document.addEventListener("DOMContentLoaded", init);

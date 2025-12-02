import { header } from "../dom/domElements";

const scrollThreshold: number = 50;

export function handleScroll(): void {
  if (!header) return;

  const currentScroll: number = window.scrollY;

  if (currentScroll > scrollThreshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

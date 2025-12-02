const modal = document.querySelector<HTMLDivElement>(".modal");

export function openModal(): void {
    if (modal) {
        modal.classList.remove("hidden");
    }
}

export function closeModal(): void {
    if (modal) {
        modal.classList.add("hidden");
    }
}
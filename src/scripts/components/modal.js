export function openModal (element) {
    document.addEventListener("click", overlayHandler);
    document.addEventListener("keydown", escapeHandler)
    element.classList.add("popup_is-opened");
}

export function closeModal (element) {
    element.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escapeHandler)
    document.removeEventListener("click", overlayHandler);
}

function escapeHandler (e) {
    if(e.key === "Escape"){
        closeModal(document.querySelector(".popup_is-opened"))
    }
}

function overlayHandler (e) {
    if(e.target.classList.contains("popup")){
        closeModal(e.target)
    }
}

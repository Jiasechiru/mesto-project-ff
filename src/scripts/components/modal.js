export function openModal (element) {
    document.querySelector(".page__content").addEventListener("click", overlayHendler);
    document.addEventListener("keydown", escapeHendler)
    element.classList.add("popup_is-opened");
}

export function closeModal (element) {
    element.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escapeHendler)
    document.querySelector(".page__content").removeEventListener("click", overlayHendler);
}

function escapeHendler (e) {
    if(e.key === "Escape"){
        closeModal(document.querySelector(".popup_is-opened"))
    }
}

function overlayHendler (e) {
    if(e.target.classList.contains("popup")){
        closeModal(document.querySelector(".popup_is-opened"))
    }
}

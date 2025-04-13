export const createModal = ({ options = [], onClose }) => {
    const modalHTML = /*html*/`
        <div class="custom-modal-overlay">
            <div class="custom-modal-content">
                ${options.map(option => `<p class="custom-modal-option ${option.class || ""}" data-action="${option.action}">
                ${option.label}
                </p>`)
            .join("")}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modalOverlay = document.querySelector(".custom-modal-overlay");
    const modalOptions = document.querySelectorAll(".custom-modal-option");

    modalOptions.forEach((option) =>
        option.addEventListener("click", () => {
            const action = option.getAttribute("data-action");
            if (options.find((opt) => opt.action === action)?.onClick) {
                options.find((opt) => opt.action === action).onClick();
            }
            closeModal();
        })
    );

    const closeModal = () => {
        modalOverlay.remove();
        if (onClose) onClose();
    };
    
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });
};

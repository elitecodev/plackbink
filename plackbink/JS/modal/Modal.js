export const createInputPrompt = ({ message = "Enter a value", placeholder = "", onSubmit, onCancel }) => {
    // Define the HTML structure as a string
    const promptHTML = /*html*/`
        <div class="custom-prompt-overlay">
            <div class="custom-prompt-box">
                <p class="custom-prompt-message">${message}</p>
                <input type="text" class="custom-prompt-input" placeholder="${placeholder}">
                <div class="custom-prompt-buttons">
                    <button class="custom-prompt-ok">OK</button>
                    <button class="custom-prompt-cancel">Cancel</button>
                </div>
            </div>
        </div>
    `;

    // Insert HTML into the document
    document.body.insertAdjacentHTML("beforeend", promptHTML);

    // Get elements
    const overlay = document.querySelector(".custom-prompt-overlay");
    const inputField = overlay.querySelector(".custom-prompt-input");
    const okButton = overlay.querySelector(".custom-prompt-ok");
    const cancelButton = overlay.querySelector(".custom-prompt-cancel");

    inputField.focus(); // Focus input

    // Close function
    const closePrompt = () => overlay.remove();

    // Event Listeners
    okButton.onclick = () => (onSubmit ? onSubmit(inputField.value) : null, closePrompt());
    cancelButton.onclick = () => (onCancel ? onCancel() : null, closePrompt());

    inputField.onkeydown = (event) =>
        event.key === "Enter" ? okButton.click() : event.key === "Escape" ? cancelButton.click() : null;
};

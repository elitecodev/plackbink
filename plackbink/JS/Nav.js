export const createNav = (loadWall, loadHome, loadFile) => {
    const div = document.createElement('div');
    const $ = (selector) => div.querySelector(selector);

    div.className = 'nav';
    div.innerHTML = /*html*/`
        <a id = 'home'><i class="bi bi-house-door"></i></a>
        <a id = 'wall'><i class="bi bi-person"></i></a>
        <a id = 'files'><i class="bi bi-file-earmark-text-fill"></i></a>
        <a >⋮</a>
    `;

    $('#home').addEventListener('click', () => {
        loadHome();
    });

    $('#wall').addEventListener('click', () => {
        loadWall();
    });

    $('#files').addEventListener('click', () => {
        loadFile();
    });

    return div;
};

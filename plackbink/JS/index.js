export const createRoot = () => {
    const toggleTheme = () => {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
        document.querySelector(".theme-toggle").innerHTML =
            document.body.classList.contains("dark")
                ? '<i class="bi bi-sun"></i>'
                : '<i class="bi bi-moon"></i>';
    }

    const div = document.createElement('div');
    div.className = 'container';
    div.id = 'listlink';

    const $ = (selector) => div.querySelector(selector);

    div.innerHTML = /*html*/`
    <div class="container">
    <div class="header">
        PLΛƆKBIИK
        <span class="theme-toggle" id="toggle"><i class="bi bi-sun"></i></span>
    </div>
    <div id='nav'>
        <!-- Nav.js -->
    </div>

    <div id='post'>
    <p class="loading-message">Loading...</p>
    </div>    

    <div id="quoteList">
    </div>
</div>
    `

    $('#toggle').addEventListener('click', toggleTheme);
    return div;
};

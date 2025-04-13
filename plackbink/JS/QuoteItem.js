import { createModal } from "./modal/Modal2.js";
import { content } from "./PostContent.js";

export const createQuoteItem = (quote, quoteId, database) => {
    const { name: newName,
        ip: ip,
        location: loc,
        quote: text,
        timestamp: date,
        file: myFile,
        base64: base64 } = quote;

    const likeCount = Object.values(quote.likes || {}).filter(v => v === 1).length;
    const dislikeCount = Object.values(quote.likes || {}).filter(v => v === -1).length;

    const currUser = sessionStorage.getItem("currUser");

    const deleteQuote = (quoteId, db) => {
        if (db.innerHTML === `<i class="bi bi-trash"></i>`) {
            db.innerHTML = `<i class="bi bi-trash-fill"></i>`;
            setTimeout(() => (db.innerHTML = `<i class="bi bi-trash"></i>`), 2000);
            return;
        }

        database.ref('slader').child(quoteId).remove()
            .then(() => { })
            .catch(error => console.error('Error deleting quote:', error));
    };




    const like = (quoteId, user) => {
        const likeRef = database.ref(`slader/${quoteId}/likes/${user}`);

        likeRef.get().then(snapshot => {
            likeRef.set(snapshot.val() !== 1 ? 1 : 0);
        });
    };

    const dislike = (quoteId, user) => {
        const likeRef = database.ref(`slader/${quoteId}/likes/${user}`);

        likeRef.get().then(snapshot => {
            likeRef.set(snapshot.val() !== -1 ? -1 : 0);
        });
    };

    const copyQuote = (text, cb) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                cb.innerText = `Copied`;
                setTimeout(() => cb.innerText = `Copy`, 2000);
            })
            .catch((error) => console.error('Failed to copy quote: ', error));
    };

    const div = document.createElement('div');
    const $ = (selector) => div.querySelector(selector);
    const ownPost = (postUser, currUser) => (postUser === currUser) ?
        `<span id="delete-button" style="cursor: pointer;"><i class="bi bi-trash"></i></span>` :
        `<span id="report-button" style="cursor: pointer;">Report</span>`;

    div.className = 'quote-item';
    div.innerHTML = /*html*/`
    <div class="tweet">
    <img src="/avatar/${+newName % 18}.jpg" alt="Image">
    <div class="tweet-content">
        <p>
            <b>user${newName}</b>
            <span style="color: #888888;">${moment(date).fromNow()}</span>
        </p>

        ${content(text, myFile, base64)}
        <br>

        <div class="tweet-actions">
            <span id="tUp-button" style="cursor: pointer;">
                <i class="bi bi-hand-thumbs-up${quote?.likes?.[currUser] === 1 ? '-fill' : ''}"></i>
            </span>

            <span>${likeCount - dislikeCount}</span>

            <span id="tDown-button" style="cursor: pointer;">
                <i class="bi bi-hand-thumbs-down${quote?.likes?.[currUser] === -1 ? '-fill' : ''}"></i>
            </span>

            <span id="tUp-button" style="cursor: pointer;">
                <i class="bi bi-reply"></i>
            </span>

            ${ownPost(newName, currUser)}

            <span style="font-weight: normal; color: grey">${ip} | ${loc}</span>
        </div>
    </div>
        <span class="tweet-options" id="options">⋮</span>
    </div>

    `;

    $('#tUp-button').addEventListener('click', () => like(quoteId, currUser, $('#tUp-button')));
    $('#tDown-button').addEventListener('click', () => dislike(quoteId, currUser, $('#tDown-button')));
    $('#delete-button')?.addEventListener('click', () => deleteQuote(quoteId, $('#delete-button')));
    $('#report-button')?.addEventListener('click', () => alert(`Post Reported`));

    $('#options').addEventListener("click", () => {
        createModal({
            options: [
                {
                    label: "Delete Post", action: "delete", class: "delete", onClick: () => {
                        database.ref('slader').child(quoteId).remove()
                            .then(() => { })
                            .catch(error => console.error('Error deleting quote:', error));
                    }
                },
                { label: "Pin Post", action: "pin", onClick: () => alert("Post pinned!") },
                { label: "Report", action: "report", onClick: () => alert("Post reported!") },
            ],
        });
    });

    return div;
}

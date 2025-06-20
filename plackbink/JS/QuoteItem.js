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

    const photo = ['https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F1.jpg?alt=media&token=23619f65-e408-4e35-b11e-23ca1f413cb4',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F10.jpg?alt=media&token=f1936824-f9f6-472b-91be-32f5af87c02c',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F11.jpg?alt=media&token=05d36eed-9561-4ce2-adbe-c2742d4873eb',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F12.jpg?alt=media&token=db76f1e3-4e01-4eba-9440-61e7a0363d38',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F13.jpg?alt=media&token=e0e767c2-5432-4623-ad4c-e0801ee1abce',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F14.jpg?alt=media&token=e13b2e7d-c647-4044-a352-b413e2e63865',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F15.jpg?alt=media&token=7191c6e5-18bd-42c8-89dd-bcdb85802b65',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F17.jpg?alt=media&token=194dfdee-0590-44b5-8a0f-ccbbaf28d993',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F3.jpg?alt=media&token=da67cdb1-a5b7-4684-90ac-319c6aa7f9d3',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F5.jpg?alt=media&token=6e96675b-d73a-4153-be4f-c70280d82a13',
        'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/plackbink%2Favatar%2F7.jpg?alt=media&token=41d497c5-56e9-47f0-9a24-39f0b45ed21a',
    ]

    const tendercare_03 = 'https://firebasestorage.googleapis.com/v0/b/lois-files.appspot.com/o/uploads%2F06_20_25%2Fpic.png?alt=media&token=94eadf79-f02f-4737-9b16-7d6a3647a4cf';

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
    <img src="${newName === 'tendercare_03' ? tendercare_03 : photo[+newName % photo.length]}" alt="Image">
    <div class="tweet-content">
        <p>
            <b>${newName === 'tendercare_03' ? newName : 'user' + newName}</b>
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

            <span style="font-weight: normal; font-size:45%: color: grey">${ip} | ${loc}</span>
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
                { label: "Pin Post", action: "pin", onClick: () => alert("Invalid Request") },
                { label: "Report", action: "report", onClick: () => alert("Invalid Request") },
            ],
        });
    });

    return div;
}

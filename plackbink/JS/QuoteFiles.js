import { createQuoteItem } from './QuoteItem.js';

export const createQuote = (database) => {
    const div = document.createElement('div');
    const currUser = sessionStorage.getItem("currUser");

    div.id = `quoteList`;

    div.innerHTML = `<p class="loading-message">Loading...</p>`;

    database.ref('slader').orderByChild('isFile').equalTo(true).on('value', (snapshot) => {
        div.replaceChildren();
        if (!snapshot.exists()) {
            div.innerHTML = `<p class="no-quotes-message">No files available.</p>`;
            return;
        }

        snapshot.forEach((childSnapshot) => {
            div.prepend(createQuoteItem(childSnapshot.val(), childSnapshot.key, database));
        });

    });

    return div;
};

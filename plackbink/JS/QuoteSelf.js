import { createQuoteItem } from './QuoteItem.js';

export const createQuote = (database) => {
    const div = document.createElement('div');
    const currUser = sessionStorage.getItem("currUser");

    div.id = `quoteList`;

    div.innerHTML = `<p class="loading-message">Loading...</p>`;

    database.ref('slader').orderByChild('name').equalTo(currUser).on('value', (snapshot) => {
        div.replaceChildren();
        const filter = [];

        if (!snapshot.exists()) {
            div.innerHTML = `<p class="no-quotes-message">No posts available.</p>`;
            return;
        }

        snapshot.forEach((childSnapshot) => {
            div.prepend(createQuoteItem(childSnapshot.val(), childSnapshot.key, database));
            filter.push(childSnapshot.val());
        });

        console.log(filter)

    });

    return div;
};

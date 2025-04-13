import { firebaseConfig } from './Firebase/Firebase.js';
import { createRoot } from './index.js';
import { createNav } from './Nav.js';
import { createQuote as Home } from './Quote.js';
import { createQuote as Wall } from './QuoteSelf.js';
import { createQuote as Files } from './QuoteFiles.js';
import { createPost } from './Post.js';
import { init } from './helper/initialize.js';

const initDb = firebase.initializeApp(firebaseConfig)
const $ = (selector) => document.querySelector(selector);
const database = initDb.database();
const storage = initDb.storage();

$(`#root`).replaceWith(createRoot());

$(`#nav`).replaceWith(createNav(
    () => $(`#quoteList`).replaceWith(Wall(database)),
    () => $(`#quoteList`).replaceWith(Home(database)),
    () => $(`#quoteList`).replaceWith(Files(database))
));

init(() => {
    $(`#post`).replaceWith(createPost(storage, database));
    $(`#quoteList`).replaceWith(Home(database));
})


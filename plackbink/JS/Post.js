import { onSubmit } from "./actions/submit.js";
import { onUpload } from "./actions/upload.js";
import { onConvert64 } from "./actions/convert64.js";
import { getDay } from "./helper/dateFormats.js";

export const createPost = (storage, database) => {
    const div = document.createElement('div');
    div.id = `files`;
    div.className = `tweet-box`;

    const $ = (selector) => div.querySelector(selector);

    const uploadFile = async (fileInput, textInput, progressCallback, database) => {
        const files = fileInput.files;
        if (files.length === 0 && textInput) {
            return onSubmit(database, textInput, '', '');
        }

        for (let file of files) {
            const storageRef = storage.ref(`uploads/${getDay()}/${file.name}`);

            if (file.type.startsWith("image/")) {
                onConvert64(file)
                    .then((base64) => onUpload(file, storageRef, progressCallback)
                        .then((downloadLink) => onSubmit(database, textInput || `Uploaded an Image`, downloadLink, base64)));
            } else {
                onUpload(file, storageRef, progressCallback)
                    .then((downloadLink) => onSubmit(database, textInput || `Uploaded a File`, downloadLink, ''));
            }
        }
    };

    div.innerHTML = /*html*/`
        <div>
            <textarea rows="2" placeholder="Write a text or description..." id="textInput"></textarea><br>
            <input type="file" id="fileInput" style="width:50%" multiple>
            <span id="progressText"></span>
            <p id="uploadBtn">Post</p>
        </div>
    `;

    $('#uploadBtn').addEventListener('click', () => {
        const cbprogress = (progress) => {
            $('#progressText').textContent = `Uploading: ${+progress ? Math.round(progress) + '%' : progress}`;
        }
        uploadFile($('#fileInput'), $('#textInput').value, cbprogress, database);
        $('#textInput').value = "";
        $('#fileInput').value = "";
        $('#progressText').textContent = "";
    });

    return div;
};

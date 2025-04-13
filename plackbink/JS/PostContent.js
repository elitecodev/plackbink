export const content = (quote, file, base64) => {
    if (base64) {
        return `
            <details>
                <summary>${quote.length ? quote : `Uploaded an Image`}</summary>
                <img src="${base64}" alt="Image" style = "border-radius: 0%; width: 50%;height: auto;"> 
                <br>
                <a href="${file.link}">${file.fileName} | ${file.size}kB</a> 
            </details>`
    }

    if (file) {
        return `
            <details>
                <summary>${quote.length ? quote : `Uploaded a File`}</summary>
                <a href="${file.link}">${file.fileName} | ${file.size}kB</a> 
            </details>`
    }

    return `<pre>${quote}</pre>`
}
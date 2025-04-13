function routeEncrypt(text, rows, cols) {
    const cleanText = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const grid = Array.from({ length: rows }, () => Array(cols).fill('X'));
    let log = "";

    for (let i = 0, k = 0; i < rows && k < cleanText.length; i++) {
        for (let j = 0; j < cols && k < cleanText.length; j++) {
            grid[i][j] = cleanText[k++];
            log += `Placed '${grid[i][j]}' at [${i},${j}]\n`;
        }
    }

    let cipherText = "";
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            cipherText += grid[i][j];
        }
    }

    return { cipherText, log: log.trim() };
}

function routeDecrypt(cipherText, rows, cols) {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
    let log = "";

    let index = 0;
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            grid[i][j] = cipherText[index++];
            log += `Placed '${grid[i][j]}' at [${i},${j}]\n`;
        }
    }

    let plainText = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            plainText += grid[i][j];
        }
    }

    return { plainText, log: log.trim() };
}

function encryptText() {
    const text = document.getElementById("text-input").value;
    const rows = parseInt(document.getElementById("rows-input").value);
    const cols = parseInt(document.getElementById("cols-input").value);

    if (!text || isNaN(rows) || isNaN(cols)) {
        alert("Please enter valid text, rows and columns!");
        return;
    }

    const { cipherText, log } = routeEncrypt(text, rows, cols);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    const text = document.getElementById("text-input").value;
    const rows = parseInt(document.getElementById("rows-input").value);
    const cols = parseInt(document.getElementById("cols-input").value);

    if (!text || isNaN(rows) || isNaN(cols)) {
        alert("Please enter valid cipher text, rows and columns!");
        return;
    }

    const { plainText, log } = routeDecrypt(text, rows, cols);
    document.getElementById("output").textContent = `Decrypted: ${plainText}\n\n${log}`;
}

function showHint() {
    alert("Route Cipher:\n\n" +
        "1️⃣ Arrange plaintext into a matrix row-wise.\n" +
        "2️⃣ Read cipher column-by-column to encrypt.\n" +
        "3️⃣ For decryption, reconstruct the matrix column-by-column.\n" +
        "4️⃣ Output is read row-by-row to retrieve original.");
}

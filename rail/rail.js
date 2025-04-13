function railFenceEncrypt(text, key) {
    if (key < 2) return { cipherText: "", log: "Key must be >= 2." };

    text = text.replace(/[^a-zA-Z]/g, "");
    const rails = Array.from({ length: key }, () => []);
    let directionDown = false;
    let row = 0;
    let log = "";

    for (let i = 0; i < text.length; i++) {
        rails[row].push(text[i]);
        log += `Char: '${text[i]}' → Rail ${row + 1}\n`;

        if (row === 0 || row === key - 1) directionDown = !directionDown;
        row += directionDown ? 1 : -1;
    }

    const cipherText = rails.flat().join("");
    return { cipherText, log: log.trim() };
}

function railFenceDecrypt(cipherText, key) {
    if (key < 2) return "Key must be >= 2.";

    const len = cipherText.length;
    const railMatrix = Array.from({ length: key }, () => Array(len).fill(null));

    let directionDown, row = 0, col = 0;

    // Step 1: Mark positions
    for (let i = 0; i < len; i++) {
        if (row === 0) directionDown = true;
        if (row === key - 1) directionDown = false;

        railMatrix[row][col++] = '*';
        row += directionDown ? 1 : -1;
    }

    // Step 2: Fill the matrix
    let index = 0;
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < len; j++) {
            if (railMatrix[i][j] === '*' && index < len) {
                railMatrix[i][j] = cipherText[index++];
            }
        }
    }

    // Step 3: Read in zigzag
    let result = "";
    row = 0;
    col = 0;
    for (let i = 0; i < len; i++) {
        if (row === 0) directionDown = true;
        if (row === key - 1) directionDown = false;

        result += railMatrix[row][col++];
        row += directionDown ? 1 : -1;
    }

    return result;
}

function encryptText() {
    const text = document.getElementById("text-input").value;
    const key = parseInt(document.getElementById("key-input").value);

    if (!text || isNaN(key)) {
        alert("Enter valid text and number of rails.");
        return;
    }

    const { cipherText, log } = railFenceEncrypt(text, key);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    const text = document.getElementById("text-input").value;
    const key = parseInt(document.getElementById("key-input").value);

    if (!text || isNaN(key)) {
        alert("Enter valid cipher text and number of rails.");
        return;
    }

    const plainText = railFenceDecrypt(text, key);
    document.getElementById("output").textContent = `Decrypted: ${plainText}`;
}

function showHint() {
    alert("Rail Fence Cipher:\n\n" +
        "1️⃣ Write letters in a zigzag pattern across rows (rails).\n" +
        "2️⃣ Read row by row to get the encrypted message.\n" +
        "3️⃣ Decryption reconstructs the zigzag to read the original.\n" +
        "4️⃣ Works best with 2 or more rails.");
}

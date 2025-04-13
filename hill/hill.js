function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null;
}

function matrixMultiply(vec, matrix, mod = 26) {
    const [x, y] = vec;
    const [[a, b], [c, d]] = matrix;
    return [
        (a * x + b * y) % mod,
        (c * x + d * y) % mod
    ];
}

function parseKeyMatrix(keyStr) {
    const nums = keyStr.trim().split(/\s+/).map(Number);
    if (nums.length !== 4) return null;
    return [[nums[0], nums[1]], [nums[2], nums[3]]];
}

function hillEncrypt(text, matrix) {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    if (text.length % 2 !== 0) text += "X"; // pad with X if odd
    let result = "";
    let log = "";

    for (let i = 0; i < text.length; i += 2) {
        const pair = [text.charCodeAt(i) - 65, text.charCodeAt(i + 1) - 65];
        const encrypted = matrixMultiply(pair, matrix);
        result += String.fromCharCode(encrypted[0] + 65) + String.fromCharCode(encrypted[1] + 65);
        log += `Pair ${text[i]}${text[i + 1]} → (${pair.join(",")}) → (${encrypted.join(",")}) → ${result.slice(-2)}\n`;
    }

    return { cipherText: result, log: log.trim() };
}

function hillDecrypt(cipherText, matrix) {
    cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, "");
    if (cipherText.length % 2 !== 0) return "Ciphertext must have even length.";

    const [[a, b], [c, d]] = matrix;
    const det = a * d - b * c;
    const detInv = modInverse(det, 26);

    if (detInv === null) return "Key matrix is not invertible mod 26.";

    const inverseMatrix = [
        [(d * detInv) % 26, (-b * detInv) % 26],
        [(-c * detInv) % 26, (a * detInv) % 26]
    ].map(row => row.map(val => (val + 26) % 26));

    let result = "";

    for (let i = 0; i < cipherText.length; i += 2) {
        const pair = [cipherText.charCodeAt(i) - 65, cipherText.charCodeAt(i + 1) - 65];
        const decrypted = matrixMultiply(pair, inverseMatrix);
        result += String.fromCharCode(decrypted[0] + 65) + String.fromCharCode(decrypted[1] + 65);
    }

    return result;
}

function encryptText() {
    const text = document.getElementById("text-input").value;
    const keyInput = document.getElementById("key-input").value;
    const matrix = parseKeyMatrix(keyInput);

    if (!text || !matrix) {
        alert("Enter valid text and a 2x2 matrix (e.g. '3 3 2 5').");
        return;
    }

    const { cipherText, log } = hillEncrypt(text, matrix);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    const text = document.getElementById("text-input").value;
    const keyInput = document.getElementById("key-input").value;
    const matrix = parseKeyMatrix(keyInput);

    if (!text || !matrix) {
        alert("Enter valid ciphertext and a 2x2 matrix (e.g. '3 3 2 5').");
        return;
    }

    const plainText = hillDecrypt(text, matrix);
    document.getElementById("output").textContent = `Decrypted: ${plainText}`;
}

function showHint() {
    alert("Hill Cipher:\n\n" +
        "1️⃣ Uses matrix multiplication for encryption.\n" +
        "2️⃣ Requires a 2x2 key matrix (e.g. 3 3 2 5).\n" +
        "3️⃣ Only works with even-length alphabetic plaintext (pads with X if needed).\n" +
        "4️⃣ Decryption uses inverse of key matrix mod 26.");
}

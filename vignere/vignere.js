function vigenereEncrypt(text, keyword) {
    let result = "";
    keyword = keyword.toLowerCase();
    let keyIndex = 0;
    let outputString = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = (char === char.toUpperCase()) ? 65 : 97;
            let textCharCode = char.charCodeAt(0) - base;
            let keyCharCode = keyword.charCodeAt(keyIndex % keyword.length) - 97;

            let encryptedChar = String.fromCharCode(((textCharCode + keyCharCode) % 26) + base);
            result += encryptedChar;

            outputString += `Index: ${i + 1} → '${char}' + '${keyword[keyIndex % keyword.length]}' → '${encryptedChar}'\n`;
            keyIndex++;
        } else {
            result += char;
            outputString += `Index: ${i + 1} → Non-alpha '${char}'\n`;
        }
    }

    return { cipherText: result, log: outputString.trim() };
}

function vigenereDecrypt(cipherText, keyword) {
    let result = "";
    keyword = keyword.toLowerCase();
    let keyIndex = 0;

    for (let i = 0; i < cipherText.length; i++) {
        let char = cipherText[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = (char === char.toUpperCase()) ? 65 : 97;
            let cipherCharCode = char.charCodeAt(0) - base;
            let keyCharCode = keyword.charCodeAt(keyIndex % keyword.length) - 97;

            let decryptedChar = String.fromCharCode(((cipherCharCode - keyCharCode + 26) % 26) + base);
            result += decryptedChar;
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

function encryptText() {
    let text = document.getElementById("text-input").value;
    let keyword = document.getElementById("key-input").value;

    if (!text || !keyword) {
        alert("Please enter both text and keyword!");
        return;
    }

    const { cipherText, log } = vigenereEncrypt(text, keyword);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    let text = document.getElementById("text-input").value;
    let keyword = document.getElementById("key-input").value;

    if (!text || !keyword) {
        alert("Please enter both encrypted text and keyword!");
        return;
    }

    const plainText = vigenereDecrypt(text, keyword);
    document.getElementById("output").textContent = `Decrypted: ${plainText}`;
}

function showHint() {
    alert("Vigenère Cipher:\n\n" +
        "1️⃣ Use a repeating keyword to shift each letter.\n" +
        "2️⃣ Each letter is shifted based on the corresponding key letter (A=0 to Z=25).\n" +
        "3️⃣ Decryption subtracts the key letter shift instead of adding it.");
}

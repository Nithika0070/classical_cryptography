function autokeyEncrypt(text, keyword) {
    let result = "";
    let log = "";
    let key = (keyword + text).toLowerCase().replace(/[^a-z]/g, "");
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = char === char.toUpperCase() ? 65 : 97;
            let charCode = char.charCodeAt(0) - base;
            let keyCharCode = key.charCodeAt(keyIndex) - 97;

            let encryptedChar = String.fromCharCode(((charCode + keyCharCode) % 26) + base);
            result += encryptedChar;
            log += `Index: ${i + 1} → '${char}' + '${key[keyIndex]}' → '${encryptedChar}'\n`;
            keyIndex++;
        } else {
            result += char;
            log += `Index: ${i + 1} → Non-alpha '${char}'\n`;
        }
    }

    return { cipherText: result, log: log.trim() };
}

function autokeyDecrypt(cipherText, keyword) {
    let result = "";
    let key = keyword.toLowerCase().replace(/[^a-z]/g, "");
    let keyIndex = 0;

    for (let i = 0; i < cipherText.length; i++) {
        let char = cipherText[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = char === char.toUpperCase() ? 65 : 97;
            let cipherCharCode = char.charCodeAt(0) - base;
            let keyCharCode = key.charCodeAt(keyIndex) - 97;

            let decryptedChar = String.fromCharCode(((cipherCharCode - keyCharCode + 26) % 26) + base);
            result += decryptedChar;

            // Add decrypted char to key for future use
            key += decryptedChar.toLowerCase();
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

function encryptText() {
    const text = document.getElementById("text-input").value;
    const key = document.getElementById("key-input").value;

    if (!text || !/^[a-zA-Z]+$/.test(key)) {
        alert("Please enter valid text and alphabetic keyword!");
        return;
    }

    const { cipherText, log } = autokeyEncrypt(text, key);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    const text = document.getElementById("text-input").value;
    const key = document.getElementById("key-input").value;

    if (!text || !/^[a-zA-Z]+$/.test(key)) {
        alert("Please enter valid text and alphabetic keyword!");
        return;
    }

    const decrypted = autokeyDecrypt(text, key);
    document.getElementById("output").textContent = `Decrypted: ${decrypted}`;
}

function showHint() {
    alert("Autokey (Running Key) Cipher:\n\n" +
          "1️⃣ Start with a keyword.\n" +
          "2️⃣ Extend the key by adding the original plaintext.\n" +
          "3️⃣ Encrypt by adding each character of text with the extended key.\n" +
          "4️⃣ Decrypt by reconstructing the key using decrypted characters.\n" +
          "⚠️ Only alphabetic characters are shifted.");
}

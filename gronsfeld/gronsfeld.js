function gronsfeldEncrypt(text, key) {
    let result = "";
    let keyIndex = 0;
    let log = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = char === char.toUpperCase() ? 65 : 97;
            let charCode = char.charCodeAt(0) - base;
            let digit = parseInt(key[keyIndex % key.length]);

            let encryptedChar = String.fromCharCode(((charCode + digit) % 26) + base);
            result += encryptedChar;
            log += `Index: ${i + 1} → '${char}' + ${digit} → '${encryptedChar}'\n`;
            keyIndex++;
        } else {
            result += char;
            log += `Index: ${i + 1} → Non-alpha '${char}'\n`;
        }
    }

    return { cipherText: result, log: log.trim() };
}

function gronsfeldDecrypt(cipherText, key) {
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < cipherText.length; i++) {
        let char = cipherText[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = char === char.toUpperCase() ? 65 : 97;
            let charCode = char.charCodeAt(0) - base;
            let digit = parseInt(key[keyIndex % key.length]);

            let decryptedChar = String.fromCharCode(((charCode - digit + 26) % 26) + base);
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
    let key = document.getElementById("key-input").value;

    if (!text || !/^\d+$/.test(key)) {
        alert("Please enter text and a numeric key (e.g. 3142)!");
        return;
    }

    const { cipherText, log } = gronsfeldEncrypt(text, key);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    let text = document.getElementById("text-input").value;
    let key = document.getElementById("key-input").value;

    if (!text || !/^\d+$/.test(key)) {
        alert("Please enter encrypted text and a numeric key (e.g. 3142)!");
        return;
    }

    const decrypted = gronsfeldDecrypt(text, key);
    document.getElementById("output").textContent = `Decrypted: ${decrypted}`;
}

function showHint() {
    alert("Gronsfeld Cipher:\n\n" +
          "1️⃣ Similar to Vigenère, but uses numeric digits as the key.\n" +
          "2️⃣ Each digit (0–9) shifts the letter by that amount.\n" +
          "3️⃣ Decryption subtracts the digit instead of adding it.\n" +
          "4️⃣ Example key: 3142 → shifts letters by 3, 1, 4, 2 repeatedly.");
}

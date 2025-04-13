function beaufortCipher(text, keyword) {
    let result = "";
    keyword = keyword.toLowerCase();
    let keyIndex = 0;
    let log = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let base = (char === char.toUpperCase()) ? 65 : 97;
            let plainCharCode = char.charCodeAt(0) - base;
            let keyCharCode = keyword.charCodeAt(keyIndex % keyword.length) - 97;

            // Beaufort uses (key - text + 26) % 26
            let cipherChar = String.fromCharCode(((keyCharCode - plainCharCode + 26) % 26) + base);
            result += cipherChar;

            log += `Index: ${i + 1} → '${char}' & '${keyword[keyIndex % keyword.length]}' → '${cipherChar}'\n`;
            keyIndex++;
        } else {
            result += char;
            log += `Index: ${i + 1} → Non-alpha '${char}'\n`;
        }
    }

    return { cipherText: result, log: log.trim() };
}

// Beaufort is symmetric: same function for encryption & decryption
function encryptText() {
    let text = document.getElementById("text-input").value;
    let keyword = document.getElementById("key-input").value;

    if (!text || !/^[a-zA-Z]+$/.test(keyword)) {
        alert("Please enter valid text and alphabetic keyword!");
        return;
    }

    const { cipherText, log } = beaufortCipher(text, keyword);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    let text = document.getElementById("text-input").value;
    let keyword = document.getElementById("key-input").value;

    if (!text || !/^[a-zA-Z]+$/.test(keyword)) {
        alert("Please enter valid text and alphabetic keyword!");
        return;
    }

    const { cipherText, log } = beaufortCipher(text, keyword);
    document.getElementById("output").textContent = `Decrypted: ${cipherText}\n\n${log}`;
}

function showHint() {
    alert("Beaufort Cipher:\n\n" +
          "1️⃣ Similar to Vigenère, but uses the formula (Key - Text + 26) % 26.\n" +
          "2️⃣ Symmetric cipher: same algorithm for encryption and decryption.\n" +
          "3️⃣ Keyword letters are repeated to match text length.\n" +
          "4️⃣ Only alphabetic characters are transformed.");
}

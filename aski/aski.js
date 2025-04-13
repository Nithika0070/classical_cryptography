function askiCipher(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        let code = text.charCodeAt(i);

        if (c.match(/[a-zA-Z]/)) { // Check if it's an alphabet letter
            let complement = 127 - code; // Complement (127 - ASCII)
            let transformedCode = complement + 32; // Add 32
            result += String.fromCharCode(transformedCode); // Convert back to character
        } else {
            result += c; // Keep non-alphabet characters unchanged
        }
    }
    return result;
}

function askiDecrypt(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        let code = text.charCodeAt(i);

        if (code >= 32 && code <= 126) { // Only process ASCII printable characters
            let reversedComplement = code - 32; // Subtract 32
            let originalCode = 127 - reversedComplement; // Reverse complement
            result += String.fromCharCode(originalCode); // Convert back to original letter
        } else {
            result += c; // Keep non-alphabet characters unchanged
        }
    }
    return result;
}

function encryptText() {
    let text = document.getElementById("text-input").value;

    if (!text) {
        alert("Please enter valid text!");
        return;
    }

    let encryptedText = askiCipher(text);
    document.getElementById("output").textContent = "Encrypted: " + encryptedText;
}

function decryptText() {
    let text = document.getElementById("text-input").value;

    if (!text) {
        alert("Please enter valid text!");
        return;
    }

    let decryptedText = askiDecrypt(text);
    document.getElementById("output").textContent = "Decrypted: " + decryptedText;
}

function showHint() {
    alert("August Cipher Algorithm:\n\n" +
          "1️⃣ Convert alphabet to ASCII (e.g., 'a' = 97)\n" +
          "2️⃣ Take complement (127 - ASCII)\n" +
          "3️⃣ Add 32 to it\n" +
          "4️⃣ Convert back to ASCII");
}

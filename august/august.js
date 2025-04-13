function augustCipher(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let base = (c === c.toUpperCase()) ? 65 : 97;
            result += String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
        } else {
            result += c;
        }
    }
    return result;
}

function encryptText() {
    let text = document.getElementById("text-input").value;
    // let shift = parseInt(document.getElementById("shift-input").value);

    if (!text) {
        alert("Please enter valid text!");
        return;
    }

    let encryptedText = augustCipher(text, 1);
    document.getElementById("output").textContent = "Encrypted: " + encryptedText;
}

function decryptText() {
    let text = document.getElementById("text-input").value;
    //let shift = parseInt(document.getElementById("shift-input").value);

    if (!text) {
        alert("Please enter valid text and shift value!");
        return;
    }

    let decryptedText = augustCipher(text, -1);
    document.getElementById("output").textContent = "Decrypted: " + decryptedText;
}

function showHint() {
    alert("August Cipher Algorithm:\n\n" +
          "Caesar cipher with a shift of 1");
}

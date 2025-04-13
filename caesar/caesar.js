function caesarCipher(text, shift) {
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
    let shift = parseInt(document.getElementById("shift-input").value);

    if (!text || isNaN(shift)) {
        alert("Please enter valid text and shift value!");
        return;
    }

    let encryptedText = caesarCipher(text, shift);
    document.getElementById("output").textContent = "Encrypted: " + encryptedText;
}

function decryptText() {
    let text = document.getElementById("text-input").value;
    let shift = parseInt(document.getElementById("shift-input").value);

    if (!text || isNaN(shift)) {
        alert("Please enter valid text and shift value!");
        return;
    }

    let decryptedText = caesarCipher(text, -shift);
    document.getElementById("output").textContent = "Decrypted: " + decryptedText;
}

function showHint() {
    alert("Caesar Cipher Algorithm:\n\n" +
          "1️⃣ Each letter in the plaintext is shifted forward by a fixed number.\n" +
          "2️⃣ The shift wraps around if it exceeds 'Z' or 'z'.\n" +
          "3️⃣ Non-alphabet characters remain unchanged.\n\n" +
          "Example: 'ABC' with shift 3 ➝ 'DEF'");
}

function animateOutput() {
    const output = document.getElementById('output');
    output.classList.remove('output-animation');
    setTimeout(() => {
        output.classList.add('output-animation');
    }, 10);
}
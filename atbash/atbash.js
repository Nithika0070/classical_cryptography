function atbashCipher(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let base = (c === c.toUpperCase()) ? 65 : 97;
            result += String.fromCharCode(((26 - code + base - 1) % 26 + 26) % 26 + base);
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
        alert("Please enter valid text and shift value!");
        return;
    }

    let encryptedText = atbashCipher(text);
    document.getElementById("output").textContent = "Encrypted: " + encryptedText;
}

function decryptText() {
    let text = document.getElementById("text-input").value;
    // let shift = parseInt(document.getElementById("shift-input").value);

    if (!text) {
        alert("Please enter valid text and shift value!");
        return;
    }

    let decryptedText = atbashCipher(text);
    document.getElementById("output").textContent = "Decrypted: " + decryptedText;
}

function showHint() {
    alert("Atbash Cipher Algorithm:\n\n" +
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n" +
          "ZYXWVUTSRQPONMLKJIHGFEDCBA");
}

function animateOutput() {
    const output = document.getElementById('output');
    output.classList.remove('output-animation');
    setTimeout(() => {
        output.classList.add('output-animation');
    }, 10);
}
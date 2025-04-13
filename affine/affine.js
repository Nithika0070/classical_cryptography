function affineCipher(text, a, b) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let base = (c === c.toUpperCase()) ? 65 : 97;
            result += String.fromCharCode((((code - base)*a)+b) % 26 + base);
        } else {
            result += c;
        }
    }
    return result;
}

function affineDecrypCipher(text, a, b) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let base = (c === c.toUpperCase()) ? 65 : 97;
            result += String.fromCharCode(((code - base + 26 - b)*a) % 26 + base);
        } else {
            result += c;
        }
    }
    return result;
}

function encryptText() {
    let text = document.getElementById("text-input").value;
    let a = parseInt(document.getElementById("a-input").value);
    let b = parseInt(document.getElementById("b-input").value);

    if (!text || !(a==1 ||a==3||a==5||a==7||a==9||a==11||a==15||a==17||a==19||a==21||a==23||a==25)) {
        alert("Please enter valid 'a' value!");
        return;
    }

    let encryptedText = affineCipher(text,a,b);
    document.getElementById("output").textContent = "Encrypted: " + encryptedText;
}

function decryptText() {
    let text = document.getElementById("text-input").value;
    let a = parseInt(document.getElementById("a-input").value);
    let b = parseInt(document.getElementById("b-input").value);
    let a0=0;

    if (!text) {
        alert("Please enter valid text and shift value!");
        return;
    }

    if (a==1) a0=1;
    if (a==3) a0=9;
    if (a==5) a0=21;
    if (a==7) a0=15;
    if (a==9) a0=3;
    if (a==11) a0=19;
    if (a==15) a0=7;
    if (a==17) a0=23;
    if (a==19) a0=11;
    if (a==21) a0=5;
    if (a==23) a0=17;
    if (a==25) a0=25;

    let decryptedText = affineDecrypCipher(text,a0,b);
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
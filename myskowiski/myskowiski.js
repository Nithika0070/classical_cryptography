function getKeyOrder(keyword) {
    const sorted = keyword.toLowerCase().split('').map((ch, i) => ({ ch, i }));
    sorted.sort((a, b) => a.ch.localeCompare(b.ch));
    
    const order = Array(keyword.length).fill(0);
    let rank = 1;
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i].ch !== sorted[i - 1].ch) rank++;
        order[sorted[i].i] = rank;
    }
    return order;
}

function myszkowskiEncrypt(text, keyword) {
    const cleanText = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const keyOrder = getKeyOrder(keyword);
    const cols = keyword.length;
    const rows = Math.ceil(cleanText.length / cols);
    let grid = Array.from({ length: rows }, () => Array(cols).fill(''));
    let log = "";
    
    let index = 0;
    for (let i = 0; i < rows && index < cleanText.length; i++) {
        for (let j = 0; j < cols && index < cleanText.length; j++) {
            grid[i][j] = cleanText[index++];
            log += `Placed '${grid[i][j]}' at [${i},${j}]\n`;
        }
    }

    let cipherText = "";
    let uniqueRanks = [...new Set(keyOrder)].sort((a, b) => a - b);
    for (let rank of uniqueRanks) {
        for (let j = 0; j < cols; j++) {
            if (keyOrder[j] === rank) {
                for (let i = 0; i < rows; i++) {
                    if (grid[i][j]) cipherText += grid[i][j];
                }
            }
        }
    }

    return { cipherText, log: log.trim() };
}

function myszkowskiDecrypt(cipherText, keyword) {
    const keyOrder = getKeyOrder(keyword);
    const cols = keyword.length;
    const rows = Math.ceil(cipherText.length / cols);
    const total = rows * cols;
    let grid = Array.from({ length: rows }, () => Array(cols).fill(''));
    let log = "";

    let fillMap = Array(cols).fill(0);
    let counts = {};
    keyOrder.forEach((rank, i) => {
        counts[rank] = (counts[rank] || 0) + 1;
    });

    let slotsPerRank = {};
    let base = 0;
    for (let rank of [...new Set(keyOrder)].sort((a, b) => a - b)) {
        let count = keyOrder.filter(k => k === rank).length;
        slotsPerRank[rank] = count * rows;
    }

    let index = 0;
    for (let rank of Object.keys(slotsPerRank).map(Number).sort((a, b) => a - b)) {
        for (let j = 0; j < cols; j++) {
            if (keyOrder[j] === rank) {
                for (let i = 0; i < rows; i++) {
                    if (index < cipherText.length) {
                        grid[i][j] = cipherText[index++];
                        log += `Placed '${grid[i][j]}' at [${i},${j}]\n`;
                    }
                }
            }
        }
    }

    let plainText = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            plainText += grid[i][j];
        }
    }

    return { plainText, log: log.trim() };
}

function encryptText() {
    const text = document.getElementById("text-input").value;
    const keyword = document.getElementById("key-input").value;

    if (!text || !/^[a-zA-Z]+$/.test(keyword)) {
        alert("Please enter valid text and keyword!");
        return;
    }

    const { cipherText, log } = myszkowskiEncrypt(text, keyword);
    document.getElementById("output").textContent = `Encrypted: ${cipherText}\n\n${log}`;
}

function decryptText() {
    const text = document.getElementById("text-input").value;
    const keyword = document.getElementById("key-input").value;

    if (!text || !/^[a-zA-Z]+$/.test(keyword)) {
        alert("Please enter valid cipher text and keyword!");
        return;
    }

    const { plainText, log } = myszkowskiDecrypt(text, keyword);
    document.getElementById("output").textContent = `Decrypted: ${plainText}\n\n${log}`;
}

function showHint() {
    alert("Myszkowski Cipher:\n\n" +
        "1️⃣ A transposition cipher using repeated keyword letters.\n" +
        "2️⃣ Text is written row-wise in a grid by keyword length.\n" +
        "3️⃣ Columns with duplicate keyword letters are read together.\n" +
        "4️⃣ Useful for irregular columnar reading orders.");
}

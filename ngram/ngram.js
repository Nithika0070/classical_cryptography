function generateNGrams(text, n) {
    let result = {};
    text = text.toLowerCase().replace(/[^a-z]/g, ""); // keep only letters

    for (let i = 0; i <= text.length - n; i++) {
        const ngram = text.substring(i, i + n);
        result[ngram] = (result[ngram] || 0) + 1;
    }

    return result;
}

function analyzeText() {
    const text = document.getElementById("text-input").value;
    const n = parseInt(document.getElementById("n-input").value);

    if (!text || isNaN(n) || n < 1) {
        alert("Please enter valid text and a number for n.");
        return;
    }

    const ngrams = generateNGrams(text, n);
    const sorted = Object.entries(ngrams).sort((a, b) => b[1] - a[1]);

    let output = `Top ${n}-grams:\n\n`;
    for (const [gram, count] of sorted) {
        output += `'${gram}': ${count}\n`;
    }

    document.getElementById("output").textContent = output.trim();
}

function showHint() {
    alert("N-Gram Analyzer:\n\n" +
          "1️⃣ Analyzes sequences of letters (n-grams) in the input text.\n" +
          "2️⃣ Choose n = 2 for bigrams, 3 for trigrams, etc.\n" +
          "3️⃣ Non-alphabet characters are removed.\n" +
          "4️⃣ Displays how many times each n-gram occurs.");
}

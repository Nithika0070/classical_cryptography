// Function to check if a number is prime
function nextPrime(n) {
    while (true) {
        n++;
        if (isPrime(n)) return n;
    }
}

// Helper function to determine if a number is prime
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function rotransEncrypt(text, a, b) {
    let result = [];
    let outputString = ""; // To store the formatted string output
    let prime = nextPrime(a); // Get the next prime greater than `a`
    let rotationFactor = (a + b) % 4 * 90; // Base rotation

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let base = (char === char.toUpperCase()) ? 65 : 97;
        let ascii = char.charCodeAt(0) - base;
        
        // Step 1: Transform using (a * char + b)
        let x = (ascii * a + b) % 10; // Extract ones place
        let y = Math.floor((ascii * a + b) / 10); // Extract tens place

        // Step 2: Rotate by the current angle
        let angle = rotationFactor + (i * 90); // Increment rotation per letter
        let rotated = rotatePoint(x, y, angle);

        // Step 3: Translate to nearest prime
        let finalX = rotated[0] + prime;
        let finalY = rotated[1] + prime;

        // Store object for plotting
        result.push({ x: finalX, y: finalY, index: i + 1 });

        // Store formatted output string
        // outputString += `Index: ${i + 1} → (${finalX}, ${finalY})\n`;
        outputString += `(${finalX}, ${finalY})\n`;
    }

    return { points: result, textOutput: outputString.trim() }; // Return both array & formatted string
}

// Function to decrypt the text
function rotransDecrypt(encryptedText, a, b) {
    let result = "";
    let prime = nextPrime(a);
    let rotationFactor = (a + b) % 4 * 90;

    let pairs = encryptedText.match(/\(([^)]+)\)/g); // Extract (x,y) pairs

    for (let i = 0; i < pairs.length; i++) {
        let coords = pairs[i].replace(/[()]/g, "").split(",");
        let finalX = parseInt(coords[0]) - prime;
        let finalY = parseInt(coords[1]) - prime;

        // Reverse rotation
        let angle = -(rotationFactor + (i * 90)); // Reverse the angle
        let original = rotatePoint(finalX, finalY, angle);

        // Reverse affine transformation
        let ascii = (((original[1] * 10) + original[0] - b) / a)+97;
        result += String.fromCharCode(ascii);
    }

    return result;
}

// Function to rotate a point (x, y) by a given angle
function rotatePoint(x, y, angle) {
    let radians = (angle * Math.PI) / 180;
    let newX = Math.round(x * Math.cos(radians) - y * Math.sin(radians));
    let newY = Math.round(x * Math.sin(radians) + y * Math.cos(radians));
    return [newX, newY];
}

function encryptText() {
    let text = document.getElementById("text-input").value;
    let a = parseInt(document.getElementById("a-input").value);
    let b = parseInt(document.getElementById("b-input").value);

    if (!text || isNaN(a) || isNaN(b)) {
        alert("Please enter valid text and numeric values for (a, b)!");
        return;
    }

    let encryptedData = rotransEncrypt(text, a, b); // Get both data & formatted string
    document.getElementById("output").textContent = "Encrypted Points:\n" + encryptedData.textOutput;
}


function decryptText() {
    let text = document.getElementById("text-input").value;
    let a = parseInt(document.getElementById("a-input").value);
    let b = parseInt(document.getElementById("b-input").value);

    if (!text || isNaN(a) || isNaN(b)) {
        alert("Please enter valid encrypted text and numeric values for (a, b)!");
        return;
    }

    let decryptedText = rotransDecrypt(text, a, b);
    document.getElementById("output").textContent = "Decrypted: " + decryptedText;
}

// Function to plot the encrypted points on a 2D map
function plotEncryptedPoints() {
    let text = document.getElementById("text-input").value;
    let a = parseInt(document.getElementById("a-input").value);
    let b = parseInt(document.getElementById("b-input").value);

    if (!text || isNaN(a) || isNaN(b)) {
        alert("Please enter valid text and numeric values for (a, b)!");
        return;
    }

    let encryptedPoints = rotransEncrypt(text, a, b).points; 

    // Prepare data for Chart.js
    let chartData = {
        datasets: [{
            label: "Encrypted Points",
            data: encryptedPoints, // Use the fixed array
            backgroundColor: 'blue',
            pointRadius: 7,
            pointHoverRadius: 10
        }]
    };

    let ctx = document.getElementById("plotCanvas").getContext("2d");

    // Destroy existing chart if it exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create a new scatter plot
    window.myChart = new Chart(ctx, {
        type: "scatter",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let index = tooltipItem.dataIndex;
                            let point = encryptedPoints[index];
                            return `Index: ${point.index} | (${point.x}, ${point.y})`;
                        }
                    }
                }
            },
            scales: {
                x: { beginAtZero: false },
                y: { beginAtZero: false }
            },
            onClick: function (event, elements) {
                if (elements.length > 0) {
                    let index = elements[0].index;
                    let point = encryptedPoints[index];
                    alert(`Index: ${point.index}\nCoordinates: (${point.x}, ${point.y})`);
                }
            }
        }
    });
}


function showHint() {
    alert("August Cipher Algorithm:\n\n" +
          "1️⃣ Multiply each character's ASCII by 'a' and add 'b'.\n" +
          "2️⃣ Extract two-digit values (x,y) and rotate based on (a+b)%4 * 90°.\n" +
          "3️⃣ Increase rotation for each letter (90° increments).\n" +
          "4️⃣ Translate (x,y) to the nearest prime number > a.\n" +
          "5️⃣ Decryption reverses these steps to retrieve the original text.");
}

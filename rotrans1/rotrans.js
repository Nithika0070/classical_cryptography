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

// Function to encrypt text and generate (x, y) coordinates
function augustEncrypt(text, a, b) {
    let result = [];
    let prime = nextPrime(a); // Get the next prime greater than `a`
    let rotationFactor = (a + b) % 4 * 90; // Base rotation

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let base = (char === char.toUpperCase()) ? 65 : 97;
        let ascii = char.charCodeAt(0)-base;
        
        // Step 1: Transform using (a * char + b)
        let x = (ascii * a + b) % 10; // Extract ones place
        let y = Math.floor((ascii * a + b) / 10); // Extract tens place

        // Step 2: Rotate by the current angle
        let angle = rotationFactor + (i * 90); // Increment rotation per letter
        let rotated = rotatePoint(x, y, angle);

        // Step 3: Translate to nearest prime
        let finalX = rotated[0] + prime;
        let finalY = rotated[1] + prime;

        result.push({ x: finalX, y: finalY, letter: char, index: i + 1 });
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

// Function to plot the encrypted points on a 2D map
function plotEncryptedPoints() {
    let text = document.getElementById("text-input").value;
    let a = parseInt(document.getElementById("a-input").value);
    let b = parseInt(document.getElementById("b-input").value);

    if (!text || isNaN(a) || isNaN(b)) {
        alert("Please enter valid text and numeric values for (a, b)!");
        return;
    }

    let encryptedPoints = augustEncrypt(text, a, b);

    // Prepare data for Chart.js
    let chartData = {
        datasets: [{
            label: "Encrypted Points",
            data: encryptedPoints.map(p => ({ x: p.x, y: p.y })),
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

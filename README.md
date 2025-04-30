# 🔐 Classical Cryptography Visualizer

An interactive web-based tool designed to visualize and experiment with classical cryptographic algorithms. It includes both historically established ciphers and **two custom-designed encryption techniques**: **Rotrans Cipher** and **Aski Cipher**.
---

## 📌 Features

- Encrypt and decrypt text using:
  - Caesar Cipher
  - August Cipher
  - Affine Cipher
  - Vigenère Cipher
  - Autokey Cipher
  - Gronsfeld Cipher
  - Beaufort Cipher
  - Rail Fence Cipher
  - Route Cipher
  - Hill Cipher
  - Atbash Cipher
  - Myszkowski Cipher
  - N-Gram Analyzer (frequency breakdown)
- **Custom-designed ciphers**:
  - ⭐ **Rotrans Cipher** — Rotation-based affine matrix cipher
  - ⭐ **Aski Cipher** — ASCII transformation and symbolic mapping

- Output logs explaining each step
- Click-to-plot encryption points on a 2D map (for Rotrans)

---

## 🧪 Custom Algorithms

### 🔄 Rotrans Cipher

> A novel encryption method combining **affine transformation**, **rotation**, and **prime translation**.

**Decryption reverses** the rotation and translation to retrieve the original character.

---

### 💡 Aski Cipher

> A symbolic cipher leveraging ASCII transformation, mathematical complement, and encoding shift.

This cipher creates **symbolic obfuscation** and is designed for creative encoding rather than strict security.

---

## 🛠️ Tech Stack

- **HTML5 + CSS3** (custom themed with dark/pastel modes)
- **JavaScript (Vanilla)** for cipher logic
- **Chart.js** for plotting 2D coordinate outputs (in Rotrans)

---

## 🚀 How to Use

1. Clone the repository:

```bash
git clone https://github.com/Nithika0070/classical-crypto-visualizer.git
cd classical-crypto-visualizer

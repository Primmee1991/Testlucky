let names = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
let prizes = ["Motorcycle","แมว"];
const prizeImages = {
    "Motorcycle": "pic/4_White.png",
    "Smartphone": "images/smartphone.png",
    "Laptop": "images/laptop.png",
    "Headphones": "images/headphones.png",
    "Gift Card": "images/giftcard.png"
};

document.getElementById('drawButton').addEventListener('click', function() {
    if (names.length === 0 || prizes.length === 0) {
        alert("No more prizes or participants available!");
        return;
    }

    const drawButton = document.getElementById('drawButton');
    const nameElement = document.getElementById('name');
    const prizeElement = document.getElementById('prize');
    const prizeImageElement = document.getElementById('prizeImage');
    const prizeImg = document.getElementById('prizeImg');
    const loadingIcon = document.getElementById('loadingIcon');
    
    drawButton.disabled = true;
    nameElement.textContent = '...';
    prizeElement.textContent = '...';
    loadingIcon.classList.remove('hidden');
    prizeImageElement.classList.add('hidden');

    // เพิ่มเอฟเฟกต์เข้าสู่การหมุนของปุ่ม
    drawButton.style.backgroundColor = "#ff6347";
    drawButton.style.transform = "scale(1.1)";
    drawButton.textContent = "Spinning...";
    drawButton.disabled = true;
    
    // เพิ่มการหมุนภาพระหว่างรอสุ่ม
    const spinAnimation = setInterval(() => {
        nameElement.textContent = names[Math.floor(Math.random() * names.length)];
        prizeElement.textContent = prizes[Math.floor(Math.random() * prizes.length)];
    }, 100);

    setTimeout(function() {
        clearInterval(spinAnimation);

        const nameIndex = Math.floor(Math.random() * names.length);
        const prizeIndex = Math.floor(Math.random() * prizes.length);
        const winner = names[nameIndex];
        const prize = prizes[prizeIndex];

        nameElement.textContent = winner;
        prizeElement.textContent = prize;
        if (prizes === "Motorcycle") {
            prizeImg.src = "pic/4_White.png";
        } else {
            prizeImg.src = prizeImages[prize];
        }
        prizeImageElement.classList.remove('hidden');
        loadingIcon.classList.add('hidden');

        // ตัดชื่อและรางวัลที่สุ่มไปแล้วออก
        names.splice(nameIndex, 1);
        prizes.splice(prizeIndex, 1);

        // เอฟเฟกต์การหยุดการหมุนของปุ่ม
        drawButton.style.backgroundColor = "#28a745";
        drawButton.style.transform = "scale(1)";
        drawButton.textContent = "Draw Again";
        drawButton.disabled = false;

        // แสดงพลุ
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, 5000);  // 5 วินาที
});

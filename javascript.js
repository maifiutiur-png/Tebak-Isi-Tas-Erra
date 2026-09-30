// ============================================
// GAME TEBAK ISI TAS ERRA
// ============================================


// Mengambil elemen HTML
const choicesContainer =
    document.getElementById("choices");

const failCountElement =
    document.getElementById("failCount");

const messageElement =
    document.getElementById("message");

const bagItems =
    document.getElementById("bagItems");

const restartButton =
    document.getElementById("restartButton");


// ============================================
// DATA BARANG
// ============================================

// Barang yang BENAR
const correctItems = [

    {
        name: "Laptop",
        emoji: "💻"
    },

    {
        name: "Baju Ganti",
        emoji: "👕"
    },

    {
        name: "Celana Dalam",
        emoji: "🩲"
    },

    {
        name: "Siomay",
        emoji: "🥟"
    },

    {
        name: "Kacamata",
        emoji: "👓"
    },

    {
        name: "Dompet",
        emoji: "👛"
    }

];


// Barang yang SALAH
const failItems = [

    {
        name: "Obeng",
        emoji: "🪛"
    },

    {
        name: "Palu",
        emoji: "🔨"
    },

    {
        name: "Dongkrak",
        emoji: "🔧"
    },

    {
        name: "Korek Api",
        emoji: "🔥"
    },

    {
        name: "Mesin Rumput",
        emoji: "🌿"
    }

];


// Gabungkan semua pilihan
let allItems = [
    ...correctItems,
    ...failItems
];


// ============================================
// VARIABEL GAME
// ============================================

let failCount = 0;

let gameOver = false;


// ============================================
// MEMULAI GAME
// ============================================

function startGame() {

    failCount = 0;

    gameOver = false;

    failCountElement.textContent = "0";

    messageElement.textContent =
        "Pilih salah satu barang!";

    messageElement.className =
        "message";

    bagItems.innerHTML = "";

    choicesContainer.innerHTML = "";


    // Acak pilihan
    const shuffledItems =
        [...allItems].sort(
            () => Math.random() - 0.5
        );


    // Membuat tombol
    shuffledItems.forEach(item => {

        const button =
            document.createElement("button");

        button.className = "choice";


        button.innerHTML = `
            <span class="emoji">
                ${item.emoji}
            </span>

            <span>
                ${item.name}
            </span>
        `;


        button.addEventListener(
            "click",
            () => chooseItem(item, button)
        );


        choicesContainer.appendChild(button);

    });

}


// ============================================
// KETIKA PEMAIN MEMILIH BARANG
// ============================================

function chooseItem(item, button) {

    // Jika game selesai
    if (gameOver) {
        return;
    }


    // Nonaktifkan tombol
    button.disabled = true;

    button.classList.add("disabled");


    // ========================================
    // BARANG BENAR
    // ========================================

    if (correctItems.includes(item)) {

        messageElement.textContent =
            `✅ Anda Benar! ${item.name} ada di dalam Tas Erra!`;

        messageElement.className =
            "message correct";


        // Barang keluar dari tas
        showItemFromBag(item);

    }


    // ========================================
    // BARANG SALAH
    // ========================================

    else {

        failCount++;

        failCountElement.textContent =
            failCount;


        messageElement.textContent =
            `❌ FAIL! ${item.name} bukan isi Tas Erra!`;

        messageElement.className =
            "message fail";


        // Jika sudah 3 kali fail
        if (failCount >= 3) {

            gameOver = true;


            messageElement.textContent =
                "💥 YOU LOSE! 💥";


            messageElement.className =
                "message lose";


            // Matikan semua pilihan
            disableAllChoices();

        }

    }

}


// ============================================
// BARANG KELUAR DARI TAS
// ============================================

function showItemFromBag(item) {

    const itemElement =
        document.createElement("div");

    itemElement.className =
        "flying-item";


    itemElement.textContent =
        item.emoji;


    // Posisi acak barang
    const randomX =
        Math.floor(Math.random() * 180) - 90;

    const randomY =
        Math.floor(Math.random() * 100) - 50;


    itemElement.style.setProperty(
        "--x",
        `${randomX}px`
    );


    itemElement.style.setProperty(
        "--y",
        `${randomY}px`
    );


    bagItems.appendChild(itemElement);

}


// ============================================
// MATIKAN SEMUA PILIHAN
// ============================================

function disableAllChoices() {

    const buttons =
        document.querySelectorAll(".choice");


    buttons.forEach(button => {

        button.disabled = true;

        button.classList.add("disabled");

    });

}


// ============================================
// TOMBOL MAIN LAGI
// ============================================

restartButton.addEventListener(
    "click",
    startGame
);


// ============================================
// MULAI GAME
// ============================================

startGame();
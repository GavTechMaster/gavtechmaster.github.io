// Import the functions you need from the Firebase SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js';

// Your Firebase configuration (already correct based on your project details)
const firebaseConfig = {
  apiKey: "AIzaSyBCoL_maBWctsFu3B8LBbB3PgsTpiCxFws",
  authDomain: "scoreboard-cde81.firebaseapp.com",
  databaseURL: "https://scoreboard-cde81-default-rtdb.firebaseio.com",
  projectId: "scoreboard-cde81",
  storageBucket: "scoreboard-cde81.firebasestorage.app",
  messagingSenderId: "473378165305",
  appId: "1:473378165305:web:e05812390620c47184f3e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const scoreboardRef = ref(database, '/'); 

onValue(scoreboardRef, (snapshot) => {
  const data = snapshot.val(); // Get the data as a JavaScript object

  if (data) {
    console.log("Scoreboard data received:", data);

    for (let i = 1; i <= 5; i++) {
        const nameElement = document.getElementById(`name_${i}`);
        const scoreElement = document.getElementById(`score_${i}`);

        if (nameElement) {
            // --- UPDATED LOGIC FOR NAMES ---
            // Access names from the 'score_names' array in your database
            // Use (i - 1) because array indices are 0-based, and your IDs are 1-based.
            const playerName = data.score_names && data.score_names[i - 1] !== undefined
                               ? data.score_names[i - 1]
                               : `Player ${i}`;
            nameElement.textContent = `${playerName}:`;
        }

        if (scoreElement) {
            // Fetch the score from the database. Still assuming properties like data.score_1, data.score_2, etc.
            scoreElement.textContent = data[`score_${i}`] !== undefined ? data[`score_${i}`] : '--';
        }
    }

  } else {
    console.log("No scoreboard data available at this path.");
    // Clear display or show default values if no data is present
    for (let i = 1; i <= 5; i++) {
        const nameElement = document.getElementById(`name_${i}`);
        const scoreElement = document.getElementById(`score_${i}`);
        if (nameElement) {
            // Default name if no data, or if score_names array is empty/undefined
            nameElement.textContent = `Player ${i}`;
        }
        if (scoreElement) {
            scoreElement.textContent = '--'; // Default if no score in DB
        }
    }
  }
}, (error) => {
  console.error("Error fetching scoreboard data:", error);
  // Optionally, display an error message to the user on the webpage
});

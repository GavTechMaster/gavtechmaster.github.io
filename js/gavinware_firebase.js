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

// Get a reference to the specific path in your database where the scoreboard data is stored.
// This is the MOST IMPORTANT part to ensure your scoreboard links correctly.
// You need to replace 'my_scoreboard_data' with the actual path in your Realtime Database.
// For example:
// - If your data is directly at the root, use ref(database, '/');
// - If your data is under a node named 'scores', use ref(database, 'scores');
// - If your data is under a node named 'game1/scores', use ref(database, 'game1/scores');
const scoreboardRef = ref(database, '/'); // <--- ADJUST THIS PATH!

// Listen for real-time data changes
onValue(scoreboardRef, (snapshot) => {
  const data = snapshot.val(); // Get the data as a JavaScript object

  if (data) {
    console.log("Scoreboard data received:", data); // For debugging: see what data comes in

    // Update scores
    // Ensure your HTML elements have IDs like 'score_1', 'score_2', etc.
    // The code assumes the 'data' object directly contains properties like 'score_1', 'score_2', etc.
    document.getElementById('score_1').textContent = data.score_1 !== undefined ? data.score_1 : '--';
    document.getElementById('score_2').textContent = data.score_2 !== undefined ? data.score_2 : '--';
    document.getElementById('score_3').textContent = data.score_3 !== undefined ? data.score_3 : '--';
    document.getElementById('score_4').textContent = data.score_4 !== undefined ? data.score_4 : '--';
    document.getElementById('score_5').textContent = data.score_5 !== undefined ? data.score_5 : '--';

    // If you add HTML elements for score names (e.g., <span id="name_1">),
    // you could re-introduce logic like:
    // document.getElementById('name_1').textContent = data.name_1 !== undefined ? data.name_1 : 'Player 1';

  } else {
    console.log("No scoreboard data available at this path.");
    // Clear display or show default values if no data is present
    for (let i = 1; i <= 5; i++) {
        const scoreElement = document.getElementById(`score_${i}`);
        if (scoreElement) {
            scoreElement.textContent = '--';
        }
    }
  }
}, (error) => {
  console.error("Error fetching scoreboard data:", error);
  // Optionally, display an error message to the user on the webpage
});

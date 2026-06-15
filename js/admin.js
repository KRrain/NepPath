// TODO: Replace the following with your app's Firebase project configuration
// You can get this from Firebase Console > Project Settings > General > Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyCHALD_GGX-KTx0edaJeLZTezQWD5bARk4",
  authDomain: "neppath-1415f.firebaseapp.com",
  projectId: "neppath-1415f",
  storageBucket: "neppath-1415f.firebasestorage.app",
  messagingSenderId: "934979565356",
  appId: "1:934979565356:web:d6cfb97398c323a5101e89",
  measurementId: "G-22PMW3P48D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const addEventForm = document.getElementById('addEventForm');
const addMemberForm = document.getElementById('addMemberForm');
const createAdminForm = document.getElementById('createAdminForm');
const statusMessage = document.getElementById('statusMessage');

// --- AUTHENTICATION STATE OBSERVER ---
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    logoutBtn.style.display = 'inline-block';
    console.log("Admin logged in:", user.email);
  } else {
    // User is signed out
    loginSection.style.display = 'block';
    dashboardSection.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
});

// --- LOGIN LOGIC ---
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  const errorMsg = document.getElementById('loginError');

  auth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
      errorMsg.textContent = "Login Failed: " + error.message;
    });
});

// --- LOGOUT LOGIC ---
logoutBtn.addEventListener('click', () => {
  auth.signOut();
});

// --- ADD DATA (EVENT) LOGIC ---
addEventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const route = document.getElementById('eventRoute').value;
  const time = document.getElementById('eventTime').value;

  // Add to Firestore collection "events"
  db.collection("events").add({
    title: title,
    date: date,
    route: route,
    time: time,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    statusMessage.textContent = "✅ Event added successfully!";
    statusMessage.style.color = "#00C851";
    addEventForm.reset();
    
    // Clear success message after 3 seconds
    setTimeout(() => statusMessage.textContent = "", 3000);
  })
  .catch((error) => {
    statusMessage.textContent = "❌ Error adding event: " + error.message;
    statusMessage.style.color = "#ff4444";
  });
});

// --- ADD DATA (MEMBER) LOGIC ---
addMemberForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('memberName').value;
  const role = document.getElementById('memberRole').value;
  const avatar = document.getElementById('memberAvatar').value || 'Ico/NepPath Logo circle dim.png';
  const tmpId = document.getElementById('memberTmpId').value;

  db.collection("members").add({
    name: name,
    role: role,
    avatar: avatar,
    tmpId: tmpId,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    statusMessage.textContent = "✅ Member added successfully!";
    statusMessage.style.color = "#00C851";
    addMemberForm.reset();
    setTimeout(() => statusMessage.textContent = "", 3000);
  })
  .catch((error) => {
    statusMessage.textContent = "❌ Error adding member: " + error.message;
    statusMessage.style.color = "#ff4444";
  });
});

// --- CREATE NEW ADMIN LOGIC ---
createAdminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('newAdminEmail').value;
  const password = document.getElementById('newAdminPassword').value;

  // Note: This will sign in the new user immediately after creation
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      statusMessage.textContent = "✅ New Admin Created: " + userCredential.user.email;
      statusMessage.style.color = "#00C851";
      createAdminForm.reset();
      setTimeout(() => statusMessage.textContent = "", 3000);
    })
    .catch((error) => {
      statusMessage.textContent = "❌ Error creating admin: " + error.message;
      statusMessage.style.color = "#ff4444";
    });
});
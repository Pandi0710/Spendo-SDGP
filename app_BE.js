const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc } = require("firebase/firestore");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Welcome to the Gamified Backend API!");
});

const firebaseConfig = {
  apiKey: "AIzaSyAco07lR_i6lmbPvkfQYCLQJUpYsn2UN4w",
  authDomain: "gamified-backend-5295f.firebaseapp.com",
  projectId: "gamified-backend-5295f",
  storageBucket: "gamified-backend-5295f.firebasestorage.app",
  messagingSenderId: "857976780381",
  appId: "1:857976780381:web:f36fa3ca3c1da342db3fb4",
  measurementId: "G-XHQ3GG4S51"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const goalsCollection = collection(db, "goals");


app.post("/goals", async (req, res) => {
  try {
    const { name, target } = req.body;
    const docRef = await addDoc(goalsCollection, {
      name,
      progress: 0,
      target: Number(target),
      completed: false,
    });
    res.status(201).json({ id: docRef.id, name, progress: 0, target, completed: false });
  } catch (error) {
    res.status(500).json({ error: "Failed to add goal" });
  }
});


app.get("/goals", async (req, res) => {
  try {
    const querySnapshot = await getDocs(goalsCollection);
    const goals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});


app.put("/goals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const goalRef = doc(db, "goals", id);
    
    const goalSnapshot = await getDocs(goalsCollection);
    let goalData = null;
    goalSnapshot.forEach((doc) => {
      if (doc.id === id) {
        goalData = doc.data();
      }
    });

    if (!goalData) {
      return res.status(404).json({ error: "Goal not found" });
    }

    const newProgress = Math.min(goalData.progress + amount, goalData.target);
    const completed = newProgress >= goalData.target;
    await updateDoc(goalRef, { progress: newProgress, completed });
    res.status(200).json({ id, name: goalData.name, progress: newProgress, target: goalData.target, completed });
  } catch (error) {
    res.status(500).json({ error: "Failed to update goal" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

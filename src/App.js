import "./App.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import HomePage from "./components/HomePage";
import Home from "./components/Home";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAufG-g3lbCN1Ves1ioT-c5W9OTo_qg8Ao",
  authDomain: "smart-lock-31bb9.firebaseapp.com",
  projectId: "smart-lock-31bb9",
  storageBucket: "smart-lock-31bb9.appspot.com",
  messagingSenderId: "430990960953",
  appId: "1:430990960953:web:cc0a2e84ee5dfd6bb7e0e8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

function App() {
  const [user, setUser] = useState(null);
  const [uid, setUID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const auth = getAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const [tab, setTab] = useState("My Tasks");

  const logIn = async (e) => {
    try {
      await signInWithPopup(auth, provider);
      // Login successful
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const logOut = async (e) => {
    await signOut(auth);
  };

  useEffect(() => {
    //signOut(auth);
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(userAuth);
        setUID(userAuth.uid);
        setLoggedIn(true);

        onValue(ref(db, "users/" + userAuth.uid), (snapshot) => {
          if (!snapshot.exists()) {
            set(ref(db, "users/" + userAuth.uid), {
              isHome: false,
              group: "none",
              name: userAuth.displayName,
            });
          }
        });
      } else {
        // User is signed out
        setLoggedIn(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {loggedIn == null ? null : !loggedIn ? (
        <HomePage user={user} uid={uid} db={db} logIn={logIn} />
      ) : (
        <Home user={user} uid={uid} db={db} logOut={logOut} />
      )}
    </Box>
  );
}

export default App;
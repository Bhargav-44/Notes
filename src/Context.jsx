import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  QuerySnapshot,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./Firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const collectionRef1 = collection(db, "users");
  const [people, setPeople] = useState([]);

  const readUser = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const item = []
      querySnapshot.forEach((doc) => {
        item.push(doc.data())
      });
      setPeople(item);
    } catch (error) {
      console.log("Error while fetching data:", error);
    }
    console.log(people)
  };

  const collectionRef = collection(db, "notes");
  const [notes, setNotes] = useState([]);
  const [temp, setTemp] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [newUser, setNewUser] = useState(false)
  const convertToTimestamp = (timestampString) => {
    return new Date(timestampString);
  };
  notes.sort((a, b) => {
    const timestampA = convertToTimestamp(a.timestamp);
    const timestampB = convertToTimestamp(b.timestamp);
    return timestampB - timestampA;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [curUser, setCurUser] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const storeUserData = async (name, email, password) => {
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
      password,
    });
    console.log(docRef.id);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredetial) => {
        console.log(userCredetial);
        // console.log(auth1)
        console.log("Current user:", auth.currentUser.email);
        console.log(curUser);
        setError(false)
        setSubmitted(true)

      })
      .catch((error) => {
        setError(true)
        console.log(error);
      });

    if (!check && password.length >= 8){storeUserData(name, email, password);}
    
    setName("");
    setEmail("");
    setPassword("");
    readUser();
  };
  const [pop, setPop] = useState(null)

  const handleLogin = async (e,email,password) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in as:", user.email);
        // console.log(auth1)
        console.log("Current user:", auth.currentUser.email);
        console.log(curUser);
        setSubmitted(true)
        setCheck("")
        setError(false)
        
        
      })
      .catch((error) => {
        setError(true)
        setPop("Wrong Password");
        setTimeout(() => {
          setPop(null);
        }, 2000);
        console.log(error);
      });
    setEmail("");
    setPassword("");
    readUser();
  };
  const [check , setCheck] = useState("")

  useEffect(()=> {
    const checkEmail = (email) => {
      people.forEach((el) => {
        if (el.email === email) {
          setCheck('Email already in use');
          setSubmitted(false);
          
        }
      });
    };
    return checkEmail(email)
  },[email])

  useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurUser(user.email);
		});

		return unsubscribe;
	}, []);

  
  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (QuerySnapshot) => {
      try {
        const items = [];
        QuerySnapshot.forEach((doc) => {
          const timestampData = doc.data().timestamp;
          const date = new Date(
            timestampData.seconds * 1000 + timestampData.nanoseconds / 1000000
          );
          setTimestamp(date);
          const itemData = {
            ...doc.data(),
            id: doc.id,
            timestamp: date,
          };
          items.push(itemData);
        });
        setNotes(items);
        console.log("Real-time update received.");
      } catch (error) {
        console.log("Error in onSnapshot listener:", error);
      }
    });

    return () => {
      unsub();
      readUser();
    };
  }, []);
  const storeNotes = async () => {
    await addDoc(collection(db, "notes"), {
      note: temp,
      timestamp: serverTimestamp(),
      user:curUser
    });
    setTemp("");
  };
  const handleDelete = async (id) => {
    try {
      const userDoc = doc(db, "notes", id);
      await deleteDoc(userDoc);
    } catch (error) {
      console.log("Error deleting document:", error);
    }
  };

  async function logOut() {
    try {
      await signOut(auth);
      // Sign-out successful, update the state.
      setSubmitted(false);
    } catch (error) {
      // Handle any errors that occur during sign-out.
      console.error(error);
    }
  }
  

  return (
    <AppContext.Provider
      value={{
        notes,
        temp,
        setTemp,
        timestamp,
        storeNotes,
        handleDelete,
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        handleSubmit,
        handleLogin,
        logOut,
        curUser,
        setCurUser,
        people,
        error,
        submitted,
        pop,
        newUser, setNewUser,
        setSubmitted,
        check
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./Firebase";
import { nanoid } from "nanoid";
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

function App() {
  const collectionRef = collection(db, "notes");
  const [notes, setNotes] = useState([]);
  const [temp, setTemp] = useState("");
  let Id = nanoid();
  const [timestamp, setTimestamp] = useState(null);
  const convertToTimestamp = (timestampString) => {
    return new Date(timestampString);
  };
  notes.sort((a, b) => {
    const timestampA = convertToTimestamp(a.timestamp);
    const timestampB = convertToTimestamp(b.timestamp);
    return timestampB - timestampA;
  });

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
    };
  }, []);

  const storeNotes = async () => {
    await addDoc(collection(db, "notes"), {
      note: temp,
      timestamp: serverTimestamp(),
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

  return (
    <div className="text-center bg-[#0C1030] min-h-screen">
      <h1 className="text-4xl text-white mb-7">NOTES</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-10 text-white mx-10">
        <div className="justify-center bg-[#24294D]  rounded-2xl backdrop-blur-xl">
          <textarea
            className="bg-[#24294D] py-8 px-4 rounded-2xl border-none  focus:outline-0 resize-none "
            required
            placeholder="Type your note..."
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            cols="30"
            rows="8"
          ></textarea>
          <button
            className="rounded-2xl bg-blue-500 p-2 absolute right-0 bottom-0 mr-4 mb-4"
            onClick={storeNotes}
          >
            Save
          </button>
        </div>
        {notes.map((note) => (
          <div className="relative p-20 bg-[#24294D] rounded-2xl break-all backdrop-blur-xl">
            <p className="uppercase font-mono">{note.note}</p>
            <p className="font-mono p-2 absolute left-0 bottom-0 mr-4 mb-4">
              {note.timestamp.toLocaleString()}
            </p>
            <button
              className="rounded-2xl bg-blue-500 p-2 absolute right-0 bottom-0 mr-4 mb-4"
              onClick={() => {
                handleDelete(note.id);
              }}
            >
              Delete
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import "./App.css";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [loggedIn, setloggedIn] = useState();
  const [movieList, setmoiveList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newreleaseDate, setnewreleaseDate] = useState(0);
  const [isnewMovieOscar, setisnewMovieOscar] = useState(false);

  const [updateTitle, setupdateTitle] = useState("");
  const [fileUpload, setfileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setmoiveList(filterData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updateTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  //uploadFile
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      console.log(fileUpload.name)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedIn(true);
      } else {
        setloggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const onsubmitMovie = async () => {
    try {
      if (!loggedIn) {
        return;
      }
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releasedate: newreleaseDate,
        receiveAnOscar: isnewMovieOscar,
        userid: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Movie Title?"
          onChange={(e) => setnewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Relasedate?"
          onChange={(e) => setnewreleaseDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isnewMovieOscar}
          onChange={(e) => setisnewMovieOscar(e.target.checked)}
        />
        <label>Received An Oscar?</label>
        <button onClick={onsubmitMovie}> Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receiveAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releasedate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              type="text"
              placeholder="New Title Enter Here.."
              onChange={(e) => setupdateTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setfileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;

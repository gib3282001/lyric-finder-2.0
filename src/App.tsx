import React, { useEffect, useState } from "react";
import InputContainer from "./components/InputContainer/InputContainer";
import Alert from "./components/Alert/Alert";
import LyricsContainer from "./components/LyricsContainer/LyricsContainer";
import "./App.css";
import { getSpecificLyric, postLyrics, getLyrics } from "./requestHandlers";

function App() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState(false);
  const handleRequest = async () => {
    try {
      const lyric = await getSpecificLyric(title, artist);
      if (!lyric.length) {
        const apiRequest = await fetch(
          `https://api.lyrics.ovh/v1/${artist}/${title}`
        );
        const response = await apiRequest.json();
        setLyrics(response.lyrics);
        await postLyrics(title, artist, response.lyrics);
      } else {
        setLyrics(lyric[0].verses);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <>
      {error && (
        <Alert onClose={() => setError(false)}>
          Lyrics not found, try a different song or artist.
        </Alert>
      )}
      {!lyrics && (
        <InputContainer
          setTitle={setTitle}
          setArtist={setArtist}
          getLyrics={() => handleRequest()}
        ></InputContainer>
      )}
      {lyrics && (
        <LyricsContainer onClose={() => setLyrics("")}>
          {lyrics}
        </LyricsContainer>
      )}
    </>
  );
}

export default App;

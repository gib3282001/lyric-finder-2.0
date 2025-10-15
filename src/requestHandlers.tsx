export const getLyrics = async () => {
  try {
    const lyricsObj = await fetch(
      "https://lyric-finder-2-0.onrender.com/lyrics"
    );
    const returnObj = await lyricsObj.json();
    return returnObj;
  } catch (err) {
    console.log(err);
  }
};

export const postLyrics = async (
  songName: string,
  artistName: string,
  verses: string
) => {
  try {
    const request = await fetch(
      "https://lyric-finder-2-0.onrender.com/lyrics",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songName, artistName, verses }),
      }
    );
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getSpecificLyric = async (
  songName: string,
  artistName: string
) => {
  try {
    const request = await fetch(
      "https://lyric-finder-2-0.onrender.com/getLyric",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songName, artistName }),
      }
    );
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

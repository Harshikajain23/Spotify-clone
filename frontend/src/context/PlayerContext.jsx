import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "https://spotify-clone-r2qx.onrender.com";
  const lastPlayedIdRef = useRef(null);
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };


const playWithId = async (id) => {
  // 🚫 SAME SONG → just play/pause, NO COUNT
  if (track?._id === id) {
    if (playStatus) {
      audioRef.current.pause();
      setPlayStatus(false);
    } else {
      audioRef.current.play();
      setPlayStatus(true);
    }
    return;
  }

  // ✅ NEW SONG → count ONCE
  try {
    await axios.post(`${url}/api/song/increase-play/${id}`);

    setSongsData((prev) =>
      prev.map((song) =>
        song._id === id
          ? { ...song, playCount: (song.playCount || 0) + 1 }
          : song
      )
    );

    lastPlayedIdRef.current = id;
  } catch (err) {
    console.log("Play count error", err);
  }

  // 🎵 switch track
  const song = songsData.find((item) => item._id === id);
  setTrack(song);

  audioRef.current.src = song.file; // IMPORTANT
  await audioRef.current.play();
  setPlayStatus(true);
};


  const previous = () => {
    songsData.forEach((item, index) => {
      if (track?._id === item._id && index > 0) {
        setTrack(songsData[index - 1]);
        audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const next = () => {
    songsData.forEach((item, index) => {
      if (track?._id === item._id && index < songsData.length - 1) {
        setTrack(songsData[index + 1]);
        audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
  };

const getSongsData = async () => {
  try {
    const response = await axios.get(`${url}/api/song/list`);

    // Check if songs exist
    if (response.data && response.data.songs && response.data.songs.length > 0) {
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } else {
      console.log("No songs returned from backend:", response.data);
      setSongsData([]);
      setTrack(null); // avoid crash
    }
  } catch (error) {
    console.log("Error fetching songs:", error);
    setSongsData([]);
    setTrack(null); // avoid crash
  }
};


const getAlbumsData = async () => {
  try {
    const response = await axios.get(`${url}/api/album/list`);

    if (response.data && response.data.albums && response.data.albums.length > 0) {
      setAlbumsData(response.data.albums);
    } else {
      console.log("No albums returned from backend:", response.data);
      setAlbumsData([]);
    }
  } catch (error) {
    console.log("Error fetching albums:", error);
    setAlbumsData([]);
  }
};


  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.ontimeupdate = () => {
      seekBar.current.style.width =
        (Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) || 0) + "%";

      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60) || 0,
          minute: Math.floor(audioRef.current.duration / 60) || 0,
        },
      });
    };
  }, [audioRef]);

  

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "http://spotify-clone-r2qx.onrender.com";

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
    // 1️⃣ Update local songsData so UI refreshes
    const updatedSongs = songsData.map((item) =>
      item._id === id ? { ...item, playCount: (item.playCount || 0) + 1 } : item
    );
    setSongsData(updatedSongs);

    // 2️⃣ Set the current track
    const song = updatedSongs.find((item) => item._id === id);
    setTrack(song);

    // 3️⃣ Play the audio
    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (err) {
      // swallow autoplay errors
      console.log("Audio play error:", err);
    }
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
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {
      console.log("Error fetching songs:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.log("Error fetching albums:", error);
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

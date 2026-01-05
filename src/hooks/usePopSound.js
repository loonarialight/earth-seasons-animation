import { useEffect, useRef } from "react";
import popSound from "../assets/pop.mp3";

export function usePopSound(volume = 0.35) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(popSound);
    audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    if (!audioRef.current) return;

    // 🔑 если уже играет — НЕ перезапускаем
    if (!audioRef.current.paused) return;

    audioRef.current.play().catch(() => {});
  };

  return play;
}

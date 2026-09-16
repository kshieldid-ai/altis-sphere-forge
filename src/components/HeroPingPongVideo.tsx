import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  reduceMotion?: boolean;
};

const HeroPingPongVideo = ({ src, reduceMotion = false }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cycleDuration, setCycleDuration] = useState(11.75);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const syncDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setCycleDuration(video.duration * 2);
      }
    };

    const freezeAtEnd = () => {
      video.pause();
    };

    const startMotion = () => {
      setAnimating(true);
    };

    const restartForward = () => {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    };

    video.loop = false;
    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("playing", startMotion);
    video.addEventListener("ended", freezeAtEnd);
    video.addEventListener("animationiteration", restartForward);
    if (video.readyState >= 1) syncDuration();
    if (!video.paused) startMotion();

    return () => {
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("playing", startMotion);
      video.removeEventListener("ended", freezeAtEnd);
      video.removeEventListener("animationiteration", restartForward);
    };
  }, [reduceMotion]);

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 h-full w-full origin-center object-cover object-center will-change-transform"
      autoPlay={!reduceMotion}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      style={
        reduceMotion || !animating
          ? undefined
          : { animation: `hero-zoom-pingpong ${cycleDuration}s ease-in-out infinite` }
      }
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default HeroPingPongVideo;

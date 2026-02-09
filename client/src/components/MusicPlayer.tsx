import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
// Default fallback image
// import defaultCover from "@assets/Default.jpeg";

interface Song {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

// --- CONFIGURATION ---
const PLAYLIST: Song[] = [
  {
    title: "The Idea of You",
    artist: "August Moon",
    // This looks for client/public/music/song.mp3
    src: "/music/The Idea of You.mp3", 
    // This looks for client/public/music/albumart/default.jpg
    cover: "/music/albumart/the_idea_of_you.webp",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    // Add song2.mp3 to client/public/music/
    src: "/music/Perfect.mp3", 
    cover: "/music/albumart/perfect.webp",
  },
  // Add more songs here...
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = PLAYLIST[currentSongIndex];

  // Toggle Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Next Song
  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  // Previous Song
  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  // Auto-play when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); // Reloads the new src
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Auto-play blocked:", e));
      }
    }
  }, [currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-[100] w-80 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl overflow-hidden"
    >
      <audio 
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={(e) => console.error("Audio Load Error:", e)}
      />

      <div className="p-4 flex gap-4 items-center">
        {/* Album Art */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-md group">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentSong.cover}
              src={currentSong.cover} 
              alt="Art"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? "scale-110" : "scale-100"}`}
              onError={(e) => { (e.target as HTMLImageElement).src = "/music/albumart/Default.jpeg" }}
            />
          </AnimatePresence>
          
          {/* Visualizer Overlay */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity ${isPlaying ? "opacity-100" : "opacity-0"}`}>
             <div className="space-x-[2px] flex items-end h-4">
                <motion.div animate={isPlaying ? { height: [4, 12, 4] } : { height: 4 }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
                <motion.div animate={isPlaying ? { height: [4, 16, 4] } : { height: 4 }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white rounded-full" />
                <motion.div animate={isPlaying ? { height: [4, 10, 4] } : { height: 4 }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
             </div>
          </div>
        </div>
        
        {/* Info & Controls */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="mb-2">
             <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-bold tracking-wider text-primary px-2 py-0.5 bg-primary/10 rounded-full uppercase">
                 Now Playing
               </span>
             </div>
             <h3 className="font-comic font-bold text-foreground truncate text-sm">
               {currentSong.title}
             </h3>
             <p className="text-xs text-muted-foreground truncate font-medium">
               {currentSong.artist}
             </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handlePrev} className="text-muted-foreground hover:text-primary transition-colors">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/30"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
            </button>
            
            <button onClick={handleNext} className="text-muted-foreground hover:text-primary transition-colors">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div 
        className="h-1 bg-secondary/50 w-full cursor-pointer relative group" 
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const width = rect.width;
          const x = e.clientX - rect.left;
          if(audioRef.current && audioRef.current.duration) {
             const newTime = (x / width) * audioRef.current.duration;
             audioRef.current.currentTime = newTime;
          }
        }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-pink-400 relative"
          style={{ width: `${progress}%` }}
        >
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
    </motion.div>
  );
}
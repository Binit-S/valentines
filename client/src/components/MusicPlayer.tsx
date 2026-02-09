import { motion } from "framer-motion";
import { Play, SkipBack, SkipForward, Pause } from "lucide-react";
import { useState } from "react";
import musicPlayerImg from "@assets/music_player_1770624033532.jpg";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-50 w-72 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl overflow-hidden"
    >
      <div className="p-4 flex gap-4 items-center">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-md">
          <img 
            src={musicPlayerImg} 
            alt="Album Art" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary px-1.5 py-0.5 bg-primary/10 rounded-full">
              Now Playing
            </span>
          </div>
          <h3 className="font-comic font-bold text-foreground truncate mt-1">My Heartbeat.mp3</h3>
          <p className="text-xs text-muted-foreground truncate">For You</p>
          
          <div className="flex items-center gap-3 mt-2">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 transition-transform shadow-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-secondary w-full">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ 
            width: isPlaying ? ["0%", "100%"] : "30%" 
          }}
          transition={
            isPlaying 
              ? { duration: 30, repeat: Infinity, ease: "linear" }
              : { duration: 0.5 }
          }
        />
      </div>
    </motion.div>
  );
}

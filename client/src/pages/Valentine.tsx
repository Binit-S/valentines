import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { StickerBackground } from "@/components/StickerBackground";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ValentineCard } from "@/components/ValentineCard";
import { LoveBurst } from "@/components/LoveBurst";
import confetti from "canvas-confetti";

type FlowState = "intro" | "q1" | "q2" | "ending";

export default function ValentinePage() {
  const [state, setState] = useState<FlowState>("intro");
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [showLoveBurst, setShowLoveBurst] = useState(false);
  
  // Interaction States for Side Stickers
  const [leftSticker, setLeftSticker] = useState<string | null>(null);
  const [rightSticker, setRightSticker] = useState<string | null>(null);

  // --- CONFIGURATION: LOCAL FILES ---
  const HAPPY_STICKERS = [
    "/stickers/happy.webp",
    "/stickers/happy2.webp",
    "/stickers/love3.webp",
    "/stickers/love.webp"
  ];

  const SAD_STICKERS = [
    "/stickers/sad1.webp",
    "/stickers/sad2.webp",
    "/stickers/sad3.webp",
    "/stickers/sad4.webp"
  ];

  const LAST_NO_STICKER = "/stickers/sad4.webp";
  const ENDING_STICKER = "/stickers/love3 (2).webp";
  const BURST_STICKER = "/stickers/love2.webp";

  // Preload images
  useEffect(() => {
    const allStickers = [
      ...HAPPY_STICKERS, 
      ...SAD_STICKERS, 
      LAST_NO_STICKER, 
      ENDING_STICKER, 
      BURST_STICKER
    ];
    
    allStickers.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const noTexts = ["No", "Are you sure?", "Really?", "Don't!", "Click Yes!", "Please?", "Last chance!","Pretty please?"];

  // Transition from Intro to Q1
  useEffect(() => {
    if (state === "intro") {
      const timer = setTimeout(() => {
        setState("q1");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleNoHover = () => {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
    
    const isLastChance = noCount >= noTexts.length - 1;
    
    if (isLastChance) {
        setRightSticker(LAST_NO_STICKER);
    } else {
        const randomSad = SAD_STICKERS[Math.floor(Math.random() * SAD_STICKERS.length)];
        setRightSticker(randomSad);
    }
    
    setLeftSticker(null);
  };

  const handleYes = () => {
    const randomHappy = HAPPY_STICKERS[Math.floor(Math.random() * HAPPY_STICKERS.length)];
    setLeftSticker(randomHappy);
    setRightSticker(null);

    if (state === "q1") {
      setTimeout(() => {
        setState("q2");
        setNoCount(0);
        setNoButtonPos({ x: 0, y: 0 });
        setLeftSticker(null); 
      }, 1200); 

    } else if (state === "q2") {
      setShowLoveBurst(true);
      setTimeout(() => {
        setState("ending");
        setShowLoveBurst(false);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#ec4899', '#f43f5e']
        });
      }, 1500); 
    }
  };
  
  const getNoButtonText = () => {
    return noTexts[Math.min(noCount, noTexts.length - 1)];
  };

  const springTransition: Transition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden flex flex-col items-center justify-center font-sans">
      <StickerBackground />
      <MusicPlayer />
      <LoveBurst show={showLoveBurst} />

      <AnimatePresence mode="wait">
        {state === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center"
          >
            <h1 className="text-shadows text-6xl md:text-8xl px-4 ">
              hii!!   Kuki ❤
            </h1>
          </motion.div>
        )}

        {(state === "q1" || state === "q2") && (
          <div className="z-10 w-full max-w-6xl flex flex-row items-center justify-between px-4 md:px-10 h-full relative">
            
            {/* LEFT SIDE (YES REACTION) */}
            <div className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 w-48 md:w-64 pointer-events-none z-20">
                <AnimatePresence>
                    {leftSticker && (
                        <motion.div 
                            key={leftSticker}
                            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={springTransition}
                            className="w-full"
                        >
                             <img 
                                src={leftSticker} 
                                alt="Happy Sticker" 
                                className="w-full h-auto drop-shadow-xl"
                             />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CENTER CARD */}
            <div className="w-full flex justify-center z-30">
                <ValentineCard 
                    state={state}
                    noButtonPos={noButtonPos}
                    noCount={noCount}
                    handleYes={handleYes}
                    handleNoHover={handleNoHover}
                    getNoButtonText={getNoButtonText}
                />
            </div>

            {/* RIGHT SIDE (NO REACTION) */}
            <div className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 w-48 md:w-64 pointer-events-none z-20">
                <AnimatePresence>
                    {rightSticker && (
                        <motion.div 
                            key={rightSticker} 
                            initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={springTransition}
                            className="w-full"
                        >
                            <img 
                                src={rightSticker} 
                                alt="Sad Sticker" 
                                className="w-full h-auto drop-shadow-xl"
                             />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        )}

        {state === "ending" && (
          <motion.div
            key="ending"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
            className="z-20 p-4 w-full flex justify-center items-center"
          >
            {/* Ending Card - Borcelle Style */}
            <div className="relative bg-[#fbf4e9] rounded-[18px] p-[22px] text-center shadow-xl border-none w-full max-w-md">
               {/* Decorative Top Line */}
               <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[90px] h-[28px] border-t-[3px] border-[#c2b59b]" />
               
               {/* Header / Ending Text */}
               <div className="mb-[14px]">
                 <h1 className="text-[32px] font-bold text-[#6b6a3d] leading-none font-hand">
                   ✿ See you soon! ✿
                 </h1>
               </div>

               {/* Inner Section with GIF */}
               <div className="bg-[#f6cfd8] rounded-[14px] p-[20px] flex flex-col items-center">
                  <div className="rounded-xl overflow-hidden mb-6 w-full shadow-inner bg-white/50 p-4">
                     <img 
                        src={ENDING_STICKER} 
                        alt="Ending" 
                        className="w-full h-auto object-contain drop-shadow-sm"
                     />
                  </div>
                  <p className="text-[#6b6a3d] text-2xl font-cute font-bold">
                    Can't wait for our date!
                  </p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-0 w-full text-center z-0 pointer-events-none">
        {(state === "q1" || state === "q2") && (
            <p className="text-sm text-muted-foreground/60 font-cute font-bold animate-pulse">
                {state === "q1" ? "* terms and conditions apply (hugs included)" : "* no takebacks allowed"}
            </p>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickerBackground } from "@/components/StickerBackground";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import confetti from "canvas-confetti";
import endingImg from "@assets/ending_page_1770624033532.jpg";
import profileImg from "@assets/profile_1_1770624033529.jpg";

type FlowState = "intro" | "q1" | "q2" | "ending";

export default function ValentinePage() {
  const [state, setState] = useState<FlowState>("intro");
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

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
    // Make the button jump to a random position near its original spot
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
  };

  const handleYes = () => {
    if (state === "q1") {
      setState("q2");
      setNoCount(0);
      setNoButtonPos({ x: 0, y: 0 });
    } else if (state === "q2") {
      setState("ending");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#f43f5e']
      });
    }
  };

  const getNoButtonText = () => {
    const texts = ["No", "Are you sure?", "Really?", "Don't do this!", "Click Yes!", "Pretty please?", "Last chance!"];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center font-sans">
      <StickerBackground />
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {state === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="z-10 text-center"
          >
            <h1 className="font-hand text-6xl text-primary font-bold drop-shadow-sm">
              Hey there... ❤️
            </h1>
          </motion.div>
        )}

        {(state === "q1" || state === "q2") && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="z-10 w-full max-w-md px-4"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-2xl overflow-hidden rounded-3xl p-8 text-center relative">
              {/* Card Decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <div className="mb-6 flex justify-center">
                 <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img src={profileImg} alt="Us" className="w-full h-full object-cover" />
                 </div>
              </div>

              <motion.h2 
                key={state}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-comic text-3xl font-bold text-foreground mb-8"
              >
                {state === "q1" ? "Will you trigger this event with me?" : "Are you 1000% sure?"}
              </motion.h2>

              <div className="flex flex-col gap-4 items-center justify-center min-h-[120px]">
                <Button 
                  size="lg" 
                  onClick={handleYes}
                  className="w-full max-w-[200px] text-lg font-hand font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                  Yes! <Heart className="w-5 h-5 ml-2 fill-current" />
                </Button>

                <motion.div
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    onMouseEnter={handleNoHover}
                    onClick={handleNoHover}
                    className="w-full max-w-[200px] text-lg font-hand border-2 border-muted-foreground/20 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 rounded-xl"
                  >
                    {getNoButtonText()} <X className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
              
              <p className="mt-6 text-sm text-muted-foreground font-hand">
                {state === "q1" ? "* terms and conditions apply (hugs included)" : "* no takebacks allowed"}
              </p>
            </Card>
          </motion.div>
        )}

        {state === "ending" && (
          <motion.div
            key="ending"
            initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="z-20 p-4 max-w-lg w-full"
          >
            <div className="bg-white p-4 rounded-3xl shadow-2xl border-4 border-white rotate-1">
              <img 
                src={endingImg} 
                alt="Ending Page" 
                className="w-full h-auto rounded-xl"
              />
              <div className="text-center mt-4 mb-2">
                 <h2 className="font-hand text-3xl font-bold text-primary">See you soon! 💌</h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion } from "framer-motion";
import sticker1 from "@assets/sticker 1.jpg";
import sticker2 from "@assets/sticker 2.jpg";
import sticker3 from "@assets/sticker 3.jpg";
import sticker4 from "@assets/sticker 4.jpg";
import sticker5 from "@assets/sticker 5.jpg";
import sticker6 from "@assets/sticker 6.jpg";
import sticker7 from "@assets/sticker 7.png";
import sticker8 from "@assets/sticker 8.png";
import sticker9 from "@assets/sticker 9.png";

export function StickerBackground() {
  const stickers = [
    { src: sticker1, x: "10%", y: "15%", rotate: -10, scale: 0.8 },
    { src: sticker2, x: "85%", y: "10%", rotate: 15, scale: 0.9 },
    { src: sticker3, x: "80%", y: "80%", rotate: -5, scale: 1 },
    { src: sticker4, x: "30%", y: "75%", rotate: 20, scale: 0.85 },
    { src: sticker5, x: "20%", y: "45%", rotate: 0, scale: 1.5 },
    { src: sticker6, x: "90%", y: "40%", rotate: 10, scale: 0.75 },
    { src: sticker7, x: "50%", y: "5%", rotate: -20, scale: 2.0 },
    { src: sticker8, x: "70%", y: "40%", rotate: 0, scale: 2.0 },
    { src: sticker9, x: "60%", y: "80%", rotate: -10, scale: 0.9 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-4 rounded-[2rem] border-2 border-primary/10 grid-bg h-[calc(100%-2rem)] w-[calc(100%-2rem)]" />
      
      {stickers.map((sticker, index) => (
        <motion.img
          key={index}
          src={sticker.src}
          alt="sticker"
          className="absolute w-32 h-auto object-contain sticker-shadow opacity-80 mix-blend-multiply"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.8, 
            scale: sticker.scale,
            rotate: [sticker.rotate - 5, sticker.rotate + 5, sticker.rotate - 5],
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: index * 0.1 },
            scale: { duration: 0.5, delay: index * 0.1 },
            rotate: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ left: sticker.x, top: sticker.y }}
        />
      ))}
    </div>
  );
}

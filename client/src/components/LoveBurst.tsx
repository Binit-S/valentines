import { motion, AnimatePresence } from "framer-motion";

export function LoveBurst({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="love-burst"
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.5 }}
          exit={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
           <div className="w-64 h-64 pointer-events-auto">
             <img 
                src="/stickers/love2.webp" 
                alt="Love Burst" 
                className="w-full h-full object-contain drop-shadow-2xl"
             />
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
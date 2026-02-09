import { motion } from "framer-motion";

interface ValentineCardProps {
  state: "q1" | "q2";
  noButtonPos: { x: number; y: number };
  noCount: number;
  handleYes: () => void;
  handleNoHover: () => void;
  getNoButtonText: () => string;
}

export function ValentineCard({ 
  state, 
  noButtonPos, 
  handleYes, 
  handleNoHover, 
  getNoButtonText 
}: ValentineCardProps) {
  
  return (
    <motion.div
      key="card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", bounce: 0.4 }}
      className="z-10 w-full max-w-[420px] px-4"
    >
      <div className="relative bg-[#fbf4e9] rounded-[18px] p-[22px] text-center shadow-xl border-none">
        
        {/* Decorative Top Line */}
        <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[90px] h-[28px] border-t-[3px] border-[#c2b59b]" />

        {/* Header Section */}
        <div className="mb-[14px]">
          <h1 className="text-[32px] font text-[#6b6a3d] leading-none font-cute">
            ✿ For Kuki ✿
            <span className="text-[20px] block mt-1 font-normal font-hand">✿ UwU ✿</span>
          </h1>
        </div>

        {/* Inner Pink Section */}
        <div className="bg-[#f6cfd8] rounded-[14px] p-[26px_20px]">
          
          <motion.h2 
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6b6a3d] text-[28px] font-cute font mb-[20px] leading-tight"
          >
            {state === "q1" ? "Kuki , suno na , ek baat puchu?" : "Meri jaan , kya tum meri valentine banogi?"}
          </motion.h2>

          {/* <p className="text-[#6b6a3d] text-lg mb-8 font-cute font-bold opacity-80">
            * select an option below to proceed *
          </p> */}

          <div className="flex flex-row gap-4 items-center justify-center min-h-[80px] perspective-1000">
            
            <button 
              onClick={handleYes}
              className="btn-3d"
              style={{ 
                  '--btn-bg': '#fbf4e9',       
                  '--btn-border': '#6b6a3d',   
                  '--btn-shadow': '#c2b59b',   
                  '--btn-face': '#ffffff',     
                  color: '#6b6a3d'             
              } as React.CSSProperties}
            >
              {/* DYNAMIC YES TEXT: Changes based on the state */}
              {state === "q1" ? "Yes!" : "JI HAAN!!"} 
            </button>

            <motion.div
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <button 
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                className="btn-3d"
                style={{ 
                    '--btn-bg': '#e5e5e5', 
                    '--btn-border': '#78716c', 
                    '--btn-shadow': '#a8a29e',
                    '--btn-face': '#f5f5f4',
                    color: '#78716c',
                    fontSize: '1rem' 
                } as React.CSSProperties}
              >
                {getNoButtonText()}
              </button>
            </motion.div>
          </div>
        </div>

        <div className="mt-[14px] text-[16px] text-[#6b6a3d] font-hand">
           Made with ❤ for you
        </div>
      </div>
    </motion.div>
  );
}
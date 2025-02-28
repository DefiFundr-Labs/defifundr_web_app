import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface CoinData {
  id: number;
  image: string;
}

const coins: CoinData[] = [
  { id: 1, image: "./bitcoin-btc-logo.png" },
  { id: 2, image: "./ethereum-eth-logo.png" },
  { id: 3, image: "./binance-coin-bnb-logo.png" },
  { id: 4, image: "./tron-trx-logo.png" },
  { id: 5, image: "./solana-sol-logo.png" },
  { id: 6, image: "./cardano-ada-logo.png" },
];

function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coinControls = useAnimation();

  useEffect(() => {
    const animateCoins = async () => {
      await coinControls.start((i) => ({
        y: ["0%", "-50%", "0%"],
        x: [
          `${Math.sin(i * 0.5) * 10}%`,
          `${Math.sin((i + 2) * 0.5) * 10}%`,
          `${Math.sin(i * 0.5) * 10}%`,
        ],
        rotate: [0, 360],
        scale: [1, 1.1, 1],
        transition: {
          duration: 10 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }));
    };

    animateCoins();
  }, [coinControls]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-primary-900" />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Floating coins */}
      {coins.map((coin, index) => (
        <motion.div
          key={coin.id}
          className="absolute"
          style={{
            width: "80px",
            height: "80px",
            left: `${(index + 1) * 15}%`,
            top: `${((index % 3) + 1) * 20}%`,
          }}
          animate={coinControls}
          custom={index}
        >
          <motion.img
            src={coin.image}
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Glowing orbs */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Light streaks */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`streak-${index}`}
          className="absolute bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            width: "200px",
            height: "1px",
            left: "-200px",
            top: `${(index + 1) * 20}%`,
            opacity: 0.3,
          }}
          animate={{
            x: ["0%", "200%"],
          }}
          transition={{
            duration: 2 + index,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default AnimatedBackground;

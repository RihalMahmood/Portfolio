import { motion } from "framer-motion";
import { useEffect } from "react";

const text = "Hello, I'm Rihal".split(" ");

export default function Loader({ setLoadingComplete }) {
  useEffect(() => {
    //Wait for words to appear, then pause, then trigger completion
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, text.length * 150 + 800);
    return () => clearTimeout(timer);
  }, [setLoadingComplete]);

  return (
    <motion.div
      className="loader-container"
      initial={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="loader-text">
        {text.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.15 }}
            style={{ marginRight: "12px", display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

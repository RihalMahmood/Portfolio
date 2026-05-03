import { motion } from "framer-motion";
import { useEffect } from "react";

const text = "Welcome to Rihal's Portfolio".split(" ");

/*Images that must be loaded before the loader dismisses.
The hero band image is the one that animates immediately after the
loader exits, so we gate on it.*/
const CRITICAL_IMAGES = ["/images/Riju.png"];

function preloadImages(paths) {
  return Promise.all(
    paths.map(
      (src) =>
        new Promise((resolve) => {
          const img = new window.Image();
          /*Resolve on both load and error — we never want to block forever
          just because a single asset 404'd.*/
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        })
    )
  );
}

export default function Loader({ setLoadingComplete }) {
  useEffect(() => {
    //Minimum display time so the greeting animation plays fully.
    const timer = new Promise((resolve) =>
      setTimeout(resolve, text.length * 150 + 800)
    );

    //Wait for critical images to decode into the browser's image cache.
    const images = preloadImages(CRITICAL_IMAGES);

    //Only dismiss once BOTH are done — whichever finishes last wins.
    Promise.all([timer, images]).then(() => setLoadingComplete(true));
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

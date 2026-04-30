import { motion } from "framer-motion";

const PLAYLIST_ID = "0y4uqBTOgRNqlZDHh8SX9U?si=ffd43fbe2bc74600";

/*Animated equaliser bars - purely decorative*/
function EqBars() {
  const bars = [0.6, 1, 0.75, 0.45, 0.9, 0.55, 0.8, 0.4];
  return (
    <span className="spotify-eq" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="spotify-eq-bar"
          style={{ "--delay": `${i * 0.12}s`, "--max-h": h }}
        />
      ))}
    </span>
  );
}

export default function SpotifyPlaylist({ setHovering }) {
  const ho = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
    }),
  };

  return (
    <section className="spotify-section">
      <div className="container spotify-inner">
        {/*Left: copy*/}
        <div className="spotify-copy">
          <motion.div
            className="section-label"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
          >
            Now Playing
          </motion.div>

          <motion.h2
            className="spotify-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            Music fuels<br />
            <em className="spotify-heading-accent">the build.</em>
          </motion.h2>

          <motion.p
            className="spotify-sub"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            Every good commit deserves a good soundtrack. Here's what's been on
            loop while the code piles up - tune in and vibe with the developer.
          </motion.p>

          {/*Live-indicator pill*/}
          <motion.div
            className="spotify-live-pill"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
          >
            <EqBars />
            <span>Currently curated</span>
          </motion.div>

          {/*Open in Spotify link*/}
          <motion.a
            className="spotify-open-link"
            href={`https://open.spotify.com/playlist/${PLAYLIST_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={4}
            {...ho}
          >
            {/*Spotify wordmark SVG*/}
            <svg
              className="spotify-logo-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.237-.43.1-.871-.171-.971-.591-.1-.43.17-.871.591-.971 4.91-1.12 9.121-.641 12.511 1.44.38.241.5.721.292 1.118zm1.47-3.27c-.301.47-.921.62-1.391.32-3.461-2.122-8.732-2.742-12.821-1.5-.521.16-1.071-.131-1.231-.651-.16-.521.131-1.071.651-1.231 4.671-1.42 10.472-.721 14.432 1.71.461.3.612.921.36 1.352zm.13-3.401c-4.15-2.462-11.002-2.691-14.962-1.49-.641.19-1.311-.17-1.501-.811-.19-.641.17-1.311.811-1.501 4.551-1.38 12.122-1.111 16.892 1.72.581.34.771 1.091.43 1.671-.34.581-1.091.77-1.67.411z" />
            </svg>
            Open in Spotify ↗
          </motion.a>
        </div>

        {/*Right: embed*/}
        <motion.div
          className="spotify-embed-wrap"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          custom={1}
        >
          {/*Glow behind the player*/}
          <div className="spotify-embed-glow" aria-hidden="true" />
          <iframe
            className="spotify-iframe"
            src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="480"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          />
        </motion.div>
      </div>
      {/*subtle bottom border glow*/}
      <div className="spotify-top-glow" style={{ position: "relative", top: "0", left: "50%", transform: "translateX(-50%)", marginTop: "80px", marginBottom: "0", opacity: 0.3 }} aria-hidden="true" />

      {/*FOOTER*/}
      <footer>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px" }}>
          <span>© 2026 Quazi Rihal Mahmood. All rights reserved.</span>
          <span>Built with ❤️ and inspired by many great developers</span>
        </div>
      </footer>
    </section>
  );
}

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import AboutPage from "./components/AboutPage";

import './index.css';

function HomePage({ theme, toggleTheme }) {
  // Only show the loader on the very first visit in this browser session.
  // Navigating away and back (e.g. About → Home) will NOT retrigger it.
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("portfolio_loaded");
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("up")),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [isLoading]);

  useEffect(() => {
    const sections = ["top", "skills", "work", "contact"];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader setLoadingComplete={() => {
          sessionStorage.setItem("portfolio_loaded", "true");
          setIsLoading(false);
        }} />}
      </AnimatePresence>

      <div
        key="main-app"
        style={{
          height: isLoading ? "100vh" : "auto",
          overflow: isLoading ? "hidden" : "visible"
        }}
      >
        <CustomCursor hovering={hovering} />
        <Navbar scrolled={scrolled} hovering={hovering} setHovering={setHovering} activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} isLoading={isLoading} />
        <Hero hovering={hovering} setHovering={setHovering} isLoading={isLoading} />
        <Marquee />
        <Skills hovering={hovering} setHovering={setHovering} />
        <Projects hovering={hovering} setHovering={setHovering} />
        <Contact hovering={hovering} setHovering={setHovering} />
      </div>
    </>
  );
}

export default function App() {
  // Persist theme within the browser session.
  // Defaults to "dark" on first load; remembers the last choice on refresh.
  // Resets to "dark" when the browser/tab is closed.
  const [theme, setTheme] = useState(() => {
    return sessionStorage.getItem("portfolio_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    sessionStorage.setItem("portfolio_theme", next);
    setTheme(next);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

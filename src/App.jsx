import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

import './index.css';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
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
  }, []);

  return (
    <>
      <CustomCursor hovering={hovering} />
      <Navbar scrolled={scrolled} hovering={hovering} setHovering={setHovering} />
      <Hero hovering={hovering} setHovering={setHovering} />
      <Marquee />
      <Projects hovering={hovering} setHovering={setHovering} />
      <Skills hovering={hovering} setHovering={setHovering} />
      <Contact hovering={hovering} setHovering={setHovering} />
    </>
  );
}

import { useEffect, useRef } from "react";

export default function CustomCursor({ hovering }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let rx = 0, ry = 0;
    const move = (e) => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
      const lerp = (a, b, t) => a + (b - a) * t;
      const animate = () => {
        rx = lerp(rx, e.clientX, 0.12);
        ry = lerp(ry, e.clientY, 0.12);
        if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      };
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur cur-dot" />
      <div ref={ringRef} className={`cur cur-ring ${hovering ? "grow" : ""}`} />
    </>
  );
}

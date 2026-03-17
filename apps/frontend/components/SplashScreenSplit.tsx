"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SplashScreenSplitProps {
  onComplete?: () => void;
}

export default function SplashScreenSplit({ onComplete }: SplashScreenSplitProps) {
  const [visible,   setVisible]   = useState(true);
  const [splitting, setSplitting] = useState(false);

  useEffect(() => {
    // Logo zoom-out: 0.8s — hold until 1.8s — then split
    const splitTimer = setTimeout(() => setSplitting(true), 1800);
    // Split takes 1.3s → total 3.1s
    const hideTimer  = setTimeout(() => { setVisible(false); onComplete?.(); }, 3100);

    return () => { clearTimeout(splitTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>

      {/* ── CURTAIN TOP ─────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "50%",
        backgroundColor: "#267275",
        transform:  splitting ? "translateY(-100%)" : "translateY(0%)",
        transition: splitting ? "transform 1.3s cubic-bezier(0.76,0,0.24,1)" : "none",
      }} />

      {/* ── CURTAIN BOTTOM ──────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
        backgroundColor: "#267275",
        transform:  splitting ? "translateY(100%)"  : "translateY(0%)",
        transition: splitting ? "transform 1.3s cubic-bezier(0.76,0,0.24,1)" : "none",
      }} />

      {/* ── LOGO — scale(2) → scale(1) + fade out on split ─── */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        animate={{ opacity: splitting ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeIn" }}
      >
        <motion.div
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
        >
          <Image
            src="/images/contact-us/logo-white.png"
            alt="Nexium Trio"
            width={260}
            height={72}
            priority
            style={{
              width: "min(260px, 65vw)",
              height: "auto",
            }}
          />
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(10px, 2.5vw, 13px)",
            color: "white",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
          }}>
            Your Next Premium Software Solution
          </p>
        </motion.div>
      </motion.div>

    </div>
  );
}

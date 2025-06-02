"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const HomeHeader = () => {
  const { scrollY } = useScroll();

  const yCity = useTransform(scrollY, [0, 200], [0, -100]);
  const opacityCity = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [1, 0.5, 0.5, 0]
  );
  const yHero = useTransform(scrollY, [0, 200], [0, -150]);
  const opacityHero = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);

  const scaleText = useTransform(scrollY, [0, 300], [1.15, 1.5]);
  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 200, 420]);

  return (
    <>
      <header id="welcome-header">
        <motion.div
          id="welcome-header-content"
          style={{ scale: scaleText, y: yText }}
        >
          <h1 style={{ marginBottom: 0 }}>VitaCheck</h1>
          <p>Your Super-Smart Supplement Categorizer</p>
          <button id="cta-link">Go To App</button>
        </motion.div>
        <motion.img
          style={{ opacity: opacityCity, y: yCity }}
          src="/images/city.jpg"
          alt="A city skyline touched by sunlight"
          id="city-image"
        />
        <motion.img
          src="/images/vitaman.png"
          style={{ opacity: opacityHero, y: yHero }}
          alt="A superhero wearing a cape"
          id="hero-image"
        />
      </header>
    </>
  );
};

export default HomeHeader;

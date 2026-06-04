import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { pageTransition } from "./lib/motion";

import Home from "./pages/Home";
import Scout from "./pages/Scout";
import About from "./pages/About";
import Life from "./pages/Life";
import Social from "./pages/Social";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={reduce ? undefined : pageTransition}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/starscout" element={<Scout />} />
            <Route path="/about" element={<About />} />
            <Route path="/starlife" element={<Life />} />
            <Route path="/starsocial" element={<Social />} />
            <Route path="/starblog" element={<Blog />} />
            <Route path="/starblog/:slug" element={<BlogPost />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}

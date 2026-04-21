"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <a href="#" className="navbar__logo">
        CryoVault
      </a>

      <ul className="navbar__links">
        {[
          { label: "Overview", target: "hero" },
          { label: "Cooling Loop", target: "cooling" },
          { label: "Components", target: "components" },
          { label: "Specs", target: "specs" },
          { label: "Build", target: "cta-configure" },
        ].map((link) => (
          <li key={link.label}>
            <a
              href={`#${link.target}`}
              className="navbar__link"
              onClick={(e) => handleNavClick(e, link.target)}
              id={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button className="navbar__cta" id="nav-cta">
        Configure Your Build
      </button>

      <button className="navbar__toggle" aria-label="Menu" id="nav-toggle">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

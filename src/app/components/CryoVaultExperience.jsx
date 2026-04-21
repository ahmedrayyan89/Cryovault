"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "./Navbar";
import Preloader from "./Preloader";

const TOTAL_FRAMES = 240;
const SCROLL_HEIGHT_VH = 500; // vh units for scroll container

// Storytelling beat definitions
const SECTIONS = [
  {
    id: "hero",
    startProgress: 0,
    endProgress: 0.15,
    alignment: "center",
    isHero: true,
    headline: "CryoVault",
    subtitle: "Cooled to perfection.",
    body: "A custom water-cooled build engineered for silence, performance, and obsessive detail.",
  },
  {
    id: "engineering",
    startProgress: 0.18,
    endProgress: 0.38,
    alignment: "left",
    headline: "Precision-engineered for thermal dominance.",
    body: [
      "Custom hardline tubing routes coolant across CPU and GPU with zero compromise on flow or aesthetics.",
      "Every fitting, every bend, every block — engineered for performance and obsessive visual clarity.",
    ],
  },
  {
    id: "cooling",
    startProgress: 0.42,
    endProgress: 0.62,
    alignment: "right",
    headline: "One loop. Total control.",
    body: [
      "Dual radiator configuration eliminates thermal throttling under any load.",
      "Full-cover GPU waterblock drops temperatures by up to 30°C vs air cooling.",
      "Real-time coolant flow keeps every component at peak performance, silently.",
    ],
  },
  {
    id: "performance",
    startProgress: 0.66,
    endProgress: 0.82,
    alignment: "left",
    headline: "Uncompromising performance. Unmatched aesthetics.",
    body: [
      "Flagship silicon, high-frequency memory, and a power delivery system built for sustained, full-load operation.",
      "RGB lighting syncs across every component — not for show, but as a window into a living, breathing machine.",
    ],
  },
  {
    id: "cta",
    startProgress: 0.86,
    endProgress: 1.0,
    alignment: "center",
    headline: "Built different. Cooled different.",
    subtitle: "CryoVault. Engineered for obsessives, built for legends.",
    isCTA: true,
    microCopy: "Crafted for overclockers, creators, and those who refuse to compromise.",
  },
];

// Spec cards data
const SPECS = [
  {
    icon: "🧊",
    label: "Cooling",
    value: "Custom Hardline Loop",
    detail:
      "Dual 360mm radiators, full-cover CPU & GPU waterblocks, D5 pump/reservoir combo",
  },
  {
    icon: "⚡",
    label: "Processor",
    value: "Flagship Silicon",
    detail:
      "Latest-gen high-core-count CPU with precision-tuned overclock profiles",
  },
  {
    icon: "🎮",
    label: "Graphics",
    value: "Top-Tier GPU",
    detail:
      "Full-cover waterblock with custom VBIOS for maximum sustained boost clocks",
  },
  {
    icon: "💾",
    label: "Memory",
    value: "64GB DDR5",
    detail:
      "High-frequency, low-latency kit tuned for workstation and gaming workloads",
  },
  {
    icon: "💿",
    label: "Storage",
    value: "4TB Gen5 NVMe",
    detail:
      "PCIe 5.0 NVMe RAID array — sequential reads exceeding 12,000 MB/s",
  },
  {
    icon: "🔇",
    label: "Acoustics",
    value: "Near-Silent",
    detail:
      "Liquid cooling enables ultra-low fan RPMs — under 28dB at full load",
  },
];

export default function CryoVaultExperience() {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSections, setActiveSections] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);

  // Generate frame paths
  const getFramePath = useCallback((index) => {
    const num = String(index + 1).padStart(3, "0");
    return `/frames/ezgif-frame-${num}.jpg`;
  }, []);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images = new Array(TOTAL_FRAMES);

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          images[index] = img;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.src = getFramePath(index);
      });
    };

    // Load in batches for performance
    const loadBatch = async () => {
      const batchSize = 12;
      for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
      imagesRef.current = images;
      // Small delay for smooth transition
      setTimeout(() => setIsLoaded(true), 400);
    };

    loadBatch();
  }, [getFramePath]);

  // Canvas resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Re-render current frame
      renderFrame(frameIndexRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render a specific frame with watermark removal
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.width / dpr;
    const displayHeight = canvas.height / dpr;
    const img = imagesRef.current[index];

    if (!img) {
      ctx.fillStyle = "#1a1a1e";
      ctx.fillRect(0, 0, displayWidth, displayHeight);
      return;
    }

    // Clear
    ctx.fillStyle = "#1a1a1e";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Draw image with "cover" fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth, drawHeight, drawX, drawY;
    if (imgRatio > canvasRatio) {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      drawX = (displayWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      drawX = 0;
      drawY = (displayHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    // --- Watermark removal ---
    // Sample background color near the watermark area
    const sampleX = Math.floor(displayWidth - 140);
    const sampleY = Math.floor(displayHeight - 55);
    let bgR = 26, bgG = 26, bgB = 30; // fallback

    try {
      const pixel = ctx.getImageData(sampleX * dpr, sampleY * dpr, 1, 1).data;
      bgR = pixel[0];
      bgG = pixel[1];
      bgB = pixel[2];
    } catch (e) {
      // CORS or other error — use fallback
    }

    // Paint over watermark with gradient blend
    const wmWidth = 130;
    const wmHeight = 48;
    const wmX = displayWidth - wmWidth;
    const wmY = displayHeight - wmHeight;

    // Horizontal gradient for smooth blend
    const grad = ctx.createLinearGradient(wmX - 30, wmY, wmX + 20, wmY);
    grad.addColorStop(0, `rgba(${bgR}, ${bgG}, ${bgB}, 0)`);
    grad.addColorStop(1, `rgba(${bgR}, ${bgG}, ${bgB}, 1)`);
    ctx.fillStyle = grad;
    ctx.fillRect(wmX - 30, wmY, wmWidth + 30, wmHeight);

    // Solid fill right at the corner
    ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
    ctx.fillRect(wmX + 10, wmY + 5, wmWidth - 10, wmHeight - 5);

    // Vertical gradient for smooth top edge
    const gradV = ctx.createLinearGradient(wmX, wmY - 20, wmX, wmY + 10);
    gradV.addColorStop(0, `rgba(${bgR}, ${bgG}, ${bgB}, 0)`);
    gradV.addColorStop(1, `rgba(${bgR}, ${bgG}, ${bgB}, 1)`);
    ctx.fillStyle = gradV;
    ctx.fillRect(wmX + 10, wmY - 20, wmWidth - 10, 30);
  }, []);

  // Scroll handler — maps scroll to frame index
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = -rect.top;
      const containerHeight = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, containerTop / containerHeight));

      scrollProgressRef.current = progress;
      targetFrameRef.current = Math.round(progress * (TOTAL_FRAMES - 1));

      setScrollProgress(progress);

      // Update active sections
      const newActive = {};
      SECTIONS.forEach((section) => {
        const fadeIn = section.startProgress;
        const fadeOut = section.endProgress;
        const margin = 0.02;

        if (progress >= fadeIn - margin && progress <= fadeOut + margin) {
          // Calculate opacity based on position within section range
          let opacity = 1;
          const fadeInDuration = 0.04;
          const fadeOutDuration = 0.04;

          if (progress < fadeIn + fadeInDuration) {
            if (fadeIn === 0) {
              opacity = 1; // Hero should be fully visible at start
            } else {
              opacity = Math.max(
                0,
                (progress - fadeIn + margin) / (fadeInDuration + margin)
              );
            }
          } else if (progress > fadeOut - fadeOutDuration) {
            if (fadeOut === 1.0) {
              opacity = 1; // CTA should stay fully visible at the very end
            } else {
              opacity = Math.max(
                0,
                (fadeOut + margin - progress) / (fadeOutDuration + margin)
              );
            }
          }

          newActive[section.id] = Math.max(0, Math.min(1, opacity));
        }
      });
      setActiveSections(newActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation loop — lerp frame index for smooth playback
  useEffect(() => {
    const animate = () => {
      const current = frameIndexRef.current;
      const target = targetFrameRef.current;

      // Smooth interpolation
      const lerped = current + (target - current) * 0.15;
      const newFrame = Math.round(lerped);

      if (newFrame !== frameIndexRef.current) {
        frameIndexRef.current = newFrame;
        renderFrame(newFrame);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    if (isLoaded) {
      rafRef.current = requestAnimationFrame(animate);
      renderFrame(0); // Render first frame immediately
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, renderFrame]);

  return (
    <>
      {/* Preloader */}
      <Preloader progress={loadingProgress} isLoaded={isLoaded} />

      {/* Navbar */}
      <Navbar />

      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Main Scroll Experience */}
      <div ref={scrollContainerRef} className="scroll-experience">
        <div className="scroll-experience__sticky">
          {/* Ambient glows are handled via CSS ::before and ::after */}

          {/* Canvas */}
          <canvas ref={canvasRef} className="scroll-experience__canvas" />

          {/* Text Overlays */}
          {SECTIONS.map((section) => {
            const isActive = activeSections[section.id] !== undefined;
            const opacity = activeSections[section.id] || 0;

            return (
              <div
                key={section.id}
                className={`text-overlay text-overlay--${section.alignment} ${section.isHero ? "text-overlay--hero" : ""
                  } ${section.isCTA ? "text-overlay--cta" : ""} ${isActive ? "active" : ""}`}
                style={{
                  opacity: opacity,
                  transition: "opacity 0.3s ease",
                }}
              >
                <div
                  className="text-overlay__content"
                  style={{
                    transform: `translateY(${(1 - opacity) * 20}px)`,
                    opacity: opacity,
                  }}
                >
                  <h2
                    className={`text-overlay__headline ${!section.isHero && !section.isCTA
                        ? "text-overlay__headline--gradient"
                        : ""
                      }`}
                  >
                    {section.headline}
                  </h2>

                  {section.subtitle && (
                    <p className="text-overlay__subtitle">{section.subtitle}</p>
                  )}

                  {section.body &&
                    (Array.isArray(section.body) ? (
                      section.body.map((line, i) => (
                        <p key={i} className="text-overlay__body">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="text-overlay__body">{section.body}</p>
                    ))}

                  {section.microCopy && (
                    <p
                      className="text-overlay__body"
                      style={{
                        marginTop: "0.75rem",
                        fontStyle: "italic",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {section.microCopy}
                    </p>
                  )}

                  {section.isCTA && (
                    <div className="cta-group">
                      <button className="cta-primary" id="cta-configure">
                        Configure Your Build
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <a href="#specs" className="cta-secondary" id="cta-explore">
                        Explore the loop
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specs Section */}
      <section className="specs-section" id="specs">
        <div className="specs-section__header">
          <h2 className="specs-section__title">Technical Specifications</h2>
          <p className="specs-section__subtitle">
            Every component hand-selected. Every parameter tuned. No
            compromises.
          </p>
        </div>
        <div className="specs-grid">
          {SPECS.map((spec, i) => (
            <div key={i} className="spec-card" id={`spec-${spec.label.toLowerCase()}`}>
              <div className="spec-card__icon">{spec.icon}</div>
              <div className="spec-card__label">{spec.label}</div>
              <div className="spec-card__value">{spec.value}</div>
              <div className="spec-card__detail">{spec.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__brand">CryoVault</div>
        <p className="footer__copy">
          © {new Date().getFullYear()} CryoVault. By Rayyan Ahmed.
        </p>
      </footer>
    </>
  );
}

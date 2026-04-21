# CryoVault

> **Cooled to perfection.**  
> A cinematic, Apple-inspired scroll-driven landing page for a custom water-cooled PC build.

🌐 **[Live Demo → cryovault.netlify.app](https://cryovault.netlify.app)**

---

## About CryoVault ?

CryoVault is a high-fidelity, scroll-driven storytelling experience built to showcase a custom hardline water-cooled PC. Inspired by Apple's product pages, it uses a frame-by-frame image sequence engine synced to scroll position, delivering a cinematic reveal of the build as the user scrolls.

This project demonstrates advanced frontend engineering: performant canvas rendering, scroll-linked animation, batched asset loading, and a polished UI with cinematic copy and spec breakdowns.

---

## Features

- **Scroll-driven image sequence** — 240 frames rendered on an HTML5 Canvas, animated in real-time based on scroll position with lerp-smoothed frame interpolation
- **Cinematic storytelling sections** — Five narrative beats (Hero → Engineering → Cooling → Performance → CTA) that fade in/out as the user progresses through the experience
- **Batched frame preloader** — Loads all 240 frames in parallel batches of 12 with a live progress indicator before the experience begins
- **Spec cards** — Animated detail cards covering cooling, CPU, GPU, memory, storage, and acoustics
- **Sticky canvas layout** — Full-viewport canvas stays fixed while a 500vh scroll container drives the entire narrative
- **Responsive & performant** — Built with `requestAnimationFrame` for smooth 60fps rendering and adaptive layout for all screen sizes

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI component model |
| **Tailwind CSS v4** | Utility-first styling |
| **HTML5 Canvas API** | Frame-by-frame image sequence rendering |
| **CSS Scroll-linked animations** | Scroll progress tracking |

---

## Architecture Highlights

```
src/
└── app/
    ├── components/
    │   ├── CryoVaultExperience.jsx  ← Core scroll engine + canvas renderer
    │   ├── Navbar.jsx               ← Fixed navigation
    │   └── Preloader.jsx            ← Frame preloading UI
    ├── globals.css
    ├── layout.js
    └── page.js
public/
└── frames/                          ← 240 JPG frames (image sequence)
```

**Key engineering decisions:**
- `useRef` over `useState` for frame index and scroll progress to avoid re-render overhead during animation
- Frames loaded in batches of 12 using `Promise.all` to maximise parallelism without flooding the network
- Scroll progress mapped to frame index with lerp for smooth, non-jarring playback
- Canvas `drawImage` called only when the frame actually changes, skipping redundant paint operations

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

---

## The Build Specs (featured in the experience)

| Component | Spec |
|---|---|
| **Cooling** | Custom hardline loop — dual 360mm radiators, full-cover CPU & GPU waterblocks, D5 pump/res |
| **CPU** | Flagship silicon with precision-tuned overclock profiles |
| **GPU** | Top-tier card with full-cover waterblock & custom VBIOS |
| **Memory** | 64GB DDR5 — high-frequency, low-latency |
| **Storage** | 4TB PCIe Gen5 NVMe — sequential reads exceeding 12,000 MB/s |
| **Acoustics** | Under 28dB at full load |

---

## License

MIT — free to use, fork, and build upon.

---

<p align="center">
  Built with obsessive attention to detail.<br/>
  <strong>CryoVault. Built by Rayyan Ahmed.</strong>
</p>

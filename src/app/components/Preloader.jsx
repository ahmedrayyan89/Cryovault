"use client";

export default function Preloader({ progress, isLoaded }) {
  return (
    <div className={`preloader ${isLoaded ? "loaded" : ""}`} id="preloader">
      <div className="preloader__brand">CryoVault</div>
      <div className="preloader__bar-track">
        <div
          className="preloader__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="preloader__percent">
        {progress < 100 ? `Loading ${progress}%` : "Entering experience..."}
      </div>
    </div>
  );
}

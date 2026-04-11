import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "about",   label: "ABOUT ME",    fontSize: 100 },
  { id: "resume",  label: "RESUME",      fontSize: 82  },
  { id: "github",  label: "GITHUB LINK", fontSize: 68  },
  { id: "socials", label: "SOCIALS",     fontSize: 82  },
];

export default function P3Menu({ onNavigate }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter")     handleSelect(ITEMS[active].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const handleSelect = (id) => {
    if (id === "github") { window.open("https://github.com/IpanBintang", "_blank"); return; }
    onNavigate ? onNavigate(id) : navigate(`/${id}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        .p3-root {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background: #04060f;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .p3-video {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.75;
          z-index: 0;
          pointer-events: none;
        }
        .p3-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(4,6,15,0.15) 0%, rgba(4,6,15,0.55) 60%, rgba(4,6,15,0.85) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .p3-stripe  { position:absolute; right:0; top:0; bottom:0; width:6px; background:#c4001a; z-index:10; }
        .p3-stripe2 { position:absolute; right:10px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.3); z-index:10; }

        .p3-menu {
          position: relative;
          z-index: 20;
          padding: 0 40px 0 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0px;
        }

        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
          line-height: 1;
          opacity: 0;
          transform: translateX(48px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .p3-row.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .p3-triangle {
          width: 0; height: 0;
          border-top: 14px solid transparent;
          border-bottom: 14px solid transparent;
          border-left: 24px solid #ff2a2a;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: right center;
          transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .p3-row.active .p3-triangle {
          opacity: 1;
          transform: scaleX(1);
        }

        .p3-label {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 0.88;
          display: block;
          white-space: nowrap;
          transition: color 0.12s ease, text-shadow 0.12s ease;
          color: #1a4a8a;
        }
        .p3-row.active .p3-label {
          color: #ff2a2a;
          text-shadow: 2px 2px 0px #7a0000;
        }
        .p3-row:hover:not(.active) .p3-label {
          color: #3a6aaa;
        }

        .p3-hint {
          position: absolute;
          bottom: 20px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 1s;
        }
        .p3-hint.mounted { opacity: 1; }
        .p3-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
        }
        .p3-hint-key {
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .p3-name {
          position: absolute;
          top: 20px; left: 24px;
          z-index: 20;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 14px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
        }
      `}</style>

      <div className="p3-root">
        <video
          className="p3-video"
          src="https://res.cloudinary.com/dt1acsnkg/video/upload/v1775838369/document_6253496834224824402_dpeupv.mp4"
          autoPlay loop muted playsInline
        />
        <div className="p3-mask" />
        <div className="p3-stripe" />
        <div className="p3-stripe2" />
        <div className="p3-name">IpanBintang</div>

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.25, 1 - dist * 0.25);

            return (
              <div
                key={item.id}
                className={`p3-row${isActive ? " active" : ""}${mounted ? " mounted" : ""}`}
                style={{ transitionDelay: mounted ? `${i * 70}ms` : "0ms" }}
                onMouseEnter={() => setActive(i)}
                onClick={() => handleSelect(item.id)}
              >
                <div className="p3-triangle" />
                <span
                  className="p3-label"
                  style={{ fontSize: item.fontSize, opacity }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>

        <div className={`p3-hint${mounted ? " mounted" : ""}`}>
          <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
        </div>
      </div>
    </>
  );
}

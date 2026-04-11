import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "about",   label: "ABOUT ME",    fontSize: 96  },
  { id: "resume",  label: "RESUME",      fontSize: 80  },
  { id: "github",  label: "GITHUB LINK", fontSize: 66  },
  { id: "socials", label: "SOCIALS",     fontSize: 80  },
];

export default function P3Menu({ onNavigate }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter")     handleClick(ITEMS[active]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const handleClick = (item) => {
    if (item.id === "github") {
      window.open("https://github.com/IpanBintang", "_blank");
    } else {
      onNavigate ? onNavigate(item.id) : navigate(`/${item.id}`);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .p3-root {
          position: relative;
          width: 100%;
          height: 100svh;
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

        .p3-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 30%, rgba(4,6,15,0.7) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .p3-scanlines {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
          z-index: 2;
          pointer-events: none;
        }

        .p3-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:10; pointer-events:none; }
        .p3-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.3); z-index:10; pointer-events:none; }

        .p3-menu {
          position: relative;
          z-index: 20;
          padding: 0 60px 0 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
        }

        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-decoration: none;
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
          padding: 2px 0;
        }
        .p3-row.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .p3-label {
          font-family: 'Bebas Neue', sans-serif;
          font-style: italic;
          display: block;
          letter-spacing: 3px;
          line-height: 0.88;
          position: relative;
          z-index: 1;
          transition: color 0.15s ease, transform 0.15s ease;
          color: #1a4a8a;
          transform: skewX(-8deg);
          white-space: nowrap;
        }
        .p3-row.active .p3-label {
          color: #ffffff;
          transform: skewX(-8deg) translateX(-8px);
        }
        .p3-row:hover:not(.active) .p3-label {
          color: #3a6ab0;
        }

        .p3-active-bar {
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%) scaleX(0);
          transform-origin: right center;
          width: 100vw;
          height: 100%;
          background: #c4001a;
          z-index: 0;
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1);
          clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%);
        }
        .p3-row.active .p3-active-bar {
          transform: translateY(-50%) scaleX(1);
        }

        .p3-hint {
          position: absolute;
          bottom: 28px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 6px;
          font-family: 'Bebas Neue', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .p3-hint.mounted { opacity: 1; }
        .p3-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
        }
        .p3-hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 7px; font-size: 11px;
        }

        .p3-title {
          position: absolute;
          top: 28px; right: 28px;
          z-index: 20;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.25);
        }
      `}</style>

      <div className="p3-root">
        <video
          className="p3-video"
          src="https://res.cloudinary.com/dt1acsnkg/video/upload/v1775838369/document_6253496834224824402_dpeupv.mp4"
          autoPlay loop muted playsInline
        />
        <div className="p3-gradient" />
        <div className="p3-scanlines" />
        <div className="p3-stripe" />
        <div className="p3-stripe2" />
        <div className="p3-title">MAIN MENU</div>

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.25, 1 - dist * 0.25);

            return (
              <div
                key={item.id}
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  transitionDelay: mounted ? `${i * 70}ms` : "0ms",
                }}
                onMouseEnter={() => setActive(i)}
                onClick={() => handleClick(item)}
              >
                <div className="p3-active-bar" />
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

        <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
          <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
        </div>
      </div>
    </>
  );
}

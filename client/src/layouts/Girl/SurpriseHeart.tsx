import React, { useState, useMemo } from "react";

// Путь к фото в папке public
const PHOTO_URL = "/public/Алёнка.jpg";
const REVEAL_TEXT_H1 = "Привет, Алёнка! ❤️";
const REVEAL_TEXT_P =
  "С того самого момента ты не выходишь у меня из головы. Ты удивительная. Просто хотел заставить тебя улыбнуться!";

interface ExplodingParticle {
  id: number;
  angle: number;
  distance: number;
  delay: number;
  size: number;
}

interface MagicSparkle {
  id: number;
  top: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
}

const MagicSurprise: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // 1. Магическая пыльца на фоне (работает всегда, пока не откроется карточка)
  const backgroundSparkles = useMemo<MagicSparkle[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 2}s`,
    }));
  }, []);

  // 2. Частицы для эффекта "взрыва" сердца при клике
  const explosionParticles = useMemo<ExplodingParticle[]>(() => {
    if (!isRevealed) return [];
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      angle: Math.random() * 360,
      distance: Math.random() * 120 + 80,
      delay: Math.random() * 0.5,
      size: Math.random() * 10 + 5,
    }));
  }, [isRevealed]);

  const handleHeartClick = () => {
    setIsRevealed(true);
    setTimeout(() => {
      setShowContent(true);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      {/* CSS Анимации */}
      <style>
        {`
          body { margin: 0; background-color: #050509; overflow: hidden; }

          /* Анимация фоновой магии */
          @keyframes floatSparkle {
            0% { transform: translateY(0) scale(1); opacity: 0.2; }
            50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; box-shadow: 0 0 10px #ff66b2; }
            100% { transform: translateY(0) scale(1); opacity: 0.2; }
          }

          /* Анимации Сердца */
          @keyframes neonPulse {
            0%, 100% { filter: drop-shadow(0 0 15px #ff0055) drop-shadow(0 0 30px #ff0055); }
            50% { filter: drop-shadow(0 0 25px #ff66b2) drop-shadow(0 0 50px #ff66b2); }
          }
          @keyframes heartbeatScale {
            0% { transform: translate(-50%, -50%) scale(1); }
            15% { transform: translate(-50%, -50%) scale(1.08); }
            30% { transform: translate(-50%, -50%) scale(1); }
            45% { transform: translate(-50%, -50%) scale(1.12); }
            70% { transform: translate(-50%, -50%) scale(1); }
          }
          @keyframes shimmer {
            0% { opacity: 0.7; transform: scale(1) translate(0, 0); }
            50% { opacity: 1; transform: scale(1.2) translate(2px, -2px); }
            100% { opacity: 0.7; transform: scale(1) translate(0, 0); }
          }

          /* Взрыв и Карточка */
          @keyframes explode {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--translateX), var(--translateY)) scale(0); opacity: 0; }
          }
          @keyframes revealCard {
            0% { opacity: 0; transform: translate(-50%, -40%) scale(0.8); filter: blur(20px); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0px); }
          }
          @keyframes cardBorderGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 85, 0.5), 0 8px 32px 0 rgba(0, 0, 0, 0.7); }
            50% { box-shadow: 0 0 35px rgba(155, 89, 182, 0.7), 0 8px 32px 0 rgba(0, 0, 0, 0.7); }
          }

          .sparkle {
            position: absolute;
            border-radius: 50%;
            background-color: #fff;
            pointer-events: none;
            z-index: 1;
          }

          .huge-heart-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80vw;
            height: 80vw;
            max-width: 700px;
            max-height: 700px;
            cursor: pointer;
            animation: heartbeatScale 2s infinite ease-in-out, neonPulse 2s infinite ease-in-out;
            transition: opacity 0.5s ease, transform 0.5s ease;
            z-index: 10;
          }
          .huge-heart-wrapper:hover {
            animation-play-state: paused;
            transform: translate(-50%, -50%) scale(1.05);
            filter: drop-shadow(0 0 40px #ff66b2);
          }

          .shimmer-heart {
            animation: shimmer 3s infinite ease-in-out;
          }

          .particle {
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff0055, #9b59b6);
            filter: blur(2px);
            animation: explode 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            z-index: 5;
          }

          .final-card {
            animation: revealCard 1s cubic-bezier(0.23, 1, 0.32, 1) forwards, cardBorderGlow 3s infinite ease-in-out;
            z-index: 15;
          }
        `}
      </style>

      {/* ФОНОВАЯ МАГИЯ: Плавающие светящиеся точки */}
      {!showContent &&
        backgroundSparkles.map((sparkle) => (
          <div
            key={`sparkle-${sparkle.id}`}
            className="sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              animation: `floatSparkle ${sparkle.duration} infinite ease-in-out`,
              animationDelay: sparkle.delay,
            }}
          />
        ))}

      {/* ЭТАП 1: Огромное Сердце с Текстом */}
      {!isRevealed && (
        <div className="huge-heart-wrapper" onClick={handleHeartClick}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <svg
              viewBox="0 0 500 500"
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                <linearGradient
                  id="neonGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%">
                    <animate
                      attributeName="stop-color"
                      values="#ff0055; #9b59b6; #ff0055"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%">
                    <animate
                      attributeName="stop-color"
                      values="#9b59b6; #ff0055; #9b59b6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
                <path
                  id="heartPath"
                  d="M250,440 L80,260 A110,110 0 0,1 250,110 A110,110 0 0,1 420,260 Z"
                />
                <path
                  id="miniHeart"
                  d="M10,17.5 L3.2,10.4 A4.4,4.4 0 0,1 10,4.4 A4.4,4.4 0 0,1 16.8,10.4 Z"
                />
              </defs>

              <use href="#heartPath" fill="url(#neonGradient)" opacity="0.1" />

              {[...Array(30)].map((_, i) => (
                <use
                  key={i}
                  href="#miniHeart"
                  fill="url(#neonGradient)"
                  x={Math.random() * 220 + 100}
                  y={Math.random() * 250 + 120}
                  scale={Math.random() * 1.5 + 0.5}
                  className="shimmer-heart"
                  style={{ animationDelay: `${Math.random() * 2}s` }}
                />
              ))}

              <ellipse
                cx="250"
                cy="180"
                rx="100"
                ry="40"
                fill="white"
                filter="blur(40px)"
                opacity="0.2"
              />
            </svg>

            {/* НОВЫЙ ТЕКСТ (HTML поверх SVG для красивых шрифтов) */}
            <div style={styles.heartTextOverlay}>
              <span style={styles.subText}>нажми на меня</span>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 2: Взрыв (Частицы) */}
      {isRevealed &&
        !showContent &&
        explosionParticles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={
              {
                width: `${p.size}px`,
                height: `${p.size}px`,
                "--translateX": `${Math.cos((p.angle * Math.PI) / 180) * p.distance}vh`,
                "--translateY": `${Math.sin((p.angle * Math.PI) / 180) * p.distance}vh`,
                animationDelay: `${p.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

      {/* ЭТАП 3: Финальная Карточка */}
      {showContent && (
        <div className="final-card" style={styles.card}>
          <div style={styles.imageFrame}>
            <img src={PHOTO_URL} alt="Алёнка" style={styles.image} />
          </div>
          <div style={styles.textContainer}>
            <h1 style={styles.title}>{REVEAL_TEXT_H1}</h1>
            <p style={styles.text}>{REVEAL_TEXT_P}</p>
          </div>
          <button
            style={{
              border: "none",
              outline: "none",
              background: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              cursor: "pointer",
              marginTop: "20px",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => {
              setIsRevealed(false);
              setShowContent(false);
            }}
          >
            Закрыть магия
          </button>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  // Стили для нового текста поверх сердца
  heartTextOverlay: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    textShadow: "0 4px 15px rgba(255, 0, 85, 0.8)",
    pointerEvents: "none", // Чтобы клик проходил сквозь текст на сердце
  },
  mainText: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "bold",
    letterSpacing: "2px",
    marginBottom: "5px",
  },
  subText: {
    fontSize: "clamp(2rem, 6vw, 1.6rem)",
    opacity: 0.85,
    fontWeight: "normal",
    letterSpacing: "1px",
  },
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "90%",
    maxWidth: "420px",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: "30px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "30px",
    textAlign: "center",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageFrame: {
    width: "100%",
    paddingBottom: "100%",
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "25px",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  textContainer: {
    marginBottom: "10px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "2rem",
    color: "white",
    textShadow: "0 2px 8px rgba(255,255,255,0.3)",
  },
  text: {
    margin: 0,
    fontSize: "1.1rem",
    color: "#e2e8f0",
    lineHeight: "1.6",
  },
};

export default MagicSurprise;

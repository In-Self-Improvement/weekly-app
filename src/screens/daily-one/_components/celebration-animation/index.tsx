"use client";

import { useEffect, useState } from "react";

interface CelebrationAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  shape: (typeof particleShapes)[number];
  emoji?: string;
}

const colors = [
  "#10B981", // emerald-500
  "#06B6D4", // cyan-500
  "#8B5CF6", // violet-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#EC4899", // pink-500
  "#3B82F6", // blue-500
  "#F97316", // orange-500
  "#84CC16", // lime-500
  "#06B6D4", // cyan-500
  "#8B5CF6", // violet-500
  "#F59E0B", // amber-500
];

const particleShapes = ["rect", "circle", "star", "heart"] as const;
const emojiParticles = [
  "🌟",
  "✨",
  "💫",
  "⭐",
  "🎉",
  "🎊",
  "💖",
  "💕",
  "🌈",
  "🦄",
];

export default function CelebrationAnimation({
  isVisible,
  onComplete,
}: CelebrationAnimationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setParticles([]);
      setShowStars(false);
      return;
    }

    // 파티클 생성 (더 많고 다양하게!)
    const newParticles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      const shape =
        particleShapes[Math.floor(Math.random() * particleShapes.length)];
      const isEmoji = Math.random() < 0.3; // 30% 확률로 이모지

      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        vx: (Math.random() - 0.5) * 12, // 더 빠르게
        vy: -(Math.random() * 20 + 15), // 더 높이
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15, // 더 빠른 회전
        scale: Math.random() * 1.2 + 0.3, // 다양한 크기
        opacity: 1,
        shape,
        emoji: isEmoji
          ? emojiParticles[Math.floor(Math.random() * emojiParticles.length)]
          : undefined,
      });
    }
    setParticles(newParticles);
    setShowStars(true);

    // 애니메이션 업데이트
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.5, // 중력
            rotation: particle.rotation + particle.rotationSpeed,
            opacity: particle.opacity - 0.01,
          }))
          .filter(
            (particle) =>
              particle.opacity > 0 && particle.y < window.innerHeight + 100
          )
      );
    }, 16);

    // 정리
    const timeout = setTimeout(() => {
      setShowStars(false);
      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 1000);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 파티클 효과 */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((particle) => {
          const centerX = particle.x + 6;
          const centerY = particle.y + 6;

          if (particle.emoji) {
            return null; // 이모지는 별도로 렌더링
          }

          return (
            <g key={particle.id}>
              {particle.shape === "rect" && (
                <rect
                  x={particle.x}
                  y={particle.y}
                  width="12"
                  height="12"
                  fill={particle.color}
                  opacity={particle.opacity}
                  transform={`rotate(${particle.rotation} ${centerX} ${centerY}) scale(${particle.scale})`}
                  rx="2"
                />
              )}
              {particle.shape === "circle" && (
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="6"
                  fill={particle.color}
                  opacity={particle.opacity}
                  transform={`scale(${particle.scale})`}
                />
              )}
              {particle.shape === "star" && (
                <path
                  d={`M${centerX} ${centerY - 8} L${centerX + 2} ${
                    centerY - 2
                  } L${centerX + 8} ${centerY - 2} L${centerX + 3} ${
                    centerY + 2
                  } L${centerX + 5} ${centerY + 8} L${centerX} ${
                    centerY + 4
                  } L${centerX - 5} ${centerY + 8} L${centerX - 3} ${
                    centerY + 2
                  } L${centerX - 8} ${centerY - 2} L${centerX - 2} ${
                    centerY - 2
                  } Z`}
                  fill={particle.color}
                  opacity={particle.opacity}
                  transform={`rotate(${
                    particle.rotation
                  } ${centerX} ${centerY}) scale(${particle.scale * 0.7})`}
                />
              )}
              {particle.shape === "heart" && (
                <path
                  d={`M${centerX} ${centerY + 6} C${centerX - 6} ${
                    centerY - 2
                  }, ${centerX - 10} ${centerY - 8}, ${centerX - 6} ${
                    centerY - 10
                  } C${centerX - 3} ${centerY - 12}, ${centerX} ${
                    centerY - 10
                  }, ${centerX} ${centerY - 6} C${centerX} ${centerY - 10}, ${
                    centerX + 3
                  } ${centerY - 12}, ${centerX + 6} ${centerY - 10} C${
                    centerX + 10
                  } ${centerY - 8}, ${centerX + 6} ${centerY - 2}, ${centerX} ${
                    centerY + 6
                  } Z`}
                  fill={particle.color}
                  opacity={particle.opacity}
                  transform={`rotate(${
                    particle.rotation
                  } ${centerX} ${centerY}) scale(${particle.scale * 0.5})`}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* 이모지 파티클 */}
      {particles
        .filter((p) => p.emoji)
        .map((particle) => (
          <div
            key={`emoji-${particle.id}`}
            className="absolute pointer-events-none text-2xl"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
              opacity: particle.opacity,
            }}
          >
            {particle.emoji}
          </div>
        ))}

      {/* 중앙 별 효과 */}
      {showStars && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* 메인 큰 별 */}
            <div className="animate-ping absolute h-32 w-32 -top-16 -left-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="mainStarGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 5 L62 35 L95 35 L70 55 L82 85 L50 70 L18 85 L30 55 L5 35 L38 35 Z"
                  fill="url(#mainStarGradient)"
                  className="animate-pulse drop-shadow-lg"
                />
              </svg>
            </div>

            {/* 중간 회전 별 */}
            <div
              className="absolute h-20 w-20 -top-10 -left-10"
              style={{
                animation: "spin 2s linear infinite",
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="midStarGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 15 L58 40 L80 40 L65 55 L72 80 L50 68 L28 80 L35 55 L20 40 L42 40 Z"
                  fill="url(#midStarGradient)"
                  className="drop-shadow-md"
                />
              </svg>
            </div>

            {/* 작은 반대 회전 별 */}
            <div
              className="absolute h-12 w-12 -top-6 -left-6"
              style={{
                animation: "spin 1.5s linear infinite reverse",
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 25 L55 45 L75 45 L62 58 L67 78 L50 70 L33 78 L38 58 L25 45 L45 45 Z"
                  fill="#8B5CF6"
                  className="drop-shadow-sm"
                />
              </svg>
            </div>

            {/* 반짝이는 점들 (더 많고 다양하게) */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-ping"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  backgroundColor:
                    colors[Math.floor(Math.random() * colors.length)],
                  top: `${
                    Math.sin((i * Math.PI) / 6) * (50 + Math.random() * 20) + 50
                  }%`,
                  left: `${
                    Math.cos((i * Math.PI) / 6) * (50 + Math.random() * 20) + 50
                  }%`,
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: `${0.8 + Math.random() * 0.4}s`,
                }}
              />
            ))}

            {/* 추가 이모지 폭죽 */}
            {["🎊", "🎉", "✨", "💫", "🌟"].map((emoji, i) => (
              <div
                key={`center-emoji-${i}`}
                className="absolute text-4xl animate-bounce"
                style={{
                  top: `${Math.sin((i * Math.PI * 2) / 5) * 60 + 50}%`,
                  left: `${Math.cos((i * Math.PI * 2) / 5) * 60 + 50}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 글로우 효과 */}
      {showStars && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 via-transparent to-teal-200/20 animate-pulse" />
      )}
    </div>
  );
}

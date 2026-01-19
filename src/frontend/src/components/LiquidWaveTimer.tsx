import { useEffect, useState } from 'react';

interface LiquidWaveTimerProps {
  timeRemaining: number;
  totalDuration: number;
  mode: 'focus' | 'break' | 'flow';
  isRunning: boolean;
  onToggle: () => void;
  formatTime: (seconds: number) => string;
}

export default function LiquidWaveTimer({
  timeRemaining,
  totalDuration,
  mode,
  isRunning,
  onToggle,
  formatTime,
}: LiquidWaveTimerProps) {
  const size = 320;
  const [waveOffset, setWaveOffset] = useState(0);
  
  // Animate wave offset when running
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 2) % 200);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isRunning]);

  const progress = mode === 'flow' ? 1 : totalDuration > 0 ? timeRemaining / totalDuration : 0;
  
  // Calculate wave height based on progress (inverted so it drains down)
  const waveHeight = size * (1 - progress);

  const getGradientColors = () => {
    switch (mode) {
      case 'focus':
        return {
          start: '#FF6B6B',
          end: '#d946ef',
          id: 'focusGradient',
          glow: 'rgba(255, 107, 107, 0.4)',
        };
      case 'break':
        return {
          start: '#22d3ee',
          end: '#4ade80',
          id: 'breakGradient',
          glow: 'rgba(34, 211, 238, 0.4)',
        };
      case 'flow':
        return {
          start: '#fbbf24',
          end: '#f59e0b',
          id: 'flowGradient',
          glow: 'rgba(251, 191, 36, 0.4)',
        };
      default:
        return {
          start: '#FF6B6B',
          end: '#d946ef',
          id: 'focusGradient',
          glow: 'rgba(255, 107, 107, 0.4)',
        };
    }
  };

  const gradientColors = getGradientColors();

  // Generate wave path with sine wave
  const generateWavePath = (offset: number) => {
    const amplitude = 15;
    const frequency = 0.02;
    const points: string[] = [];
    
    for (let x = 0; x <= size; x += 5) {
      const y = waveHeight + Math.sin((x + offset) * frequency) * amplitude;
      points.push(`${x},${y}`);
    }
    
    return `M 0,${size} L 0,${waveHeight} ${points.join(' L ')} L ${size},${size} Z`;
  };

  return (
    <button
      onClick={onToggle}
      className="relative focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full transition-transform duration-100 active:scale-[0.98]"
      aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      style={{ width: size, height: size }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${
          isRunning ? 'animate-pulse-glow' : ''
        }`}
        style={{
          background: `radial-gradient(circle, ${gradientColors.glow}, transparent 70%)`,
          opacity: isRunning ? 0.6 : 0.3,
        }}
      />

      {/* Container with glass background */}
      <div
        className="relative rounded-full backdrop-blur-sm border border-white/10 overflow-hidden"
        style={{
          width: size,
          height: size,
          background: 'rgba(255, 255, 255, 0.03)',
        }}
      >
        {/* SVG Liquid Wave */}
        <svg
          width={size}
          height={size}
          className="absolute inset-0"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))' }}
        >
          <defs>
            <linearGradient id={gradientColors.id} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradientColors.start} stopOpacity="0.9" />
              <stop offset="100%" stopColor={gradientColors.end} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Animated wave layers */}
          <path
            d={generateWavePath(waveOffset)}
            fill={`url(#${gradientColors.id})`}
            opacity={0.8}
            className="transition-all duration-100 ease-linear"
          />
          <path
            d={generateWavePath(waveOffset + 50)}
            fill={`url(#${gradientColors.id})`}
            opacity={0.6}
            className="transition-all duration-100 ease-linear"
          />
        </svg>

        {/* Time display overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div
            key={`${mode}-${timeRemaining}`}
            className="text-center animate-fadeInScale"
          >
            <div className="text-6xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">
              {formatTime(timeRemaining)}
            </div>
            <div className="text-sm text-white/70 uppercase tracking-wider font-medium">
              {mode === 'flow' ? 'Flow' : isRunning ? 'Running' : 'Paused'}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

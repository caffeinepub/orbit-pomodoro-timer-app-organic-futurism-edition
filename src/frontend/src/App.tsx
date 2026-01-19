import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LiquidWaveTimer from './components/LiquidWaveTimer';
import ModeToggle from './components/ModeToggle';

type TimerMode = 'focus' | 'break' | 'flow';

const FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
const BREAK_DURATION = 5 * 60; // 5 minutes in seconds

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState('Focus on your work');
  const [brownNoiseEnabled, setBrownNoiseEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const taskRef = useRef<HTMLDivElement>(null);

  const totalDuration = mode === 'focus' ? FOCUS_DURATION : mode === 'break' ? BREAK_DURATION : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (mode === 'flow') {
            return prev + 1;
          } else {
            if (prev <= 1) {
              setMode('flow');
              setIsRunning(true);
              return 0;
            }
            return prev - 1;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'flow') {
      setMode('focus');
      setTimeRemaining(FOCUS_DURATION);
    } else {
      setTimeRemaining(totalDuration);
    }
  };

  const handleModeChange = (newMode: 'focus' | 'break') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeRemaining(newMode === 'focus' ? FOCUS_DURATION : BREAK_DURATION);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBackgroundColor = () => {
    switch (mode) {
      case 'focus':
        return 'oklch(0.145 0 0)';
      case 'break':
        return 'oklch(0.16 0.02 220)';
      case 'flow':
        return 'oklch(0.155 0.03 60)';
      default:
        return 'oklch(0.145 0 0)';
    }
  };

  const handleTaskBlur = () => {
    if (taskRef.current) {
      const newTask = taskRef.current.textContent?.trim() || 'Focus on your work';
      setCurrentTask(newTask);
    }
  };

  const handleTaskKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      taskRef.current?.blur();
    }
  };

  return (
    <>
      {/* Film grain overlay */}
      <div className="grain-overlay" />

      <div
        className="min-h-screen flex flex-col items-center justify-between px-6 py-8 overflow-hidden relative transition-colors duration-[1500ms] ease-in-out"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {/* Breathing container */}
        <div className="w-full max-w-md mx-auto flex flex-col items-center space-y-8 animate-breathe">
          {/* Header */}
          <div
            className={`text-center transition-all duration-600 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Orbit</h1>
            <p className="text-zinc-400 text-sm">Stay focused, stay productive</p>
          </div>

          {/* Editable Task Name */}
          <div
            className={`text-center transition-all duration-600 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            <div
              ref={taskRef}
              contentEditable
              suppressContentEditableWarning
              onBlur={handleTaskBlur}
              onKeyDown={handleTaskKeyDown}
              className="text-2xl font-semibold text-white/90 px-4 py-2 rounded-lg hover:bg-white/5 focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all cursor-text min-w-[200px]"
            >
              {currentTask}
            </div>
            <p className="text-xs text-zinc-500 mt-2">Click to edit</p>
          </div>

          {/* Mode Toggle */}
          {mode !== 'flow' && (
            <ModeToggle currentMode={mode} onModeChange={handleModeChange} mounted={mounted} />
          )}

          {/* Liquid Wave Timer with Controls */}
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <LiquidWaveTimer
                timeRemaining={timeRemaining}
                totalDuration={totalDuration}
                mode={mode}
                isRunning={isRunning}
                onToggle={handleToggleTimer}
                formatTime={formatTime}
              />

              {/* Brown Noise Toggle */}
              <button
                onClick={() => setBrownNoiseEnabled(!brownNoiseEnabled)}
                className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label={brownNoiseEnabled ? 'Disable brown noise' : 'Enable brown noise'}
              >
                {brownNoiseEnabled ? (
                  <Volume2 className="w-5 h-5 text-cyan-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-zinc-400" />
                )}
              </button>
            </div>

            {/* Reset Button */}
            {!isRunning && (
              <button
                onClick={handleReset}
                className="mt-6 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 animate-fadeInScale"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-5 h-5 text-zinc-400" />
              </button>
            )}
          </div>

          {/* Flow Mode Indicator */}
          {mode === 'flow' && (
            <div className="text-center animate-fadeInUp">
              <p className="text-amber-400 text-sm font-medium">✨ Flow Mode Active</p>
              <p className="text-zinc-500 text-xs mt-1">Keep going!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer
          className={`text-center text-zinc-600 text-xs py-4 transition-opacity duration-600 delay-500 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          © 2025. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-400 transition-colors underline"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

interface ModeToggleProps {
  currentMode: 'focus' | 'break';
  onModeChange: (mode: 'focus' | 'break') => void;
  mounted: boolean;
}

export default function ModeToggle({ currentMode, onModeChange, mounted }: ModeToggleProps) {
  return (
    <div
      className={`relative flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-600 delay-200 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {/* Sliding background */}
      <div
        className="absolute h-[calc(100%-8px)] rounded-full bg-white/10 transition-all duration-300 ease-out"
        style={{
          left: currentMode === 'focus' ? '4px' : 'calc(50% + 2px)',
          width: 'calc(50% - 6px)',
        }}
      />

      {/* Focus button */}
      <button
        onClick={() => onModeChange('focus')}
        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
          currentMode === 'focus' ? 'text-white' : 'text-zinc-500'
        }`}
      >
        Focus
      </button>

      {/* Break button */}
      <button
        onClick={() => onModeChange('break')}
        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
          currentMode === 'break' ? 'text-white' : 'text-zinc-500'
        }`}
      >
        Break
      </button>
    </div>
  );
}

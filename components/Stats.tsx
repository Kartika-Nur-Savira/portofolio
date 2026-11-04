'use client';

const marqueeItems = [
  'NATURAL LANGUAGE PROCESSING',
  'PREDICTIVE ANALYTICS',
  'BUSINESS INTELLIGENCE',
  'PYTHON',
  'SQL',
  'TENSORFLOW',
  'POSTGRESQL',
  'MACHINE LEARNING',
  'TIME SERIES FORECASTING',
  'COMPUTER VISION',
  'DATA STORYTELLING',
  'DATA MINING',
  'FASTAPI',
  'BIG DATA ANALYTICS',
];

export default function Stats() {
  // Duplicate array 2 times for seamless infinite loop (0% to -50%)
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section
      aria-label="Skills & Expertise Ticker"
      className="relative w-full py-4 sm:py-5 bg-[#F6F8FD] dark:bg-[#020718] border-y border-blue-900/10 dark:border-blue-500/20 overflow-hidden select-none transition-colors duration-500"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
      }}
    >
      {/* Subtle Dot Grid Background matching screenshot */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden flex group">
        <div
          className="flex shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused]"
          style={{
            animation: 'toolkit-forward 34s linear infinite',
            width: 'max-content',
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="inline-flex items-center shrink-0"
            >
              <span className="text-[11px] sm:text-[13px] md:text-sm font-extrabold uppercase tracking-[0.24em] text-[#2D2A57] dark:text-blue-100/90 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-default whitespace-nowrap">
                {item}
              </span>
              <span
                className="text-purple-600/70 dark:text-cyan-400/70 text-xs sm:text-sm font-black mx-4 sm:mx-6 select-none"
                aria-hidden="true"
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

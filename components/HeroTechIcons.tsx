import React from 'react';

// ─── 1. Python ───
export function PythonIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <defs>
        <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE873" />
          <stop offset="100%" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      <path
        fill="url(#pyBlue)"
        d="M63.3 2C47.9 2 40 8.7 40 18.2v12.2h24v3.5H30.4C17.4 33.9 6 42.1 6 58.7c0 16.2 9.9 25 24.4 25h9.4V72.1c0-8.9 7.7-16.7 16.7-16.7h23.8c7.4 0 13.5-6.1 13.5-13.6V18.2C93.8 8.7 85.9 2 63.3 2zm-12.7 8.3c2.9 0 5.2 2.3 5.2 5.2 0 2.9-2.3 5.2-5.2 5.2s-5.2-2.3-5.2-5.2c0-2.9 2.3-5.2 5.2-5.2z"
      />
      <path
        fill="url(#pyYellow)"
        d="M64.7 126c15.4 0 23.3-6.7 23.3-16.2V97.6H64v-3.5h33.6c13 0 24.4-8.2 24.4-24.8 0-16.2-9.9-25-24.4-25h-9.4v11.6c0 8.9-7.7 16.7-16.7 16.7H47.7c-7.4 0-13.5 6.1-13.5 13.6v23.6c0 9.5 7.9 16.2 30.5 16.2zm12.7-8.3c-2.9 0-5.2-2.3-5.2-5.2 0-2.9 2.3-5.2 5.2-5.2s5.2 2.3 5.2 5.2c0 2.9-2.3 5.2-5.2 5.2z"
      />
    </svg>
  );
}

// ─── 2. SQL / Database ───
export function SqlIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <defs>
        <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0078D4" />
          <stop offset="100%" stopColor="#00BCF2" />
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="11" rx="18" ry="6" fill="url(#sqlGrad)" />
      <path
        d="M6 11v9c0 3.3 8.1 6 18 6s18-2.7 18-6v-9"
        stroke="#0078D4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6 20v9c0 3.3 8.1 6 18 6s18-2.7 18-6v-9"
        stroke="#00BCF2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6 29v9c0 3.3 8.1 6 18 6s18-2.7 18-6v-9"
        stroke="#0078D4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="24"
        y="42"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="9"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        letterSpacing="0.5"
      >
        SQL
      </text>
    </svg>
  );
}

// ─── 3. PostgreSQL ───
export function PostgreSqlIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        d="M64 8.7c-30.5 0-55.3 24.8-55.3 55.3 0 19.8 10.4 37.1 26.2 46.8-1.1-4.8-1.7-10.4-1.2-16.1.7-7.8 3.5-15.5 8.3-21.7 1.8-2.3 3.9-4.3 6.2-6-1.5-3.3-2.3-7.1-2.3-11 0-14.7 11.2-26.6 25.4-27.4 6.8-.4 13.5 1.7 18.6 6 5.1 4.3 8.2 10.5 8.6 17.2.4 7.2-2.1 14.1-7 19.2-2.5 2.6-5.6 4.6-9 5.8 4.6 6.1 7.4 13.5 8.1 21.3.5 5.8-.1 11.4-1.2 16.1 15.8-9.7 26.2-27 26.2-46.8 0-30.6-24.8-55.4-55.3-55.4z"
        fill="#336791"
      />
      <circle cx="56" cy="45" r="4" fill="#FFFFFF" />
      <path d="M46 68c4 8 12 14 22 14s18-6 22-14" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── 4. Pandas ───
export function PandasIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <rect x="24" y="16" width="16" height="52" rx="4" fill="#130754" />
      <rect x="48" y="36" width="16" height="76" rx="4" fill="#FFD43B" />
      <rect x="72" y="16" width="16" height="96" rx="4" fill="#E70488" />
      <rect x="96" y="52" width="16" height="60" rx="4" fill="#00A896" />
    </svg>
  );
}

// ─── 5. TensorFlow ───
export function TensorFlowIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M64 6l54 31.2v31.2L91 52.8v43.2L64 110V6z" fill="#FF6F00" />
      <path d="M64 6L10 37.2v31.2l27-15.6v43.2L64 110V6z" fill="#FFA800" />
      <path d="M64 52.8l27 15.6L64 84 37 68.4l27-15.6z" fill="#FF8F00" opacity="0.6" />
    </svg>
  );
}

// ─── 6. PyTorch ───
export function PyTorchIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        d="M74 18c0-1.1-.9-2-2-2-12.7 0-25 5.3-33.8 14.4-9.1 9.4-14.2 22-14.2 35.1 0 13.1 5.1 25.7 14.2 35.1C47 109.7 59.3 115 72 115c13.1 0 25.7-5.1 35.1-14.2 9.1-8.8 14.4-21.1 14.4-33.8 0-1.1-.9-2-2-2-1.1 0-2 .9-2 2 0 11.6-4.9 23-13.1 31-8.6 8.3-20.2 13-32.4 13-11.8 0-23.2-4.9-31.5-13.5-8.3-8.6-13-20.2-13-32.5 0-12.3 4.7-23.9 13-32.5C59 23.9 70.4 19 82.2 19c1.1 0 2-.9 2-2z"
        fill="#EE4C2C"
      />
      <circle cx="82" cy="36" r="6" fill="#EE4C2C" />
      <path d="M74 36l-8 8" stroke="#EE4C2C" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// ─── 7. Tableau ───
export function TableauIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      {/* Center large cross */}
      <rect x="58" y="24" width="12" height="80" rx="3" fill="#E8762D" />
      <rect x="24" y="58" width="80" height="12" rx="3" fill="#E8762D" />
      {/* Surrounding crosses */}
      <rect x="92" y="44" width="8" height="40" rx="2" fill="#5A8FBA" />
      <rect x="76" y="60" width="40" height="8" rx="2" fill="#5A8FBA" />
      <rect x="28" y="44" width="8" height="40" rx="2" fill="#E15759" />
      <rect x="12" y="60" width="40" height="8" rx="2" fill="#E15759" />
      <rect x="60" y="8" width="8" height="30" rx="2" fill="#76B7B2" />
      <rect x="49" y="19" width="30" height="8" rx="2" fill="#76B7B2" />
      <rect x="60" y="90" width="8" height="30" rx="2" fill="#59A14F" />
      <rect x="49" y="101" width="30" height="8" rx="2" fill="#59A14F" />
    </svg>
  );
}

// ─── 8. Power BI ───
export function PowerBiIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <defs>
        <linearGradient id="pbi1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2C811" />
          <stop offset="100%" stopColor="#D9A800" />
        </linearGradient>
        <linearGradient id="pbi2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9E27A" />
          <stop offset="100%" stopColor="#F2C811" />
        </linearGradient>
      </defs>
      {/* Bar 1 */}
      <rect x="20" y="60" width="22" height="52" rx="6" fill="#E6AD10" />
      {/* Bar 2 */}
      <rect x="48" y="38" width="22" height="74" rx="6" fill="url(#pbi1)" />
      {/* Bar 3 */}
      <rect x="76" y="16" width="22" height="96" rx="6" fill="url(#pbi2)" />
    </svg>
  );
}

// ─── 9. Jupyter ───
export function JupyterIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        d="M64 12c-23.8 0-44 14.8-52.2 36 6.8-5.6 17-9 28.2-9 20.3 0 37.6 11.2 42.6 27h33.8C108 34.6 88 12 64 12z"
        fill="#F37626"
      />
      <path
        d="M64 116c23.8 0 44-14.8 52.2-36-6.8 5.6-17 9-28.2 9-20.3 0-37.6-11.2-42.6-27H11.6C20 93.4 40 116 64 116z"
        fill="#F37626"
      />
      <circle cx="64" cy="18" r="4.5" fill="#6E6E6E" />
      <circle cx="28" cy="100" r="4.5" fill="#6E6E6E" />
      <circle cx="100" cy="100" r="4.5" fill="#6E6E6E" />
    </svg>
  );
}

// ─── 10. VS Code ───
export function VsCodeIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M17.5 2.5 7.8 10.4 4 7.5 2 8.8l4 3.2-4 3.2 2 1.3 3.8-2.9 9.7 7.9 4.5-2.2V4.7l-4.5-2.2Z" fill="#007ACC" />
      <path d="M17.5 2.5v19l4.5-2.2V4.7l-4.5-2.2Z" fill="#1F9CF0" />
      <path d="m17.5 7.8-7.7 5.8 7.7 5.8V7.8Z" fill="#0065A9" />
    </svg>
  );
}

// ─── 11. Git ───
export function GitIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" transform="rotate(45 12 12)" fill="#F05032" />
      <circle cx="12" cy="7.5" r="1.8" fill="#fff" />
      <circle cx="8" cy="14" r="1.8" fill="#fff" />
      <circle cx="16" cy="14" r="1.8" fill="#fff" />
      <path d="M12 9.3v3.2c0 .8-.5 1.5-1.3 1.8l-1.4.6M12 12.5c0 .8.5 1.5 1.3 1.8l1.4.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ─── 12. GitHub ───
export function GitHubIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// ─── 13. Figma ───
export function FigmaIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M44 32a20 20 0 0 1 20-20h20a20 20 0 0 1 0 40H64a20 20 0 0 1-20-20z" fill="#F24E1E" />
      <path d="M44 32a20 20 0 0 0 20 20h20V12H64a20 20 0 0 0-20 20z" fill="#FF7262" />
      <path d="M44 64a20 20 0 0 0 20 20h20V44H64a20 20 0 0 0-20 20z" fill="#A259FF" />
      <path d="M64 64a20 20 0 1 1 20 20 20 20 0 0 1-20-20z" fill="#1ABCFE" />
      <path d="M44 96a20 20 0 0 0 20 20 20 20 0 0 0 20-20V76H64a20 20 0 0 0-20 20z" fill="#0ACF83" />
    </svg>
  );
}

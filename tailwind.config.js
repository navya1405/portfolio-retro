/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: '#FF6BB3',   // Main vibrant pink
          light: '#FFCDE3',     // Soft light pink
          bright: '#FF90CB',    // Accent pink (hover/focus)
          dark: '#D44B98',      // Used for borders & strong UI outlines
          bg: '#FFE6F7',        // Main page background (very pale)
        },
        'dark-contrast': '#7A2966', // Text color and outline contrast

        // Optional highlights if needed later
        mint: '#A1FFD6',
        blue: '#66CCFF',
        purple: '#CC99FF'
      },

      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace']
      },

      animation: {
        blink: 'blink 1s step-end infinite',
        float: 'float 3s ease-in-out infinite alternate',
        open: 'openWindow 0.3s ease-out',
        twinkle: 'twinkle 4s infinite alternate',
      },

      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        openWindow: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.7' },
        },
      },

      boxShadow: {
        // No glow, just pixel-style hard shadow
        pixel: '4px 4px 0 rgba(122, 41, 102, 0.5)',
        window: '0 0 0 2px #D44B98',
      },
    },
  },
  plugins: [],
};

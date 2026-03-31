/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./services/**/*.{ts,tsx,js,jsx}",
    "./data/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        gold: {
          50: '#fffef7',
          100: '#fdf9e7',
          200: '#faf0c8',
          300: '#f5e4a0',
          400: '#ecd270',
          500: '#d4af37',
          600: '#b8941f',
          700: '#9a7a18',
          800: '#7d6214',
          900: '#664f10',
        },
        charcoal: {
          900: '#0a0a0f',
          800: '#121218',
          700: '#1a1a22',
          600: '#24242e',
          500: '#2d2d3a',
        },
        champagne: {
          50: '#fdfcf9',
          100: '#f9f6f0',
          200: '#f3ede2',
          300: '#e8dfd0',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'luxury': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 25px 50px -12px rgba(124, 58, 237, 0.15)',
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.2), 0 12px 40px -4px rgba(212, 175, 55, 0.15)',
        'elevated': '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(0, 0, 0, 0.05)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(124, 58, 237, 0.08)',
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "rainbow": "rainbow 3s ease infinite",
        "slow-zoom": "slow-zoom 12s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "rainbow": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.15)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.5)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths as needed
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6', // Blue-500
          dark: '#2563eb', // Blue-600
        },
        background: {
          light: '#f3f4f6', // Gray-100
          dark: '#1f2937', // Gray-800
        },
        card: {
          light: '#ffffff', // White
          dark: '#374151', // Gray-700
        },
        text: {
          light: '#111827', // Gray-900
          dark: '#d1d5db', // Gray-300
        },
        // Additional custom colors can be added here
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For better form styling
    // Add other plugins if needed
  ],
};
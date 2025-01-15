/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1A1A1A',
        primary: '#212121',
        secondary: '#2F2F2F',
        'button-primary': '#29A84C',
        'button-hover': '#1E281F',
        'text-primary': '#D3D3D3'
      }
    }
  },
  plugins: []
};
